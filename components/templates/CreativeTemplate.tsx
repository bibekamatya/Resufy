import { ResumeData } from "@/lib/types";

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, experience, education, projects, skills } = data;

  return (
    <div className="bg-linear-to-br from-gray-50 to-white text-gray-900 w-full h-full p-6">
      {/* Two-column layout with colored sidebar */}
      <div className="flex mb-6">
        {/* Left Colored Sidebar */}
        <div className="w-1/4 bg-linear-to-b from-blue-600 to-blue-700 text-white p-5 rounded-l-xl">
          {personalInfo.photoUrl && (personalInfo.showPhoto ?? true) && (
            <div className="relative h-24 w-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white">
              <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-2">{personalInfo.fullName}</h1>
            {personalInfo.email && (
              <p className="text-sm text-blue-100">{personalInfo.email}</p>
            )}
          </div>

          <div className="space-y-4">
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
                <p className="text-sm">{personalInfo.linkedin}</p>
              </div>
            )}
            {personalInfo.website && (
              <div>
                <p className="text-xs font-semibold mb-1">WEBSITE</p>
                <p className="text-sm">{personalInfo.website}</p>
              </div>
            )}
          </div>

          {/* Skills in sidebar */}
          {skills.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold mb-3">SKILLS</p>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 bg-white p-5 rounded-r-xl">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-1 bg-blue-600 mr-3"></div>
                <h2 className="text-lg font-bold text-gray-900">PROFILE</h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-10 h-1 bg-blue-600 mr-3"></div>
                <h2 className="text-lg font-bold text-gray-900">EXPERIENCE</h2>
              </div>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-blue-600">
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
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education & Projects Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-1 bg-blue-600 mr-3"></div>
                  <h2 className="text-lg font-bold text-gray-900">EDUCATION</h2>
                </div>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-700">{edu.institution}</p>
                      <p className="text-xs text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-1 bg-blue-600 mr-3"></div>
                  <h2 className="text-lg font-bold text-gray-900">PROJECTS</h2>
                </div>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-gray-700">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
