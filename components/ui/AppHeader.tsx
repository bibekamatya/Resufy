"use client";

import Link from "next/link";
import { FileText, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./Button";
import { useState } from "react";
import { AuthForm } from "@/components/ui/AuthForm";
import { signOut, useSession } from "next-auth/react";

export function AppHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleGetStarted = () => {
    if (user) router.push("/builder");
    else setShowAuth(true);
  };

  if (showAuth) return <AuthForm />;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getUserInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const isDashboard = pathname === "/builder" || pathname === "/resume";

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
            <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">Resufy</div>
            <div className="hidden sm:block text-[10px] text-gray-500 -mt-0.5">Resume Builder</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {pathname === "/" && (
                <nav className="flex items-center gap-1">
                  <Link href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Features
                  </Link>
                  <Link href="#templates" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Templates
                  </Link>
                </nav>
              )}
              
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:ring-2 hover:ring-blue-500/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                    {getUserInitial()}
                  </div>
                </button>
                
                {profileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 z-50 rounded-xl border border-gray-200 bg-white shadow-xl">
                      <div className="border-b border-gray-100 p-4">
                        <div className="text-xs font-medium text-gray-500 mb-1">Signed in as</div>
                        <div className="truncate text-sm font-semibold text-gray-900">{user.email}</div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {pathname === "/" && (
                <nav className="flex items-center gap-1">
                  <Link href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Features
                  </Link>
                  <Link href="#templates" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Templates
                  </Link>
                </nav>
              )}
              <button onClick={handleGetStarted}>
                <Button variant="primary" size="md" icon={FileText}>Get Started</Button>
              </button>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:ring-2 hover:ring-blue-500/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                  {getUserInitial()}
                </div>
              </button>
              
              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-64 z-50 rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 p-4">
                      <div className="text-xs font-medium text-gray-500 mb-1">Signed in as</div>
                      <div className="truncate text-sm font-semibold text-gray-900">{user.email}</div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button onClick={handleGetStarted} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl active:scale-95 transition-all">
                <FileText className="h-4 w-4" />
                Get Started
              </button>
          )}
        </div>
      </div>
    </header>
  );
}
