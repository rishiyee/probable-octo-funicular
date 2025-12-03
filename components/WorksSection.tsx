import WorksContainer from "./WorksContainer";
import Pill from "./Pill";
import Work from "./Work";

export default function WorksSection() {
  return (
    <section id="works" className="w-full py-16 gap-16">
      <Work />

      <div className="max-w-[1440px] w-full mx-auto px-4 flex flex-col gap-16">
        <WorksContainer
          imageSrc="/project1.jpg"
          title="E-Commerce Website"
          link="https://dribbble.com/shots/1234567"
          rightContent={
            <>
              <Pill>UI/UX</Pill>
              <Pill variant="glass">Web</Pill>
            </>
          }
        />

        <WorksContainer
          imageSrc="/project5.jpg"
          title="Fintech Dashboard"
          link="https://dribbble.com/shots/1234567"
          rightContent={
            <>
              <Pill>UI/UX</Pill>
              <Pill variant="glass">App</Pill>
            </>
          }
        />
      </div>
    </section>
  );
}
