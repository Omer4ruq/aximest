import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import styles from "../components/SimplePage.module.css";

export const metadata: Metadata = { title: "Terms", description: "The terms that govern the use of this website and our services." };

export default function Page() {
  return (
    <>
      <PageHero label="Terms" title="Terms &amp; Conditions" intro="The terms that govern the use of this website and our services." index="/007" />
      <div className={styles.body}>
        <div className={styles.inner}>
          <h2>Use of this site</h2>
          <p>
            This website is provided for informational purposes. Content may
            change without notice.
          </p>
          <h2>Engagements</h2>
          <p>
            Work is governed by the statement of work signed for each
            engagement, which takes precedence over anything published here.
          </p>
        </div>
      </div>
    </>
  );
}
