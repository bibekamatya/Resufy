import { getSharedResume } from "@/lib/actions/resume";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ResumeData, TemplateType } from "@/lib/types";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";

const BASE_URL = "https://resufy.vercel.app";

const templateComponents: Record<TemplateType, React.ComponentType<{ data: ResumeData }>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  creative: CreativeTemplate,
  academic: AcademicTemplate,
  balanced: BalancedTemplate,
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const result = await getSharedResume(id);
  if (!result.success) return { title: "Resume Not Found" };

  const name = result.resume.data?.personalInfo?.fullName || "Resume";
  return {
    title: `${name}'s Resume`,
    description: `View ${name}'s professional resume built with Resufy.`,
    alternates: { canonical: `${BASE_URL}/share/${id}` },
    openGraph: {
      title: `${name}'s Resume | Resufy`,
      description: `View ${name}'s professional resume built with Resufy.`,
      url: `${BASE_URL}/share/${id}`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getSharedResume(id);

  if (!result.success || !result.resume) notFound();

  const resumeData: ResumeData = result.resume.data;
  const template: TemplateType = result.resume.template || "classic";
  const TemplateComponent = templateComponents[template] || ClassicTemplate;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="mx-auto max-w-[794px]">
        <div className="bg-white shadow-2xl">
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
