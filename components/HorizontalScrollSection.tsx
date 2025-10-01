"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfoSection from "./InfoSection";

gsap.registerPlugin(ScrollTrigger);

// Define section data
const sectionsData = [
  {
    imageSrc: "/mockup1.jpg",
    title: "UI UX Design",
    paragraph:
      "Designing intuitive, user-friendly, and visually appealing digital experiences that balance creativity with functionality. I focus on creating interfaces that not only look great but also solve real problems, ensuring smooth navigation and meaningful interactions for every user.",
    bullets: ["Design Systems", "Prototyping", "Wireframing", "Figma"],
    sectionNumber: "01",
  },
  {
    imageSrc: "/mockup2.jpg",
    title: "Front-End Development",
    paragraph:
      "Building responsive and performant web applications using modern frontend technologies, ensuring pixel-perfect designs and smooth user experience across all devices.",
    bullets: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    sectionNumber: "02",
  },
  {
    imageSrc: "/mockup3.jpg",
    title: "Video Editing & Color Grading",
    paragraph:
      "Crafting visually compelling videos with precise color grading and editing techniques, bringing storytelling and branding to life for digital content and campaigns.",
    bullets: ["Adobe Premiere", "After Effects", "Capcut", "Color Grading"],
    sectionNumber: "03",
  },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".horizontal-item");
    if (!items.length) return;

    const totalScroll = items[0].offsetWidth * (items.length - 1);

    setSectionHeight(window.innerHeight + totalScroll);

    gsap.to(items, {
      xPercent: -100 * (items.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        end: () => "+=" + totalScroll,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(".horizontal-item");
    };
  }, []);

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ height: sectionHeight || "100vh" }}
    >
      <div
        ref={containerRef}
        className="flex h-full w-max"
        style={{ width: `${sectionsData.length * 100}vw` }}
      >
        {sectionsData.map((section, i) => (
          <div key={i} className="horizontal-item w-screen h-full flex-shrink-0">
            <InfoSection
              imageSrc={section.imageSrc}
              title={section.title}
              paragraph={section.paragraph}
              bullets={section.bullets}
              sectionNumber={section.sectionNumber}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
