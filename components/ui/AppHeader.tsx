"use client";

import Link from "next/link";
import { FileText, LogOut, Menu, X } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Button } from "./Button";
import { DarkModeToggle } from "./DarkModeToggle";
import { useState } from "react";

type AppHeaderProps = {
  initialUser: User | null;
};

export function AppHeader({ initialUser }: AppHeaderProps) {
  const supabase = useSupabase();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const getUserInitial = () => {
    return initialUser?.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/30">
            <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-20 blur-lg"></div>
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-bold leading-none tracking-tight text-gray-900">Resufy</div>
            <div className="text-[10px] font-medium leading-none text-gray-500">Professional Resume Builder</div>
          </div>
          <div className="text-xl font-bold text-gray-900 sm:hidden">Resufy</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {pathname === "/" && (
            <nav className="flex items-center gap-1">
              <Link href="#features" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900">
                Features
              </Link>
              <Link href="#templates" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900">
                Templates
              </Link>
              <Link href="#how-it-works" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900">
                How It Works
              </Link>
            </nav>
          )}
          
          <DarkModeToggle />
          
          {initialUser ? (
            <div className="flex items-center gap-2">
              <Link href={pathname === "/builder" ? "/resume" : "/builder"}>
                <Button variant="primary" size="md">
                  {pathname === "/builder" ? "Preview" : pathname === "/resume" ? "Editor" : "Dashboard"}
                </Button>
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                >
                  {initialUser.user_metadata?.avatar_url ? (
                    <Image
                      src={initialUser.user_metadata.avatar_url}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-gray-200"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
                      {getUserInitial()}
                    </div>
                  )}
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 p-3">
                      <div className="text-xs font-medium text-gray-500">Signed in as</div>
                      <div className="mt-1 truncate text-sm font-semibold text-gray-900">{initialUser.email}</div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href="/builder">
              <Button variant="primary" size="md" icon={FileText}>
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {initialUser ? (
            <>
              <Link href={pathname === "/builder" ? "/resume" : "/builder"}>
                <Button variant="primary" size="sm">
                  {pathname === "/builder" ? "Preview" : "Editor"}
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <Link href="/builder">
              <Button variant="primary" size="sm" icon={FileText}>
                Start Free
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && initialUser && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              {initialUser.user_metadata?.avatar_url ? (
                <Image
                  src={initialUser.user_metadata.avatar_url}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="rounded-full ring-2 ring-white"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                  {getUserInitial()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{initialUser.email?.split('@')[0]}</span>
                <span className="text-xs text-gray-500">{initialUser.email}</span>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="md" icon={LogOut} className="w-full">
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
