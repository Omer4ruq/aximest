"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className={styles.hero} data-ready={ready} data-rule={rule}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          <span className={styles.mask}>
            <span>{title}</span>
          </span>
        </h1>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>

      {statement ? (
        <div className={styles.right}>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
          <p className={styles.statement}>
            {statement.split(" ").map((word, i) => (
              <span className={styles.word} key={i}>
                <span style={{ ["--d" as string]: `${0.12 + i * 0.025}s` }}>
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </p>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
