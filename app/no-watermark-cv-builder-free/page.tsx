import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "No Watermark CV Builder Free — Download Clean PDF",
  description:
    "Create and download a clean CV (curriculum vitae) with no watermark for free. Ideal for academic, international, and detailed job applications. Export to PDF or Word instantly.",
  keywords: [
    "no watermark cv builder free",
    "free cv builder no watermark",
    "curriculum vitae builder free",
    "cv maker free without watermark",
    "download cv without watermark",
  ],
  alternates: { canonical: "/no-watermark-cv-builder-free" },
  openGraph: {
    title: "No Watermark CV Builder Free | Resufy",
    description: "Build a CV for free and download clean PDF/Word with no watermark.",
    url: "/no-watermark-cv-builder-free",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function NoWatermarkCvBuilderFreePage() {
  const faq = [
    {
      q: "Is the PDF download truly without watermark?",
      a: "Yes. Resufy exports your resume/CV as a clean PDF or Word file without watermark, branding, or hidden overlays.",
    },
    {
      q: "Can I download both PDF and Word for free?",
      a: "Yes. Resufy provides PDF and Word export without requiring a subscription or paid plan.",
    },
    {
      q: "Where can I use a no-watermark CV?",
      a: "You can submit it to job portals, email applications, and ATS-based systems that require clean formatting.",
    },
    {
      q: "Will removing branding affect ATS parsing?",
      a: "No. ATS parsing depends on clean text, standard headings, and readable structure. Resufy keeps formatting simple for compatibility.",
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
    name: "No Watermark CV Builder Free",
    url: "https://resufy.vercel.app/no-watermark-cv-builder-free",
    description: "Free CV builder without watermark with PDF and Word export.",
    inLanguage: "en",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            No Watermark CV Builder — Free
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Build a full curriculum vitae (CV) and download as a clean PDF or Word file with no branding, no watermark, and no hidden paywall. Ideal for academic, international, and detailed job applications.
          </p>
          <Link href="/builder" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-white font-semibold">
            <FileText className="h-5 w-5" />
            Start Building Free
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-4 text-3xl font-bold">What You Get for Free</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "No watermark on exports",
            "Unlimited PDF and Word downloads",
            "ATS-friendly templates included",
            "No subscription required",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold">No-Watermark CV: Best Practices</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          A no-watermark CV looks professional and avoids distraction for recruiters. To keep it clean, export in a standard format (PDF or Word), use readable fonts, and keep the layout simple so ATS systems can parse it correctly.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "Use standard section titles (Experience, Education, Skills).",
            "Keep content in text form (avoid images for important info).",
            "Use consistent bullet points and spacing.",
            "Keep the most important summary/skills near the top.",
            "Export as PDF for formatting stability across devices.",
            "If the job is ATS-heavy, prefer the ATS-friendly template layouts.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4">
              <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
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

        <h3 className="mb-4 text-xl font-bold">Explore More</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/resume-builder-no-watermark" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">Resume Builder No Watermark</Link>
          <Link href="/resume-templates" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">All Resume Templates</Link>
          <Link href="/ats-resume-checker" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">ATS Resume Checker</Link>
        </div>
      </section>
    </div>
  );
}
