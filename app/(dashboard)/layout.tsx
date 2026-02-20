"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ResumeData, ResumeProfile } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSupabase } from "@/hooks/useSupabase";
import { ProfileSelector } from "@/components/ui/ProfileSelector";
import { ATSScore } from "@/components/ui/ATSScore";
import { MobileBottomSheet } from "@/components/ui/MobileBottomSheet";
import { FileText, Target, Edit3, Eye, Printer, Download } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/ui/Dialog";
import { pdf } from "@react-pdf/renderer";
import { PDFClassic } from "@/components/templates/PDFClassic";
import { PDFModern } from "@/components/templates/PDFModern";
import { PDFCompact } from "@/components/templates/PDFCompact";
import { PDFCreative } from "@/components/templates/PDFCreative";
import { PDFAcademic } from "@/components/templates/PDFAcademic";
import { PDFBalanced } from "@/components/templates/PDFBalanced";

interface ProfileContextType {
  profiles: ResumeProfile[];
  currentProfileId: string;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  saving: boolean;
  saveResume: () => Promise<void>;
  selectProfile: (profileId: string) => void;
  createProfile: (name: string) => void;
  deleteProfile: (profileId: string) => void;
  renameProfile: (profileId: string, name: string) => void;
  setDefaultProfile: (profileId: string) => void;
  duplicateProfile: (profileId: string) => void;
  shareProfile: (profileId: string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const supabase = useSupabase();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [profiles, setProfiles] = useState<ResumeProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string>("");
  const [loadingData, setLoadingData] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [showATSSheet, setShowATSSheet] = useState(false);
  const pathname = usePathname();
  const [switchDialog, setSwitchDialog] = useState<{ show: boolean; profileId: string | null }>({ show: false, profileId: null });
  const [downloading, setDownloading] = useState(false);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Load profiles
  useEffect(() => {
    if (!user) {
      setLoadingData(false);
      return;
    }

    const loadProfiles = async () => {
      const { data } = await supabase
        .from("resume_profiles")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (data && data.length > 0) {
        setProfiles(data);
        const defaultProfile = data.find((p) => p.is_default) || data[0];
        setCurrentProfileId(defaultProfile.id);

        const migratedData = {
          ...defaultProfile.data,
          experience: defaultProfile.data.experience?.map((exp: any) => ({
            ...exp,
            visible: exp.visible ?? true,
          })) || [],
          projects: defaultProfile.data.projects?.map((proj: any) => ({
            ...proj,
            visible: proj.visible ?? true,
          })) || [],
          skillsVisibility: defaultProfile.data.skillsVisibility || {},
        };
        setResumeData(migratedData);
      } else {
        const { data: newProfile } = await supabase
          .from("resume_profiles")
          .insert({
            user_id: user.id,
            name: "Default Resume",
            data: sampleResumeData,
            is_default: true,
          })
          .select()
          .single();

        if (newProfile) {
          setProfiles([newProfile]);
          setCurrentProfileId(newProfile.id);
          setResumeData(sampleResumeData);
        }
      }
      setLoadingData(false);
    };

    loadProfiles();
  }, [user, supabase]);

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const saveResume = async () => {
    if (!user || !currentProfileId) return;
    setSaving(true);
    await supabase
      .from("resume_profiles")
      .update({
        data: resumeData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentProfileId);
    setHasChanges(false);
    setSaving(false);
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  const selectProfile = (profileId: string) => {
    if (hasChanges) {
      setSwitchDialog({ show: true, profileId });
      return;
    }

    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setCurrentProfileId(profileId);
      const migratedData = {
        ...profile.data,
        experience: profile.data.experience?.map((exp: any) => ({
          ...exp,
          visible: exp.visible ?? true,
        })) || [],
        projects: profile.data.projects?.map((proj: any) => ({
          ...proj,
          visible: proj.visible ?? true,
        })) || [],
        skillsVisibility: profile.data.skillsVisibility || {},
      };
      setResumeData(migratedData);
      setHasChanges(false);
    }
  };

  const createProfile = async (name: string) => {
    if (!user) return;

    const { data: newProfile } = await supabase
      .from("resume_profiles")
      .insert({
        user_id: user.id,
        name,
        data: resumeData,
        is_default: false,
      })
      .select()
      .single();

    if (newProfile) {
      setProfiles([...profiles, newProfile]);
      setCurrentProfileId(newProfile.id);
      setHasChanges(false);
    }
  };

  const deleteProfile = async (profileId: string) => {
    if (profiles.length === 1) return;

    await supabase.from("resume_profiles").delete().eq("id", profileId);

    const updatedProfiles = profiles.filter((p) => p.id !== profileId);
    setProfiles(updatedProfiles);

    if (currentProfileId === profileId) {
      selectProfile(updatedProfiles[0].id);
    }
  };

  const renameProfile = async (profileId: string, name: string) => {
    await supabase
      .from("resume_profiles")
      .update({ name })
      .eq("id", profileId);

    setProfiles(profiles.map((p) => (p.id === profileId ? { ...p, name } : p)));
  };

  const setDefaultProfile = async (profileId: string) => {
    await supabase
      .from("resume_profiles")
      .update({ is_default: false })
      .eq("user_id", user?.id);

    await supabase
      .from("resume_profiles")
      .update({ is_default: true })
      .eq("id", profileId);

    setProfiles(
      profiles.map((p) => ({ ...p, is_default: p.id === profileId }))
    );
  };

  const duplicateProfile = async (profileId: string) => {
    if (!user) return;
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) return;

    const { data: newProfile } = await supabase
      .from("resume_profiles")
      .insert({
        user_id: user.id,
        name: `${profile.name} (Copy)`,
        data: profile.data,
        is_default: false,
      })
      .select()
      .single();

    if (newProfile) {
      setProfiles([...profiles, newProfile]);
    }
  };

  const shareProfile = async (profileId: string) => {
    const shareUrl = `${window.location.origin}/share/${profileId}`;
    
    if (navigator.share) {
      await navigator.share({
        title: "Review my resume",
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    setDownloading(true);
    try {
      const currentProfile = profiles.find(p => p.id === currentProfileId);
      const pdfTemplates: any = {
        classic: <PDFClassic data={resumeData} />,
        modern: <PDFModern data={resumeData} />,
        compact: <PDFCompact data={resumeData} />,
        creative: <PDFCreative data={resumeData} />,
        academic: <PDFAcademic data={resumeData} />,
        balanced: <PDFBalanced data={resumeData} />,
      };

      const blob = await pdf(pdfTemplates.classic).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentProfile?.name || "resume"}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
    setDownloading(false);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        currentProfileId,
        resumeData,
        setResumeData,
        hasChanges,
        setHasChanges,
        saving,
        saveResume,
        selectProfile,
        createProfile,
        deleteProfile,
        renameProfile,
        setDefaultProfile,
        duplicateProfile,
        shareProfile,
      }}
    >
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto space-y-4">
          <ProfileSelector
            profiles={profiles}
            currentProfileId={currentProfileId}
            onSelectProfile={selectProfile}
            onCreateProfile={createProfile}
            onDeleteProfile={deleteProfile}
            onRenameProfile={renameProfile}
            onSetDefault={setDefaultProfile}
            onDuplicateProfile={duplicateProfile}
            onShareProfile={shareProfile}
          />
          <ATSScore resumeData={resumeData} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex items-center justify-between border-b border-gray-200 bg-white px-6 h-14">
            <div className="flex items-center">
              <Link
                href="/builder"
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  pathname === "/builder"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Edit3 className="h-4 w-4" />
                Editor
              </Link>
              <Link
                href="/resume"
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  pathname === "/resume"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
            </div>
            <div className="flex gap-2">
              {pathname === "/builder" && (
                <button
                  onClick={saveResume}
                  disabled={saving || !hasChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
              {pathname === "/resume" && (
                <>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </button>
                  <button
                    onClick={handleExportPDF}
                    disabled={downloading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    {downloading ? "Generating..." : "Download PDF"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-hidden pb-16 lg:pb-0">{children}</div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40 shadow-lg">
          <div className="flex items-center justify-around">
            <Link
              href="/builder"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/builder" ? "text-blue-600 bg-blue-50" : "text-gray-600"
              }`}
            >
              <Edit3 className="h-5 w-5" />
              <span className="text-xs font-medium">Editor</span>
            </Link>
            <Link
              href="/resume"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/resume" ? "text-blue-600 bg-blue-50" : "text-gray-600"
              }`}
            >
              <Eye className="h-5 w-5" />
              <span className="text-xs font-medium">Preview</span>
            </Link>
            <button 
              onClick={() => setShowProfileSheet(true)}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-blue-600 active:bg-gray-50 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs font-medium">Profiles</span>
            </button>
            <button 
              onClick={() => setShowATSSheet(true)}
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-600 hover:text-blue-600 active:bg-gray-50 rounded-lg transition-colors"
            >
              <Target className="h-5 w-5" />
              <span className="text-xs font-medium">ATS</span>
            </button>
          </div>
        </nav>

        {/* Mobile Bottom Sheets */}
        <MobileBottomSheet 
          isOpen={showProfileSheet} 
          onClose={() => setShowProfileSheet(false)}
          title="Resume Profiles"
        >
          <ProfileSelector
            profiles={profiles}
            currentProfileId={currentProfileId}
            onSelectProfile={(id) => {
              selectProfile(id);
              setShowProfileSheet(false);
            }}
            onCreateProfile={createProfile}
            onDeleteProfile={deleteProfile}
            onRenameProfile={renameProfile}
            onSetDefault={setDefaultProfile}
            onDuplicateProfile={duplicateProfile}
            onShareProfile={shareProfile}
          />
        </MobileBottomSheet>

        <MobileBottomSheet 
          isOpen={showATSSheet} 
          onClose={() => setShowATSSheet(false)}
          title="ATS Score"
        >
          <ATSScore resumeData={resumeData} />
        </MobileBottomSheet>

        <Dialog
          isOpen={switchDialog.show}
          onClose={() => setSwitchDialog({ show: false, profileId: null })}
          onConfirm={() => {
            if (switchDialog.profileId) {
              const profile = profiles.find((p) => p.id === switchDialog.profileId);
              if (profile) {
                setCurrentProfileId(switchDialog.profileId);
                const migratedData = {
                  ...profile.data,
                  experience: profile.data.experience?.map((exp: any) => ({
                    ...exp,
                    visible: exp.visible ?? true,
                  })) || [],
                  projects: profile.data.projects?.map((proj: any) => ({
                    ...proj,
                    visible: proj.visible ?? true,
                  })) || [],
                  skillsVisibility: profile.data.skillsVisibility || {},
                };
                setResumeData(migratedData);
                setHasChanges(false);
              }
            }
            setSwitchDialog({ show: false, profileId: null });
          }}
          title="Unsaved Changes"
          message="You have unsaved changes. Switch profile anyway?"
        />

        {/* Saved Notification */}
        {showSavedNotification && (
          <div className="fixed bottom-6 left-6 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Changes saved successfully</span>
          </div>
        )}
      </div>
    </ProfileContext.Provider>
  );
}
