import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-sm text-gray-600">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};
