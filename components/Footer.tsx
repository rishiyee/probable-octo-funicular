"use client"

import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-6 py-10 mx-auto">
      <div className="flex gap-10">
        {/* Left side – Brand / Initials */}
        <div className="text-[#1d1d1d] text-[224px] font-[400] leading-none">
          RHI
        </div>

        {/* Divider */}
        <div className="w-px bg-white/60" />

        {/* Right side – Links */}
        <nav className="flex-1 flex flex-col">
          <FooterLink>About</FooterLink>
          <FooterLink>Contact </FooterLink>
          <FooterLink>Works </FooterLink>
          <FooterLink>Education </FooterLink>
          <FooterLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to Top
          </FooterLink>

          {/* Bottom legal links */}
          <div className="mt-8 flex gap-6 text-xs text-white/60">
            <span className="cursor-pointer hover:text-white">Disclaimer</span>
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
