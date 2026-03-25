"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthForm } from "@/components/ui/AuthForm";

export function HeroCTA() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

  const loading = status === "loading";
  const user = session?.user;

  const handleBuildClick = () => {
    if (!loading && !user) setShowAuth(true);
    else if (user) router.push("/builder");
  };

  if (showAuth && !user) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAuth(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <AuthForm />
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button
          onClick={handleBuildClick}
          disabled={loading}
          variant="primary"
          size="lg"
          icon={FileText}
          className="shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40"
        >
          Start Building Free
        </Button>
        <Button
          onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
          variant="outline"
          size="lg"
          icon={Eye}
        >
          View Templates
        </Button>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600">
        {["Quick Sign Up", "100% Free", "ATS Optimized"].map((t) => (
          <div key={t} className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function CtaSectionButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);

  const user = session?.user;

  const handleClick = () => {
    if (!session?.user) setShowAuth(true);
    else router.push("/builder");
  };

  if (showAuth && !user) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setShowAuth(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        <AuthForm />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Button
        onClick={handleClick}
        disabled={status === "loading"}
        variant="primary"
        size="lg"
        icon={FileText}
        className="bg-white text-blue-600 shadow-xl hover:bg-gray-50"
      >
        Create Your Resume Now
      </Button>
      <div className="flex items-center gap-2 text-white">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm font-medium">Free forever, no credit card</span>
      </div>
    </div>
  );
}
