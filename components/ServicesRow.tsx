"use client";

import React from "react";
import Link from "next/link";

type ServicesRowProps = {
  primary?: string;
  secondary?: string;
  href?: string;
  showBorder?: boolean;
  iconSize?: number;
  onClick?: () => void;
};

export default function ServicesRow({
  primary = "UI UX",
  secondary = "01",
  href,
  showBorder = true,
  iconSize = 20,
  onClick,
}: ServicesRowProps) {
  const Wrapper: any = href ? Link : "div";
  const wrapperProps = href
    ? { href, className: "block w-full" }
    : { className: "block w-full" };

  return (
    <Wrapper {...wrapperProps}>
      <button
        type="button"
        onClick={onClick}
        className={`group w-full flex items-center justify-between py-5 gap-4 text-left bg-transparent transition-all duration-300 ${
          showBorder ? "border-t border-[#797979]" : ""
        }`}
        aria-label={`${primary} services row`}
      >
        {/* Left: labels */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">

            {/* Secondary (01) */}
            <span
              className="text-[20px] leading-none"
              style={{
                color: "#7D7D7D",
                fontFamily: "var(--font-sfpro)",
                fontStyle: "normal",
                letterSpacing: "-0.4px",
                fontWeight: 510,
              }}
            >
              {secondary}
            </span>

            {/* Primary (UI UX) */}
            <span
              className="text-white text-[24px] leading-none"
              style={{
                fontFamily: "var(--font-sfpro)",
                fontStyle: "normal",
                letterSpacing: "-0.48px",
                fontWeight: 510,
              }}
            >
              {primary}
            </span>

          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center relative w-6 h-6">
          {/* NorthEast (default) */}
          <span
            className="material-symbols-rounded text-white absolute inset-0 flex items-center justify-center
                       transition-all duration-300 ease-out
                       opacity-100 group-hover:opacity-0 group-hover:translate-x-1"
            style={{ fontSize: iconSize }}
          >
            north_east
          </span>

          {/* Arrow Forward (hover) */}
          <span
            className="material-symbols-rounded text-white absolute inset-0 flex items-center justify-center
                       transition-all duration-300 ease-out
                       opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
            style={{ fontSize: iconSize }}
          >
            arrow_forward
          </span>
        </div>

      </button>
    </Wrapper>
  );
}
