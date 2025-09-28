"use client";

import Image from "next/image";

export default function WorksSection() {
  const leftCard = {
    title: "Main Project",
    pills: ["UI", "React"],
    bgImage: "/mockup1.jpg",
    href: "/work/0",
  };

  const rightCards = [
    { title: "Project 1", pills: ["UI", "React"], bgImage: "/mockup2.jpg", href: "/work/1" },
    { title: "Project 2", pills: ["Next.js", "Design"], bgImage: "/mockup3.jpg", href: "/work/2" },
    { title: "Project 3", pills: ["Animation", "UX"], bgImage: "/mockup4.jpg", href: "/work/3" },
  ];

  return (
    <section className="flex gap-4 p-20 bg-black h-[100vh]">
      {/* Left card */}
      <a
        href={leftCard.href}
        className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer"
        style={{ backgroundImage: `url(${leftCard.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4
                        opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-2">{leftCard.title}</h2>
          <div className="flex flex-wrap gap-2">
            {leftCard.pills.map((pill, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-white text-white text-base">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </a>

      {/* Right cards */}
      <div className="flex flex-col gap-4 w-[50%] h-full">
        {/* Top card */}
        <a
          href={rightCards[0].href}
          className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer"
          style={{ backgroundImage: `url(${rightCards[0].bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4
                          opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-300">
            <h2 className="text-lg font-bold text-white mb-2">{rightCards[0].title}</h2>
            <div className="flex flex-wrap gap-2">
              {rightCards[0].pills.map((pill, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white text-white text-sm">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* Bottom two cards horizontally */}
        <div className="flex gap-4 flex-1">
          {rightCards.slice(1).map((card, idx) => (
            <a
              key={idx}
              href={card.href}
              className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer"
              style={{ backgroundImage: `url(${card.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4
                              opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0
                              transition-all duration-300">
                <h2 className="text-lg font-bold text-white mb-2">{card.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {card.pills.map((pill, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white text-white text-sm">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
