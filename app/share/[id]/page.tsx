"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { ResumeData, TemplateType } from "@/lib/types";
import { getSharedResume } from "@/lib/actions/resume";

const templateComponents: Record<TemplateType, React.ComponentType<{ data: ResumeData }>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  creative: CreativeTemplate,
  academic: AcademicTemplate,
  balanced: BalancedTemplate,
};

export default function SharePage() {
  const params = useParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState<TemplateType>("classic");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const result = await getSharedResume(params.id as string);
        if (result.success) {
          setResumeData(result.resume.data);
          setTemplate((result.resume.template as TemplateType) || "classic");
        } else {
          setError(result.error || 'Resume not found');
        }
      } catch (err) {
        setError('Failed to load resume');
      }
    };

    if (params.id) loadResume();
  }, [params.id]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!resumeData) return null;

  const TemplateComponent = templateComponents[template] || ClassicTemplate;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl" style={{ width: "794px" }}>
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
