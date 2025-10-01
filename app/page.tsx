import Hero from "@/components/Hero";
import SkillSectionFilmstrip from "@/components/SkillSectionFilmstrip";
import ScrollMarquee from "@/components/ScrollMarquee";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Hero />
      <AboutSection />
      <Work />
      <WorksSection />
      <div className="flex flex-col py-20 items-center justify-center">
        <ScrollMarquee text="UI Design • Prototype • Frontend Design • UX Research • Motion Graphics" />
      </div>
      {/* <SkillSectionFilmstrip /> */}
      <HorizontalScrollSection sections={3} />
      <Footer />

    </main>
  );
}
