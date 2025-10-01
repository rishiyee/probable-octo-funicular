"use client";

export default function HeroFooter() {
  return (
    <footer className="w-full  flex items-center justify-center bg-black">
      <span
        className="text-white font-light text-center whitespace-nowrap overflow-hidden opacity-10"
        style={{
          fontSize: "calc(100vw / 4)", // dynamically scales to fill viewport width
        }}
      >
        fooyter
      </span>
    </footer>
  );
}
