import Hero from "@/components/hero";
import ScrollMarquee from "@/components/scrollmarquee";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Hero />
      <div className="flex flex-col py-20 items-center justify-center">
        <ScrollMarquee
          text="UI Design • Prototype • Frontend Design • UX Research • Motion Graphics"
          baseSpeed={0.9}
          multiplier={2}
        />
      </div>
    </main>
  );
}
