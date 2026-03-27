import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Simple Resume Template (Free, One-Page, No Sign Up)",
  description:
    "Download a free simple, clean, one-page resume template. Minimal design that works for any job. Live preview, instant PDF & Word export. No sign up needed.",
  alternates: { canonical: `${BASE_URL}/resume-templates/simple` },
  openGraph: {
    title: "Simple Resume Template (Free, One-Page) | Resufy",
    description: "Free simple resume template. Minimal, clean, one-page. PDF & Word export. No watermark.",
    url: `${BASE_URL}/resume-templates/simple`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Simple Resume Template",
  description: "A free simple, minimal, one-page resume template that works for any job or industry.",
  url: `${BASE_URL}/resume-templates/simple`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function SimpleTemplatePage() {
  return (
    <TemplatePage
      config={{
        template: "compact",
        slug: "simple",
        headline: "Simple Resume Template — Clean, One-Page & Free",
        subheadline:
          "Sometimes less is more. Our simple resume template strips away the noise and lets your experience speak for itself. Clean, minimal, and universally professional.",
        whyTitle: "Why a Simple Resume Template Works",
        directAnswer: "A simple resume template uses a minimal one-page layout with no tables, columns, or graphics. It has the highest ATS pass rate of any format, works for every industry and experience level, and lets your content speak for itself. Recruiters spend 7 seconds scanning — simplicity wins.",
        whyBody:
          "Recruiters spend an average of 7 seconds scanning a resume. A simple, uncluttered layout makes those 7 seconds count. There's no visual noise competing for attention — just your name, your experience, and your skills, presented clearly. Simple templates also have the highest ATS pass rates, work for every industry, and print perfectly. Whether you're a student, a career changer, or a seasoned professional, a simple resume is never the wrong choice.",
        features: [
          { title: "Minimal One-Page Layout", desc: "Everything fits on one page — clean, focused, and easy to scan." },
          { title: "Universal Design", desc: "Works for any industry, role, or experience level." },
          { title: "Highest ATS Pass Rate", desc: "No tables, columns, or graphics — parses perfectly with all ATS software." },
          { title: "Fast to Fill", desc: "Simple structure means you can complete your resume in under 30 minutes." },
          { title: "Prints Perfectly", desc: "Clean layout looks great both on screen and when printed on paper." },
          { title: "Free PDF & Word Export", desc: "Download instantly as PDF or .docx. No watermark, no cost." },
        ],
        comparisonRows: [
          { label: "One-page layout", thisTemplate: true, creative: false },
          { label: "Passes all ATS scanners", thisTemplate: true, creative: false },
          { label: "Works for all industries", thisTemplate: true, creative: false },
          { label: "Fast to complete", thisTemplate: true, creative: false },
          { label: "Prints cleanly", thisTemplate: true, creative: true },
          { label: "Free PDF export", thisTemplate: true, creative: true },
        ],
        faqs: [
          { q: "Is a simple resume template good enough?", a: "Yes — for most jobs, a simple, well-written resume outperforms a fancy one. Recruiters value clarity over design. A simple template ensures your content is the focus." },
          { q: "Is this template one page?", a: "Yes. The compact layout is designed to fit your resume on a single page, which is recommended for most professionals with under 10 years of experience." },
          { q: "Can I use this for any job?", a: "Absolutely. The simple template is industry-agnostic and works for tech, finance, healthcare, education, retail, and any other field." },
          { q: "Is it free to download?", a: "Yes, 100% free. No credit card, no watermark. Export as PDF or Word instantly." },
        ],
        relatedTemplates: [
          { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for ATS" },
          { name: "Fresher Template", slug: "fresher", tag: "Entry-level" },
          { name: "Modern Template", slug: "modern", tag: "Two-column" },
        ],
        jsonLd,
      }}
    />
  );
}
