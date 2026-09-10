"use client";

import { useEffect, useState } from "react";
import styles from "./PageHero.module.css";

export default function PageHero({
  label,
  title,
  intro,
  index,
}: {
  label: string;
  title: string;
  intro?: string;
  index?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className={styles.hero} data-ready={ready}>
      <div className={styles.meta}>
        <span className={styles.slash}>/</span>
        <span>{label}</span>
        <span className={styles.index}>{index}</span>
      </div>

      <h1 className={styles.title}>
        {title.split(" ").map((word, i) => (
          <span className={styles.word} key={i}>
            <span style={{ ["--d" as string]: `${0.12 + i * 0.05}s` }}>{word}&nbsp;</span>
          </span>
        ))}
      </h1>

      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </header>
  );
}
