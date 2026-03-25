import { FileText, Sparkles, Download, Eye, Zap, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { sampleResumeData } from "@/lib/data";
import { HeroCTA, CtaSectionButton } from "@/components/HeroCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Resufy",
  url: "https://resufy.vercel.app",
  description: "Free online resume builder with ATS-friendly templates, live preview, PDF & Word export, and real-time ATS scoring.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["6 ATS-friendly resume templates", "Live resume preview", "PDF and Word export", "Real-time ATS scoring", "Multiple resume profiles", "Shareable resume links", "Skills autocomplete"],
  author: { "@type": "Person", name: "Bibek Amatya", url: "https://github.com/bibekamatya" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is Resufy completely free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Resufy is 100% free with no hidden fees, no watermarks, and no credit card required." } },
    { "@type": "Question", name: "Are the resume templates ATS-friendly?", acceptedAnswer: { "@type": "Answer", text: "All 6 templates are designed to pass Applicant Tracking Systems (ATS) with clean formatting and proper heading structure." } },
    { "@type": "Question", name: "Can I export my resume as a PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can export your resume as a PDF or Word (.docx) file instantly with no watermarks." } },
    { "@type": "Question", name: "Can I create multiple resumes?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can create, rename, duplicate, and manage multiple resume profiles for different job applications." } },
    { "@type": "Question", name: "How does the ATS score work?", acceptedAnswer: { "@type": "Answer", text: "Resufy analyzes your resume in real time and scores it based on completeness, keyword density, and formatting best practices." } },
  ],
};

const features = [
  { icon: FileText, color: "from-blue-500 to-blue-600 shadow-blue-500/40", bg: "bg-blue-100", title: "Multiple Resume Profiles", desc: "Create separate resumes for different jobs. Rename, duplicate, delete, and switch between profiles instantly." },
  { icon: Eye, color: "from-green-500 to-green-600 shadow-green-500/40", bg: "bg-green-100", title: "Live Resume Preview", desc: "See your resume update in real time as you type. Toggle visibility for any section, entry, or skill." },
  { icon: Download, color: "from-purple-500 to-purple-600 shadow-purple-500/40", bg: "bg-purple-100", title: "PDF & Word Export", desc: "Download your resume as a PDF or .docx file instantly. No watermark, no subscription required." },
  { icon: Zap, color: "from-orange-500 to-orange-600 shadow-orange-500/40", bg: "bg-orange-100", title: "Real-Time ATS Score", desc: "Get an instant ATS score as you build. See exactly which keywords are missing and how to improve your resume." },
  { icon: Users, color: "from-pink-500 to-pink-600 shadow-pink-500/40", bg: "bg-pink-100", title: "Share Your Resume Online", desc: "Generate a public link to share your resume with recruiters or mentors. No sign-in required to view." },
  { icon: Sparkles, color: "from-teal-500 to-teal-600 shadow-teal-500/40", bg: "bg-teal-100", title: "Skills Autocomplete", desc: "Type a skill and get smart suggestions from hundreds of common industry skills. Add them in one click." },
];

const templates = [
  { name: "Classic", desc: "Traditional single-column", tag: "Most Popular", Template: ClassicTemplate, slug: "ats-friendly" },
  { name: "Modern", desc: "Clean two-column", tag: "Clean", Template: ModernTemplate, slug: "modern" },
  { name: "Creative", desc: "Bold color sidebar", tag: "Bold", Template: CreativeTemplate, slug: "creative" },
  { name: "Compact", desc: "Space-efficient, one-page", tag: "Minimal", Template: CompactTemplate, slug: "simple" },
  { name: "Academic", desc: "Formal, education-first", tag: "Formal", Template: AcademicTemplate, slug: "fresher" },
  { name: "Balanced", desc: "Evenly distributed columns", tag: "Versatile", Template: BalancedTemplate, slug: "one-page" },
];

