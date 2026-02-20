"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ResumeData, ResumeProfile } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSupabase } from "@/hooks/useSupabase";
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
  };

  const selectProfile = (profileId: string) => {
    if (hasChanges) {
      if (!confirm("You have unsaved changes. Switch profile anyway?")) return;
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
    if (profiles.length === 1) {
      alert("Cannot delete the last profile");
      return;
    }

    if (!confirm("Delete this profile?")) return;

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
      alert("Share link copied to clipboard!");
    }
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
      <div className="flex h-screen">
        <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto space-y-4">
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
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </ProfileContext.Provider>
  );
}
