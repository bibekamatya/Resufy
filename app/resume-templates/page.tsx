import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Resume Templates (ATS-Friendly, Modern, Creative & More)",
  description:
    "Browse 6 free professional resume templates. ATS-friendly, modern, creative, simple, one-page, and fresher templates. Live preview and instant PDF download.",
  alternates: { canonical: "/resume-templates" },
  openGraph: {
    title: "Free Resume Templates | Resufy",
    description: "6 free professional resume templates. ATS-friendly, modern, creative, simple. Live preview & PDF export.",
    url: "/resume-templates",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const templates = [
  { slug: "ats-friendly", name: "ATS-Friendly", tag: "Most Recommended", desc: "Single-column layout that passes every ATS scanner. Best for corporate job applications.", color: "blue" },
  { slug: "modern", name: "Modern", tag: "Most Popular", desc: "Clean two-column design for professionals who want a contemporary, polished look.", color: "indigo" },
  { slug: "simple", name: "Simple", tag: "Universal", desc: "Minimal one-page layout that works for any industry, role, or experience level.", color: "gray" },
  { slug: "fresher", name: "Fresher", tag: "Entry-Level", desc: "Education-first layout designed for students and graduates with no work experience.", color: "green" },
  { slug: "creative", name: "Creative", tag: "Stand Out", desc: "Bold sidebar design for designers, marketers, and creative professionals.", color: "purple" },
  { slug: "one-page", name: "One Page", tag: "Concise", desc: "Balanced two-column layout that fits everything on a single page.", color: "orange" },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/30",
  gray: "from-gray-500 to-gray-600 shadow-gray-500/30",
  green: "from-green-500 to-green-600 shadow-green-500/30",
  purple: "from-purple-500 to-purple-600 shadow-purple-500/30",
  orange: "from-orange-500 to-orange-600 shadow-orange-500/30",
};

export default function ResumeTemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Resufy Resume Templates",
            description:
              "Browse 6 free professional resume templates on Resufy, including ATS-friendly, modern, creative, simple, one-page, and fresher templates.",
            isPartOf: {
              "@type": "WebSite",
              name: "Resufy",
              url: "https://resufy.vercel.app",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: templates.map((t, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${t.name} resume template`,
                url: `https://resufy.vercel.app/resume-templates/${t.slug}`,
              })),
            },
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
            <FileText className="h-4 w-4" />
            All Free — No Watermark
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Free Resume Templates
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            6 professional, ATS-friendly resume templates. Live preview, instant PDF & Word export. No credit card required.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(({ slug, name, tag, desc, color }) => (
            <Link
              key={slug}
              href={`/resume-templates/${slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-lg`}>
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{name} Template</h3>
                <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
              </div>
              <p className="text-sm text-gray-600 flex-1">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600">
                Use Template <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal link back to builder */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Not sure which to pick?</h2>
          <p className="mb-8 text-gray-600">Start with the ATS-Friendly template — it works for every job and passes all automated scanners.</p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all text-lg"
          >
            <FileText className="h-5 w-5" />
            Start Building Free
          </Link>
        </div>
      </section>
    </div>
  );
}
