"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  "HTML & CSS",
  "JavaScript (ES6+)",
  "Responsive Design",
  "React.js",
  "Node.js + Express",
  "Databases (SQL / MongoDB)",
  "Git & GitHub",
];

const images = [
  "/hero.png",
  "/test.jpg",
  "/hero.png",
  "/hero.png",
  "/hero.png",
  "/forest.jpg",
  "/city.jpg",
];

export default function SkillSectionFilmstrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // handle hover to trigger shutter animation
  const handleHover = (index: number) => {
    if (index !== currentImage) {
      setNextImage(index);
    }
    setHoverIndex(index);
  };

  return (
    <section className="p-20 flex flex-row gap-12">
      {/* Left Panel: Fixed Height & Width */}
      <div className="w-[20vw] aspect-[4/3] relative overflow-hidden">
        {/* Current Image (background) */}
        <Image
          src={images[currentImage]}
          alt={`Current Skill`}
          fill
          className="object-cover w-full h-full"
        />

        {/* Next Image sliding over */}
        <AnimatePresence onExitComplete={() => setCurrentImage(nextImage)}>
          {nextImage !== currentImage && (
            <motion.div
              key={nextImage}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[nextImage]}
                alt={`Next Skill`}
                fill
                className="object-cover w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel: Accordions/Menu */}
      <div className="flex-1 flex flex-col gap-4">
        {skills.map((skill, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="relative">
              <button
                className={`flex justify-between items-center w-full p-4 text-[28px] md:text-[36px] font-semibold 
                  border-b border-gray-800 transition-colors 
                  ${hoverIndex === i ? "bg-white text-black" : "text-white"}`}
                onClick={() => toggleAccordion(i)}
                onMouseEnter={() => handleHover(i)}
              >
                {skill}
                {isOpen ? <Minus size={32} /> : <Plus size={32} />}
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 overflow-hidden text-[24px] text-[#B9B9B9] text-left"
                >
                  <p className="font-semibold mb-2">Related Skills:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {skills.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
