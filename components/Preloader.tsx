"use client";

import { useEffect, useState } from "react";

export default function Preloader({ duration = 5000 }) {   // ← slower counting
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(percent));

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600); // fade delay
      }
    }, 60); // ← slower counting loop

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999] flex items-end transition-all duration-\\[5000ms\\] ease-\\[cubic-bezier\\(0.33\\,1\\,0.68\\,1\\)\\] ${
        done
          ? "opacity-0 -translate-y-full scale-105"
          : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{
        boxShadow: done
          ? "0 -50px 80px rgba(0,0,0,0)"
          : "0 -50px 80px rgba(0,0,0,0.8)",
      }}
    >
      <p
        className="text-white/20 font-medium mb-8 ml-8"
        style={{
          fontSize: "500px",
          transition: "opacity 1.9s ease",
          opacity: done ? 0 : 1,
        }}
      >
        {progress}%
      </p>
    </div>
  );
}
