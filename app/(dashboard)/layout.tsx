"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ResumeData, ResumeProfile } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { useAuth } from "@/lib/auth/AuthContext";
import { FileText, Target, Edit3, Eye, Printer, Download } from "lucide-react";
import Link from "next/link";

interface ProfileContextType {
  profiles: ResumeProfile[];
  currentProfileId: string;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  hasChanges: boolean;
  setHasChanges: (value: boolean) => void;
  saving: boolean;
  saveResume: () => Promise<void>;
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [profiles, setProfiles] = useState<ResumeProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string>("default");
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const pathname = usePathname();
  const [currentTemplate, setCurrentTemplate] = useState("classic");
  const [showPhoto, setShowPhoto] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Initialize with sample data for now
  useEffect(() => {
    if (user) {
      const defaultProfile: ResumeProfile = {
        id: "default",
        user_id: user.id,
        name: "Default Resume",
        data: sampleResumeData,
        is_default: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfiles([defaultProfile]);
      setCurrentProfileId("default");
    }
  }, [user]);

  const saveResume = async () => {
    if (!user || !currentProfileId) return;
    setSaving(true);
    
    // TODO: Implement MongoDB save functionality
    // For now, just simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHasChanges(false);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
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
        currentTemplate,
        setCurrentTemplate,
        showPhoto,
        setShowPhoto,
      }}
    >
      <div className="flex flex-col lg:flex-row h-screen">
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