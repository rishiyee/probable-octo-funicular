"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex justify-center fixed top-6 left-0 z-50 font-[var(--font-sf-pro)] tracking-normal">
      <div
        className="
          flex w-full max-w-[1440px] px-4 sm:px-6 py-3
          justify-between items-center
          rounded-full bg-[rgba(0,0,0,0.08)]
          backdrop-blur-[50px]
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/faviconfff.svg"
            alt="Logo"
            width={32}
            height={28}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          <a href="#hero" className="hover:opacity-70 transition">Home</a>
          <a href="#works" className="hover:opacity-70 transition">Work</a>
          <a href="#about" className="hover:opacity-70 transition">About</a>
          <Button>Contact</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="
            md:hidden flex flex-col gap-4 mt-3
            bg-[rgba(0,0,0,0.35)] backdrop-blur-xl
            rounded-2xl py-4 px-6 text-white
            w-[90%] mx-auto font-medium text-base
          "
        >
          <a href="#hero" onClick={() => setOpen(false)}>Home</a>
          <a href="#works" onClick={() => setOpen(false)}>Work</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>

          <Button>Contact</Button>
        </div>
      )}
    </nav>
  );
}
