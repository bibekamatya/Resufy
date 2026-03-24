import { ResumeData } from "@/lib/types";

interface CompactTemplateProps {
  data: ResumeData;
}

export const CompactTemplate = ({ data }: CompactTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, skillsVisibility, certifications, languages } = data;

  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => skillsVisibility?.[skill] ?? true);
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);
  const visibleEducation = education.filter(edu => edu.visible !== false);

  return (
    <div className="bg-white text-gray-900 w-full h-full p-6 text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center flex-wrap gap-3 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>•</span>}
          {personalInfo.linkedin && (
            <span className="text-blue-600">{personalInfo.linkedin}</span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {visibleExperience.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">EXPERIENCE</h2>
            {visibleExperience.map((exp) => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between">
                  <span className="font-bold">{exp.company}</span>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{exp.position}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.description.length > 0 && (
                  <ul className="text-gray-700 mt-1 space-y-0.5">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {visibleEducation.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            {visibleEducation.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between">
                  <span className="font-bold">{edu.institution}</span>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-gray-700">
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {visibleProjects.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">PROJECTS</h2>
            {visibleProjects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <div className="font-bold">{proj.name}</div>
                <p className="text-gray-700 mt-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-gray-600 text-xs mt-1">
                    Tech: {proj.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {visibleSkills.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">SKILLS</h2>
            <div className="grid grid-cols-2 gap-2">
              {visibleSkills.map((skill, idx) => (
                <div key={idx} className="text-gray-700">• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {visibleCertifications.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">CERTIFICATIONS</h2>
            {visibleCertifications.map((cert) => (
              <div key={cert.id} className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold">{cert.name}</span>
                  <span className="text-gray-600"> — {cert.issuer}</span>
                </div>
                {cert.date && <span className="text-gray-500 text-xs">{cert.date}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {visibleLanguages.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">LANGUAGES</h2>
            <div className="flex flex-wrap gap-3">
              {visibleLanguages.map((lang) => (
                <span key={lang.id} className="text-gray-700">{lang.name} <span className="text-gray-500">({lang.proficiency})</span></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
