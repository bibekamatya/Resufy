import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  iconClassName?: string;
  iconAlignment?: "left" | "right";
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  as?: "button" | "span";
}

const VARIANT_CLASSES = {
  primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40",
  secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-lg shadow-gray-500/30",
  outline: "border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg shadow-red-500/30",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon: Icon,
      iconClassName,
      iconAlignment = "left",
      children,
      disabled = false,
      isLoading = false,
      variant = "primary",
      size = "md",
      className = "",
      as = "button",
      ...rest
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; id: number }>
    >([]);
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);

      if (rest.onClick) {
        rest.onClick(e);
      }
    };

    const buttonClasses = `
      relative overflow-hidden flex gap-2 items-center justify-center 
      cursor-pointer rounded-lg text-center font-semibold
      focus:outline-none focus:ring-2 focus:ring-blue-500/20
      transition-all duration-200 ease-out 
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-95
      ${VARIANT_CLASSES[variant]}
      ${SIZE_CLASSES[size]}
      ${className}
    `.trim();

    const Component = as;

    return (
      <Component
        ref={as === "button" ? ref : undefined}
        {...(as === "button" ? rest : {})}
        onClick={as === "button" ? handleClick : undefined}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={buttonClasses}
        disabled={as === "button" ? isLoading || disabled : undefined}
      >
        {/* Material ripple effect */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="animate-ripple pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
          />
        ))}

        {Icon && iconAlignment === "left" && !isLoading && (
          <Icon className={`h-4 w-4 ${iconClassName || ""}`} />
        )}

        {isLoading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.span>
        )}

        {children}

        {Icon && iconAlignment === "right" && !isLoading && (
          <Icon className={`h-4 w-4 ${iconClassName || ""}`} />
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";
