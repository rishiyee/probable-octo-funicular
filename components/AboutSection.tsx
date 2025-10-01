"use client";

export default function AboutSection() {
  return (
    <section className="p-6 sm:p-10 md:p-20 flex flex-col md:flex-row items-start gap-6 md:gap-[64px]">
      {/* Right Text - headline first on mobile */}
      <div className="text-white font-[Host Grotesk] text-[52px] font-normal leading-tight md:basis-[70%] order-1 md:order-2">
        We bring great design to exceptional founders. (We invest in them too).
      </div>

      {/* Left Text - description */}
      <div className="text-white font-[Host Grotesk] text-[20px] font-normal leading-[110%] md:basis-[30%] md:self-center order-2 md:order-1">
        We're a team of brand, product, and engineering experts turning todays ideas into tomorrows most valuable brands.
      </div>
    </section>
  );
}
