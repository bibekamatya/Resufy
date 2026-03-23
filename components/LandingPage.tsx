"use client";

import { FileText, Sparkles, Download, Eye, Zap, Shield, Clock, CheckCircle2, ArrowRight, Star, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { AuthForm } from "@/components/ui/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { BalancedTemplate } from "@/components/templates/BalancedTemplate";
import { sampleResumeData } from "@/lib/data";

export function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  
  const user = session?.user;
  const loading = status === 'loading';

  const handleBuildClick = () => {
    if (!loading && !user) {
      setShowAuth(true);
    } else if (user) {
      router.push("/builder");
    }
  };

  if (showAuth && !user) {
    return <AuthForm />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-sm font-medium text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Free Forever • No Credit Card Required</span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Create Your Dream Resume
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              In Minutes, Not Hours
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Professional resume builder with live preview, ATS-friendly templates, 
            and instant PDF export. Start building your resume for free.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={handleBuildClick}
              variant="primary"
              size="lg"
              icon={FileText}
              className="shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40"
            >
              Start Building Free
            </Button>
            <Button
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              icon={Eye}
            >
              View Templates
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>Quick Sign Up</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>ATS Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Pro Templates</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">ATS</div>
              <div className="text-sm text-gray-600">Optimized</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">PDF</div>
              <div className="text-sm text-gray-600">Instant Export</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">Free</div>
              <div className="text-sm text-gray-600">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Everything You Need to Stand Out</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Powerful features designed to help you create a resume that gets noticed by recruiters and passes ATS systems.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40 transition-transform group-hover:scale-110">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Multiple Profiles</h3>
              <p className="text-gray-600">
                Create, rename, delete, and duplicate resume profiles. Set default and share with others.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/40 transition-transform group-hover:scale-110">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Visibility Controls</h3>
              <p className="text-gray-600">
                Toggle visibility for individual entries. Show or hide experience, projects, skills, and more.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/40 transition-transform group-hover:scale-110">
                <Download className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">6 PDF Templates</h3>
              <p className="text-gray-600">
                Classic, Modern, Compact, Creative, Academic, Balanced. All ATS-friendly with clean PDF export.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-orange-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/40 transition-transform group-hover:scale-110">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">ATS Scoring</h3>
              <p className="text-gray-600">
                Real-time ATS optimization with keyword suggestions. Get instant feedback to improve your resume.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-pink-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/40 transition-transform group-hover:scale-110">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Share Resumes</h3>
              <p className="text-gray-600">
                Generate public links to share your resume for feedback. Perfect for getting input from mentors.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-teal-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/40 transition-transform group-hover:scale-110">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Skills & More</h3>
              <p className="text-gray-600">
                Skills autocomplete and secure authentication with Google OAuth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Three simple steps to create your professional resume
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="relative text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-3xl font-bold text-white shadow-xl shadow-blue-500/40">
                  1
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Fill Your Information</h3>
              <p className="text-gray-600">
                Enter your details in our easy-to-use form. Add experience, education, skills, and projects.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-3xl font-bold text-white shadow-xl shadow-indigo-500/40">
                  2
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Choose a Template</h3>
              <p className="text-gray-600">
                Select from our collection of professional, ATS-friendly templates that suit your style.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-3xl font-bold text-white shadow-xl shadow-purple-500/40">
                  3
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold">Download & Apply</h3>
              <p className="text-gray-600">
                Export your resume as a PDF and start applying to your dream jobs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Professional Templates</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            6 templates built for real-world hiring — clean, structured, and ATS-friendly
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { name: "Classic", desc: "Traditional", tag: "Most Popular", Template: ClassicTemplate },
            { name: "Modern", desc: "Two-column", tag: "Clean", Template: ModernTemplate },
            { name: "Creative", desc: "Blue sidebar", tag: "Bold", Template: CreativeTemplate },
            { name: "Compact", desc: "Space-efficient", tag: "Minimal", Template: CompactTemplate },
            { name: "Academic", desc: "Formal", tag: "Formal", Template: AcademicTemplate },
            { name: "Balanced", desc: "Two-column", tag: "Versatile", Template: BalancedTemplate },
          ].map(({ name, desc, tag, Template }) => (
            <button key={name} onClick={handleBuildClick}
              className="group snap-start shrink-0 w-48 overflow-hidden rounded-xl border-2 border-gray-200 bg-white text-left transition-all hover:border-blue-500 hover:shadow-xl"
            >
              <div className="overflow-hidden relative border-b border-gray-100 bg-white" style={{ paddingBottom: "130%" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(0.245)", transformOrigin: "top left", width: "408%", height: "408%" }}>
                  <Template data={sampleResumeData} />
                </div>
                <div className="absolute inset-0 bg-transparent group-hover:bg-blue-500/5 transition-colors" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm text-gray-900">{name}</span>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                </div>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-center shadow-2xl sm:p-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative">
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Ready to Land Your Dream Job?
            </h2>
            <p className="mb-8 text-lg text-blue-100 sm:text-xl">
              Join professionals who built their resumes with Resufy
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={handleBuildClick}
                variant="primary"
                size="lg"
                icon={FileText}
                className="bg-white text-blue-600 shadow-xl hover:bg-gray-50"
              >
                Create Your Resume Now
              </Button>
              <div className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Free forever, no credit card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40">
                  <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-gray-900">Resufy</span>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                Professional resume builder helping job seekers create ATS-friendly resumes in minutes.
              </p>
              <p className="hidden md:block text-sm text-gray-500">© 2026 Resufy. Made with ❤️ by Bibek Amatya</p>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                <li><a href="#templates" className="hover:text-blue-600">Templates</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-6 text-center md:hidden">
            <p className="text-sm text-gray-500">© 2026 Resufy. Made with ❤️ by Bibek Amatya</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
