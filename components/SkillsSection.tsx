"use client";

import SkillStrip from "./SkillStrip";

const SKILLS = [
  {
    index: "01",
    label: "UI/UX Design",
    pills: ["Wireframing", "Prototyping", "User Flows", "Interaction Design"],
  },
  {
    index: "02",
    label: "Graphic Design",
    pills: ["Brand Assets", "Social Media", "Posters", "Illustration"],
  },
  {
    index: "03",
    label: "Photography & Editing",
    pills: ["Portraits", "Retouching", "Color Correction", "Composition"],
  },
];

export default function SkillsSection() {
  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1440px] mx-auto px-4 flex flex-col gap-24">

        {/* Heading */}
        <h2
          id="skills-heading"
          className="
            sf-pro
            w-full lg:w-[48.61%]
            text-[40px] sm:text-[48px] lg:text-[64px]
            font-[400]
            leading-[110%]
            text-[#878787]
          "
        >
          We craft bold digital experiences — from UI/UX and websites to motion,
          photography, and refined post-production.
        </h2>

        {/* Skill Strips */}
        <div
          className="flex flex-col gap-[32px]"
          role="list"
          aria-labelledby="skills-heading"
        >
          {SKILLS.map((s) => (
            <div key={s.index} role="listitem">
              <SkillStrip
                index={s.index}
                label={s.label}
                pills={s.pills}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
