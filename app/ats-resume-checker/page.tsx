import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, Zap, ArrowRight } from "lucide-react";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker — Real-Time ATS Score & Keywords",
  description:
    "Check your resume's ATS score for free. Get real-time feedback on keyword density, formatting, and completeness. Improve your resume to pass applicant tracking systems.",
  alternates: { canonical: "/ats-resume-checker" },
  openGraph: {
    title: "Free ATS Resume Checker | Resufy",
    description: "Check your ATS score for free. Real-time keyword suggestions and formatting feedback. Pass any ATS system.",
    url: "/ats-resume-checker",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Resufy ATS Resume Checker",
  url: `${BASE_URL}/ats-resume-checker`,
  description: "Free real-time ATS resume checker that scores your resume on keyword density, formatting, completeness, and ATS compatibility.",
  applicationCategory: "BusinessApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Real-time ATS score", "Keyword suggestions", "Formatting analysis", "Completeness check"],
};

const faqs = [
  { q: "What is an ATS resume checker?", a: "An ATS resume checker analyzes your resume against the criteria used by Applicant Tracking Systems — keyword density, formatting, section structure, and completeness — and gives you a score with specific suggestions to improve it." },
  { q: "How does Resufy's ATS score work?", a: "Resufy analyzes your resume in real time as you build it. It scores based on completeness of sections, keyword density, proper section headers, and formatting best practices. You see the score update live as you type." },
  { q: "What ATS score should I aim for?", a: "Aim for 80+ out of 100. A score above 80 means your resume has strong keyword coverage, complete sections, and proper formatting that most ATS systems can parse correctly." },
  { q: "Is the ATS checker free?", a: "Yes, completely free. The ATS score is built into Resufy's resume builder — no separate tool or subscription needed." },
  { q: "What makes a resume fail ATS?", a: "Common ATS failures include: using tables or columns, missing standard section headers, lack of keywords from the job description, using images or graphics, and non-standard fonts." },
];

export default function ATSResumeCheckerPage() {
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
          <li className="text-gray-900 font-medium">ATS Resume Checker</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-sm font-medium text-orange-600 shadow-sm">
            <Zap className="h-4 w-4" />
            Real-Time ATS Scoring
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Free ATS Resume Checker
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Get an instant ATS score as you build your resume. See exactly which keywords are missing, what sections need improvement, and how to pass automated screening systems.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all text-lg"
          >
            <Zap className="h-5 w-5" />
            Check My ATS Score Free
          </Link>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {["Real-Time Score", "Keyword Suggestions", "Free Forever", "No Sign-Up Friction"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">

        {/* Direct Answer */}
        <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50 px-5 py-4 mb-8">
          <p className="text-gray-800 leading-relaxed font-medium">
            Resufy ATS checker scores your resume in real time on keyword density, section completeness, formatting, and ATS compatibility. It shows your score out of 100 and suggests specific missing keywords as you type — no separate tool needed, it is built directly into the resume builder.
          </p>
        </div>

        <h2 className="mb-4 text-3xl font-bold">What Resufy's ATS Checker Analyzes</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          Over 75% of large companies use Applicant Tracking Systems to filter resumes before a human ever sees them. A resume that looks great to a person can still fail ATS if it is missing the right keywords or uses the wrong formatting. Resufy built-in ATS checker analyzes your resume as you build it and tells you exactly what to fix.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Keyword Density", desc: "Checks if your resume includes the right industry keywords that ATS systems look for." },
            { title: "Section Completeness", desc: "Ensures all critical sections — Experience, Education, Skills — are present and filled." },
            { title: "Formatting Check", desc: "Detects formatting issues that confuse ATS like tables, columns, or missing headers." },
            { title: "Live Score Update", desc: "Your ATS score updates in real time as you type — see improvements instantly." },
            { title: "Keyword Suggestions", desc: "Get specific keyword recommendations based on your industry and role." },
            { title: "Score out of 100", desc: "Clear numeric score so you know exactly where you stand before applying." },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
              <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
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
        <h3 className="mb-4 text-xl font-bold">Use an ATS-Optimized Template</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Highest ATS score" },
            { name: "Simple Template", slug: "simple", tag: "Clean, passes all ATS" },
            { name: "Fresher Template", slug: "fresher", tag: "Entry-level ATS ready" },
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
          <h2 className="mb-2 text-2xl font-bold">Check Your ATS Score Now</h2>
          <p className="mb-6 text-blue-100">Free, real-time ATS scoring built into the resume builder.</p>
          <Link href="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all">
            <Zap className="h-4 w-4" />
            Check My ATS Score Free
          </Link>
        </div>
      </section>
    </div>
  );
}