const faqs = [
  { q: "Is Resufy completely free?", a: "Yes. Resufy is 100% free with no hidden fees, no watermarks, and no credit card required. All 6 templates and all export features are included at no cost." },
  { q: "Are the resume templates ATS-friendly?", a: "All 6 templates are designed to pass Applicant Tracking Systems (ATS). They use clean formatting, standard fonts, and proper section headers that ATS software can parse correctly." },
  { q: "Can I download my resume as a PDF?", a: "Yes. Go to the Preview page and click Export → PDF. Your resume downloads instantly with no watermark." },
  { q: "Can I create multiple resumes for different jobs?", a: "Yes. You can create, rename, duplicate, and manage multiple resume profiles — perfect for tailoring your resume to different job applications." },
  { q: "How does the ATS score work?", a: "Resufy analyzes your resume in real time and scores it based on completeness, keyword density, and formatting best practices. It also suggests missing keywords to improve your score." },
  { q: "Can I share my resume with a link?", a: "Yes. Generate a public shareable link for any resume profile. Anyone can view it without signing in — great for sharing with recruiters or mentors." },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Free Forever • No Credit Card Required</span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Free Resume Builder —
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ATS-Friendly & Ready in Minutes
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Build a professional, ATS-optimized resume with live preview, 6 templates, and instant PDF or Word export. 100% free — no credit card, no watermark.
          </p>
          <HeroCTA />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-12" aria-label="Key stats">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "6", label: "ATS-Friendly Templates" },
              { value: "100%", label: "Free, No Watermark" },
              { value: "PDF", label: "& Word Export" },
              { value: "Live", label: "Resume Preview" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="mb-1 text-4xl font-bold text-blue-600">{value}</p>
                <p className="text-sm font-medium text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Everything You Need to Build a Winning Resume</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Resufy gives you the tools to create a resume that passes ATS scanners and impresses recruiters.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
              <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full ${bg} opacity-50 blur-3xl transition-all group-hover:scale-150`} />
              <div className="relative">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">How to Build a Resume in 3 Steps</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">From blank page to job-ready resume in minutes</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { n: "1", color: "from-blue-500 to-blue-600 shadow-blue-500/40", title: "Enter Your Details", desc: "Fill in your work experience, education, skills, and projects using our structured form editor." },
              { n: "2", color: "from-indigo-500 to-indigo-600 shadow-indigo-500/40", title: "Pick an ATS-Friendly Template", desc: "Choose from 6 professional templates — Classic, Modern, Creative, Compact, Academic, or Balanced." },
              { n: "3", color: "from-purple-500 to-purple-600 shadow-purple-500/40", title: "Download as PDF or Word", desc: "Export your finished resume as a PDF or .docx file instantly. No watermark, no cost." },
            ].map(({ n, color, title, desc }) => (
              <div key={n} className="relative text-center">
                <div className="mb-6 flex justify-center">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${color} text-3xl font-bold text-white shadow-xl`}>
                    {n}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Free Resume Templates for Every Job</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            6 ATS-friendly templates built for real-world hiring — classic, modern, creative, and more
          </p>
          <a href="/resume-templates" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 hover:underline">
            View all templates <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {templates.map(({ name, desc, tag, Template, slug }) => (
            <div key={name} className="group relative snap-start shrink-0 w-48 overflow-hidden rounded-xl border-2 border-gray-200 bg-white text-left transition-all hover:border-blue-500 hover:shadow-xl">
              {/* Full-card link overlay — sits on top, no nesting issue */}
              <a href={`/resume-templates/${slug}`} className="absolute inset-0 z-10" aria-label={`${name} resume template`} />
              <div className="overflow-hidden relative border-b border-gray-100 bg-white" style={{ paddingBottom: "130%" }}>
                <div className="pointer-events-none absolute inset-0" style={{ transform: "scale(0.245)", transformOrigin: "top left", width: "408%", height: "408%" }}>
                  <Template data={sampleResumeData} />
                </div>
                <div className="absolute inset-0 bg-transparent group-hover:bg-blue-500/5 transition-colors" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="font-semibold text-sm text-gray-900">{name}</h3>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                </div>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Common questions about Resufy, our templates, and resume building</p>
        </div>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between list-none">
                <h3 className="font-semibold text-gray-900 text-base">{q}</h3>
                <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-center shadow-2xl sm:p-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative">
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Build Your Resume Free — Land More Interviews
            </h2>
            <p className="mb-8 text-lg text-blue-100 sm:text-xl">
              ATS-optimized templates, live preview, and instant PDF export. No credit card needed.
            </p>
            <CtaSectionButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40">
                  <FileText className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="text-xl font-bold text-gray-900">Resufy</span>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                Free resume builder helping job seekers create ATS-friendly resumes and land more interviews.
              </p>
              <p className="hidden md:block text-sm text-gray-500">© 2026 Resufy. Made with ❤️ by Bibek Amatya</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                <li><a href="#templates" className="hover:text-blue-600">Templates</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
                <li><a href="/resume-templates" className="hover:text-blue-600">All Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Templates</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/resume-templates/ats-friendly" className="hover:text-blue-600">ATS-Friendly</a></li>
                <li><a href="/resume-templates/modern" className="hover:text-blue-600">Modern</a></li>
                <li><a href="/resume-templates/simple" className="hover:text-blue-600">Simple</a></li>
                <li><a href="/resume-templates/fresher" className="hover:text-blue-600">Fresher</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-6 text-center md:hidden">
            <p className="text-sm text-gray-500">© 2026 Resufy. Made with ❤️ by Bibek Amatya</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
