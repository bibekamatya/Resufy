/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Textarea } from "../ui/Input";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";
import { ImageUpload } from "../ui/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import { commonSkills } from "@/lib/data/commonSkills";
import {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  Project,
  Certification,
  Language,
} from "@/lib/types";

interface BuilderFormProps {
  resumeData: ResumeData;
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
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

const BuilderForm = ({
  resumeData,
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
}: BuilderFormProps) => {
  const [openSection, setOpenSection] = useState<string>("personal");
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSkills = commonSkills.filter(
    (skill) =>
      skillInput &&
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !resumeData.skills.includes(skill)
  ).slice(0, 5);

  const isPersonalInfoComplete = Boolean(
    resumeData?.personalInfo?.fullName &&
    resumeData?.personalInfo?.email &&
    resumeData?.personalInfo?.phone,
  );

  const isExperienceComplete = (resumeData?.experience?.length || 0) > 0;
  const isEducationComplete = (resumeData?.education?.length || 0) > 0;
  const isProjectsComplete = (resumeData?.projects?.length || 0) > 0;
  const isSkillsComplete = (resumeData?.skills?.length || 0) > 0;
  const isCertificationsComplete = (resumeData?.certifications?.length || 0) > 0;
  const isLanguagesComplete = (resumeData?.languages?.length || 0) > 0;

  if (!resumeData) return null;

  return (
    <div className="overflow-y-auto h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 space-y-4">
        {/* Personal Information */}
        <Accordion
          title="Personal Information"
          isOpen={openSection === "personal"}
          onToggle={() =>
            setOpenSection(openSection === "personal" ? "" : "personal")
          }
          isCompleted={isPersonalInfoComplete}
        >
          <div className="space-y-3">
            <ImageUpload
              value={resumeData.personalInfo.photoUrl}
              onChange={(url) => updatePersonalInfo("photoUrl", url)}
            />
            <Input
              label="Full Name"
              value={resumeData.personalInfo.fullName}
              onChange={(val) => updatePersonalInfo("fullName", val)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(val) => updatePersonalInfo("email", val)}
              />
              <Input
                label="Phone"
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(val) => updatePersonalInfo("phone", val)}
              />
            </div>
            <Input
              label="Location"
              value={resumeData.personalInfo.location}
              onChange={(val) => updatePersonalInfo("location", val)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="LinkedIn"
                value={resumeData.personalInfo.linkedin || ""}
                onChange={(val) => updatePersonalInfo("linkedin", val)}
              />
              <Input
                label="Website"
                value={resumeData.personalInfo.website || ""}
                onChange={(val) => updatePersonalInfo("website", val)}
              />
            </div>
            <Textarea
              label="Professional Summary"
              rows={4}
              value={resumeData.personalInfo.summary}
              onChange={(val) => updatePersonalInfo("summary", val)}
            />
          </div>
        </Accordion>

        {/* Experience */}
        <Accordion
          title="Experience"
          isOpen={openSection === "experience"}
          onToggle={() =>
            setOpenSection(openSection === "experience" ? "" : "experience")
          }
          isCompleted={isExperienceComplete}
        >
          <div className="space-y-4">
            {resumeData.experience.map((exp) => (
              <Card key={exp.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.visible ?? true}
                        onChange={(e) => updateExperience(exp.id, 'visible', e.target.checked)}
                        className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                        title="Include in resume"
                      />
                      <span>Experience Entry</span>
                    </div>
                  }
                  action={
                    <Button
                      onClick={() => deleteExperience(exp.id)}
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  }
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Position"
                      value={exp.position}
                      onChange={(val) =>
                        updateExperience(exp.id, "position", val)
                      }
                    />
                    <Input
                      label="Company"
                      value={exp.company}
                      onChange={(val) => updateExperience(exp.id, "company", val)}
                    />
                  </div>
                  <Input
                    label="Location"
                    value={exp.location}
                    onChange={(val) => updateExperience(exp.id, "location", val)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Start Date"
                      type="month"
                      value={exp.startDate}
                      onChange={(val) =>
                        updateExperience(exp.id, "startDate", val)
                      }
                    />
                    <Input
                      label="End Date"
                      type="month"
                      value={exp.endDate}
                      onChange={(val) => updateExperience(exp.id, "endDate", val)}
                      disabled={exp.current}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, "current", e.target.checked)
                      }
                      className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Currently working here
                  </label>
                  <Textarea
                    label="Responsibilities (one per line)"
                    rows={4}
                    value={exp.description.join("\n")}
                    onChange={(val) =>
                      updateExperience(exp.id, "description", val.split("\n"))
                    }
                  />
                </div>
              </Card>
            ))}
          </div>
          <Button
            onClick={addExperience}
            variant="outline"
            size="md"
            icon={Plus}
            className="mb-4 w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
          >
            Add Experience
          </Button>
        </Accordion>

