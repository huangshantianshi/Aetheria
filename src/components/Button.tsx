"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "tribute";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const variantStyles = {
  primary:
    "bg-aether-glow/20 border border-aether-glow/40 text-aether-spirit hover:bg-aether-glow/30 hover:border-aether-glow/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
  ghost:
    "bg-transparent border border-aether-mist/40 text-aether-whisper hover:bg-aether-dusk/50 hover:text-aether-ghost hover:border-aether-mist/60",
  tribute:
    "bg-aether-petal/15 border border-aether-petal/30 text-aether-petal hover:bg-aether-petal/25 hover:border-aether-petal/50 hover:shadow-[0_0_20px_rgba(240,171,252,0.15)]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = "primary", size = "md", icon, className = "", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      className={`
        inline-flex items-center justify-center rounded-xl
        font-medium transition-all duration-300
        ${variantStyles[variant]} ${sizes[size]} ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
});

export default Button;
