import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import ContactMarquee from "./ContactMarquee";
import { offices, site } from "../lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Offices in Montreal and Miami.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <ContactMarquee />

      <div className={styles.panel}>
        <p className={styles.lead}>
          Engage the neural link and let your signal reach us across the void.
        </p>

        <div className={styles.rule} aria-hidden="true" />

        <ContactForm />
      </div>

      <section className={styles.details}>
        <h2 className={styles.detailsTitle}>
          <span className={styles.slash}>/</span> Offices
        </h2>

        <div className={styles.detailsGrid}>
          {offices.map((office) => (
            <div key={office.country} className={styles.office}>
              <h3 className={styles.officeName}>{office.country}</h3>
              <address className={styles.officeAddress}>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a href={`tel:${site.phone.replace(/\D/g, "")}`} className={styles.officeLink}>
                {site.phone}
              </a>
            </div>
          ))}

          <div className={styles.office}>
            <h3 className={styles.officeName}>General</h3>
            <a href="mailto:hello@aximest.com" className={styles.officeLink}>
              hello@aximest.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
