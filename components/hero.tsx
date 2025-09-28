import Image from "next/image";
import Navbar from "./Navbar";
import GlassButton from "./GlassButton";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <Image src="/hero.png" alt="Hero Background" fill priority className="object-cover" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>

      {/* Text container */}
      <div className="relative z-20 flex h-full items-end text-left text-white px-20 2xl:px-20 gap-8 pb-20">
        <h1 className="flex-[3] text-[126px] md:text-[96px] font-normal leading-tight">
          Design beyond<br />Imagination
        </h1>
        <p className="flex-[1] text-[24px] md:text-[20px] leading-snug">
          Discover amazing products and experiences tailored just for you.
        </p>
      </div>

    </section>
  );
}
