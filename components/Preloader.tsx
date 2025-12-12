"use client";

import { useEffect, useState } from "react";
import ShinyText from "./ShinyText";

export default function Preloader({ duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    visible && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
        <ShinyText
          text="crafting"
          size="text-[32px]"   
          disabled={false}
          speed={3}
          className="custom-class"
        />
      </div>
    )
  );
}
