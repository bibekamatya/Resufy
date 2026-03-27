import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "One Page Resume Template (Free Download & Builder)",
  description:
    "Free one-page resume template that fits everything on a single page. Clean, concise, and ATS-friendly. Download as PDF or Word instantly. No watermark.",
  alternates: { canonical: `${BASE_URL}/resume-templates/one-page` },
  openGraph: {
    title: "One Page Resume Template (Free) | Resufy",
    description: "Free one-page resume template. Clean, concise, ATS-friendly. PDF & Word export. No watermark.",
    url: `${BASE_URL}/resume-templates/one-page`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "One Page Resume Template",
  description: "A free one-page resume template that fits all your experience, education, and skills on a single, clean page.",
  url: `${BASE_URL}/resume-templates/one-page`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function OnePageTemplatePage() {
  return (
    <TemplatePage
      config={{
        template: "balanced",
        slug: "one-page",
        headline: "One Page Resume Template — Free & Concise",
        subheadline:
          "Recruiters prefer one-page resumes. Our balanced two-column layout fits your full work history, education, skills, and projects on a single page — without feeling cramped.",
        whyTitle: "Why One Page Resumes Win",
        directAnswer: "A one-page resume is preferred by most recruiters for professionals with under 10 years of experience. It forces you to include only the most relevant information, respects the recruiter's time, and is easier to scan in the 7 seconds they spend on initial review. Use a space-efficient layout to fit everything cleanly.",
        whyBody:
          "Studies show that recruiters spend an average of 7 seconds on an initial resume scan. A one-page resume respects their time and forces you to include only what's most relevant — which is exactly what hiring managers want. Unless you have 10+ years of experience, a one-page resume is the industry standard. Our one-page template uses a balanced two-column layout to maximize space efficiency, fitting everything you need without sacrificing readability or ATS compatibility.",
        features: [
          { title: "Balanced Two-Column Layout", desc: "Maximizes space — fits more content on one page without clutter." },
          { title: "Space-Efficient Design", desc: "Carefully spaced sections that feel open, not cramped." },
          { title: "All Sections Included", desc: "Experience, education, skills, projects, certifications — all on one page." },
          { title: "ATS Compatible", desc: "Clean structure that passes applicant tracking systems." },
          { title: "Professional Appearance", desc: "Polished layout that looks great to both humans and ATS." },
          { title: "Free PDF & Word Export", desc: "Download as PDF or .docx instantly. No watermark, no cost." },
        ],
        comparisonRows: [
          { label: "Fits on one page", thisTemplate: true, creative: false },
          { label: "Space-efficient layout", thisTemplate: true, creative: false },
          { label: "All sections included", thisTemplate: true, creative: true },
          { label: "ATS compatible", thisTemplate: true, creative: false },
          { label: "Professional appearance", thisTemplate: true, creative: true },
          { label: "Free PDF export", thisTemplate: true, creative: true },
        ],
        faqs: [
          { q: "Should my resume be one page?", a: "For most professionals with under 10 years of experience, yes. One-page resumes are preferred by the majority of recruiters. If you have 10+ years of highly relevant experience, two pages is acceptable." },
          { q: "How do I fit everything on one page?", a: "Focus on the last 5-7 years of experience, use bullet points instead of paragraphs, remove outdated or irrelevant roles, and use our compact layout which is designed to maximize space." },
          { q: "Is this template ATS-friendly?", a: "Yes. Despite the two-column layout, it uses a clean structure that most ATS systems can parse. For maximum ATS compatibility, use our ATS-Friendly single-column template." },
          { q: "Is it free?", a: "Yes, 100% free. No credit card, no watermark. Download as PDF or Word instantly." },
        ],
        relatedTemplates: [
          { name: "Simple Template", slug: "simple", tag: "Minimal, clean" },
          { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for ATS" },
          { name: "Modern Template", slug: "modern", tag: "Two-column" },
        ],
        jsonLd,
      }}
    />
  );
}
