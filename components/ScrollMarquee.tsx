"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollMarquee({
  text = "UI Design Prototype • Frontend Design • Etc • ",
  baseSpeed = 0.5,
  multiplier = 3,
}) {
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const position = useRef(0);
  const prevScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // measure the width of one content block
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
    }

    prevScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const delta = prevScrollY.current - currentScroll; // up = positive
      prevScrollY.current = currentScroll;
      scrollVelocity.current = delta * multiplier;
    };

    window.addEventListener("scroll", onScroll);

    const animate = () => {
      // shift based on scroll + base speed
      position.current += baseSpeed + scrollVelocity.current * 0.05;

      // wrap: when position > width or < -width, reset
      if (position.current > width) {
        position.current -= width;
      }
      if (position.current < -width) {
        position.current += width;
      }

      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translateX(${-position.current}px)`;
      }

      // friction
      scrollVelocity.current *= 0.9;

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("scroll", onScroll);
  }, [baseSpeed, multiplier, width]);

  return (
    <div className="text-9xl overflow-hidden w-full bg-black text-white py-8">
      <div
        ref={marqueeRef}
        className="flex will-change-transform whitespace-nowrap"
      >
        {/* first block */}
        <div ref={contentRef} className="flex">
          {text.repeat(20)}
        </div>
        {/* duplicate immediately after */}
        <div className="flex">
          {text.repeat(20)}
        </div>
      </div>
    </div>
  );
}
