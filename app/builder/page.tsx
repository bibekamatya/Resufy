"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResumeData } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { createResumeUpdaters } from "@/lib/utils/resumeUpdaters";
import BuilderForm from "@/components/forms/BuilderForm";
import { Dialog } from "@/components/ui/Dialog";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";

const Page = () => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("resumeData");
      return saved ? JSON.parse(saved) : sampleResumeData;
    }
    return sampleResumeData;
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const handleNavigation = (path: string) => {
    setPendingNavigation(path);
    setShowDialog(true);
  };

  const confirmNavigation = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
    setShowDialog(false);
  };

  // Get all updater functions
  const {
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
  } = createResumeUpdaters(setResumeData);

  return (
    <>
      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={confirmNavigation}
        title="Leave page?"
        message="Your changes are auto-saved. You can continue editing anytime."
      />
      
      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
          >
            ×
          </button>
          <div className="overflow-auto max-h-full">
            <ClassicTemplate data={resumeData} />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Tabs */}
        <div className="md:hidden flex bg-slate-900 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === "edit"
                ? "bg-slate-800 text-white border-b-2 border-blue-500"
                : "text-slate-400"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === "preview"
                ? "bg-slate-800 text-white border-b-2 border-blue-500"
                : "text-slate-400"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Desktop: Fixed Split */}
        <div className="hidden md:flex w-full h-screen">
          <div className="w-[75%] bg-slate-900">
            <BuilderForm
              resumeData={resumeData}
              updatePersonalInfo={updatePersonalInfo}
              addExperience={addExperience}
              updateExperience={updateExperience}
              deleteExperience={deleteExperience}
              addEducation={addEducation}
              updateEducation={updateEducation}
              deleteEducation={deleteEducation}
              addProject={addProject}
              updateProject={updateProject}
              deleteProject={deleteProject}
              addSkill={addSkill}
              deleteSkill={deleteSkill}
            />
          </div>
          
          <div className="w-[25%] bg-slate-800 overflow-y-auto h-screen p-4 relative">
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-10 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition"
              title="Fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <div className="scale-[0.42] origin-top">
              <ClassicTemplate data={resumeData} />
            </div>
          </div>
        </div>

        {/* Mobile: Tabbed */}
        <div className="md:hidden w-full">
          <div className={activeTab === "edit" ? "block" : "hidden"}>
            <BuilderForm
              resumeData={resumeData}
              updatePersonalInfo={updatePersonalInfo}
              addExperience={addExperience}
              updateExperience={updateExperience}
              deleteExperience={deleteExperience}
              addEducation={addEducation}
              updateEducation={updateEducation}
              deleteEducation={deleteEducation}
              addProject={addProject}
              updateProject={updateProject}
              deleteProject={deleteProject}
              addSkill={addSkill}
              deleteSkill={deleteSkill}
            />
          </div>
          <div className={activeTab === "preview" ? "block" : "hidden"}>
            <div className="bg-slate-800 overflow-y-auto h-screen p-4">
              <div className="scale-[0.5] origin-top">
                <ClassicTemplate data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
