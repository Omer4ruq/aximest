import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import styles from "../components/SimplePage.module.css";

export const metadata: Metadata = { title: "Projects", description: "A selection of platforms, protocols and products shipped with our clients." };

export default function Page() {
  return (
    <>
      <PageHero label="Projects" title="Work we can talk about." intro="A selection of platforms, protocols and products shipped with our clients." index="/002" />
      <div className={styles.body}>
        <div className={styles.inner}>
          <p>
            Case studies are published as our clients go live. Reach out and we
            will walk you through the work most relevant to your problem.
          </p>
        </div>
      </div>
    </>
  );
}
