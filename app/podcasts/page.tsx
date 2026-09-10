import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import styles from "../components/SimplePage.module.css";

export const metadata: Metadata = { title: "Podcasts", description: "Long-form interviews with the engineers and founders we work alongside." };

export default function Page() {
  return (
    <>
      <PageHero label="Podcasts" title="Conversations from the build." intro="Long-form interviews with the engineers and founders we work alongside." index="/005" />
      <div className={styles.body}>
        <div className={styles.inner}>
          <p>Episodes are released monthly. Subscribe wherever you listen.</p>
        </div>
      </div>
    </>
  );
}
