"use client";

export default function AboutSection() {
  return (
    <section className="p-20 flex flex-row items-start gap-[64px]">
      {/* Left Text - vertically centered */}
      <div className="text-white font-[Host Grotesk] text-[20px] font-normal leading-[110%] basis-[30%] self-center">
        We're a team of brand, product, and engineering experts turning todays ideas into tomorrows most valuable brands.
      </div>

      {/* Right Text - top-aligned */}
      <div className="text-white font-[Host Grotesk] text-[64px] font-normal leading-tight basis-[70%]">
        We bring great design to exceptional founders. (We invest in them too).
      </div>
    </section>
  );
}
