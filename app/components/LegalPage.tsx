import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

/** Centred title over a grey panel of numbered sections. */
export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>
      </header>

      <div className={styles.panel}>
        {sections.map((section, i) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>
              {i + 1}. {section.heading}
            </h2>
            <div className={styles.body}>{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
