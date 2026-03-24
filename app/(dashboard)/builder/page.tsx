"use client";

import { useEffect } from "react";
import { createResumeUpdaters } from "@/lib/utils/resumeUpdaters";
import BuilderForm from "@/components/forms/BuilderForm";
import { useProfile } from "./hooks";
import { Undo, Redo } from "lucide-react";

export default function BuilderPage() {
  const { resumeData, setResumeData, hasChanges, setHasChanges, saving, saveResume } = useProfile();

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
    toggleSkillVisibility,
    addCertification,
    updateCertification,
    deleteCertification,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    reorderSections,
  } = createResumeUpdaters((updater) => {
    setResumeData((prev) => {
      const base = prev ?? resumeData;
      return typeof updater === "function" ? updater(base) : updater;
    });
    setHasChanges(true);
  });

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col min-h-0">
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
          toggleSkillVisibility={toggleSkillVisibility}
          addCertification={addCertification}
          updateCertification={updateCertification}
          deleteCertification={deleteCertification}
          addLanguage={addLanguage}
          updateLanguage={updateLanguage}
          deleteLanguage={deleteLanguage}
          reorderSections={reorderSections}
        />
    </div>
  );
}
