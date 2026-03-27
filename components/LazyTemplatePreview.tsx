"use client";

import { useEffect, useRef, useState } from "react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { sampleResumeData } from "@/lib/data";

const COMPONENTS = {
  ClassicTemplate,
  ModernTemplate,
  CreativeTemplate,
  CompactTemplate,
  AcademicTemplate,
  BalancedTemplate,
} as const;

type TemplateName = keyof typeof COMPONENTS;

interface LazyTemplatePreviewProps {
  templateName: TemplateName;
}

export function LazyTemplatePreview({ templateName }: LazyTemplatePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Template = COMPONENTS[templateName];

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" style={{ transform: "scale(0.245)", transformOrigin: "top left", width: "408%", height: "408%" }}>
      {visible ? <Template data={sampleResumeData} /> : null}
    </div>
  );
}
