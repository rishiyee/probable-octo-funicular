"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import PointerHover from "@/components/PointerHover";

type WorksContainerProps = {
  imageSrc: string;
  title: string;
  rightContent?: React.ReactNode;
  link?: string;
};

// --- custom hook for smooth cursor follow ---
function useSmoothCursorFollow() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const setTargetFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetRef.current = { x, y };

    // on first enter, sync cursor to avoid jump
    if (!hovered) {
      setCursorPos({ x, y });
      setHovered(true);
    }
  };

  const handleLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    if (!hovered) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const speed = 0.12; // 0–1 → higher = snappier

    const animate = () => {
      setCursorPos((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;

        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [hovered]);

  return {
    cursorPos,
    hovered,
    setTargetFromEvent,
    handleLeave,
  };
}

export default function WorksContainer({
  imageSrc,
  title,
  rightContent,
  link,
}: WorksContainerProps) {
  const { cursorPos, hovered, setTargetFromEvent, handleLeave } =
    useSmoothCursorFollow();

  const Wrapper: React.ElementType = link ? Link : "div";
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer", className: "block" }
    : { className: "block" };

  return (
    <div className="w-full flex-grow sf-pro">
      <Wrapper {...wrapperProps}>
        <div
          className="
            relative w-full aspect-[2/1] rounded-[32px] overflow-hidden
            cursor-none group
            transition-transform duration-300 group-hover:-translate-y-2
            shadow-lg shadow-black/0 group-hover:shadow-black/20
          "
          onMouseMove={setTargetFromEvent}
          onMouseLeave={handleLeave}
        >
          {/* Thumbnail Image */}
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="
              object-cover
              transition-all duration-700 ease-out
              group-hover:scale-110
              group-hover:blur-[2px]
            "
          />

          {/* Subtle Gradient Overlay (premium look) */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t from-black/40 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
          />

          {/* Floating pointer following cursor */}
          {hovered && (
            <div
              className="
                absolute pointer-events-none
                transition-transform duration-100 ease-out
              "
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PointerHover />
            </div>
          )}
        </div>
      </Wrapper>

      {/* Title + Pills */}
      <div className="flex items-center justify-between py-5">
        <h3 className="text-white text-[32px] font-[510] tracking-[-0.64px] leading-none">
          {title}
        </h3>

        {rightContent && (
          <div className="flex items-center gap-2">{rightContent}</div>
        )}
      </div>
    </div>
  );
}
