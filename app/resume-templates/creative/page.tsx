import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Creative Resume Template (Free Download & Builder)",
  description:
    "Stand out with a free creative resume template. Bold design with color accents — perfect for designers, marketers, and creatives. PDF & Word export.",
  alternates: { canonical: `${BASE_URL}/resume-templates/creative` },
  openGraph: {
    title: "Creative Resume Template (Free Download) | Resufy",
    description: "Free creative resume template with bold design. Perfect for designers and marketers. PDF & Word export.",
    url: `${BASE_URL}/resume-templates/creative`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Creative Resume Template",
  description: "A free creative resume template with bold design and color accents for designers, marketers, and creative professionals.",
  url: `${BASE_URL}/resume-templates/creative`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function CreativeTemplatePage() {
  return (
    <TemplatePage
      config={{
        template: "creative",
        slug: "creative",
        headline: "Creative Resume Template — Bold, Free & Customizable",
        subheadline:
          "Make a memorable first impression. Our creative resume template uses a striking sidebar design with color accents — ideal for designers, marketers, content creators, and anyone in a creative field.",
        whyTitle: "When to Use a Creative Resume Template",
        whyBody:
          "A creative resume template is the right choice when the job itself values creativity and visual communication — think graphic design, UX/UI, marketing, advertising, content creation, photography, or architecture. In these fields, your resume is also a portfolio piece. A visually distinctive layout signals that you understand design principles and can communicate visually. However, be aware that creative templates may not pass all ATS systems — if you're applying through an online portal at a large company, consider pairing this with our ATS-friendly version.",
        features: [
          { title: "Bold Sidebar Design", desc: "Striking color sidebar that immediately differentiates your resume from the stack." },
          { title: "Visual Hierarchy", desc: "Designed to guide the recruiter's eye through your most important information." },
          { title: "Skills & Languages Section", desc: "Sidebar includes dedicated space for skills, languages, and certifications." },
          { title: "Professional Color Scheme", desc: "Tasteful color accents that look bold without being unprofessional." },
          { title: "Live Preview", desc: "See your resume update in real time as you fill in your details." },
          { title: "Free PDF & Word Export", desc: "Download as PDF or .docx instantly. No watermark, no cost." },
        ],
        comparisonRows: [
          { label: "Visually distinctive", thisTemplate: true, creative: true },
          { label: "Color sidebar design", thisTemplate: true, creative: false },
          { label: "Best for creative roles", thisTemplate: true, creative: false },
          { label: "Passes all ATS scanners", thisTemplate: false, creative: false },
          { label: "Professional appearance", thisTemplate: true, creative: true },
          { label: "Free PDF export", thisTemplate: true, creative: true },
        ],
        faqs: [
          { q: "Who should use a creative resume template?", a: "Creative templates are best for designers, marketers, content creators, photographers, architects, and anyone applying to roles where visual communication is valued." },
          { q: "Will a creative template pass ATS?", a: "Creative templates with sidebars may not pass all ATS systems. If you're applying through a large company's online portal, use our ATS-Friendly template instead. For direct applications or smaller companies, the creative template works great." },
          { q: "Can I use this for a tech job?", a: "It depends on the company. Startups and design-focused tech companies often appreciate creative resumes. For large tech corporations with strict ATS, use the ATS-Friendly or Modern template." },
          { q: "Is it free?", a: "Yes, 100% free. No credit card, no watermark. Download as PDF or Word instantly." },
        ],
        relatedTemplates: [
          { name: "Modern Template", slug: "modern", tag: "Two-column, clean" },
          { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for ATS" },
          { name: "Simple Template", slug: "simple", tag: "Minimal" },
        ],
        jsonLd,
      }}
    />
  );
}
