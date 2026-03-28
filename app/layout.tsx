import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/ui/AppHeader";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://resufy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Resufy – Free Resume Builder | ATS-Friendly Templates",
    template: "%s | Resufy",
  },
  description:
    "Build a professional resume in minutes with Resufy. Free resume builder with ATS-friendly templates, live preview, PDF & Word export, and real-time ATS scoring. No credit card required.",
  keywords: [
    "free resume maker",
    "create resume online free",
    "make a resume",
    "free resume templates",
    "how to make a resume",
    "resume maker",
    "online resume maker free",
    "create a resume for free",
    "resume creator",
    "free CV maker",
    "resume templates free download",
    "make resume for job",
    "resume for freshers",
    "simple resume maker",
    "best free resume maker 2025",
  ],
  authors: [{ name: "Bibek Amatya", url: "https://github.com/bibekamatya" }],
  creator: "Bibek Amatya",
  publisher: "Resufy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Resufy",
    title: "Resufy – Free Resume Builder | ATS-Friendly Templates",
    description:
      "Create a professional, ATS-optimized resume in minutes. 6 templates, live preview, PDF & Word export. 100% free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resufy – Free Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resufy – Free Resume Builder | ATS-Friendly Templates",
    description:
      "Create a professional, ATS-optimized resume in minutes. 6 templates, live preview, PDF & Word export. 100% free.",
    images: ["/og-image.png"],
    creator: "@bibekamatya",
  },
  verification: {
    google: "H-hP6QjBrh2wJZ9C2HrKBdyAlXEWLHHDpPPgZKbYLJw",
  },
  category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user ? {
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "",
  } : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <Providers>
            <AppHeader user={user} />
            {children}
            <Toaster position="bottom-right" />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
