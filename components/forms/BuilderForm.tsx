/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";
import { Plus, Trash2 } from "lucide-react";
import { commonSkills } from "@/lib/data/commonSkills";
import {
  ResumeData, PersonalInfo, Experience, Education, Project, Certification, Language,
} from "@/lib/types";

interface BuilderFormProps {
  resumeData: ResumeData;
  updatePersonalInfo: (field: keyof PersonalInfo, value: string | boolean) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: keyof Experience, value: any) => void;
  deleteExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  deleteEducation: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: keyof Project, value: any) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: string) => void;
  deleteSkill: (index: number) => void;
  toggleSkillVisibility: (skill: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, field: keyof Certification, value: any) => void;
  deleteCertification: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, field: keyof Language, value: any) => void;
  deleteLanguage: (id: string) => void;
}

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
];

const getTabCount = (id: string, resumeData: ResumeData): number | boolean => {
  switch (id) {
    case "personal": return Boolean(resumeData.personalInfo.fullName && resumeData.personalInfo.email);
    case "experience": return resumeData.experience.length;
    case "education": return resumeData.education.length;
    case "projects": return resumeData.projects.length;
    case "skills": return resumeData.skills.length;
    case "certifications": return (resumeData.certifications || []).length;
    case "languages": return (resumeData.languages || []).length;
    default: return false;
  }
};

