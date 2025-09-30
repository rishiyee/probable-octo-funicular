// Footer.tsx
"use client";

import HeroFooter from "./HeroFooter";

export default function Footer() {
  return (
    <footer className="w-full min-h-[50vh] bg-black p-10 md:p-20 flex flex-col justify-start gap-10">
      
      {/* Links Section */}
      <div className="flex w-full justify-between flex-wrap gap-10">
        {/* Navigation Links */}
        <div className="flex flex-col gap-2 font-light">
          <h2 className="text-white/50 text-[24px] md:text-[36px]">Navigation</h2>
          <a href="/" className="text-white text-[24px] md:text-[36px] hover:underline">Home</a>
          <a href="/about" className="text-white text-[24px] md:text-[36px] hover:underline">About</a>
          <a href="/works" className="text-white text-[24px] md:text-[36px] hover:underline">Works</a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2 font-light">
          <h2 className="text-white/50 text-[24px] md:text-[36px]">Social</h2>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-[24px] md:text-[36px] hover:underline">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-[24px] md:text-[36px] hover:underline">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white text-[24px] md:text-[36px] hover:underline">X</a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 font-light">
          <h2 className="text-white/50 text-[24px] md:text-[36px]">Contact</h2>
          <a href="tel:+918547838091" className="text-white text-[24px] md:text-[36px] hover:underline">Phone: +91 8547 8380 91</a>
          <a href="mailto:test@gmail.com" className="text-white text-[24px] md:text-[36px] hover:underline">Email: test@gmail.com</a>
        </div>
      </div>


      {/* HeroFooter Section */}
      <div className="w-full">
        <HeroFooter />
      </div>
    </footer>
  );
}
