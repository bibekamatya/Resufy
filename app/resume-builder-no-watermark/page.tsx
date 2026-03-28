import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2, ArrowRight, X } from "lucide-react";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Free Resume Builder Without Watermark — Download Clean PDF",
  description:
    "Build and download your resume as a clean PDF or Word file with no watermark, no branding, no subscription. Resufy is 100% free with no hidden catches.",
  alternates: { canonical: "/resume-builder-no-watermark" },
  openGraph: {
    title: "Free Resume Builder Without Watermark | Resufy",
    description: "Download your resume as a clean PDF with no watermark. 100% free, no subscription.",
    url: "/resume-builder-no-watermark",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Resufy — Resume Builder Without Watermark",
  url: `${BASE_URL}/resume-builder-no-watermark`,
  description: "Free resume builder that exports clean PDF and Word files with no watermark, no branding, and no subscription required.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqs = [
  { q: "Does Resufy add a watermark to downloaded resumes?", a: "No. Resufy never adds a watermark, logo, or branding to your downloaded resume. Your PDF and Word files are completely clean." },
  { q: "Is it really free with no watermark?", a: "Yes. No credit card, no subscription, no hidden tier. Every feature including PDF and Word export is free with no watermark." },
  { q: "Why do other resume builders add watermarks?", a: "Most resume builders add watermarks on free plans to push users to paid subscriptions. Resufy is fully free — no paid tier, no watermark, ever." },
  { q: "Can I use the downloaded resume for job applications?", a: "Yes. Your downloaded PDF is a clean, professional document ready to submit to any employer or job portal." },
];

export default function ResumeBuilderNoWatermarkPage() {
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
          <li className="text-gray-900 font-medium">Resume Builder No Watermark</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-1.5 text-sm font-medium text-green-600 shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
            Zero Watermarks. Ever.
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Free Resume Builder — No Watermark
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Download your resume as a clean, professional PDF or Word file with absolutely no watermark, no branding, and no subscription. Resufy is 100% free — no catches.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all text-lg"
          >
            <FileText className="h-5 w-5" />
            Create My Resume Free
          </Link>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {["No Watermark", "No Subscription", "No Credit Card", "Clean PDF Export"].map((t) => (
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
        <div className="rounded-xl border-l-4 border-green-500 bg-green-50 px-5 py-4 mb-8">
          <p className="text-gray-800 leading-relaxed font-medium">
            Resufy exports your resume as a clean PDF or Word file with no watermark, no Resufy branding, and no hidden subscription. Every feature is free — build, preview, and download as many resumes as you need at no cost.
          </p>
        </div>

        {/* Comparison */}
        <h2 className="mb-6 text-3xl font-bold">Resufy vs Other Free Resume Builders</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3 text-left text-gray-500 font-medium">Feature</th>
                <th className="px-5 py-3 text-center text-blue-600 font-semibold">Resufy</th>
                <th className="px-5 py-3 text-center text-gray-500 font-medium">Others (Free Plan)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "No watermark on download", resufy: true, others: false },
                { label: "PDF export free", resufy: true, others: false },
                { label: "Word export free", resufy: true, others: false },
                { label: "All templates free", resufy: true, others: false },
                { label: "No subscription required", resufy: true, others: false },
                { label: "Multiple resume profiles", resufy: true, others: false },
              ].map(({ label, resufy, others }) => (
                <tr key={label} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-700">{label}</td>
                  <td className="px-5 py-3 text-center">
                    {resufy ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {others ? <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <h3 className="mb-4 text-xl font-bold">Pick a Template — All Free, No Watermark</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Most Recommended" },
            { name: "Modern Template", slug: "modern", tag: "Clean two-column" },
            { name: "Simple Template", slug: "simple", tag: "Minimal, one-page" },
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
          <h2 className="mb-2 text-2xl font-bold">Download Your Resume — No Watermark</h2>
          <p className="mb-6 text-blue-100">Clean PDF or Word export. Free forever. No credit card.</p>
          <Link href="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all">
            <FileText className="h-4 w-4" />
            Create Resume Free
          </Link>
        </div>
      </section>
    </div>
  );
}
