import type { ReactNode } from "react";
import ScrambleText from "./Scramble";
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
        <ScrambleText as="p" className={styles.updated} delay={0.25}>
          {`Last updated: ${updated}`}
        </ScrambleText>
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