const BuilderForm = ({
  resumeData,
  updatePersonalInfo,
  addExperience, updateExperience, deleteExperience,
  addEducation, updateEducation, deleteEducation,
  addProject, updateProject, deleteProject,
  addSkill, deleteSkill, toggleSkillVisibility,
  addCertification, updateCertification, deleteCertification,
  addLanguage, updateLanguage, deleteLanguage,
}: BuilderFormProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSkills = commonSkills.filter(
    (skill) => skillInput && skill.toLowerCase().includes(skillInput.toLowerCase()) && !resumeData.skills.includes(skill)
  ).slice(0, 5);

  if (!resumeData) return null;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Tab Bar */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-white shrink-0 scrollbar-hide">
        {TABS.map((tab) => {
          const count = getTabCount(tab.id, resumeData);
          const hasData = typeof count === "boolean" ? count : count > 0;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              {typeof count === "number" && count > 0 ? (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                }`}>{count}</span>
              ) : typeof count === "boolean" && hasData ? (
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-scroll overscroll-contain p-4 sm:p-6 bg-gray-50 pb-16 lg:pb-6">

        {/* Personal */}
        {activeTab === "personal" && (
          <div className="space-y-3 max-w-2xl">
            <Input label="Full Name" value={resumeData.personalInfo.fullName} onChange={(val) => updatePersonalInfo("fullName", val)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Email" type="email" value={resumeData.personalInfo.email} onChange={(val) => updatePersonalInfo("email", val)} />
              <Input label="Phone" type="tel" value={resumeData.personalInfo.phone} onChange={(val) => updatePersonalInfo("phone", val)} />
            </div>
            <Input label="Location" value={resumeData.personalInfo.location} onChange={(val) => updatePersonalInfo("location", val)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="LinkedIn" value={resumeData.personalInfo.linkedin || ""} onChange={(val) => updatePersonalInfo("linkedin", val)} />
              <Input label="Website" value={resumeData.personalInfo.website || ""} onChange={(val) => updatePersonalInfo("website", val)} />
            </div>
            <Textarea label="Professional Summary" rows={4} value={resumeData.personalInfo.summary} onChange={(val) => updatePersonalInfo("summary", val)} />
          </div>
        )}

        {/* Experience */}
        {activeTab === "experience" && (
          <div className="space-y-4 max-w-2xl">
            {resumeData.experience.map((exp) => (
              <Card key={exp.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={exp.visible ?? true} onChange={(e) => updateExperience(exp.id, "visible", e.target.checked)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>{exp.position || "New Experience"}</span>
                    </div>
                  }
                  action={<Button onClick={() => deleteExperience(exp.id)} variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:bg-red-50">Delete</Button>}
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Position" value={exp.position} onChange={(val) => updateExperience(exp.id, "position", val)} />
                    <Input label="Company" value={exp.company} onChange={(val) => updateExperience(exp.id, "company", val)} />
                  </div>
                  <Input label="Location" value={exp.location} onChange={(val) => updateExperience(exp.id, "location", val)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Start Date" type="month" value={exp.startDate} onChange={(val) => updateExperience(exp.id, "startDate", val)} />
                    <Input label="End Date" type="month" value={exp.endDate} onChange={(val) => updateExperience(exp.id, "endDate", val)} disabled={exp.current} />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Currently working here
                  </label>
                  <Textarea label="Responsibilities (one per line)" rows={4} value={exp.description.join("\n")} onChange={(val) => updateExperience(exp.id, "description", val.split("\n"))} />
                </div>
              </Card>
            ))}
            <Button onClick={addExperience} variant="outline" size="md" icon={Plus} className="w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50">
              Add Experience
            </Button>
          </div>
        )}

        {/* Education */}
        {activeTab === "education" && (
          <div className="space-y-4 max-w-2xl">
            {resumeData.education.map((edu) => (
              <Card key={edu.id} hover>
                <CardHeader
                  title={edu.institution || "New Education"}
                  action={<Button onClick={() => deleteEducation(edu.id)} variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:bg-red-50">Delete</Button>}
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Degree" value={edu.degree} onChange={(val) => updateEducation(edu.id, "degree", val)} />
                    <Input label="Field of Study" value={edu.field} onChange={(val) => updateEducation(edu.id, "field", val)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Institution" value={edu.institution} onChange={(val) => updateEducation(edu.id, "institution", val)} />
                    <Input label="Location" value={edu.location} onChange={(val) => updateEducation(edu.id, "location", val)} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Input label="Start Date" type="month" value={edu.startDate} onChange={(val) => updateEducation(edu.id, "startDate", val)} />
                    <Input label="End Date" type="month" value={edu.endDate} onChange={(val) => updateEducation(edu.id, "endDate", val)} />
                    <Input label="GPA (optional)" value={edu.gpa || ""} onChange={(val) => updateEducation(edu.id, "gpa", val)} />
                  </div>
                </div>
              </Card>
            ))}
            <Button onClick={addEducation} variant="outline" size="md" icon={Plus} className="w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50">
              Add Education
            </Button>
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="space-y-4 max-w-2xl">
            {resumeData.projects.map((proj) => (
              <Card key={proj.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={proj.visible ?? true} onChange={(e) => updateProject(proj.id, "visible", e.target.checked)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>{proj.name || "New Project"}</span>
                    </div>
                  }
                  action={<Button onClick={() => deleteProject(proj.id)} variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:bg-red-50">Delete</Button>}
                />
                <div className="space-y-3">
                  <Input label="Project Name" value={proj.name} onChange={(val) => updateProject(proj.id, "name", val)} />
                  <Textarea label="Description" rows={3} value={proj.description} onChange={(val) => updateProject(proj.id, "description", val)} />
                  <Input label="Technologies (comma separated)" value={proj.technologies.join(", ")} onChange={(val) => updateProject(proj.id, "technologies", val.split(",").map((t) => t.trim()))} />
                  <Input label="Link (optional)" value={proj.link || ""} onChange={(val) => updateProject(proj.id, "link", val)} />
                </div>
              </Card>
            ))}
            <Button onClick={addProject} variant="outline" size="md" icon={Plus} className="w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50">
              Add Project
            </Button>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => {
                const isVisible = resumeData.skillsVisibility?.[skill] ?? true;
                return (
                  <span key={index} className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition ${isVisible ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    <input type="checkbox" checked={isVisible} onChange={() => toggleSkillVisibility(skill)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {skill}
                    <button onClick={() => deleteSkill(index)} className="text-red-600 hover:text-red-700">×</button>
                  </span>
                );
              })}
            </div>
            <div className="relative">
              <Input
                label="Add Skill"
                placeholder="Type to search or press Enter to add"
                value={skillInput}
                onChange={(val) => { setSkillInput(val); setShowSuggestions(true); }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" && skillInput.trim()) {
                    addSkill(skillInput);
                    setSkillInput("");
                    setShowSuggestions(false);
                  }
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && filteredSkills.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {filteredSkills.map((skill) => (
                    <button key={skill} onClick={() => { addSkill(skill); setSkillInput(""); setShowSuggestions(false); }} className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm">
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {activeTab === "certifications" && (
          <div className="space-y-4 max-w-2xl">
            {(resumeData.certifications || []).map((cert) => (
              <Card key={cert.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={cert.visible ?? true} onChange={(e) => updateCertification(cert.id, "visible", e.target.checked)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>{cert.name || "New Certification"}</span>
                    </div>
                  }
                  action={<Button onClick={() => deleteCertification(cert.id)} variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:bg-red-50">Delete</Button>}
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Certification Name" value={cert.name} onChange={(val) => updateCertification(cert.id, "name", val)} />
                    <Input label="Issuer" value={cert.issuer} onChange={(val) => updateCertification(cert.id, "issuer", val)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input label="Date" type="month" value={cert.date} onChange={(val) => updateCertification(cert.id, "date", val)} />
                    <Input label="Credential ID (optional)" value={cert.credentialId || ""} onChange={(val) => updateCertification(cert.id, "credentialId", val)} />
                  </div>
                  <Input label="Link (optional)" value={cert.link || ""} onChange={(val) => updateCertification(cert.id, "link", val)} />
                </div>
              </Card>
            ))}
            <Button onClick={addCertification} variant="outline" size="md" icon={Plus} className="w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50">
              Add Certification
            </Button>
          </div>
        )}

        {/* Languages */}
        {activeTab === "languages" && (
          <div className="space-y-4 max-w-2xl">
            {(resumeData.languages || []).map((lang) => (
              <Card key={lang.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={lang.visible ?? true} onChange={(e) => updateLanguage(lang.id, "visible", e.target.checked)} className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>{lang.name || "New Language"}</span>
                    </div>
                  }
                  action={<Button onClick={() => deleteLanguage(lang.id)} variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:bg-red-50">Delete</Button>}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Language" value={lang.name} onChange={(val) => updateLanguage(lang.id, "name", val)} />
                  <div className="relative">
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                      className="peer w-full bg-white border border-gray-300 rounded-lg px-3 pt-5 pb-1.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition appearance-none"
                    >
                      <option value="">Select level</option>
                      <option>Native</option>
                      <option>Fluent</option>
                      <option>Advanced</option>
                      <option>Intermediate</option>
                      <option>Beginner</option>
                    </select>
                    <label className="absolute left-3 top-1.5 text-[10px] text-gray-600">Proficiency</label>
                  </div>
                </div>
              </Card>
            ))}
            <Button onClick={addLanguage} variant="outline" size="md" icon={Plus} className="w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50">
              Add Language
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BuilderForm;
