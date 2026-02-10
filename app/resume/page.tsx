"use client";

import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { AppHeader } from "@/components/ui/AppHeader";
import Image from "next/image";
import { sampleResumeData } from "@/lib/data";
import { ResumeData, TemplateType } from "@/lib/types";
import { useState, useEffect } from "react";

const templates: {
  id: TemplateType;
  title: string;
  thumbnail: string;
  description: string;
}[] = [
  {
    id: "classic",
    title: "Classic",
    thumbnail:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=566&fit=crop",
    description: "Traditional professional layout",
  },
  {
    id: "modern",
    title: "Modern",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=566&fit=crop",
    description: "Clean, contemporary design",
  },
  {
    id: "compact",
    title: "Compact",
    thumbnail:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=566&fit=crop",
    description: "Space-efficient, information-dense",
  },
  {
    id: "creative",
    title: "Creative",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=566&fit=crop",
    description: "Visually striking with color accents",
  },
  {
    id: "academic",
    title: "Academic",
    thumbnail:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=566&fit=crop",
    description: "Formal, research-focused layout",
  },
  {
    id: "balanced",
    title: "Balanced",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=566&fit=crop",
    description: "Evenly distributed two-column",
  },
];

export default function Page() {
  const [currentTemplate, setCurrentTemplate] =
    useState<TemplateType>("classic");
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Initialize state with localStorage data or sample data
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("resumeData");
        return saved ? JSON.parse(saved) : sampleResumeData;
      } catch (error) {
        console.error("Failed to parse saved resume data:", error);
        return sampleResumeData;
      }
    }
    return sampleResumeData;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const renderTemplate = () => {
    const templateComponents = {
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
    <div className="h-screen w-full overflow-hidden">
      {/* Header */}
      <AppHeader actionLabel="Back to Builder" actionHref="/builder" />

      {/* Main Content */}
      <div className="mx-auto flex h-[calc(100vh-73px)] max-w-7xl">
        {/* Resume Preview Pane */}
        <div className="flex-1 overflow-y-auto p-6">
          <div
            className="mx-auto"
            style={{ width: "794px", minHeight: "1123px" }}
          >
            <div className="bg-white shadow-2xl">{renderTemplate()}</div>
          </div>
        </div>

        {/* Templates Sidebar */}
        <aside className="w-64 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Choose a Template
          </h3>

          <div className="flex flex-col gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setCurrentTemplate(template.id)}
                className={`group w-full rounded-lg p-3 text-left transition-all duration-200 ${
                  currentTemplate === template.id
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div className="mb-2">
                  <p
                    className={`text-sm font-medium ${
                      currentTemplate === template.id
                        ? "text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    {template.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {template.description}
                  </p>
                </div>

                <div className="relative aspect-[0.707] w-full overflow-hidden rounded border border-gray-200 bg-gray-100">
                  <Image
                    src={template.thumbnail}
                    alt={`${template.title} template preview`}
                    fill
                    sizes="(max-width: 256px) 100vw, 256px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={template.id === "classic"}
                  />
                  {currentTemplate === template.id && (
                    <div className="absolute inset-0 ring-2 ring-blue-500 ring-inset" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
