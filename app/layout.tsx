import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { AppHeader } from "@/components/ui/AppHeader";
import { getUser } from "@/lib/supabase/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-gray-100`}
      >
        <AuthProvider>
          <AppHeader initialUser={user} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
