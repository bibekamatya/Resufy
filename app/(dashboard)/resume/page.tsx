"use client";

import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { TemplateType } from "@/lib/types";
import { useProfile } from "./hooks";
import React, { useRef, useState, useEffect } from "react";

const templates: { id: TemplateType; title: string; description: string }[] = [
  { id: "classic", title: "Classic", description: "Traditional professional layout" },
  { id: "modern", title: "Modern", description: "Clean, contemporary design" },
  { id: "compact", title: "Compact", description: "Space-efficient, information-dense" },
  { id: "creative", title: "Creative", description: "Visually striking with color accents" },
  { id: "academic", title: "Academic", description: "Formal, research-focused layout" },
  { id: "balanced", title: "Balanced", description: "Evenly distributed two-column" },
];

const RESUME_WIDTH = 794;

export default function ResumePage() {
  const { resumeData, currentTemplate, setCurrentTemplate, zoom } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (containerRef.current && window.innerWidth < 1024) {
        const available = containerRef.current.clientWidth - 32; // 16px padding each side
        setMobileScale(available / RESUME_WIDTH);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const renderTemplate = () => {
    const templateComponents: Record<string, React.ReactElement> = {
      classic: <ClassicTemplate data={resumeData} />,
      modern: <ModernTemplate data={resumeData} />,
      balanced: <BalancedTemplate data={resumeData} />,
      creative: <CreativeTemplate data={resumeData} />,
      compact: <CompactTemplate data={resumeData} />,
      academic: <AcademicTemplate data={resumeData} />,
    };
    return templateComponents[currentTemplate] || templateComponents.classic;
  };

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      {/* Mobile Template Selector */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-3 py-2 bg-white border-b border-gray-200 shrink-0 scrollbar-hide">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setCurrentTemplate(template.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentTemplate === template.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {template.title}
          </button>
        ))}
      </div>

      {/* Preview area */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4 pb-32 lg:p-6 lg:pb-10" style={{ WebkitOverflowScrolling: "touch" }}>
        {/* Mobile: scale to fit width, no x-scroll */}
        <div className="lg:hidden" style={{ height: `${RESUME_WIDTH * 1.414 * mobileScale}px` }}>
          <div
            id="resume-preview"
            className="bg-white shadow-xl origin-top-left"
            style={{ width: RESUME_WIDTH, transform: `scale(${mobileScale}) translateZ(0)`, willChange: "transform" }}
          >
            {renderTemplate()}
          </div>
        </div>

        {/* Desktop: respect zoom control */}
        <div className="hidden lg:block">
          <div className="mx-auto pb-10" style={{ width: `${RESUME_WIDTH * zoom / 100}px` }}>
            <div
              id="resume-preview"
              className="bg-white shadow-2xl origin-top-left"
              style={{ width: RESUME_WIDTH, transform: `scale(${zoom / 100})` }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop template sidebar */}
      <aside className="hidden lg:flex flex-col w-52 shrink-0 border-l border-gray-200 bg-gray-50 p-3">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Templates</h3>
        <div className="flex flex-col gap-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setCurrentTemplate(template.id)}
              className={`w-full px-3 py-2.5 rounded-lg text-left transition-all ${
                currentTemplate === template.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-sm"
              }`}
            >
              <p className={`text-sm font-semibold ${currentTemplate === template.id ? "text-white" : "text-gray-900"}`}>
                {template.title}
              </p>
              <p className={`text-xs mt-0.5 ${currentTemplate === template.id ? "text-blue-100" : "text-gray-500"}`}>
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
