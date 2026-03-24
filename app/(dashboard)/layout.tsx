import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardProvider } from "@/components/DashboardProvider";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/");
  }

  return (
    <DashboardProvider user={session.user}>
      {children}
    </DashboardProvider>
  );
}