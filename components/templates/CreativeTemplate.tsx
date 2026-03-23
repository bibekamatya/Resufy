import { ResumeData } from "@/lib/types";

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, skillsVisibility, certifications, languages } = data;

  const visibleExperience = experience.filter(exp => exp.visible !== false);
  const visibleProjects = projects.filter(proj => proj.visible !== false);
  const visibleSkills = skills.filter(skill => (skillsVisibility?.[skill] ?? true));
  const visibleCertifications = (certifications || []).filter(cert => cert.visible !== false);
  const visibleLanguages = (languages || []).filter(lang => lang.visible !== false);

  return (
    <div className="bg-white text-gray-900 w-full flex" style={{ background: "linear-gradient(to right, #1d4ed8 25%, white 25%)" }}>
      {/* Left Colored Sidebar */}
      <div className="w-1/4 text-white p-5 flex-shrink-0">
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-2">{personalInfo.fullName}</h1>
          {personalInfo.email && (
            <p className="text-xs text-blue-100 break-all">{personalInfo.email}</p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {personalInfo.phone && (
            <div>
              <p className="text-xs font-semibold mb-1">PHONE</p>
              <p className="text-sm">{personalInfo.phone}</p>
            </div>
          )}
          {personalInfo.location && (
            <div>
              <p className="text-xs font-semibold mb-1">LOCATION</p>
              <p className="text-sm">{personalInfo.location}</p>
            </div>
          )}
          {personalInfo.linkedin && (
            <div>
              <p className="text-xs font-semibold mb-1">LINKEDIN</p>
              <p className="text-sm break-all">{personalInfo.linkedin}</p>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <p className="text-xs font-semibold mb-1">WEBSITE</p>
              <p className="text-sm break-all">{personalInfo.website}</p>
            </div>
          )}
        </div>

        {visibleSkills.length > 0 && (
          <div>
            <p className="text-xs font-semibold mb-3">SKILLS</p>
            <div className="space-y-1.5">
              {visibleSkills.map((skill, idx) => (
                <div key={idx} className="text-sm">• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {visibleCertifications.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold mb-3">CERTIFICATIONS</p>
            <div className="space-y-2">
              {visibleCertifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-blue-200">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleLanguages.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold mb-3">LANGUAGES</p>
            <div className="space-y-1.5">
              {visibleLanguages.map((lang) => (
                <div key={lang.id} className="text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-blue-200"> — {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-3/4 p-6">
        {personalInfo.summary && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-1 bg-blue-600 mr-3"></div>
              <h2 className="text-lg font-bold text-gray-900">PROFILE</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {visibleExperience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-1 bg-blue-600 mr-3"></div>
              <h2 className="text-lg font-bold text-gray-900">EXPERIENCE</h2>
            </div>
            <div className="space-y-4">
              {visibleExperience.map((exp) => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-blue-600">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span className="font-medium">{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className="text-sm text-gray-700 space-y-1">
                      {exp.description.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-1 bg-blue-600 mr-3"></div>
              <h2 className="text-lg font-bold text-gray-900">EDUCATION</h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}{edu.gpa && ` • GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleProjects.length > 0 && (
          <div>
            <div className="flex items-center mb-3">
              <div className="w-8 h-1 bg-blue-600 mr-3"></div>
              <h2 className="text-lg font-bold text-gray-900">PROJECTS</h2>
            </div>
            <div className="space-y-3">
              {visibleProjects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                  <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">Tech: {proj.technologies.join(", ")}</p>
                  )}
                  {proj.link && <p className="text-xs text-blue-600 mt-1">{proj.link}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
