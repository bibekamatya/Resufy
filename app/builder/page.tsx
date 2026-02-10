"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/lib/types";
import { sampleResumeData } from "@/lib/data";
import { createResumeUpdaters } from "@/lib/utils/resumeUpdaters";
import BuilderForm from "@/components/forms/BuilderForm";
import { AppHeader } from "@/components/ui/AppHeader";

const Page = () => {
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
      <AppHeader actionLabel="Preview Resume" actionHref="/resume" />
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
    </>
  );
};

export default Page;
