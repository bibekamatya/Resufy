import { ResumeData } from "@/lib/types";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, skillsVisibility, certifications, languages } = data;
  
  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => (skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);

  return (
    <div className="bg-white text-gray-900 w-full h-full p-8">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>|</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>|</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && personalInfo.linkedin && <span>|</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {visibleExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-4">
            {visibleExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.location}</p>
                    <p>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.location}</p>
                  <p>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {visibleProjects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-3">
            {visibleProjects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {proj.technologies.join(", ")}
                  </p>
                )}
                {proj.link && (
                  <p className="text-sm text-gray-600">{proj.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {visibleSkills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <p className="text-sm text-gray-700">{visibleSkills.join(" | ")}</p>
        </div>
      )}

      {/* Certifications */}
      {visibleCertifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-2">
            {visibleCertifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {visibleLanguages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {visibleLanguages.map((lang) => (
              <span key={lang.id}>
                <span className="font-semibold">{lang.name}:</span> {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
