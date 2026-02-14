import Link from "next/link";
import { FileText, Sparkles, Download, Eye } from "lucide-react";
import { AppHeader } from "@/components/ui/AppHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AppHeader actionLabel="Build Resume" actionHref="/builder" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600">
          <Sparkles className="h-4 w-4" />
          <span>Free & Open Source</span>
        </div>

        <h2 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          Build Your Professional
          <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Resume in Minutes
          </span>
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Create stunning resumes with live preview, multiple templates, and
          instant PDF export. No sign-up required.
        </p>

        <Link
          href="/builder"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
        >
          Get Started Free
          <FileText className="h-5 w-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <h3 className="mb-12 text-center text-3xl font-bold">Why ResuCraft?</h3>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Live Preview</h4>
            <p className="text-gray-600">
              See your resume update in real-time as you type. No surprises.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Multiple Templates</h4>
            <p className="text-gray-600">
              Choose from professional templates designed for ATS systems.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="mb-2 text-xl font-semibold">Instant Export</h4>
            <p className="text-gray-600">
              Download your resume as a professional PDF with one click.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50 p-12 text-center">
          <h3 className="mb-4 text-3xl font-bold">
            Ready to Build Your Resume?
          </h3>
          <p className="mb-6 text-lg text-gray-600">
            Join thousands of job seekers creating professional resumes
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Start Building Now
            <FileText className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500">
          <p>Made with ❤️ by Bibek Amatya</p>
        </div>
      </footer>
    </div>
  );
}
