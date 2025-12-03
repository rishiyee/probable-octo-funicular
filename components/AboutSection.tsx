import Image from "next/image";
import ShutterImage from "@/components/ShutterImage";
import WordFade from "@/components/WordFade";

export default function AboutSection() {
  return (
    <section id="about" className="w-full sf-pro">

      {/* ---------------- ABOUT SECTION ---------------- */}
      <div className="w-full px-6 py-24 md:py-32 border-b border-[#4D4D4D]">
        <div className="max-w-[1440px] mx-auto text-white">
          <div className="w-[35%] min-w-[300px]">
            <h2 className="text-[32px] font-normal leading-snug">
              <WordFade
                text="Crafting digital experiences with clarity, purpose, and intention. From concept to final interaction, I design products that feel effortless, thoughtful, and beautifully simple."
                baseOpacity={0.5}
                visibleOpacity={1}
                delay={45}
                duration={350}
              />
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
              <ShutterImage src="/about.jpg" alt="Service" ratio="1/1" />
            </div>

            {/* Text Right */}
            <div className="w-full md:w-1/2 p-8 border-l border-[#4D4D4D] text-white flex">
              <h2 className="text-[20px] font-normal leading-snug">
                <WordFade
                  text="I’m Hrishikesh, a 22-year-old UI/UX designer from Kerala with 1.6+ years of experience. I craft digital experiences that are simple, intentional, and actually feel good to use."
                  baseOpacity={0.5}
                  visibleOpacity={1}
                  delay={40}
                  duration={300}
                />
              </h2>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
