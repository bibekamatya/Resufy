"use client";

import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { PDFClassic } from "@/components/templates/PDFClassic";
import { PDFModern } from "@/components/templates/PDFModern";
import { PDFCompact } from "@/components/templates/PDFCompact";
import { PDFCreative } from "@/components/templates/PDFCreative";
import { PDFAcademic } from "@/components/templates/PDFAcademic";
import { PDFBalanced } from "@/components/templates/PDFBalanced";
import Image from "next/image";
import { TemplateType } from "@/lib/types";
import { useState, useEffect } from "react";
import { useProfile } from "../layout";
import { Download, Printer } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { exportToPDF } from "@/lib/utils/pdfExport";

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

export default function ResumePage() {
  const { resumeData, profiles, currentProfileId } = useProfile();
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>("classic");
  const [showPhoto, setShowPhoto] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const currentProfile = profiles.find(p => p.id === currentProfileId);

  useEffect(() => {
    setShowPhoto(!!resumeData.personalInfo.photoUrl);
  }, [resumeData.personalInfo.photoUrl]);

  const handleExportPDF = async () => {
    setDownloading(true);
    try {
      const pdfTemplates = {
        classic: <PDFClassic data={resumeData} />,
        modern: <PDFModern data={resumeData} />,
        compact: <PDFCompact data={resumeData} />,
        creative: <PDFCreative data={resumeData} />,
        academic: <PDFAcademic data={resumeData} />,
        balanced: <PDFBalanced data={resumeData} />,
      };

      const blob = await pdf(pdfTemplates[currentTemplate]).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentProfile?.name || "resume"}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
    setDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    const dataToRender = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        photoUrl: showPhoto ? resumeData.personalInfo.photoUrl : ""
      }
    };
    
    const templateComponents = {
      classic: <ClassicTemplate data={dataToRender} />,
      modern: <ModernTemplate data={dataToRender} />,
      balanced: <BalancedTemplate data={dataToRender} />,
      creative: <CreativeTemplate data={dataToRender} />,
      compact: <CompactTemplate data={dataToRender} />,
      academic: <AcademicTemplate data={dataToRender} />,
    };

    return templateComponents[currentTemplate] || templateComponents.classic;
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="mx-auto flex flex-col lg:flex-row h-full">
        {/* Main Preview Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">

          {/* Resume Preview */}
          <div
            id="resume-preview"
            className="mx-auto w-full lg:w-[794px]"
          >
            <div className="bg-white shadow-lg sm:shadow-2xl">{renderTemplate()}</div>
          </div>
        </div>

        {/* Template Sidebar - Desktop only, Mobile uses bottom sheet */}
        <aside className="hidden lg:block w-56 shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-3">
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
              Templates
            </h3>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={showPhoto}
                onChange={(e) => setShowPhoto(e.target.checked)}
                disabled={!resumeData.personalInfo.photoUrl}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={!resumeData.personalInfo.photoUrl ? 'opacity-50' : ''}>Show Photo</span>
            </label>
          </div>

          <div className="flex flex-col gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setCurrentTemplate(template.id)}
                className={`group w-full rounded-lg p-2 text-left transition-all ${
                  currentTemplate === template.id
                    ? "bg-blue-600 shadow-lg"
                    : "bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md"
                }`}
              >
                <div className="mb-1.5">
                  <p
                    className={`text-xs font-semibold ${
                      currentTemplate === template.id
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {template.title}
                  </p>
                </div>

                <div className="relative aspect-[0.707] w-full overflow-hidden rounded border border-gray-200 bg-gray-100">
                  <Image
                    src={template.thumbnail}
                    alt={`${template.title} template preview`}
                    fill
                    sizes="(max-width: 224px) 100vw, 224px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={template.id === "classic"}
                  />
                  {currentTemplate === template.id && (
                    <div className="absolute inset-0 ring-2 ring-white ring-inset" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile Template Selector - Fixed Bottom */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
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