        {/* Education */}
        <Accordion
          title="Education"
          isOpen={openSection === "education"}
          onToggle={() =>
            setOpenSection(openSection === "education" ? "" : "education")
          }
          isCompleted={isEducationComplete}
        >
          <div className="space-y-4">
            {resumeData.education.map((edu) => (
              <Card key={edu.id} hover>
                <CardHeader
                  title="Education Entry"
                  action={
                    <Button
                      onClick={() => deleteEducation(edu.id)}
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  }
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Degree"
                      value={edu.degree}
                      onChange={(val) => updateEducation(edu.id, "degree", val)}
                    />
                    <Input
                      label="Field of Study"
                      value={edu.field}
                      onChange={(val) => updateEducation(edu.id, "field", val)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Institution"
                      value={edu.institution}
                      onChange={(val) =>
                        updateEducation(edu.id, "institution", val)
                      }
                    />
                    <Input
                      label="Location"
                      value={edu.location}
                      onChange={(val) => updateEducation(edu.id, "location", val)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      label="Start Date"
                      type="month"
                      value={edu.startDate}
                      onChange={(val) =>
                        updateEducation(edu.id, "startDate", val)
                      }
                    />
                    <Input
                      label="End Date"
                      type="month"
                      value={edu.endDate}
                      onChange={(val) => updateEducation(edu.id, "endDate", val)}
                    />
                    <Input
                      label="GPA (optional)"
                      value={edu.gpa || ""}
                      onChange={(val) => updateEducation(edu.id, "gpa", val)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button
            onClick={addEducation}
            variant="outline"
            size="md"
            icon={Plus}
            className="mb-4 w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
          >
            Add Education
          </Button>
        </Accordion>

        {/* Projects */}
        <Accordion
          title="Projects"
          isOpen={openSection === "projects"}
          onToggle={() =>
            setOpenSection(openSection === "projects" ? "" : "projects")
          }
          isCompleted={isProjectsComplete}
        >
          <div className="space-y-4">
            {resumeData.projects.map((proj) => (
              <Card key={proj.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={proj.visible ?? true}
                        onChange={(e) => updateProject(proj.id, 'visible', e.target.checked)}
                        className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                        title="Include in resume"
                      />
                      <span>Project Entry</span>
                    </div>
                  }
                  action={
                    <Button
                      onClick={() => deleteProject(proj.id)}
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  }
                />
                <div className="space-y-3">
                  <Input
                    label="Project Name"
                    value={proj.name}
                    onChange={(val) => updateProject(proj.id, "name", val)}
                  />
                  <Textarea
                    label="Description"
                    rows={3}
                    value={proj.description}
                    onChange={(val) => updateProject(proj.id, "description", val)}
                  />
                  <Input
                    label="Technologies (comma separated)"
                    value={proj.technologies.join(", ")}
                    onChange={(val) =>
                      updateProject(
                        proj.id,
                        "technologies",
                        val.split(",").map((t) => t.trim()),
                      )
                    }
                  />
                  <Input
                    label="Link (optional)"
                    value={proj.link || ""}
                    onChange={(val) => updateProject(proj.id, "link", val)}
                  />
                </div>
              </Card>
            ))}
          </div>
          <Button
            onClick={addProject}
            variant="outline"
            size="md"
            icon={Plus}
            className="mb-4 w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
          >
            Add Project
          </Button>
        </Accordion>

        {/* Skills */}
        <Accordion
          title="Skills"
          isOpen={openSection === "skills"}
          onToggle={() =>
            setOpenSection(openSection === "skills" ? "" : "skills")
          }
          isCompleted={isSkillsComplete}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => {
                const isVisible = resumeData.skillsVisibility?.[skill] ?? true;
                return (
                  <span
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition ${
                      isVisible
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => toggleSkillVisibility(skill)}
                      className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                      title="Include in resume"
                    />
                    {skill}
                    <button
                      onClick={() => deleteSkill(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <div className="relative">
              <Input
                label="Add Skill"
                placeholder="Type to search or press Enter to add"
                value={skillInput}
                onChange={(val) => {
                  setSkillInput(val);
                  setShowSuggestions(true);
                }}
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
                    <button
                      key={skill}
                      onClick={() => {
                        addSkill(skill);
                        setSkillInput("");
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Accordion>

        {/* Certifications */}
        <Accordion
          title="Certifications"
          isOpen={openSection === "certifications"}
          onToggle={() =>
            setOpenSection(openSection === "certifications" ? "" : "certifications")
          }
          isCompleted={isCertificationsComplete}
        >
          <div className="space-y-4">
            {(resumeData.certifications || []).map((cert) => (
              <Card key={cert.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={cert.visible ?? true}
                        onChange={(e) => updateCertification(cert.id, 'visible', e.target.checked)}
                        className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                        title="Include in resume"
                      />
                      <span>Certification Entry</span>
                    </div>
                  }
                  action={
                    <Button
                      onClick={() => deleteCertification(cert.id)}
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  }
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Certification Name"
                      value={cert.name}
                      onChange={(val) => updateCertification(cert.id, "name", val)}
                    />
                    <Input
                      label="Issuer"
                      value={cert.issuer}
                      onChange={(val) => updateCertification(cert.id, "issuer", val)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Date"
                      type="month"
                      value={cert.date}
                      onChange={(val) => updateCertification(cert.id, "date", val)}
                    />
                    <Input
                      label="Credential ID (optional)"
                      value={cert.credentialId || ""}
                      onChange={(val) => updateCertification(cert.id, "credentialId", val)}
                    />
                  </div>
                  <Input
                    label="Link (optional)"
                    value={cert.link || ""}
                    onChange={(val) => updateCertification(cert.id, "link", val)}
                  />
                </div>
              </Card>
            ))}
          </div>
          <Button
            onClick={addCertification}
            variant="outline"
            size="md"
            icon={Plus}
            className="mb-4 w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
          >
            Add Certification
          </Button>
        </Accordion>

        {/* Languages */}
        <Accordion
          title="Languages"
          isOpen={openSection === "languages"}
          onToggle={() =>
            setOpenSection(openSection === "languages" ? "" : "languages")
          }
          isCompleted={isLanguagesComplete}
        >
          <div className="space-y-4">
            {(resumeData.languages || []).map((lang) => (
              <Card key={lang.id} hover>
                <CardHeader
                  title={
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={lang.visible ?? true}
                        onChange={(e) => updateLanguage(lang.id, 'visible', e.target.checked)}
                        className="rounded bg-white border-gray-300 text-blue-600 focus:ring-blue-500"
                        title="Include in resume"
                      />
                      <span>Language Entry</span>
                    </div>
                  }
                  action={
                    <Button
                      onClick={() => deleteLanguage(lang.id)}
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  }
                />
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Language"
                      value={lang.name}
                      onChange={(val) => updateLanguage(lang.id, "name", val)}
                    />
                    <Input
                      label="Proficiency"
                      placeholder="e.g., Native, Fluent, Intermediate"
                      value={lang.proficiency}
                      onChange={(val) => updateLanguage(lang.id, "proficiency", val)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Button
            onClick={addLanguage}
            variant="outline"
            size="md"
            icon={Plus}
            className="mb-4 w-full border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
          >
            Add Language
          </Button>
        </Accordion>
      </div>
    </div>
  );
};

export default BuilderForm;
