import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/ui/AppHeader";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resufy - Professional Resume Builder",
  description: "Create professional resumes with live preview and PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-gray-100`}
      >
        <ErrorBoundary>
          <Providers>
            <AppHeader />
            {children}
            <Toaster position="bottom-right" />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
