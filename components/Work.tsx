"use client";

export default function WorksText() {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <h1
        className="
          font-[Host Grotesk] font-light leading-none text-center
          text-[100px]       /* default/mobile */
          sm:text-[100px]    /* 640px */
          md:text-[100px]    /* 768px */
          lg:text-[200px]    /* 1024px */
          xl:text-[300px]    /* 1280px */
          2xl:text-[400px]   /* 1536px */
        "
        style={{
          background: "linear-gradient(180deg, #2A2A2A 0%, #020102 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}  
      >
        Works
      </h1>
    </div>
  );
}
