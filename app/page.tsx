import Hero from "./components/Hero";
import HeroReveal from "./components/HeroReveal";
import Services from "./components/Services";
import Clients from "./components/Clients";
import WorkTornado from "./components/WorkTornado";
import PageTheme, { ThemeZone } from "./components/PageTheme";
import styles from "./page.module.css";
import Pillars from "./components/Pillars";
import Testimonial from "./components/Testimonial";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <>
      <PageTheme base="light" />
      <Hero />
      <HeroReveal />
      <Services />
      <Clients />

      {/* The helix runs on black; the existing theme canvas paints the page
          across as it arrives and back again on the way out. */}
      <ThemeZone theme="dark">
        <WorkTornado />
      </ThemeZone>

      {/* Rides up over the pinned helix rather than waiting for it to scroll
          away. The zone's own top moves up with it, so the theme still morphs
          back to light exactly as this block reaches the top of the screen. */}
      <ThemeZone theme="light" className={styles.climb}>
        <Pillars />
        <Testimonial />
        <CtaSection />
      </ThemeZone>
    </>
  );
}
