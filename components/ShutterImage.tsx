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
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el); 
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clipPath = revealed
    ? `inset(0% 0% 0% 0%)`
    : `inset(100% 0% 0% 0%)`;

  const ratioClass = ratioClassMap[ratio] ?? ratioClassMap["4/4"];

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${ratioClass}`}>
      <div
        className="absolute inset-0 overflow-hidden will-change-[clip-path]"
        style={{
          clipPath,
          transition: `clip-path 300ms cubic-bezier(.25,.46,.45,.94)`,
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </div>
    </div>
  );
}
