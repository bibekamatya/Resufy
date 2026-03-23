import { ResumeData, PersonalInfo, Experience, Education, Project, Certification, Language } from "@/lib/types";

export const createResumeUpdaters = (
  setResumeData: (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => void
) => {
  // Update personal info fields
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  // Add new experience
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [],
      visible: true,
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  // Update experience
  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Delete experience
  const deleteExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Add education
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  // Update education
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Delete education
  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Add project
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      visible: true,
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  // Update project
  const updateProject = (id: string, field: keyof Project, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  // Delete project
  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // Add skill
  const addSkill = (skill: string) => {
    if (skill.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  // Delete skill
  const deleteSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Toggle skill visibility
  const toggleSkillVisibility = (skill: string) => {
    setResumeData((prev) => ({
      ...prev,
      skillsVisibility: {
        ...prev.skillsVisibility,
        [skill]: !(prev.skillsVisibility?.[skill] ?? true),
      },
    }));
  };

  // Add certification
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      link: "",
      visible: true,
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((cert) => cert.id !== id),
    }));
  };

  // Add language
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "",
      visible: true,
    };
    setResumeData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), newLang],
    }));
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((lang) => lang.id !== id),
    }));
  };

  return {
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
  };
};
