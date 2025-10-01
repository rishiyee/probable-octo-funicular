"use client";

import { useState } from "react";
import SkillImage from "./SkillImage";
import SkillAccordionItem from "./SkillAccordionItem";

const skillsData = [
  {
    skill: "UI/UX Design",
    description: "Making apps & websites feel effortless and fun.",
    related: ["Design Systems", "Prototyping", "Wireframing", "Figma"],
  },
  {
    skill: "Front-End Dev",
    description: "Turning designs into real-life, scrollable magic.",
    related: ["HTML", "CSS", "Git", "VS Code"],
  },
  {
    skill: "Video Editing & Videography",
    description: "Crafting visuals that hit different—smooth cuts, cinematic shots, vibes on point.",
    related: ["Color Grading", "CapCut", "Filming", "Videography"],
  },
  {
    skill: "Graphic Design",
    description: "Branding that sticks and visuals that slap.",
    related: ["Photoshop", "Logo & Brand Design"],
  },
  {
    skill: "Photo Editing & Photography",
    description: "Leveling up visuals with that perfect glow, plus capturing moments that tell a story.",
    related: ["Lightroom", "Color Grading", "Photography"],
  },
];




export default function SkillSectionFilmstrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleHover = (index: number) => {
    if (index !== currentImage) {
      setNextImage(index);
    }
    setHoverIndex(index);
  };

  return (
    <section className="p-20 flex flex-row items-start gap-12 bg-black">
      {/* Left Image with 3:4 aspect ratio */}
      <div className="w-[20vw] aspect-[3/4] relative">
        <SkillImage src="/skills.gif" />
      </div>

      {/* Right Accordions */}
      <div className="flex-1 flex flex-col">
        {skillsData.map((item, i) => (
          <SkillAccordionItem
            key={i}
            index={i}
            skill={item.skill}
            isOpen={openIndex === i}
            isHover={hoverIndex === i}
            onToggle={() => toggleAccordion(i)}
            onHover={() => handleHover(i)}
            skillsList={item.related} // pass only the related skills
          />
        ))}
      </div>
    </section>
  );
}
