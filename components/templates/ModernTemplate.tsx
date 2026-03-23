import { ResumeData } from "@/lib/types";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, skillsVisibility, certifications, languages } = data;

  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => skillsVisibility?.[skill] ?? true);
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);

  return (
    <div className="bg-white text-gray-900 w-full h-full p-8 print:p-4">
      {/* Header with two-column layout */}
      <div className="flex justify-between items-start mb-8 print:mb-4">
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl print:mb-1">
              {personalInfo.fullName}
            </h1>
            {personalInfo.email && (
              <div className="text-gray-700">{personalInfo.email}</div>
            )}
            {personalInfo.phone && (
              <div className="text-gray-700">{personalInfo.phone}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          {personalInfo.location && (
            <div className="text-gray-700">{personalInfo.location}</div>
          )}
          {personalInfo.linkedin && (
            <div className="text-blue-600">{personalInfo.linkedin}</div>
          )}
          {personalInfo.website && (
            <div className="text-blue-600">{personalInfo.website}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 print:gap-4">
        {/* Left Column (2/3 width) */}
        <div className="col-span-2 space-y-6 print:space-y-3">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                SUMMARY
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {visibleExperience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {visibleExperience.map((exp) => (
                  <div key={exp.id} className="pb-4 border-b border-gray-100">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span className="font-medium">{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {visibleProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {visibleProjects.map((proj) => (
                  <div key={proj.id} className="pb-3 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">{proj.name}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {proj.description}
                    </p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6 print:space-y-3">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {visibleSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {visibleCertifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {visibleCertifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-sm text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer}{cert.date && ` • ${cert.date}`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {visibleLanguages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">LANGUAGES</h2>
              <div className="space-y-1">
                {visibleLanguages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-gray-900">{lang.name}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
