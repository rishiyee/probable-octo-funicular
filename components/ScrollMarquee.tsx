"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  text?: string;
  baseSpeed?: number; // positive number (we'll force negative internally)
  multiplier?: number;
  hoverSpeed?: number; // positive (we'll force negative)
  maxIncomingDelta?: number;
  maxTargetVelocity?: number;
  entryDamping?: number;
  repeatMultiplier?: number; // how many times to repeat the text block (for long marquee)
};

export default function ScrollMarquee({
  text = "Product Strategy • Interface Design • Motion Systems • Brand Identity • Digital Experiences • ",
  baseSpeed = 3.0,
  multiplier = 0.4,
  hoverSpeed = 0.5,
  maxIncomingDelta = 60,
  maxTargetVelocity = 25,
  entryDamping = 0.2,
  repeatMultiplier = 16,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const position = useRef(0);
  const velocity = useRef(0);
  const targetVelocity = useRef(0);

  const [width, setWidth] = useState(0);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const isHovered = useRef(false);
  const isInView = useRef(false);

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // Force direction to left by using negative magnitudes
  const base = -Math.abs(baseSpeed);
  const hover = -Math.abs(hoverSpeed);

  useEffect(() => {
    // measure width
    const measure = () => {
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth || 0);
      }
    };
    measure();

    // keep width updated
    let ro: ResizeObserver | null = null;
    if (contentRef.current) {
      ro = new ResizeObserver(() => {
        measure();
      });
      ro.observe(contentRef.current);
    }

    // IntersectionObserver -> only accept input when marquee is visible
    let io: IntersectionObserver | null = null;
    if (containerRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isInView.current = true;
              // damp excessive velocity when entering view so it eases in
              velocity.current *= entryDamping;
              targetVelocity.current = clamp(targetVelocity.current, -maxTargetVelocity, maxTargetVelocity);
            } else {
              isInView.current = false;
            }
          });
        },
        { threshold: 0.12 }
      );
      io.observe(containerRef.current);
    }

    // wheel handler: only when in view, clamp incoming delta and apply
    const onWheel = (e: WheelEvent) => {
      if (!isInView.current) return;
      const raw = clamp(e.deltaY, -maxIncomingDelta, maxIncomingDelta);
      // multiply and push into target (positive raw -> more leftward if negative base)
      targetVelocity.current += raw * multiplier * 0.03;
      targetVelocity.current = clamp(targetVelocity.current, -maxTargetVelocity, maxTargetVelocity);
    };

    const onDown = (e: TouchEvent | MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) return;
      isDragging.current = true;
      lastX.current = "touches" in e && (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    };

    const onMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;
      const currentX = "touches" in e && (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const delta = currentX - lastX.current;
      if (isInView.current) {
        // dragging right (positive delta) should make it slower to the left (less negative target) and vice-versa
        targetVelocity.current += delta * multiplier * 0.15;
        targetVelocity.current = clamp(targetVelocity.current, -maxTargetVelocity, maxTargetVelocity);
      }
      lastX.current = currentX;
    };

    const onUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchstart", onDown);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);

    // Animation loop
    let raf = 0;
    const animate = () => {
      // approach target velocity
      velocity.current += (targetVelocity.current - velocity.current) * 0.12;

      // ensure base/hover goals are negative (left)
      if (isHovered.current) {
        targetVelocity.current += (hover - targetVelocity.current) * 0.05;
      } else {
        targetVelocity.current += (base - targetVelocity.current) * 0.02;
      }

      // prevent direction flip: always keep negative (left)
      velocity.current = -Math.abs(velocity.current || 0);
      targetVelocity.current = -Math.abs(targetVelocity.current || 0);

      // apply position
      position.current += velocity.current;

      // wrap by width
      if (width > 0) {
        if (position.current < -width) position.current += width;
        if (position.current > width) position.current -= width;
      }

      // set transform
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translateX(${position.current}px)`;
        marqueeRef.current.style.textShadow = isHovered.current ? "0 0 20px rgba(255,255,255,0.3)" : "none";
      }

      // mild decay so it eases back to base
      targetVelocity.current *= 0.94;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);

      if (ro && contentRef.current) ro.disconnect();
      if (io && containerRef.current) io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseSpeed, multiplier, width, hoverSpeed, maxIncomingDelta, maxTargetVelocity, entryDamping, repeatMultiplier]);

  // Build repeated text
  const repeated = Array.from({ length: repeatMultiplier }).map((_, i) => (
    <span key={i} className="mr-8">{text}</span>
  ));

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full bg-black text-white py-4 sm:py-6 md:py-8 select-none"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      aria-hidden="false"
    >
      <div
        ref={marqueeRef}
        className="flex will-change-transform whitespace-nowrap cursor-grab active:cursor-grabbing text-3xl sm:text-5xl px-8 md:text-7xl lg:text-8xl font-normal tracking-tight transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${position.current}px)` }}
      >
        <div ref={contentRef} className="flex">
          {repeated}
        </div>
        <div className="flex" aria-hidden="true">
          {repeated}
        </div>
      </div>
    </div>
  );
}
