import Hero from "@/components/Hero";
import ScrollMarquee from "@/components/ScrollMarquee";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Hero />
      <div className="flex flex-col py-20 items-center justify-center">
        <ScrollMarquee
          texts={[
            "UI Design",
            "Prototype",
            "Frontend Design",
            "UX Research",
            "Motion Graphics",
          ]}
          baseSpeed={0.9}
          multiplier={2}
        />



      </div>

    </main>
  );
}
