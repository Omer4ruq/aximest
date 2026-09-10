import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactForm from "./ContactForm";
import { offices, site } from "../lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Offices in Montreal and Miami.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PageHero
        label="Contact"
        title="Let's talk about what you're building."
        intro="Tell us where you are and where you want to be. A senior engineer reads every enquiry."
        index="/004"
      />

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <div className={styles.asideGroup}>
            <h2 className={styles.asideTitle}>General</h2>
            <a className={styles.asideText} href={`tel:${site.phone.replace(/\D/g, "")}`}>
              {site.phone}
            </a>
            <a className={styles.asideText} href="mailto:hello@aximest.com">
              hello@aximest.com
            </a>
          </div>

          {offices.map((office) => (
            <div key={office.country} className={styles.asideGroup}>
              <h2 className={styles.asideTitle}>{office.country}</h2>
              <address className={styles.asideText} style={{ fontStyle: "normal" }}>
                {office.lines.join(", ")}
              </address>
            </div>
          ))}
        </aside>

        <ContactForm />
      </div>
    </div>
  );
}
