"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll() {
  useEffect(() => {
    // init smoother
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

    // pin shape
    ScrollTrigger.create({
      trigger: ".shape",
      pin: true,
      start: "center center",
      end: "+=300",
    });

    // Button scroll
    const btn = document.querySelector("button");
    if (btn) {
      btn.addEventListener("click", () => {
        smoother.scrollTo(".shape", true, "center center");
      });
    }

    return () => {
      ScrollTrigger.killAll();
      smoother.kill();
    };
  }, []);

  return null;
}
