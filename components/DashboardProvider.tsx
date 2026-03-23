"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ResumeData, ResumeProfile } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { FileText, Target, Edit3, Eye } from "lucide-react";
import Link from "next/link";
import { getResumes, saveResume, createResume, deleteResume, duplicateResume, renameResume, shareResume } from "@/lib/actions/resume";
import toast from "react-hot-toast";
import { LoadingOverlay } from "@/components/ui/LoadingSpinner";
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
  showPhoto: boolean;
  setShowPhoto: (show: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};

export function DashboardProvider({ children, user }: { children: ReactNode; user: any }) {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [profiles, setProfiles] = useState<ResumeProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string>("default");
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const pathname = usePathname();
  const [currentTemplate, setCurrentTemplate] = useState("classic");
  const [showPhoto, setShowPhoto] = useState(true);
  const [initialized, setInitialized] = useState(false);

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
    setSaving(true);
    
    try {
      const result = await saveResume(currentProfileId, resumeData, currentTemplate);
      if (result.success) {
        setHasChanges(false);
        toast.success('Resume saved successfully!');
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

  const handleCreateProfile = async (name: string) => {
    try {
      const result = await createResume(name, resumeData);
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
        showPhoto,
        setShowPhoto,
      }}
    >
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Loading Overlay */}
        {saving && <LoadingOverlay text="Saving resume..." />}
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto space-y-4">
          <ProfileSelector
            profiles={profiles}
            currentProfileId={currentProfileId}
            onSelectProfile={selectProfile}
            onCreateProfile={handleCreateProfile}
            onDeleteProfile={handleDeleteProfile}
            onRenameProfile={handleRenameProfile}
            onSetDefault={() => {}} // TODO: Implement set default
            onDuplicateProfile={handleDuplicateProfile}
            onShareProfile={handleShareProfile}
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
                  onClick={handleSaveResume}
                  disabled={saving || !hasChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
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
          </div>
        </nav>
      </div>
    </ProfileContext.Provider>
  );
}