"use client";

import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-4 sm:px-6 py-8 sm:py-10 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* Brand / Initials */}
        <div
          className="
            w-full lg:w-auto
            text-[#1d1d1d]
            text-[96px] sm:text-[140px] lg:text-[224px]
            font-[400] leading-none
            text-center lg:text-left
          "
        >
          RHI
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-white/60" />
        <div className="block lg:hidden h-px bg-white/20 w-full" />

        {/* Links */}
        <nav className="flex-1 flex flex-col items-center lg:items-start">
          <FooterLink>About</FooterLink>
          <FooterLink>Contact</FooterLink>
          <FooterLink>Works</FooterLink>
          <FooterLink>Education</FooterLink>
          <FooterLink
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            Back to Top
          </FooterLink>

          {/* Legal */}
          <div className="mt-6 sm:mt-8 flex gap-4 sm:gap-6 text-xs text-white/60">
            <span className="cursor-pointer hover:text-white">
              Disclaimer
            </span>
            <span className="cursor-pointer hover:text-white">
              Privacy Policy
            </span>
          </div>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
