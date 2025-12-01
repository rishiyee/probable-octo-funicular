"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls just a little → expand hero + lock scroll
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`
        relative h-screen w-full transition-all duration-500 snap-start
        ${scrolled ? "p-0" : "p-3"}
      `}
    >
      <Navbar />
      <div
        className={`
          relative h-full w-full overflow-hidden transition-all duration-500
          ${scrolled ? "rounded-none" : "rounded-[20px]"}
        `}
      >
        <Image
          src="/hero1.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>

        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <h1 className="text-white text-5xl sm:text-7xl md:text-8xl 2xl:text-[120px] font-normal text-center leading-tight">
            Think. Design. Build.
          </h1>
        </div>
      </div>
    </section>
  );
}
