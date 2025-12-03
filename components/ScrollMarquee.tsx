"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  text?: string;
  baseSpeed?: number; // positive number (we'll bias left by default)
  multiplier?: number;
  hoverSpeed?: number; // positive (slows down toward hover)
  maxIncomingDelta?: number;
  maxTargetVelocity?: number;
  entryDamping?: number;
  repeatMultiplier?: number; // how many times to repeat the text block (for long marquee)
};

export default function ScrollMarquee({
  text = "Product Strategy • Interface Design • Motion Systems • Brand Identity • Digital Experiences • ",
  baseSpeed = 1.5,
  multiplier = 0.4,
  hoverSpeed = 0.6,
  maxIncomingDelta = 60,
  maxTargetVelocity = 30,
  entryDamping = 0.25,
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

  // base is leftward default (negative). But wheel/drag can push both ways.
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
      // raw positive usually means scrolling down; we'll use it to adjust targetVelocity
      // scale so wheel gestures feel natural; positive raw -> push more left (negative) if you'd like,
      // but we allow both directions: user can scroll up (negative deltaY) to push right.
      // Here we'll invert raw for a more intuitive horizontal feel (scroll down -> move left).
      const horDelta = -raw * multiplier * 0.04;
      targetVelocity.current += horDelta;
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
        // dragging right (positive delta) should push positive target (→ move right),
        // dragging left (negative delta) pushes negative target (→ move left).
        targetVelocity.current += delta * multiplier * 0.18;
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
      // smooth towards targetVelocity
      velocity.current += (targetVelocity.current - velocity.current) * 0.12;

      // base/hover goals bias towards left by default:
      if (isHovered.current) {
        // when hovered, move toward "hover" speed (less negative or more negative depending)
        targetVelocity.current += (hover - targetVelocity.current) * 0.05;
      } else {
        targetVelocity.current += (base - targetVelocity.current) * 0.02;
      }

      // apply position (velocity may be positive or negative now)
      position.current += velocity.current;

      // wrap by width
      if (width > 0) {
        // wrap while keeping continuity
        if (position.current < -width) position.current += width;
        if (position.current > width) position.current -= width;
      }

      // set transform
      if (marqueeRef.current) {
        // use translate3d for smoother GPU rendering
        marqueeRef.current.style.transform = `translate3d(${position.current}px, 0, 0)`;
        marqueeRef.current.style.textShadow = isHovered.current ? "0 0 20px rgba(255,255,255,0.25)" : "none";
      }

      // mild decay so it eases back to base
      targetVelocity.current *= 0.95;

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
        style={{ transform: `translate3d(${position.current}px,0,0)` }}
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
