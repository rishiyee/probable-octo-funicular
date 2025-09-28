"use client";

import Image from "next/image";

export default function WorksSection() {
  const leftImage = "/mockup (1).jpg"; // left main image
  const rightImages = [
    "/mockup (2).jpg",
    "/mockup (3).jpg",
    "/mockup (4).jpg",
  ];

  return (
    <section className="flex gap-4 p-20 bg-black h-[100vh]">
      {/* Left div: main image */}
      <div className="flex-1 relative h-full">
        <Image
          src={leftImage}
          alt="Main Work"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Right div: 3 images */}
      <div className="flex flex-col gap-4 w-[50%] h-full">
        {/* Top image */}
        <div className="relative w-full flex-1">
          <Image
            src={rightImages[0]}
            alt="Work 1"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Bottom two images horizontally */}
        <div className="flex gap-4 flex-1">
          {rightImages.slice(1).map((src, idx) => (
            <div key={idx} className="relative w-1/2 h-full">
              <Image
                src={src}
                alt={`Work ${idx + 2}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
