"use client";

import { useEffect, useState } from "react";
import GlassButton from "./GlassButton";
import Link from "next/link";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBg, setIsDarkBg] = useState(false);

  // Handle scroll to hide/show navbar and detect dark background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);

      // Change logo color when scroll passes threshold (example: 150px)
      setIsDarkBg(currentScrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-transform duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}
        flex items-center justify-between px-20 2xl:px-40 py-5 pointer-events-auto
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center" title="Go to Home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="31"
          viewBox="0 0 38 31"
          className="transition-all duration-300"
        >
          <path
            d="M30.4303 15.6253V0H38V7.78482L30.4303 15.6253L38 23.0759V23.2709V31H30.4303V15.6253L15.098 15.4304V31H7.47315V15.4304H0L7.47315 0H15.098L7.47315 15.4304H15.098V7.78482H22.6676L30.4303 15.6253Z"
            fill={isDarkBg ? "#FFFFFF" : "#020202"} // Invert logo on dark background
          />
        </svg>
      </Link>

      {/* Navigation Links */}
      <div
        className="
          flex items-center gap-8
          pointer-events-auto
          h-16 px-6
          rounded-full 
          bg-white/10 
          backdrop-blur-md
        "
      >
        <Link href="/" className="flex items-center h-full text-white font-normal tracking-wide">
          Home
        </Link>
        <Link href="/about" className="flex items-center h-full text-white font-normal tracking-wide">
          About
        </Link>
        <Link href="/contact" className="flex items-center h-full text-white font-normal tracking-wide">
          Contact
        </Link>
      </div>

      {/* Glass Button */}
      <GlassButton
        label="Get Started"
        href="/get-started"
        className="pointer-events-auto transform transition-transform duration-200 hover:scale-105"
        textClassName="text-white font-normal tracking-wide"
      />
    </nav>
  );
}
