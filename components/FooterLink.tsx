"use client";
import React from "react";

type FooterLinkProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const FooterLink = ({ children, onClick }: FooterLinkProps) => {
  return (
    <div
      onClick={onClick}
      className="group self-stretch cursor-pointer"
    >
      {/* LINE */}
      <div className="relative w-full h-[1px] overflow-hidden">
        {/* Base static line */}
        <div className="absolute inset-0 h-[1px] bg-[#4D4D4D] opacity-40" />

        {/* Animated overlay */}
        <div
          className="
            absolute inset-0 h-[1px] bg-[#FFFFFF]
            scale-x-0
            origin-left
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-x-100
            group-hover:origin-left
            group-not-hover:origin-right
          "
        />
      </div>

      {/* Label */}
      <div
        className="
          py-3
          text-white
          font-['SF Pro']
          text-[18px]
          font-[510]
          leading-normal
          transition-opacity
          group-hover:opacity-80
        "
      >
        {children}
      </div>
    </div>
  );
};

export default FooterLink;
