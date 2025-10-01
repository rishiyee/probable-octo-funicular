"use client";

import { useEffect, useState } from "react";
import GlassButton from "./GlassButton";
import Link from "next/link";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
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
        flex items-center justify-between px-4 sm:px-6 md:px-10 2xl:px-20 py-4 md:py-6
        pointer-events-auto
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
          {/* Desktop Logo */}
          <path
            d="M30.4303 15.6253V0H38V7.78482L30.4303 15.6253L38 23.0759V23.2709V31H30.4303V15.6253L15.098 15.4304V31H7.47315V15.4304H0L7.47315 0H15.098L7.47315 15.4304H15.098V7.78482H22.6676L30.4303 15.6253Z"
            className="hidden md:block"
            fill={isDarkBg ? "#FFFFFF" : "#020202"} // Desktop: invert based on scroll
          />
          {/* Mobile Logo (always white) */}
          <path
            d="M30.4303 15.6253V0H38V7.78482L30.4303 15.6253L38 23.0759V23.2709V31H30.4303V15.6253L15.098 15.4304V31H7.47315V15.4304H0L7.47315 0H15.098L7.47315 15.4304H15.098V7.78482H22.6676L30.4303 15.6253Z"
            className="block md:hidden"
            fill="#FFFFFF" // Mobile: always white
          />
        </svg>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 pointer-events-auto h-16 px-4 rounded-full bg-white/10 backdrop-blur-md">
        <Link href="/" className="text-white font-normal tracking-wide">
          Home
        </Link>
        <Link href="/about" className="text-white font-normal tracking-wide">
          About
        </Link>
        <Link href="/contact" className="text-white font-normal tracking-wide">
          Contact
        </Link>
      </div>

      {/* Glass Button (Desktop only) */}
      <div className="hidden md:block">
        <GlassButton
          label="Get Started"
          href="/get-started"
          className="pointer-events-auto transform transition-transform duration-200 hover:scale-105"
          textClassName="text-white font-normal tracking-wide"
        />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/100 backdrop-blur-md flex flex-col items-center py-4 gap-4 md:hidden">
          <Link href="/" className="text-white font-normal tracking-wide">
            Home
          </Link>
          <Link href="/about" className="text-white font-normal tracking-wide">
            About
          </Link>
          <Link href="/contact" className="text-white font-normal tracking-wide">
            Contact
          </Link>
          <GlassButton
            label="Get Started"
            href="/get-started"
            className="mt-2 transform transition-transform duration-200 hover:scale-105"
            textClassName="text-white font-normal tracking-wide"
          />
        </div>
      )}
    </nav>
  );
}
