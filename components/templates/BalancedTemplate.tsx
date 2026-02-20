import { ResumeData } from "@/lib/types";

interface BalancedTemplateProps {
  data: ResumeData;
}

export const BalancedTemplate = ({ data }: BalancedTemplateProps) => {
  const { personalInfo, experience, education, projects, skills } = data;

  return (
    <div className="bg-white text-gray-900 w-full h-full p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          {personalInfo.photoUrl && (personalInfo.showPhoto ?? true) && (
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap gap-3 text-gray-600 mb-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>•</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>•</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
            {(personalInfo.linkedin || personalInfo.website) && (
              <div className="flex flex-wrap gap-3 text-blue-600">
                {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                {personalInfo.linkedin && personalInfo.website && <span>•</span>}
                {personalInfo.website && <span>{personalInfo.website}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b">
                SUMMARY
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b">
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-gray-600">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-xs text-gray-700 space-y-1">
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
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-gray-700 mt-1">
                      {proj.description}
                    </p>
                    {proj.technologies.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Tech:</span>{" "}
                        {proj.technologies.join(", ")}
                      </p>
                    )}
                    {proj.link && (
                      <p className="text-xs text-blue-600 mt-1">{proj.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b">
                SKILLS
              </h2>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
