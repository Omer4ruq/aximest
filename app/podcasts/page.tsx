import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import RevealGrid from "../components/RevealGrid";
import Button from "../components/Button";
import Media from "../components/Media";
import ScrambleText from "../components/Scramble";
import { ArrowUpRight } from "../components/Icons";
import { podcasts, site } from "../lib/site";
import styles from "./podcasts.module.css";

export const metadata: Metadata = {
  title: "Podcasts",
  description: `Long-form conversations from the ${site.name} team.`,
};

export default function PodcastsPage() {
  return (
    <>
      <PageHero
        title="Podcasts"
        statement="Yes, we build software. Yes, we ship products. And yes, we also talk about innovation. A lot."
        aside={
          <Button href="https://youtube.com" icon={<ArrowUpRight />} target="_blank">
            Watch on YouTube
          </Button>
        }
      />

      <RevealGrid className={styles.grid}>
        {podcasts.map((show, i) => (
          <li key={show.title} className={styles.card}>
            <div className={styles.tags}>
              {show.tags.map((tag, ti) => (
                <ScrambleText key={tag} className={styles.tag} delay={ti * 0.07}>
                  {tag}
                </ScrambleText>
              ))}
              <ScrambleText className={styles.status} delay={0.5}>
                {show.status}
              </ScrambleText>
            </div>

            <p className={styles.host}>Hosted by {show.host}</p>

            <h2 className={styles.title}>{show.title}</h2>

            <p className={styles.body}>{show.body}</p>

            <figure className={styles.cover}>
              <Media seed={i + 5} />
              <figcaption className={styles.coverLabel}>
                {show.title}
                <span>A {site.name} Podcast</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </RevealGrid>
    </>
  );
}
