"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PointerHover from "@/components/PointerHover";

type WorksContainerProps = {
  imageSrc: string;
  title: string;
  rightContent?: React.ReactNode;
  link?: string;
};

export default function WorksContainer({
  imageSrc,
  title,
  rightContent,
  link = "#",
}: WorksContainerProps) {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTargetPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!hovered) return;

    let frameId: number;
    const speed = 0.1;

    const animate = () => {
      setCursorPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;

        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hovered, targetPos.x, targetPos.y]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTargetPos({ x, y });
    setCursorPos({ x, y });
    setHovered(true);
  };

  const handleMouseLeave = () => setHovered(false);

  return (
    <div className="w-full flex-grow sf-pro">
      <Link href={link} target="_blank" className="block">
        <div
          className="
            relative w-full aspect-[2/1] rounded-[32px] overflow-hidden
            cursor-none group
            transition-transform duration-300 group-hover:-translate-y-2
            shadow-lg shadow-black/0 group-hover:shadow-black/20
          "
          onMouseMove={handleMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
      </Link>

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
