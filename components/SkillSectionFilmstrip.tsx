"use client";

import { useState } from "react";
import SkillImage from "./SkillImage";
import SkillAccordionItem from "./SkillAccordionItem";

// Each skill has its own related skills
const skillsData = [
  {
    skill: "UI/UX Design",
    related: ["Wireframing", "Prototyping", "Interaction Design"],
  },
  {
    skill: "Frontend Development",
    related: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    skill: "3D Animation",
    related: ["Blender", "Cinema 4D", "Maya"],
  },
  {
    skill: "Graphic Design",
    related: ["Photoshop", "Illustrator", "Figma"],
  },
  {
    skill: "Database Management",
    related: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    skill: "Video Editing",
    related: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
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
