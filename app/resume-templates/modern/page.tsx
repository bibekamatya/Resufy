import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Modern Resume Template (Free Download & Builder)",
  description:
    "Download a free modern resume template with a clean two-column design. Built for professionals who want to stand out. Live preview, PDF & Word export.",
  alternates: { canonical: `${BASE_URL}/resume-templates/modern` },
  openGraph: {
    title: "Modern Resume Template (Free Download & Builder) | Resufy",
    description: "Free modern resume template with live preview and instant PDF export. No watermark.",
    url: `${BASE_URL}/resume-templates/modern`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Modern Resume Template",
  description: "A free modern resume template with a clean two-column layout designed for professionals.",
  url: `${BASE_URL}/resume-templates/modern`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function ModernTemplatePage() {
  return (
    <TemplatePage
      config={{
        template: "modern",
        slug: "modern",
        headline: "Modern Resume Template — Free & Professional",
        subheadline:
          "A clean two-column layout that balances visual appeal with readability. Perfect for professionals in tech, design, marketing, and business who want a contemporary look.",
        whyTitle: "Why Choose a Modern Resume Template?",
        whyBody:
          "A modern resume template signals to recruiters that you're current, professional, and detail-oriented. The two-column layout makes efficient use of space — fitting more information on one page without feeling cluttered. It's ideal for mid-to-senior professionals with 3+ years of experience who have enough content to fill both columns meaningfully. The clean typography and structured hierarchy make it easy for recruiters to scan in under 10 seconds.",
        features: [
          { title: "Two-Column Layout", desc: "Maximizes space efficiency — fits more content on one page without clutter." },
          { title: "Visual Hierarchy", desc: "Clear typographic structure guides the recruiter's eye to what matters most." },
          { title: "Skills Sidebar", desc: "Dedicated sidebar for skills, languages, and certifications — easy to scan." },
          { title: "Professional Typography", desc: "Clean, modern fonts that look great both on screen and in print." },
          { title: "Live Preview", desc: "See every change reflected instantly as you type in the builder." },
          { title: "Free PDF & Word Export", desc: "Download as PDF or .docx with one click. No watermark, ever." },
        ],
        comparisonRows: [
          { label: "Space-efficient layout", thisTemplate: true, creative: false },
          { label: "Skills sidebar", thisTemplate: true, creative: true },
          { label: "Passes most ATS scanners", thisTemplate: true, creative: false },
          { label: "Professional appearance", thisTemplate: true, creative: true },
          { label: "Free PDF export", thisTemplate: true, creative: true },
          { label: "Works for all industries", thisTemplate: true, creative: false },
        ],
        faqs: [
          { q: "Is the modern template ATS-friendly?", a: "It passes most ATS systems, but if you're applying to large corporations with strict ATS, consider our ATS-Friendly template which uses a single-column layout." },
          { q: "Who is the modern template best for?", a: "It's ideal for professionals with 3+ years of experience in tech, marketing, design, finance, or business who want a contemporary, polished look." },
          { q: "Can I customize the colors?", a: "Yes. Resufy lets you customize your resume content fully. The template uses a clean color scheme that works universally." },
          { q: "Is it free to download?", a: "Yes, completely free. No credit card required. Export as PDF or Word with no watermark." },
        ],
        relatedTemplates: [
          { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for ATS" },
          { name: "Simple Template", slug: "simple", tag: "Minimal, one-page" },
          { name: "Creative Template", slug: "creative", tag: "Bold & visual" },
        ],
        jsonLd,
      }}
    />
  );
}
