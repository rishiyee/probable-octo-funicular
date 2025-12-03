import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import ScrollMarquee from "@/components/ScrollMarquee";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Hero />
      <AboutSection />
      <WorksSection />
      <ScrollMarquee />
    </main>
  );
}
