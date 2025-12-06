"use client";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  as?: React.ElementType;
  id?: string;
  baseOpacity?: number;
  visibleOpacity?: number;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
};

export default function WordFade({
  text,
  as,
  id,
  baseOpacity = 0.5,
  visibleOpacity = 1,
  delay = 40,
  duration = 260,
  className = "",
  threshold = 0.4,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // scroll tracking
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const velocityRef = useRef(0);

  const isInView = useRef(false);
  const progress = useRef(baseOpacity);

  const Tag = as || "span";

  /* Track scroll velocity */
  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;

      const dy = Math.abs(y - lastScrollY.current);
      const dt = now - lastTime.current || 1;

      velocityRef.current = Math.min(dy / dt, 1.2);

      lastScrollY.current = y;
      lastTime.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>(".wf-word"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInView.current = entry.isIntersecting;
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);

    let raf = 0;
    const loop = () => {
      const v = velocityRef.current;

      const target = isInView.current
        ? baseOpacity + (visibleOpacity - baseOpacity) * Math.min(v * 1.4, 1)
        : baseOpacity;

      progress.current += (target - progress.current) * 0.12;

      words.forEach((node) => {
        node.style.opacity = `${progress.current}`;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, baseOpacity, visibleOpacity, delay, duration, threshold, rootMargin]);

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {text.split(/\s+/).map((word, i) => (
        <span
          key={i}
          className="wf-word inline-block mr-[0.4ch]"
          style={{
            opacity: baseOpacity,
            willChange: "opacity",
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
