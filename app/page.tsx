import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Free Resume Builder Online – ATS-Friendly Templates & PDF Export",
  description:
    "Build your resume for free with Resufy. Choose from 6 ATS-friendly templates, get real-time ATS scoring, and export to PDF or Word instantly. No credit card. No watermark.",
  alternates: {
    canonical: "https://resufy.vercel.app",
  },
};

export default function Home() {
  return <LandingPage />;
}
