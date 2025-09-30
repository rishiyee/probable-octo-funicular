import Image from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>

      {/* Text container */}
      <div className="relative z-20 flex h-full flex-col lg:flex-row justify-end lg:items-end text-left text-white px-4 sm:px-8 md:px-20 gap-0 lg:gap-4 pb-10 md:pb-20">
        <h1 className="flex-none md:flex-[3] text-6xl sm:text-8xl md:text-[96px] 2xl:text-[126px] font-normal leading-snug sm:leading-normal md:leading-tight">
          Design beyond<br />Imagination
        </h1>
        <p className="flex-none md:flex-[1] text-base sm:text-lg md:text-[20px] lg:text-[24px] leading-snug">
          Discover amazing products and experiences tailored just for you.
        </p>
      </div>
    </section>
  );
}
