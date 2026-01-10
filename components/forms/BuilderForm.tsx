import React, { useState } from "react";
import { Input, Textarea } from "../ui/Input";
import { Accordion } from "../ui/Accordion";
import { ResumeData, PersonalInfo, Experience, Education, Project } from "@/lib/types";

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
}: BuilderFormProps) => {
  const [openSection, setOpenSection] = useState<string>("personal");

  // Check if sections are completed
  const isPersonalInfoComplete = 
    resumeData.personalInfo.fullName && 
    resumeData.personalInfo.email && 
    resumeData.personalInfo.phone;
  
  const isExperienceComplete = resumeData.experience.length > 0;
  const isEducationComplete = resumeData.education.length > 0;
  const isProjectsComplete = resumeData.projects.length > 0;
  const isSkillsComplete = resumeData.skills.length > 0;

  return (
    <div className="overflow-y-auto h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="p-6 space-y-4">
        {/* Personal Information */}
        <Accordion 
          title="Personal Information" 
          isOpen={openSection === "personal"}
          onToggle={() => setOpenSection(openSection === "personal" ? "" : "personal")}
          isCompleted={isPersonalInfoComplete}
        >
          <div className="space-y-3">
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
          onToggle={() => setOpenSection(openSection === "experience" ? "" : "experience")}
          isCompleted={isExperienceComplete}
        >
          <button
            onClick={addExperience}
            className="mb-4 w-full py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition"
          >
            + Add Experience
          </button>
          <div className="space-y-4">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg space-y-3 border border-slate-700 hover:border-slate-600 transition">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-blue-400">Experience Entry</h3>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-950 transition"
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Position"
                  value={exp.position}
                  onChange={(val) => updateExperience(exp.id, "position", val)}
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
                  onChange={(val) => updateExperience(exp.id, "startDate", val)}
                />
                <Input
                  label="End Date"
                  type="month"
                  value={exp.endDate}
                  onChange={(val) => updateExperience(exp.id, "endDate", val)}
                  disabled={exp.current}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500"
                />
                Currently working here
              </label>
              <Textarea
                label="Responsibilities (one per line)"
                rows={4}
                value={exp.description.join("\n")}
                onChange={(val) => updateExperience(exp.id, "description", val.split("\n"))}
              />
            </div>
          ))}
          </div>
        </Accordion>

        {/* Education */}
        <Accordion 
          title="Education" 
          isOpen={openSection === "education"}
          onToggle={() => setOpenSection(openSection === "education" ? "" : "education")}
          isCompleted={isEducationComplete}
        >
          <button
            onClick={addEducation}
            className="mb-4 w-full py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition"
          >
            + Add Education
          </button>
          <div className="space-y-4">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg space-y-3 border border-slate-700 hover:border-slate-600 transition">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-blue-400">Education Entry</h3>
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-950 transition"
                >
                  Delete
                </button>
              </div>
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
                  onChange={(val) => updateEducation(edu.id, "institution", val)}
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
                  onChange={(val) => updateEducation(edu.id, "startDate", val)}
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
          ))}
          </div>
        </Accordion>

        {/* Projects */}
        <Accordion 
          title="Projects" 
          isOpen={openSection === "projects"}
          onToggle={() => setOpenSection(openSection === "projects" ? "" : "projects")}
          isCompleted={isProjectsComplete}
        >
          <button
            onClick={addProject}
            className="mb-4 w-full py-2 text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition"
          >
            + Add Project
          </button>
          <div className="space-y-4">
          {resumeData.projects.map((proj) => (
            <div key={proj.id} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg space-y-3 border border-slate-700 hover:border-slate-600 transition">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-blue-400">Project Entry</h3>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-950 transition"
                >
                  Delete
                </button>
              </div>
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
                onChange={(val) => updateProject(proj.id, "technologies", val.split(",").map(t => t.trim()))}
              />
              <Input
                label="Link (optional)"
                value={proj.link || ""}
                onChange={(val) => updateProject(proj.id, "link", val)}
              />
            </div>
          ))}
          </div>
        </Accordion>

        {/* Skills */}
        <Accordion 
          title="Skills" 
          isOpen={openSection === "skills"}
          onToggle={() => setOpenSection(openSection === "skills" ? "" : "skills")}
          isCompleted={isSkillsComplete}
        >
          <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-slate-700 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-slate-600 transition"
              >
                {skill}
                <button
                  onClick={() => deleteSkill(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <Input
            label="Add Skill"
            placeholder="Press Enter to add"
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                addSkill(e.target.value);
                e.target.value = "";
              }
            }}
          />
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default BuilderForm;
