"use client";

import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { TemplateType } from "@/lib/types";
import { useProfile } from "./hooks";
import React from "react";

const templates: { id: TemplateType; title: string; description: string }[] = [
  { id: "classic", title: "Classic", description: "Traditional professional layout" },
  { id: "modern", title: "Modern", description: "Clean, contemporary design" },
  { id: "compact", title: "Compact", description: "Space-efficient, information-dense" },
  { id: "creative", title: "Creative", description: "Visually striking with color accents" },
  { id: "academic", title: "Academic", description: "Formal, research-focused layout" },
  { id: "balanced", title: "Balanced", description: "Evenly distributed two-column" },
];

export default function ResumePage() {
  const { resumeData, currentTemplate, setCurrentTemplate, zoom } = useProfile();

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
    <div className="flex h-full min-h-0">
      {/* Center - only this scrolls */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="mx-auto pb-32 lg:pb-10" style={{ width: `${794 * zoom / 100}px` }}>
          <div id="resume-preview" className="bg-white shadow-2xl" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: '794px' }}>
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Right Sidebar - fixed, no scroll */}
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

      {/* Mobile Template Selector - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="p-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setCurrentTemplate(template.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTemplate === template.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
