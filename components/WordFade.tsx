"use client";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  baseOpacity?: number; // initial opacity (0..1)
  visibleOpacity?: number; // visible opacity (0..1)
  delay?: number; // ms per-word stagger
  duration?: number; // ms transition duration
  className?: string;
  reverse?: boolean; // fade back when leaving viewport
  directionAware?: boolean; // only reveal when scrolling down
  threshold?: number; // IO threshold
  rootMargin?: string;
};

export default function WordFade({
  text,
  baseOpacity = 0.5,
  visibleOpacity = 1,
  delay = 50,
  duration = 300,
  className = "",
  reverse = true,
  directionAware = false,
  threshold = 0.5,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const scrollYRef = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollDirRef = useRef<"down" | "up">("down");

  // track scroll direction (lightweight)
  useEffect(() => {
    if (!directionAware) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      scrollDirRef.current = y > scrollYRef.current ? "down" : "up";
      scrollYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [directionAware]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".wf-word"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = entry.target as HTMLElement;
          const index = Number(node.dataset.index || 0);

          // when it intersects
          if (entry.isIntersecting) {
            // if directionAware is on, only reveal when scrolling down
            if (!directionAware || scrollDirRef.current === "down") {
              node.style.transition = `opacity ${duration}ms ease`;
              node.style.transitionDelay = `${index * delay}ms`;
              node.style.opacity = `${visibleOpacity}`;
            }
            // if we don't want reverse, unobserve so it never toggles back
            if (!reverse) io.unobserve(node);
          } else {
            // leaving viewport
            if (reverse) {
              // optional: apply reverse stagger so hide looks natural (reverse order)
              const reverseDelay = (words.length - 1 - index) * delay;
              node.style.transition = `opacity ${duration}ms ease`;
              node.style.transitionDelay = `${reverseDelay}ms`;
              node.style.opacity = `${baseOpacity}`;
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, [text, baseOpacity, visibleOpacity, delay, duration, reverse, directionAware, threshold, rootMargin]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        <span
          key={i}
          data-index={i}
          className="wf-word inline-block mr-[0.4ch]"
          style={{
            opacity: baseOpacity,
            willChange: "opacity",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
