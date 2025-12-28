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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      /**
       * TIMING (key fix)
       * start: when image bottom touches viewport bottom
       * end:   when image center reaches viewport center
       */
      const start = vh;
      const end = vh / 2;

      const raw = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Shutter opens top → bottom
  const clipPath = `inset(${(1 - progress) * 100}% 0% 0% 0%)`;

  const ratioClass = ratioClassMap[ratio];

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${ratioClass}`}>
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{
          clipPath,
          transition: "clip-path 0.08s linear",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
