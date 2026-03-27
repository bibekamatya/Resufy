import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ATS Friendly Resume Template Nepal — Free Download",
  description:
    "Use a free ATS friendly resume template for Nepal job applications. Clean format, standard headings, and PDF/Word export with no watermark.",
  keywords: [
    "ats friendly resume template nepal",
    "nepal ats resume format",
    "resume template for merojob",
    "resume template for jobsnepal",
    "free ats resume template",
  ],
  alternates: { canonical: "/ats-friendly-resume-template-nepal" },
  openGraph: {
    title: "ATS Friendly Resume Template Nepal | Resufy",
    description: "Free ATS-friendly resume template for Nepal job market. Clean, professional, and no watermark.",
    url: "/ats-friendly-resume-template-nepal",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AtsFriendlyResumeTemplateNepalPage() {
  const faq = [
    {
      q: "Is an ATS-friendly template enough for Nepal job applications?",
      a: "It’s a strong start. An ATS-friendly layout helps your resume get parsed correctly. You also need relevant keywords and clear section content for the job description.",
    },
    {
      q: "Can I use this template for both Nepal and international recruiters?",
      a: "Yes. The template uses standard headings and clean formatting that work across many ATS systems. Just tailor skills and projects to each job.",
    },
    {
      q: "What should I avoid in an ATS-friendly resume?",
      a: "Avoid tables, multi-column layouts, heavy graphics, icons, and unusual fonts. Keep text simple and use clear headings.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ATS Friendly Resume Template Nepal",
    url: "https://resufy.vercel.app/ats-friendly-resume-template-nepal",
    description:
      "A free ATS-friendly resume template for Nepal with clean structure and standard headings.",
    inLanguage: "en",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-4">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 font-medium">ATS Friendly Resume Template Nepal</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            ATS Friendly Resume Template for Nepal
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Improve your chances of getting shortlisted with an ATS-compatible resume format used by Nepali and international recruiters.
          </p>
          <Link href="/resume-templates/ats-friendly" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-white font-semibold">
            <FileText className="h-5 w-5" />
            Use ATS Template Free
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-4 text-3xl font-bold">Why ATS Template Works</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "Single-column structure",
            "Standard section headings",
            "No tables, graphics, or text boxes",
            "Easy parsing by applicant tracking systems",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold">ATS Checklist (Use This Template)</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "One clear section per topic with standard labels.",
            "Skills and projects written as readable text (not images).",
            "No tables/columns that can break parsing.",
            "Bullets with consistent phrasing and spacing.",
            "Use job-description keywords in Skills/Projects.",
            "Keep the most important info in the top half of the page.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-bold">Do/Don’t for Nepal ATS Resumes</h3>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            { title: "Do", items: ["Use simple formatting and standard fonts.", "Use clear headings: Education, Projects, Skills.", "Add 2–4 project bullets with outcomes."] },
            { title: "Don’t", items: ["Don’t overload with icons or special characters.", "Don’t use columns/tables for layout.", "Don’t write long paragraphs—use bullets."] },
          ].map(({ title, items }) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">{title}</p>
              <ul className="mt-3 space-y-2">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-bold">Frequently Asked Questions</h3>
        <div className="space-y-3 mb-10">
          {faq.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <span className="font-semibold text-gray-900">{q}</span>
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-bold">Related Resources</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/ats-resume-checker" className="group rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">
            ATS Resume Checker <ArrowRight className="inline-block h-4 w-4 ml-1" />
          </Link>
          <Link href="/free-resume-builder-nepal" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">
            Free Resume Builder Nepal
          </Link>
          <Link href="/resume-builder-for-freshers-nepal" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">
            Resume for Freshers Nepal
          </Link>
        </div>
      </section>
    </div>
  );
}
