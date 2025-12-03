"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setLoading(false),
    });

    // No initial animations. Just fade out everything.
    tl.to([text, overlay], {
      duration: 2.2,
      autoAlpha: 0,
      ease: "power2.inOut",
      delay: 1.2, // how long it stays before fade-out
    });

  }, []);

  if (!loading) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div
        ref={textRef}
        className="text-white text-xl sf-pro tracking-tight"
      >
        © rishiye 2025
      </div>
    </div>
  );
}
    