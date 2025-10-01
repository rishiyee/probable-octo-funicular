"use client";

import Image from "next/image";
import BulletIcon from "@/public/BulletPoints.svg";

interface InfoSectionProps {
  imageSrc: string;           // path to the left image
  imageAlt?: string;          // alt text for image
  title: string;              // title, e.g., "UI UX Design"
  paragraph: string;          // main paragraph text
  bullets: string[];          // bullet points
  sectionNumber?: string;     // section number, e.g., "01"
}

export default function InfoSection({
  imageSrc,
  imageAlt = "Image",
  title,
  paragraph,
  bullets,
  sectionNumber = "01",
}: InfoSectionProps) {
  return (
    <section className="p-6 sm:p-10 md:p-20 flex flex-col md:flex-row gap-6 md:gap-20 items-start">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <div className="aspect-[3/4] relative">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col gap-5 md:gap-10 w-full justify-center">
        {/* Title + Paragraph */}
        <div className="flex flex-col gap-3 md:gap-5">
          <h2 className="text-[36px] sm:text-[40px] md:text-[52px] font-normal text-white">
            {title}
          </h2>
          <p className="text-[18px] sm:text-[20px] md:text-[32px] leading-relaxed text-white/60">
            {paragraph}
          </p>
        </div>

        {/* Bullet Points */}
        <div className="flex flex-col gap-2 md:gap-3">
          {bullets.map((point, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-3">
              <Image src={BulletIcon} alt="bullet" width={20} height={20} />
              <span className="text-[16px] sm:text-[18px] md:text-[24px] text-white/50">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Section Number */}
        <div className="text-white/10 text-[100px] sm:text-[150px] md:text-[200px] lg:text-[350px] font-normal leading-none w-full text-right">
          {sectionNumber}
        </div>
      </div>
    </section>
  );
}
