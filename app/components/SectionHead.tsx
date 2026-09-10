"use client";

import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

/**
 * Grid-aligned section header: "/ LABEL" in the left columns, the display
 * title from column 4, and the count / aside in the right columns.
 */
export default function SectionHead({
  label,
  title,
  count,
  aside,
  id,
}: {
  label: string;
  title: string;
  count?: string;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div className={styles.head} id={id}>
      <div className={styles.label} data-reveal>
        <span className={styles.slash}>/</span>
        <span>{label}</span>
      </div>

      <h2 className={styles.title}>
        {title.split(" ").map((word, i) => (
          <span
            className={styles.word}
            key={i}
            data-reveal="mask"
            style={{ ["--stagger" as string]: `${i * 0.04}s` }}
          >
            <span>{word}&nbsp;</span>
          </span>
        ))}
      </h2>

      <div className={styles.aside}>
        {count ? (
          <span className={styles.count} data-reveal>
            {count}
          </span>
        ) : null}
        {aside ? (
          <span className={styles.asideSlot} data-reveal>
            {aside}
          </span>
        ) : null}
      </div>
    </div>
  );
}
