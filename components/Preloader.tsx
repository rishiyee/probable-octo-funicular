"use client";

import { useEffect, useState } from "react";

export default function Preloader({ duration = 5000 }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`
        fixed inset-0 bg-black z-[9999] flex items-center justify-center
        transition-opacity duration-700 ease-out
        ${done ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <p
        className="text-white/70 font-regular"
        style={{
          fontSize: "24px",
          letterSpacing: "1px",
          animation: "fadePulse 1.6s ease-in-out infinite",
        }}
      >
        creating aesthetics
      </p>

      <style jsx>{`
        @keyframes fadePulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
