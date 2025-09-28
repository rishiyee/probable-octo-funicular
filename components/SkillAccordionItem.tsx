"use client";

import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillAccordionItem({
  index,
  skill,
  isOpen,
  isHover,
  onToggle,
  onHover,
  skillsList,
}: {
  index: number;
  skill: string;
  isOpen: boolean;
  isHover: boolean;
  onToggle: () => void;
  onHover: () => void;
  skillsList: string[];
}) {
  return (
    <div className="relative">
      {/* Main Skill Button Wrapper */}
      <div className="relative flex flex-col">
        {/* Hover Background only behind button */}
        <motion.div
          layout
          initial={{ height: 0 }}
          animate={{ height: isHover ? "100%" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-white z-0"
        />

        {/* Accordion Button */}
        <button
          className={`relative flex items-center w-full p-4 text-[28px] md:text-[36px] font-normal 
            border-b border-gray-800 transition-colors duration-300 z-10 ${
              isHover ? "text-black" : "text-white"
            }`}
          onClick={onToggle}
          onMouseEnter={onHover}
          onMouseLeave={onHover}
        >
          {/* Number */}
          <span className="text-[14px] font-medium mr-[24px]">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Main skill text */}
          <span className="flex-1 text-left">{skill}</span>

          {/* Accordion icon */}
          {isOpen ? <Minus size={32} /> : <Plus size={32} />}
        </button>
      </div>

      {/* Accordion Content - Related Skills */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-4 text-left bg-black"
          >
            <ul className="list-disc list-inside space-y-1 p-6">
              {skillsList.map((s, idx) => (
                <li
                  key={idx}
                  className="text-white text-[24px]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
