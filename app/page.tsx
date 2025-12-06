import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import ScrollMarquee from "@/components/ScrollMarquee";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Hero />
      <AboutSection />
      <WorksSection />
      <ScrollMarquee />
      <SkillsSection />
      <Footer />
    </main>
  );
}
