import { ResumeData } from "@/lib/types";

interface AcademicTemplateProps {
  data: ResumeData;
}

export const AcademicTemplate = ({ data }: AcademicTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, skillsVisibility, certifications, languages } = data;
  
  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => (skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);

  return (
    <div className="bg-white text-gray-900 w-full h-full p-10">
      {/* Header */}
      <div className="text-center mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {personalInfo.email && (
            <span className="font-medium">{personalInfo.email}</span>
          )}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="mt-2">
            {personalInfo.linkedin && (
              <span className="text-blue-600">{personalInfo.linkedin}</span>
            )}
            {personalInfo.linkedin && personalInfo.website && <span> • </span>}
            {personalInfo.website && (
              <span className="text-blue-600">{personalInfo.website}</span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Education (Highlighted for Academic CV) */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-600">
                        {edu.field} {edu.gpa && `• GPA: ${edu.gpa}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{edu.location}</p>
                      <p className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {visibleExperience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {visibleExperience.map((exp) => (
                <div key={exp.id} className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="mt-2 text-gray-700 space-y-1">
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
          </div>
        )}

        {/* Projects & Skills Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Projects */}
          {visibleProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">PROJECTS</h2>
              <div className="space-y-3">
                {visibleProjects.map((proj) => (
                  <div key={proj.id} className="pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{proj.name}</h3>
                    <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Technologies:</span> {proj.technologies.join(", ")}
                      </p>
                    )}
                    {proj.link && <p className="text-xs text-blue-600 mt-1">{proj.link}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {visibleSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">TECHNICAL SKILLS</h2>
              <div className="space-y-2">
                {visibleSkills.map((skill, idx) => (
                  <div key={idx} className="text-gray-700">• {skill}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {visibleCertifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">CERTIFICATIONS</h2>
            <div className="space-y-3">
              {visibleCertifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                    {cert.credentialId && <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>}
                  </div>
                  {cert.date && <span className="text-sm text-gray-600">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {visibleLanguages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">LANGUAGES</h2>
            <div className="flex flex-wrap gap-4">
              {visibleLanguages.map((lang) => (
                <span key={lang.id} className="text-gray-700">
                  <span className="font-semibold">{lang.name}:</span> {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
