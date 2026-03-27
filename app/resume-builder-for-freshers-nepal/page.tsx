import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume Builder for Freshers in Nepal — Free ATS-Friendly CV",
  description:
    "Create a fresher resume for Nepal jobs with a free ATS-friendly builder. Perfect for students and graduates with no experience. Download PDF or Word with no watermark.",
  keywords: [
    "resume builder for freshers in nepal",
    "fresher resume nepal",
    "student resume template nepal",
    "entry level resume builder nepal",
    "free cv builder for freshers",
  ],
  alternates: { canonical: "/resume-builder-for-freshers-nepal" },
  openGraph: {
    title: "Resume Builder for Freshers in Nepal | Resufy",
    description:
      "Build an ATS-friendly fresher resume for Nepal. Free templates, PDF/Word export, and no watermark.",
    url: "/resume-builder-for-freshers-nepal",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const faq = [
  {
    q: "What is the best resume format for freshers in Nepal?",
    a: "A clean, one-page, ATS-friendly format works best. Focus on education, projects, internships, and skills instead of long summaries.",
  },
  {
    q: "Can I build a fresher CV for free?",
    a: "Yes. Resufy is free and allows PDF or Word export without watermark.",
  },
  {
    q: "What should I write in the Experience section if I have no full-time job?",
    a: "Use internship, part-time work, college projects, volunteering, or relevant coursework. Write 2–4 bullet points focused on outcomes (what you built, improved, or learned).",
  },
  {
    q: "How long should a fresher resume be?",
    a: "Usually 1 page. Keep it tight: education + projects + skills + (optional) internships. Recruiters spend limited time scanning freshers’ resumes.",
  },
  {
    q: "How do I tailor my fresher resume for Nepal job portals?",
    a: "Copy the job description headings and include matching keywords in Skills and Projects. Use standard section titles so Applicant Tracking Systems parse them correctly.",
  },
];

export default function ResumeBuilderForFreshersNepalPage() {
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
    name: "Resume Builder for Freshers in Nepal",
    url: "https://resufy.vercel.app/resume-builder-for-freshers-nepal",
    description:
      "Free ATS-friendly resume builder for freshers in Nepal with PDF and Word export.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Resufy",
      url: "https://resufy.vercel.app",
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Resume Builder for Freshers in Nepal
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Build a job-ready fresher resume even if you have no work experience. Use ATS-friendly templates and download as PDF or Word for free.
          </p>
          <Link href="/builder" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-white font-semibold">
            <FileText className="h-5 w-5" />
            Create Resume Free
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-4 text-3xl font-bold">What to Include in a Fresher Resume</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "Education with marks/CGPA",
            "Relevant projects and internships",
            "Technical and soft skills",
            "Certifications and achievements",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold">A Simple Fresher Resume Structure</h2>
        <p className="mb-6 text-gray-600 leading-relaxed">
          If you’re applying for your first job in Nepal, keep the structure predictable for both recruiters and ATS systems. Use standard section headings, short bullet points, and measurable details where possible.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            { title: "Education (first)", desc: "Put your most relevant degree, grade (if strong), relevant coursework, and graduation year." },
            { title: "Projects (2–4)", desc: "Add projects that show real skills. Mention tools/technologies and one outcome per bullet." },
            { title: "Internships / Volunteering", desc: "Even if it wasn’t paid, it proves responsibility and learning. Keep bullets outcome-focused." },
            { title: "Skills (ATS keywords)", desc: "List skills in a clean, readable list. Mirror the job description wording (without keyword stuffing)." },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold">ATS Checklist for Freshers</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            "Use standard section titles (Education, Projects, Skills).",
            "Avoid tables/columns that can confuse parsing.",
            "Keep fonts standard and sizes readable.",
            "Write bullets with consistent punctuation and spacing.",
            "Use the same keywords as the job posting in Skills/Projects.",
            "Keep the resume to 1 page so important info isn’t buried.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-4">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3 mb-10">
          {faq.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <span className="font-semibold text-gray-900">{q}</span>
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{a}</p>
            </details>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-bold">Helpful Pages</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/resume-templates/fresher" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">Fresher Template</Link>
          <Link href="/free-resume-builder-nepal" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">Resume Builder Nepal</Link>
          <Link href="/ats-resume-checker" className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 transition-colors">ATS Resume Checker</Link>
        </div>
      </section>
    </div>
  );
}
