"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ResumeData, ResumeProfile } from "@/lib/types";
import { sampleResumeData, emptyResumeData } from "@/lib/data";
import { FileText, Target, Edit3, Eye, Download, ZoomIn, ZoomOut, ChevronDown, LogOut, Check, Loader2, Menu } from "lucide-react";
import { MobileBottomSheet } from "@/components/ui/MobileBottomSheet";
import Link from "next/link";
import { getResumes, saveResume, createResume, deleteResume, duplicateResume, renameResume, shareResume } from "@/lib/actions/resume";
import toast from "react-hot-toast";

import { validateResumeData } from "@/lib/utils/validation";
import { ProfileSelector } from "@/components/ui/ProfileSelector";
import { ATSScore } from "@/components/ui/ATSScore";

interface ProfileContextType {
  profiles: ResumeProfile[];
  currentProfileId: string;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  saving: boolean;
  saveResume: () => Promise<void>;
  createProfile: (name: string) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  renameProfile: (profileId: string, name: string) => Promise<void>;
  duplicateProfile: (profileId: string) => Promise<void>;
  selectProfile: (profileId: string) => void;
  currentTemplate: string;
  setCurrentTemplate: (template: string) => void;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};

import { signOut } from "next-auth/react";

function UserFooter({ user }: { user: any }) {
  const initial = user?.email?.charAt(0).toUpperCase() || "U";
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 truncate">{user?.name || user?.email}</p>
        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        title="Logout"
        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
export function DashboardProvider({ children, user }: { children: ReactNode; user: any }) {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [profiles, setProfiles] = useState<ResumeProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string>("default");
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const pathname = usePathname();
  const [currentTemplate, setCurrentTemplate] = useState("classic");
  const [initialized, setInitialized] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const zoomIn = () => setZoom(z => Math.min(z + 10, 150));
  const zoomOut = () => setZoom(z => Math.max(z - 10, 50));

  useEffect(() => {
    if (!exportOpen) return;
    const close = () => setExportOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [exportOpen]);

  const handleExportWord = async () => {
    setExportOpen(false);
    const { exportToWord } = await import('@/lib/utils/exportWord');
    const currentProfile = profiles.find(p => p._id === currentProfileId);
    await exportToWord(resumeData, currentProfile?.title || 'resume');
    toast.success('Word document exported!');
  };

  const handleExportPDF = async () => {
    setExportOpen(false);
    setExporting(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { PDFClassic } = await import('@/components/templates/PDFClassic');
      const { PDFModern } = await import('@/components/templates/PDFModern');
      const { PDFCompact } = await import('@/components/templates/PDFCompact');
      const { PDFCreative } = await import('@/components/templates/PDFCreative');
      const { PDFAcademic } = await import('@/components/templates/PDFAcademic');
      const { PDFBalanced } = await import('@/components/templates/PDFBalanced');
      const currentProfile = profiles.find(p => p._id === currentProfileId);
      const pdfTemplates: Record<string, React.ReactElement> = {
        classic: <PDFClassic data={resumeData} />,
        modern: <PDFModern data={resumeData} />,
        compact: <PDFCompact data={resumeData} />,
        creative: <PDFCreative data={resumeData} />,
        academic: <PDFAcademic data={resumeData} />,
        balanced: <PDFBalanced data={resumeData} />,
      };
      const blob = await pdf(pdfTemplates[currentTemplate] as any || pdfTemplates.classic).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentProfile?.title || 'resume'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Resume exported successfully!');
    } catch (error) {
      toast.error('Failed to export resume');
    } finally {
      setExporting(false);
    }
  };

  // Load resumes from MongoDB
  useEffect(() => {
    if (user && !initialized) {
      const loadResumes = async () => {
        try {
          const result = await getResumes();
          if (result.success && result.resumes?.length > 0) {
            setProfiles(result.resumes);
            setCurrentProfileId(result.resumes[0]._id);
            setResumeData(result.resumes[0].data);
            setCurrentTemplate(result.resumes[0].template || 'classic');
          } else {
            // Create default resume if none exist
            const createResult = await createResume('My Resume', sampleResumeData);
            if (createResult.success) {
              setProfiles([createResult.resume]);
              setCurrentProfileId(createResult.resume._id);
              setResumeData(sampleResumeData);
            }
          }
        } catch (error) {
          toast.error('Failed to load resumes');
        } finally {
          setInitialized(true);
        }
      };
      loadResumes();
    }
  }, [user, initialized]);

  const handleSaveResume = async () => {
    if (!user || !currentProfileId) return;

    const { isValid, errors } = validateResumeData(resumeData);
    if (!isValid) {
      const firstError = Object.values(errors)[0][0];
      toast.error(firstError);
      return;
    }

    setSaving(true);
    
    try {
      const result = await saveResume(currentProfileId, resumeData, currentTemplate);
      if (result.success) {
        setHasChanges(false);
        // Update the profile in state if it was created
        if (currentProfileId === 'default' && result.resume) {
          setCurrentProfileId(result.resume._id);
          setProfiles([result.resume]);
        }
      } else {
        toast.error(result.error || 'Failed to save resume');
      }
    } catch (error) {
      toast.error('Failed to save resume');
    }
    
    setSaving(false);
  };

  // Auto-save: debounce 3 seconds after last change
  useEffect(() => {
    if (!hasChanges || !initialized) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSaveResume();
    }, 3000);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [resumeData, hasChanges, initialized]);

  const handleCreateProfile = async (name: string) => {
    try {
      const result = await createResume(name, emptyResumeData);
      if (result.success) {
        setProfiles([...profiles, result.resume]);
        setCurrentProfileId(result.resume._id);
        setHasChanges(false);
        toast.success('Profile created successfully!');
      } else {
        toast.error(result.error || 'Failed to create profile');
      }
    } catch (error) {
      toast.error('Failed to create profile');
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (profiles.length === 1) {
      toast.error('Cannot delete the last profile');
      return;
    }

    try {
      const result = await deleteResume(profileId);
      if (result.success) {
        const updatedProfiles = profiles.filter(p => p._id !== profileId);
        setProfiles(updatedProfiles);
        if (currentProfileId === profileId) {
          selectProfile(updatedProfiles[0]._id);
        }
        toast.success('Profile deleted successfully!');
      } else {
        toast.error(result.error || 'Failed to delete profile');
      }
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  const handleRenameProfile = async (profileId: string, name: string) => {
    try {
      const result = await renameResume(profileId, name);
      if (result.success) {
        setProfiles(profiles.map(p => p._id === profileId ? { ...p, title: name } : p));
        toast.success('Profile renamed successfully!');
      } else {
        toast.error(result.error || 'Failed to rename profile');
      }
    } catch (error) {
      toast.error('Failed to rename profile');
    }
  };

  const handleDuplicateProfile = async (profileId: string) => {
    try {
      const result = await duplicateResume(profileId);
      if (result.success) {
        setProfiles([...profiles, result.resume]);
        toast.success('Profile duplicated successfully!');
      } else {
        toast.error(result.error || 'Failed to duplicate profile');
      }
    } catch (error) {
      toast.error('Failed to duplicate profile');
    }
  };

  const handleShareProfile = async (profileId: string) => {
    try {
      const result = await shareResume(profileId);
      if (result.success) {
        // Copy to clipboard
        if (!result.shareUrl) {
          toast.error(result.error || 'Failed to generate share link');
          return;
        }
        await navigator.clipboard.writeText(result.shareUrl);
        toast.success('Share link copied to clipboard!');
      } else {
        toast.error(result.error || 'Failed to share profile');
      }
    } catch (error) {
      toast.error('Failed to share profile');
    }
  };

  const selectProfile = (profileId: string) => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Switch profile anyway? Changes will be auto-saved.');
      if (!confirmed) return;
    }
    const profile = profiles.find(p => p._id === profileId);
    if (profile) {
      setCurrentProfileId(profileId);
      setResumeData(profile.data);
      setCurrentTemplate(profile.template || 'classic');
      setHasChanges(false);
    }
  };

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
        saveResume: handleSaveResume,
        createProfile: handleCreateProfile,
        deleteProfile: handleDeleteProfile,
        renameProfile: handleRenameProfile,
        duplicateProfile: handleDuplicateProfile,
        selectProfile,
        currentTemplate,
        setCurrentTemplate,
        zoom,
        zoomIn,
        zoomOut,
      }}
    >
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-gray-200 bg-white shrink-0 h-screen">
          {/* Logo */}
          <div className="p-4 border-b border-gray-100 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-base font-bold text-gray-900 leading-tight">Resufy</div>
                <div className="text-[10px] text-gray-400 leading-tight">Resume Builder</div>
              </div>
            </Link>
          </div>
          {/* Sidebar content scrolls */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ProfileSelector
              profiles={profiles}
              currentProfileId={currentProfileId}
              onSelectProfile={selectProfile}
              onCreateProfile={handleCreateProfile}
              onDeleteProfile={handleDeleteProfile}
              onRenameProfile={handleRenameProfile}
              onDuplicateProfile={handleDuplicateProfile}
              onShareProfile={handleShareProfile}
            />
            <ATSScore resumeData={resumeData} />
          </div>
          {/* User info footer */}
          <div className="p-3 border-t border-gray-100 shrink-0">
            <UserFooter user={user} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          {/* Top Nav — fixed, never scrolls */}
          <div className="hidden lg:flex items-center justify-between border-b border-gray-200 bg-white px-6 h-14 shrink-0">
            <div className="flex items-center h-full">
              <Link
                href="/builder"
                className={`flex items-center gap-2 px-4 h-full border-b-2 font-medium text-sm transition-colors ${
                  pathname === "/builder" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Edit3 className="h-4 w-4" />
                Editor
              </Link>
              <Link
                href="/resume"
                className={`flex items-center gap-2 px-4 h-full border-b-2 font-medium text-sm transition-colors ${
                  pathname === "/resume" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              {pathname === "/builder" && (
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving...</> : !hasChanges ? <><Check className="h-3.5 w-3.5 text-green-500" />Saved</> : null}
                </span>
              )}
              {pathname === "/resume" && (
                <>
                  <div className="flex items-center gap-1">
                    <button onClick={zoomOut} disabled={zoom <= 50} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-all">
                      <ZoomOut className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-xs font-medium text-gray-600 w-10 text-center">{zoom}%</span>
                    <button onClick={zoomIn} disabled={zoom >= 150} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-all">
                      <ZoomIn className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="w-px h-5 bg-gray-200" />
                  <div className="relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setExportOpen(o => !o)}
                      disabled={exporting}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      {exporting ? 'Exporting...' : 'Export'}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {exportOpen && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        <button onClick={handleExportPDF} className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-500" /> Export as PDF
                        </button>
                        <button onClick={handleExportWord} className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" /> Export as Word
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Page Content — only this scrolls */}
          <div className="flex-1 min-h-0">{children}</div>
        </div>

        <MobileBottomSheet isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <div className="p-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 pb-3 border-b border-gray-100" onClick={() => setSidebarOpen(false)}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20">
                <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-base font-bold text-gray-900 leading-tight">Resufy</div>
                <div className="text-[10px] text-gray-400 leading-tight">Resume Builder</div>
              </div>
            </Link>
            <ProfileSelector
              profiles={profiles}
              currentProfileId={currentProfileId}
              onSelectProfile={(id) => { selectProfile(id); setSidebarOpen(false); }}
              onCreateProfile={handleCreateProfile}
              onDeleteProfile={handleDeleteProfile}
              onRenameProfile={handleRenameProfile}
              onDuplicateProfile={handleDuplicateProfile}
              onShareProfile={handleShareProfile}
            />
            <ATSScore resumeData={resumeData} />
            <div className="pt-2 border-t border-gray-100">
              <UserFooter user={user} />
            </div>
          </div>
        </MobileBottomSheet>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center h-12 px-2">
            <Link
              href="/builder"
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                pathname === "/builder" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Edit3 className="h-4 w-4" />
              <span className="text-[10px] font-medium">Editor</span>
            </Link>
            <Link
              href="/resume"
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                pathname === "/resume" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Eye className="h-4 w-4" />
              <span className="text-[10px] font-medium">Preview</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-gray-400"
            >
              <Menu className="h-4 w-4" />
              <span className="text-[10px] font-medium">Menu</span>
            </button>
          </div>
          {/* Save indicator — thin line at top of nav */}
          {pathname === "/builder" && (saving || !hasChanges) && (
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${
              saving ? "bg-amber-400" : "bg-green-400"
            }`} />
          )}
        </nav>
      </div>
    </ProfileContext.Provider>
  );
}