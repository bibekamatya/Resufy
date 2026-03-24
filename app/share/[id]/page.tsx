"use client";

import { useEffect, useRef, useState } from "react";
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

const RESUME_WIDTH = 794;

export default function SharePage() {
  const params = useParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState<TemplateType>("classic");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(RESUME_WIDTH * 1.414);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const result = await getSharedResume(params.id as string);
        if (result.success) {
          setResumeData(result.resume.data);
          setTemplate((result.resume.template as TemplateType) || "classic");
        } else {
          setError(result.error || "Resume not found");
        }
      } catch {
        setError("Failed to load resume");
      }
    };
    if (params.id) loadResume();
  }, [params.id]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const available = containerRef.current.clientWidth - 32;
      setScale(Math.min(available / RESUME_WIDTH, 1)); // never scale up beyond 100%
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [resumeData]);

  useEffect(() => {
    if (!previewRef.current) return;
    const ro = new ResizeObserver(([entry]) => setPreviewHeight(entry.contentRect.height));
    ro.observe(previewRef.current);
    return () => ro.disconnect();
  }, [template, resumeData]);

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
    <div className="min-h-screen bg-gray-50 py-6 px-4" ref={containerRef}>
      <div
        className="mx-auto"
        style={{ width: RESUME_WIDTH * scale, height: previewHeight * scale + 48 }}
      >
        <div
          ref={previewRef}
          className="bg-white shadow-2xl origin-top-left"
          style={{ width: RESUME_WIDTH, transform: `scale(${scale}) translateZ(0)`, willChange: "transform" }}
        >
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
