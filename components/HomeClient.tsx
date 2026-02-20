"use client";

import { FileText, Sparkles, Download, Eye, Zap, Shield, Clock, CheckCircle2, ArrowRight, Star, Users } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { AuthForm } from "@/components/ui/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

export function HomeClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

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
            and instant PDF export. Join 10,000+ job seekers landing their dream jobs.
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

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>No signup required</span>
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
              <div className="mb-2 text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Pro Templates</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">2min</div>
              <div className="text-sm text-gray-600">Average Build Time</div>
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
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Live Preview</h3>
              <p className="text-gray-600">
                See your resume update in real-time as you type. What you see is exactly what you get.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/40 transition-transform group-hover:scale-110">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">ATS-Friendly Templates</h3>
              <p className="text-gray-600">
                Choose from 6 professionally designed templates optimized for Applicant Tracking Systems.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/40 transition-transform group-hover:scale-110">
                <Download className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Instant PDF Export</h3>
              <p className="text-gray-600">
                Download your resume as a professional PDF with one click. Perfect formatting guaranteed.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-orange-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/40 transition-transform group-hover:scale-110">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Lightning Fast</h3>
              <p className="text-gray-600">
                Build your resume in under 2 minutes. No complicated forms or endless pages.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-pink-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/40 transition-transform group-hover:scale-110">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Privacy First</h3>
              <p className="text-gray-600">
                Your data is stored securely. We never share your information with third parties.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-teal-100 opacity-50 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/40 transition-transform group-hover:scale-110">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Auto-Save</h3>
              <p className="text-gray-600">
                Never lose your progress. Your resume is automatically saved as you work.
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
            Choose from 6 beautifully designed templates, all optimized for ATS systems
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Classic', color: 'from-blue-500 to-blue-600', desc: 'Traditional and professional' },
            { name: 'Modern', color: 'from-indigo-500 to-indigo-600', desc: 'Clean and contemporary' },
            { name: 'Creative', color: 'from-purple-500 to-purple-600', desc: 'Stand out with style' },
            { name: 'Compact', color: 'from-green-500 to-green-600', desc: 'Maximize content space' },
            { name: 'Academic', color: 'from-orange-500 to-orange-600', desc: 'Perfect for research roles' },
            { name: 'Balanced', color: 'from-pink-500 to-pink-600', desc: 'Best of both worlds' }
          ].map((template) => (
            <button
              key={template.name}
              onClick={handleBuildClick}
              className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-5 text-left transition-all hover:border-blue-500 hover:shadow-xl"
            >
              <div className={`mb-4 flex h-40 items-center justify-center rounded-lg bg-gradient-to-br ${template.color} shadow-md`}>
                <div className="w-full space-y-2 px-4">
                  <div className="h-2 w-3/4 rounded bg-white/90"></div>
                  <div className="h-1.5 w-1/2 rounded bg-white/70"></div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-white/60"></div>
                    <div className="h-1.5 w-5/6 rounded bg-white/60"></div>
                    <div className="h-1.5 w-4/6 rounded bg-white/60"></div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-white/60"></div>
                    <div className="h-1.5 w-3/4 rounded bg-white/60"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="mb-1 text-lg font-bold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.desc}</p>
              
              <div className="mt-3 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                <span>Use Template</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Loved by Job Seekers</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              See what our users have to say about Resufy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Sarah Johnson', role: 'Software Engineer', text: 'Landed my dream job at Google! The ATS-friendly templates made all the difference.' },
              { name: 'Michael Chen', role: 'Product Manager', text: 'Super easy to use and the live preview saved me so much time. Highly recommend!' },
              { name: 'Emily Davis', role: 'UX Designer', text: 'Beautiful templates and completely free. Got 3 interview calls in the first week!' }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-gray-700">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              Join 10,000+ professionals who built their resumes with Resufy
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
                <span className="text-sm font-medium">10,000+ resumes created</span>
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
              <p className="text-sm text-gray-500">© 2024 Resufy. Made with ❤️ by Bibek Amatya</p>
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
        </div>
      </footer>
    </div>
  );
}
