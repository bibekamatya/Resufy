import Link from "next/link";
import { FileText, Sparkles, Download, Eye } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold">ResuCraft</h1>
          </div>
          <Link
            href="/builder"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
          >
            Create Resume
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Free & Open Source</span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Build Your Professional
          <br />
          Resume in Minutes
        </h2>
        
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Create stunning resumes with live preview, multiple templates, and instant PDF export. No sign-up required.
        </p>

        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-lg"
        >
          Get Started Free
          <FileText className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why ResuCraft?</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Live Preview</h4>
            <p className="text-slate-400">
              See your resume update in real-time as you type. No surprises.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Multiple Templates</h4>
            <p className="text-slate-400">
              Choose from professional templates designed for ATS systems.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Instant Export</h4>
            <p className="text-slate-400">
              Download your resume as a professional PDF with one click.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h3>
          <p className="text-slate-400 mb-6 text-lg">
            Join thousands of job seekers creating professional resumes
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Start Building Now
            <FileText className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          <p>Made with ❤️ by Bibek Amatya</p>
        </div>
      </footer>
    </div>
  );
}
