"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="
        relative w-full snap-start
        h-[100svh] sm:h-screen
        px-3 sm:px-3
        transition-all duration-500
      "
    >
      <div
        className="
          relative h-full w-full overflow-hidden
          rounded-[16px] sm:rounded-[20px]
          transition-all duration-500
        "
      >
        <Image
          src="/hero1.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
          <h1
            className="
              text-white font-normal text-center leading-[110%]
              text-[40px] xs:text-[48px] sm:text-7xl md:text-8xl 2xl:text-[120px]
            "
          >
            Think. Design. Build.
          </h1>
        </div>
      </div>
    </section>
  );
}
