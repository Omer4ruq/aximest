import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import styles from "../components/SimplePage.module.css";

export const metadata: Metadata = { title: "Articles", description: "Practical writing on architecture, protocols and shipping software that lasts." };

export default function Page() {
  return (
    <>
      <PageHero label="Articles" title="Notes from the engineering floor." intro="Practical writing on architecture, protocols and shipping software that lasts." index="/006" />
      <div className={styles.body}>
        <div className={styles.inner}>
          <p>New writing lands every few weeks.</p>
        </div>
      </div>
    </>
  );
}
