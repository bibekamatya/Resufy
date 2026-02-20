import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => {
  return (
    <div
      className={`
        rounded-lg border border-gray-200 bg-white p-4 shadow-sm
        ${hover ? "transition-all hover:shadow-md" : ""}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string | ReactNode;
  action?: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, action }) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-medium text-blue-600">{title}</h3>
      {action && <div>{action}</div>}
    </div>
  );
};
