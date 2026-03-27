import type { Metadata } from "next";
import { TemplatePage } from "@/components/TemplatePage";

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  title: "Resume Template for Freshers (Free, No Experience Needed)",
  description:
    "Free resume template for freshers and students with no work experience. Highlights education, projects, and skills. ATS-friendly. Download as PDF instantly.",
  alternates: { canonical: `${BASE_URL}/resume-templates/fresher` },
  openGraph: {
    title: "Resume Template for Freshers (Free) | Resufy",
    description: "Free resume template for freshers. No experience needed. ATS-friendly. PDF & Word export.",
    url: `${BASE_URL}/resume-templates/fresher`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Resume Template for Freshers",
  description: "A free resume template designed for freshers, students, and entry-level job seekers with no work experience.",
  url: `${BASE_URL}/resume-templates/fresher`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  brand: { "@type": "Brand", name: "Resufy" },
};

export default function FresherTemplatePage() {
  return (
    <TemplatePage
      config={{
        template: "academic",
        slug: "fresher",
        headline: "Resume Template for Freshers — Free & ATS-Friendly",
        subheadline:
          "No work experience? No problem. Our fresher resume template is designed to highlight your education, projects, internships, and skills — so you can land your first job with confidence.",
        whyTitle: "How to Write a Resume With No Experience",
        directAnswer: "A fresher resume leads with education, academic projects, internships, and skills instead of work history. Recruiters hiring freshers look for potential and relevant skills — not years of experience. Use a clean ATS-friendly format with clear section headers so your resume reaches a human recruiter.",
        whyBody:
          "As a fresher, your resume needs a different strategy than an experienced professional. Instead of leading with work history, you lead with education, academic projects, internships, certifications, and skills. Recruiters hiring freshers know you don't have years of experience — they're looking for potential, learning ability, and relevant skills. Our fresher template is structured to put your strongest assets front and center, while the ATS-friendly format ensures your resume actually reaches a human recruiter.",
        features: [
          { title: "Education-First Layout", desc: "Puts your degree and academic achievements at the top where recruiters expect them." },
          { title: "Projects Section", desc: "Dedicated space for academic projects, personal projects, and GitHub work." },
          { title: "Skills Highlight", desc: "Prominent skills section to showcase technical and soft skills." },
          { title: "Internship Ready", desc: "Structured to include internships, part-time work, and volunteer experience." },
          { title: "ATS-Friendly Format", desc: "Clean single-column layout that passes all applicant tracking systems." },
          { title: "Free PDF & Word Export", desc: "Download your resume instantly. No watermark, no cost." },
        ],
        comparisonRows: [
          { label: "Education-first layout", thisTemplate: true, creative: false },
          { label: "Projects section included", thisTemplate: true, creative: true },
          { label: "Works with no experience", thisTemplate: true, creative: true },
          { label: "Passes ATS scanners", thisTemplate: true, creative: false },
          { label: "Skills highlight section", thisTemplate: true, creative: true },
          { label: "Free PDF export", thisTemplate: true, creative: true },
        ],
        faqs: [
          { q: "Can I use this template with no work experience?", a: "Yes, it's designed specifically for that. Focus on your education, academic projects, internships, certifications, and skills. Recruiters hiring freshers expect this." },
          { q: "What should a fresher put on a resume?", a: "Include: education (degree, GPA if strong), academic or personal projects, internships or part-time work, technical skills, certifications, and extracurricular activities or leadership roles." },
          { q: "Should a fresher resume be one page?", a: "Yes. As a fresher, keep your resume to one page. Recruiters won't read more, and a concise resume shows you can prioritize information." },
          { q: "Is this template free?", a: "Yes, 100% free. No credit card, no watermark. Download as PDF or Word instantly." },
          { q: "Is this template ATS-friendly?", a: "Yes. It uses a clean single-column layout with standard section headers that all ATS software can parse correctly." },
        ],
        relatedTemplates: [
          { name: "Simple Template", slug: "simple", tag: "Minimal, one-page" },
          { name: "ATS-Friendly Template", slug: "ats-friendly", tag: "Best for ATS" },
          { name: "Modern Template", slug: "modern", tag: "Two-column" },
        ],
        jsonLd,
      }}
    />
  );
}
