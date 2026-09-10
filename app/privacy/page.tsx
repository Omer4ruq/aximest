import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import styles from "../components/SimplePage.module.css";

export const metadata: Metadata = { title: "Privacy", description: "How we handle the information you share with us." };

export default function Page() {
  return (
    <>
      <PageHero label="Privacy" title="Privacy Policy" intro="How we handle the information you share with us." index="/008" />
      <div className={styles.body}>
        <div className={styles.inner}>
          <h2>What we collect</h2>
          <p>
            Only what you send us through the contact form: your name, email,
            company and message.
          </p>
          <h2>How we use it</h2>
          <p>
            To reply to your enquiry. We do not sell or share it with third
            parties.
          </p>
        </div>
      </div>
    </>
  );
}
