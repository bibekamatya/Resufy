import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, ArrowRight } from "lucide-react";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Free Resume Builder for Nepal — ATS-Friendly & PDF Export",
  description:
    "Build a professional resume for Nepal job market for free. ATS-friendly templates, live preview, and instant PDF export. No sign up hassle. Used by Nepali job seekers.",
  alternates: { canonical: "/free-resume-builder-nepal" },
  openGraph: {
    title: "Free Resume Builder for Nepal | Resufy",
    description: "Build a professional resume for Nepal job market for free. ATS-friendly templates, PDF export. No watermark.",
    url: "/free-resume-builder-nepal",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Resufy — Free Resume Builder for Nepal",
  url: `${BASE_URL}/free-resume-builder-nepal`,
  description: "Free resume builder for Nepal job seekers. ATS-friendly templates, PDF and Word export, real-time ATS scoring.",
  applicationCategory: "BusinessApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "NPR" },
  areaServed: { "@type": "Country", name: "Nepal" },
};

const faqs = [
  { q: "Is this resume builder free for Nepal users?", a: "Yes, completely free. No credit card, no subscription, no watermark. Build, preview, and download your resume at no cost." },
  { q: "What resume format is best for Nepal jobs?", a: "A clean, single-column ATS-friendly format works best for most Nepali companies and international employers hiring from Nepal. Avoid fancy designs for corporate applications." },
  { q: "Can I download my resume as a PDF?", a: "Yes. Export your resume as a PDF or Word (.docx) file instantly with no watermark." },
  { q: "Does it work for jobs in Nepal and abroad?", a: "Yes. The templates are designed to work for both local Nepali employers and international companies. The ATS-friendly format is recognized globally." },
];

export default function FreeResumeBuilderNepalPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-4">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 font-medium">Free Resume Builder Nepal</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
            <FileText className="h-4 w-4" />
            Free for Nepal Job Seekers
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Free Resume Builder for Nepal
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Create a professional, ATS-friendly resume for Nepal job market in minutes. 6 templates, live preview, and instant PDF or Word export. 100% free — no watermark, no credit card.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all text-lg"
          >
            <FileText className="h-5 w-5" />
            Create My Resume Free
          </Link>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {["100% Free", "No Watermark", "ATS-Friendly", "PDF & Word Export"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Answer */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 mb-8">
          <p className="text-gray-800 leading-relaxed font-medium">
            Resufy is a free online resume builder for Nepal job seekers. It offers 6 ATS-friendly templates, real-time ATS scoring, and instant PDF or Word export with no watermark. No sign-up friction — sign in with Google and start building immediately.
          </p>
        </div>

        <h2 className="mb-4 text-3xl font-bold">Why Nepali Job Seekers Use Resufy</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          Whether you are applying to companies in Kathmandu, Pokhara, or abroad — your resume needs to be professional, clean, and ATS-compatible. Most Nepali job portals like Merojob, Jobsnepal, and Froxjob use automated screening. A poorly formatted resume gets rejected before a human sees it. Resufy templates are built to pass these systems while looking professional to human recruiters.
        </p>

        <h3 className="mb-4 text-xl font-bold">What Makes a Good Resume for Nepal Jobs?</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Clean Single-Column Layout", desc: "Passes ATS systems used by Nepali and international employers." },
            { title: "Standard Section Headers", desc: "Work Experience, Education, Skills — exactly what recruiters expect." },
            { title: "PDF Format", desc: "Always submit as PDF to preserve formatting across all devices." },
            { title: "One Page for Freshers", desc: "Keep it to one page if you have under 5 years of experience." },
            { title: "Quantified Achievements", desc: "Use numbers — 'increased sales by 30%' beats 'improved sales'." },
            { title: "ATS Keywords", desc: "Include keywords from the job description to pass automated screening." },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3 mb-10">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <h3 className="font-semibold text-gray-900 text-base">{q}</h3>
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        {/* Internal links */}
        <h3 className="mb-4 text-xl font-bold">Choose a Template</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for Nepal jobs" },
            { name: "Simple Template", slug: "simple", tag: "Clean, one-page" },
            { name: "Fresher Template", slug: "fresher", tag: "No experience needed" },
          ].map(({ name, slug, tag }) => (
            <Link key={slug} href={`/resume-templates/${slug}`}
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

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Ready to Create Your Resume?</h2>
          <p className="mb-6 text-blue-100">Free, no watermark, no credit card. Download as PDF in seconds.</p>
          <Link href="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all">
            <FileText className="h-4 w-4" />
            Create Resume Free
          </Link>
        </div>
      </section>
    </div>
  );
}
