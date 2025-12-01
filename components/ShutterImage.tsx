"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ShutterImageProps {
  src: string;
  alt: string;
  ratio?: "4/4" | "3/2" | "16/9" | "1/1" | "9/16";
}

const ratioClassMap: Record<NonNullable<ShutterImageProps["ratio"]>, string> = {
  "4/4": "aspect-[4/4]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-[1/1]",
  "9/16": "aspect-[9/16]",
};

export default function ShutterImage({
  src,
  alt,
  ratio = "4/4",
}: ShutterImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ratioClass = ratioClassMap[ratio] ?? ratioClassMap["4/4"];

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${ratioClass}`}
    >
      {/* Curtain reveal wrapper */}
      <div
        className={`
          absolute inset-0 overflow-hidden
          transition-[max-height] duration-700 ease-out
        `}
        style={{
          maxHeight: isVisible ? "100%" : "0%",
        }}
      >
        <div className="w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
