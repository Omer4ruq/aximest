import Hero from "./components/Hero";
import ChromeMark from "./components/ChromeMark";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Clients from "./components/Clients";
import Pillars from "./components/Pillars";
import Testimonial from "./components/Testimonial";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ChromeMark />
      <Intro />
      <Services />
      <Clients />
      <Pillars />
      <Testimonial />
      <CtaSection />
    </>
  );
}
