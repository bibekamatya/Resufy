import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title?: string | ReactNode;
  description?: string | ReactNode;
  actions?: ReactNode;
  icon?: LucideIcon;
  showActionsOnMobile?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  icon: Icon,
  showActionsOnMobile = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        <div className="min-w-0">
          {title && (
            <h1 className="truncate text-lg font-bold text-gray-900 sm:text-2xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm font-normal text-gray-600">{description}</p>
          )}
        </div>
      </div>
      {actions && (
        <div
          className={`flex shrink-0 items-center gap-2 ${showActionsOnMobile ? "" : "hidden md:flex"}`}
        >
          {actions}
        </div>
      )}
    </div>
  );
};
