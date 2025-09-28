"use client";
import React from "react";

type PillProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  children?: React.ReactNode; // for icons or other content
};

export default function Pill({ size = "md", label, children }: PillProps) {
  return (
    <span
      className={`
        inline-flex w-auto justify-center items-center gap-1.5 
        rounded-full border border-white text-white 
        ${size === "sm" ? "px-3 py-1 text-sm" : ""}
        ${size === "md" ? "px-4 py-2 text-base" : ""}
        ${size === "lg" ? "px-5 py-3 text-lg" : ""}
      `}
    >
      {children}
      {label && <span>{label}</span>}
    </span>
  );
}
