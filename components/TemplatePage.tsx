"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText, CheckCircle2, ArrowRight, Check, X } from "lucide-react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { AuthForm } from "@/components/ui/AuthForm";
import { sampleResumeData } from "@/lib/data";
import { TemplateType } from "@/lib/types";

const TEMPLATE_COMPONENTS: Record<TemplateType, React.ComponentType<{ data: typeof sampleResumeData }>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  academic: AcademicTemplate,
  balanced: BalancedTemplate,
};

export interface TemplatePageConfig {
  template: TemplateType;
  slug: string;
  headline: string;
  subheadline: string;
  directAnswer: string;
  whyTitle: string;
  whyBody: string;
  features: { title: string; desc: string }[];
  comparisonRows: { label: string; thisTemplate: boolean; creative: boolean }[];
  faqs: { q: string; a: string }[];
  relatedTemplates: { name: string; slug: string; tag: string }[];
  jsonLd: object;
}

export function TemplatePage({ config }: { config: TemplatePageConfig }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const PreviewComponent = TEMPLATE_COMPONENTS[config.template];

  const handleUseTemplate = () => {
    if (status === "loading") return;
    if (session?.user) {
      router.push(`/resume?template=${config.template}`);
    } else {
      setShowAuth(true);
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://resufy.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Resume Templates", item: "https://resufy.vercel.app/resume-templates" },
      { "@type": "ListItem", position: 3, name: config.headline, item: `https://resufy.vercel.app/resume-templates/${config.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(config.jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Auth modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAuth(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <AuthForm callbackUrl={`/resume?template=${config.template}`} />
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-4 pb-0">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/resume-templates" className="hover:text-blue-600">Resume Templates</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 font-medium truncate">{config.headline.split(" —")[0]}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
              <FileText className="h-4 w-4" />
              Free Template
            </div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {config.headline}
            </h1>
            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
              {config.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUseTemplate}
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-60"
              >
                <FileText className="h-4 w-4" />
                Use This Template Free
              </button>
              <Link
                href="/#templates"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                View All Templates
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
              {["100% Free", "No Watermark", "PDF & Word Export", "ATS Optimized"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Template Preview */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-2xl border border-gray-200" style={{ height: 480 }}>
              <div
                className="pointer-events-none origin-top-left"
                style={{ transform: "scale(0.605)", width: "165%", height: "165%" }}
              >
                <PreviewComponent data={sampleResumeData} />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Free Download
            </div>
          </div>
        </div>
      </section>

      {/* Why This Template */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">{config.whyTitle}</h2>
        {/* Direct answer block — 40-60 words for AI/GEO citation */}
        <div className="mb-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4">
          <p className="text-gray-800 leading-relaxed font-medium">{config.directAnswer}</p>
        </div>
        <p className="text-gray-600 leading-relaxed text-lg mb-10">{config.whyBody}</p>

        <h3 className="mb-6 text-xl font-bold">Key Features</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {config.features.map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-center">How It Compares</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-3 text-left text-gray-500 font-medium">Feature</th>
                  <th className="px-5 py-3 text-center text-blue-600 font-semibold">This Template</th>
                  <th className="px-5 py-3 text-center text-gray-500 font-medium">Fancy/Creative</th>
                </tr>
              </thead>
              <tbody>
                {config.comparisonRows.map(({ label, thisTemplate, creative }) => (
                  <tr key={label} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3 text-gray-700">{label}</td>
                    <td className="px-5 py-3 text-center">
                      {thisTemplate ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {creative ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {config.faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900 list-none">
                {q}
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Templates */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-2xl font-bold">You Might Also Like</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {config.relatedTemplates.map(({ name, slug, tag }) => (
              <Link
                key={slug}
                href={`/resume-templates/${slug}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">{name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tag}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Build Your Resume?</h2>
        <p className="mb-8 text-gray-600 text-lg">Free, no watermark, no credit card. Download as PDF or Word in seconds.</p>
        <button
          onClick={handleUseTemplate}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all text-lg disabled:opacity-60"
        >
          <FileText className="h-5 w-5" />
          Use This Template for Free
        </button>
      </section>
    </div>
  );
}
