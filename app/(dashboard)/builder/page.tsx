"use client";

import { useEffect } from "react";
import { createResumeUpdaters } from "@/lib/utils/resumeUpdaters";
import BuilderForm from "@/components/forms/BuilderForm";
import { useProfile } from "../layout";
import { Undo, Redo } from "lucide-react";

export default function BuilderPage() {
  const { resumeData, setResumeData, hasChanges, setHasChanges, saving, saveResume } = useProfile();

  useEffect(() => {
    if (resumeData) {
      setHasChanges(true);
    }
  }, [resumeData]);

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
  } = createResumeUpdaters(setResumeData);

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {hasChanges && (
        <div className="fixed top-20 right-4 z-50">
          <button
            onClick={saveResume}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
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
      />
    </>
  );
}
