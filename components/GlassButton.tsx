"use client";

import { ReactNode } from "react";

interface GlassButtonProps {
  label: string;
  href?: string; // new
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  textClassName?: string;
  className?: string;
}

export default function GlassButton({
  label,
  href,
  leftIcon,
  rightIcon,
  onClick,
  textClassName = "text-white font-bold",
  className = "",
}: GlassButtonProps) {
  const baseClasses = `
    flex justify-center items-center gap-2 
    px-8 py-4 rounded-full 
    transition-transform duration-300 ease-in-out 
    hover:scale-105
    ${className}
  `;

  const baseStyle = {
    background: "rgba(255, 255, 255, 0.10)",
    backdropFilter: "blur(10.65px)",
  };

  if (href) {
    // If href is passed → render as <a>
    return (
      <a href={href} className={baseClasses} style={baseStyle}>
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        <span className={textClassName}>{label}</span>
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </a>
    );
  }

  // Default → render as <button>
  return (
    <button onClick={onClick} className={baseClasses} style={baseStyle}>
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span className={textClassName}>{label}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
