"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollMarquee({
  text = "UI Design Prototype • Frontend Design • Etc • ",
  baseSpeed = 3.0, // idle auto speed
  multiplier = 0.4, // scroll/drag influence
  hoverSpeed = 0.5, // max speed when hovered
}) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const position = useRef(0);
  const velocity = useRef(0);
  const targetVelocity = useRef(0);
  const [width, setWidth] = useState(0);

  // touch/mouse drag state
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // hover state
  const isHovered = useRef(false);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }

    /** WHEEL / TRACKPAD */
    const onWheel = (e: WheelEvent) => {
      targetVelocity.current += e.deltaY * multiplier * 0.05;
    };

    /** TOUCH / MOUSE DRAG START */
    const onDown = (e: TouchEvent | MouseEvent) => {
      isDragging.current = true;
      lastX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    /** TOUCH / MOUSE MOVE */
    const onMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging.current) return;
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = currentX - lastX.current;
      targetVelocity.current += delta * multiplier * 0.2;
      lastX.current = currentX;
    };

    /** TOUCH / MOUSE END */
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

    /** Animation Loop */
    const animate = () => {
      // Smooth velocity interpolation
      velocity.current += (targetVelocity.current - velocity.current) * 0.1;

      // Smooth hover momentum
      if (isHovered.current) {
        targetVelocity.current += (-hoverSpeed - targetVelocity.current) * 0.05;
      } else {
        targetVelocity.current += (-baseSpeed - targetVelocity.current) * 0.02;
      }

      // Update position
      position.current += velocity.current;

      // Wrap around width
      if (position.current > width) position.current -= width;
      if (position.current < -width) position.current += width;

      // Apply transform with scale effect on hover
      if (marqueeRef.current) {
        const scale = isHovered.current ? 1.00 : 1;
        const glow = isHovered.current ? "0 0 20px rgba(255,255,255,0.3)" : "none";
        marqueeRef.current.style.transform = `translateX(${position.current}px) scale(${scale})`;
        marqueeRef.current.style.textShadow = glow;
      }

      // Friction
      targetVelocity.current *= 0.92;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [baseSpeed, multiplier, width, hoverSpeed]);

  return (
    <div
      className="overflow-hidden w-full bg-black text-white py-4 sm:py-6 md:py-8 select-none"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <div
        ref={marqueeRef}
        className="
          flex will-change-transform whitespace-nowrap 
          cursor-grab active:cursor-grabbing
          text-3xl sm:text-5xl px-20 md:text-7xl lg:text-9xl font-normal tracking-tight
          transition-transform duration-300 ease-out
        "
      >
        <div ref={contentRef} className="flex">
          {text.repeat(20)}
        </div>
        <div className="flex">{text.repeat(20)}</div>
      </div>
    </div>
  );
}
