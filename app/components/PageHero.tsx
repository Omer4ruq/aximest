"use client";

import type { ReactNode } from "react";
import ScrambleText from "./Scramble";
import styles from "./PageHero.module.css";

/**
 * Inner-page header: the page name on the left columns, a display-size
 * statement on the right, with room for a badge and a trailing note.
 */
export default function PageHero({
  title,
  statement,
  badge,
  note,
  aside,
  rule = true,
}: {
  title: string;
  statement?: string;
  badge?: string;
  note?: string;
  aside?: ReactNode;
  rule?: boolean;
}) {
  return (
    <header className={styles.hero} data-rule={rule}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>

      {statement ? (
        <div className={styles.right}>
          {badge ? (
            <ScrambleText className={styles.badge} delay={0.25}>
              {badge}
            </ScrambleText>
          ) : null}
          <p className={styles.statement}>{statement}</p>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
