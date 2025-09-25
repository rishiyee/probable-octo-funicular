import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Background image */}
      <Image
        src="/hero.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.9)]"></div>

      {/* Text container at bottom */}
      <div className="relative z-10 flex h-full items-end text-left text-white p-20 xxl:px-40 gap-8">
        <h1 className="flex-[3] text-[126px] md:text-[126px] font-normal leading-tight">
          Design beyond Imagination
        </h1>
        <p className="flex-[1] text-[24px] md:text-[24px] leading-snug">
          Discover amazing products and experiences tailored just for you.
        </p>
      </div>
    </section>
  );
}
