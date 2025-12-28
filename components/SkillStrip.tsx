"use client";
import { useEffect, useRef } from "react";
import Pill from "./Pill";

export default function SkillStrip({
  index,
  label,
  pills = [],
}: {
  index: string;
  label: string;
  pills?: string[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const targetRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  const inViewRef = useRef<boolean>(false);
  const lastTouchY = useRef<number | null>(null);

  const SENSITIVITY = 0.0009;
  const EASE = 0.14;

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  useEffect(() => {
    if (!containerRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.25 }
    );
    io.observe(containerRef.current);

    const onWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;
      const delta = e.deltaY * SENSITIVITY;
      targetRef.current = clamp01(targetRef.current + delta);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!inViewRef.current) return;
      lastTouchY.current = e.touches?.[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!inViewRef.current || lastTouchY.current == null) return;
      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = lastTouchY.current - y;
      targetRef.current = clamp01(
        targetRef.current + dy * (SENSITIVITY * 1.1)
      );
      lastTouchY.current = y;
    };
    const onTouchEnd = () => {
      lastTouchY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    let raf = 0;
    const loop = () => {
      progressRef.current +=
        (targetRef.current - progressRef.current) * EASE;

      if (barRef.current) {
        barRef.current.style.width = `${(
          progressRef.current * 100
        ).toFixed(2)}%`;
        barRef.current.style.opacity = (
          0.12 + 0.88 * clamp01(progressRef.current)
        ).toString();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full">
      {/* TOP ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-16 py-6 sm:py-8">
        <span className="sf-pro text-[40px] sm:text-[48px] lg:text-[64px] font-[400] leading-[110%] text-[#FC3C00]">
          {index}
        </span>

        <span className="sf-pro text-[40px] sm:text-[48px] lg:text-[64px] font-[400] leading-[110%] text-[#878787]">
          {label}
        </span>
      </div>

      {/* PROGRESS LINE */}
      <div className="w-full h-[1px] bg-transparent overflow-hidden">
        <div
          ref={barRef}
          style={{
            width: "0%",
            height: "1px",
            backgroundColor: "#4D4D4D",
            opacity: 0.12,
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* PILLS */}
      <div className="pl-0 sm:pl-[calc(64px+16px+16px+32px)] flex flex-wrap items-center gap-3 sm:gap-4 py-4 sm:py-6">
        {pills.map((pill, i) => (
          <Pill key={i} variant="outlineDark" size="md">
            {pill}
          </Pill>
        ))}
      </div>
    </div>
  );
}
