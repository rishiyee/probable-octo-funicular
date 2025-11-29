import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full p-5"> {/* 20px padding */}
      {/* Background Wrapper to clip radius */}
      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
        
        {/* Background Image */}
        <Image
          src="/hero1.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <h1 className="text-white text-5xl sm:text-7xl md:text-8xl 2xl:text-[120px] font-normal text-center leading-tight">
            Think. Design. Build.
          </h1>
        </div>
      </div>
    </section>
  );
}
