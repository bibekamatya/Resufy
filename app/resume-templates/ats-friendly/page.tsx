import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "ATS-Friendly Resume Template (Free Download & Builder)",
  description:
    "Create an ATS-friendly resume that passes automated scanners. Use our free template and builder to format your resume correctly and land more interviews.",
  alternates: { canonical: `${BASE_URL}/resume-templates/ats-friendly` },
  openGraph: {
    title: "ATS-Friendly Resume Template (Free Download & Builder) | Resufy",
    description: "Create an ATS-friendly resume that passes automated scanners. Free template, live preview, PDF & Word export.",
    url: `${BASE_URL}/resume-templates/ats-friendly`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ATS-Friendly Resume Template",
  description:
    "A free ATS-optimized resume template with single-column layout, standard section headers, and clean fonts that pass any applicant tracking system.",
  url: `${BASE_URL}/resume-templates/ats-friendly`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function ATSFriendlyPage() {
  return (
    <TemplatePage
      config={{
        template: "classic",
        slug: "ats-friendly",
        headline: "ATS-Friendly Resume Template — Free & Customizable",
        subheadline:
          "Beat the bots and get noticed by recruiters. Our ATS-optimized template uses a clean, single-column layout that guarantees your application passes automated tracking systems.",
        whyTitle: "Why You Need an ATS-Friendly Resume",
        directAnswer: "An ATS-friendly resume uses a single-column layout, standard fonts, and clear section headers like Work Experience, Education, and Skills. It avoids tables, columns, and graphics that confuse applicant tracking software. Over 75% of large companies use ATS to filter resumes — a properly formatted resume ensures yours reaches a human recruiter.",
        whyBody:
          "Over 75% of large companies use Applicant Tracking Systems (ATS) to filter resumes before a human ever sees them. Fancy multi-column layouts, tables, and graphics confuse ATS software — causing your resume to be rejected automatically, even if you're the perfect candidate. Our ATS-friendly template is built with a clean single-column structure, standard section headers, and readable fonts that every ATS can parse correctly. More passes = more interviews.",
        features: [
          { title: "Single-Column Layout", desc: "Parses perfectly with any ATS software — no columns, tables, or text boxes." },
          { title: "Standard Section Headers", desc: "Uses clear titles like Work Experience, Education, and Skills that ATS expects." },
          { title: "Keyword-Optimized Structure", desc: "Designed to let you easily incorporate job description keywords where ATS looks." },
          { title: "Clean, ATS-Safe Fonts", desc: "Uses standard fonts like Arial and Helvetica that every system can read." },
          { title: "Real-Time ATS Scoring", desc: "Resufy scores your resume live and suggests missing keywords as you type." },
          { title: "Free PDF & Word Export", desc: "Download your resume as a PDF or .docx file instantly, no watermark." },
        ],
        comparisonRows: [
          { label: "Passes ATS scanners", thisTemplate: true, creative: false },
          { label: "Readable by all recruiters", thisTemplate: true, creative: true },
          { label: "Single-column layout", thisTemplate: true, creative: false },
          { label: "Standard section headers", thisTemplate: true, creative: false },
          { label: "Free PDF export", thisTemplate: true, creative: true },
          { label: "No watermark", thisTemplate: true, creative: true },
        ],
        faqs: [
          { q: "What is an ATS-friendly resume format?", a: "An ATS-friendly resume uses a simple single-column layout, standard fonts, and clear section headers. It avoids tables, columns, graphics, and unusual fonts that confuse applicant tracking software." },
          { q: "Is this template really free?", a: "Yes, completely free. No credit card, no subscription, no watermark. You can build, preview, and download your resume at no cost." },
          { q: "Can I download this as a PDF?", a: "Yes. Once you've filled in your details, go to the Preview page and click Export → PDF. Your resume downloads instantly." },
          { q: "Will this template work for any industry?", a: "Yes. The ATS-friendly format works for any industry — tech, finance, healthcare, marketing, and more. The clean layout is universally professional." },
          { q: "How is Resufy's ATS score calculated?", a: "Resufy analyzes your resume for completeness, keyword density, section structure, and formatting best practices, then gives you a score out of 100 with specific suggestions to improve it." },
        ],
        relatedTemplates: [
          { name: "Modern Template", slug: "modern", tag: "Two-column, clean" },
          { name: "Simple Template", slug: "simple", tag: "Minimal, one-page" },
          { name: "Fresher Template", slug: "fresher", tag: "Entry-level focused" },
        ],
        jsonLd,
      }}
    />
  );
}
