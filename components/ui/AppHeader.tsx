import Link from "next/link";
import { ReactNode } from "react";
import { FileText } from "lucide-react";

type AppHeaderProps = {
  logoHref?: string;
  actionLabel?: string;
  actionHref?: string;
  rightSlot?: ReactNode; // for future custom actions
};

export function AppHeader({
  logoHref = "/",
  actionLabel = "Edit Details",
  actionHref = "/builder",
  rightSlot,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <Link href={logoHref} className="text-xl font-bold">
            ResuCraft
          </Link>
        </div>

        {rightSlot ? (
          rightSlot
        ) : (
          <Link
            href={actionHref}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </header>
  );
}
