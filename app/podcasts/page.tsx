import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Media from "../components/Media";
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

      <ul className={styles.grid}>
        {podcasts.map((show, i) => (
          <li key={show.title} className={styles.card}>
            <div className={styles.tags}>
              {show.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              <span className={styles.status}>{show.status}</span>
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
      </ul>
    </>
  );
}
