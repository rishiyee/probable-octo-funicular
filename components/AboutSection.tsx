import Image from "next/image";

export default function AboutServiceSection() {
  return (
    <section className="w-full sf-pro">

      {/* ---------------- ABOUT SECTION ---------------- */}
      <div className="w-full px-6 py-24 md:py-32 border-b border-[#4D4D4D]">
        <div className="max-w-[1440px] mx-auto text-white">
          <div className="w-[35%] min-w-[300px]">
            <h2 className="text-[32px] font-normal leading-snug">
              Crafting digital experiences with clarity, purpose, and intention.
              From concept to final interaction, I design products that feel
              effortless, thoughtful, and beautifully simple.
            </h2>
          </div>
        </div>
      </div>

      {/* ---------------- SERVICE SECTION ---------------- */}
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto flex justify-end">

          {/* Right-aligned 62.5% content block */}
          <div className="w-full md:w-[62.5%] flex flex-col md:flex-row items-stretch">

            {/* Image Left */}
            <div className="w-full md:w-1/2 p-8">
              <div className="relative w-full aspect-[4/4]  overflow-hidden">
                <Image
                  src="/about.jpg"
                  alt="Service"
                  fill
                  className="object-cover"
                  unoptimized
                />

              </div>
            </div>

            {/* Text Right */}
            <div className="w-full md:w-1/2 p-8 border-l border-[#4D4D4D] text-white flex">
              <h2 className="text-[20px] font-normal leading-snug">
                I’m Hrishikesh, a 22-year-old UI/UX designer from Kerala with 1.6+ years of experience.
                I craft digital experiences that are simple, intentional, and actually feel good to use.
              </h2>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
