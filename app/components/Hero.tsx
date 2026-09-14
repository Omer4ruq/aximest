"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "./Icons";
import HeroLines from "./HeroLines";
import ScrambleText from "./Scramble";
import { site } from "../lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className={styles.hero} ref={ref} data-ready={ready}>
      <h1 className="sr-only">
        {site.name} — An Elite Team of Software Engineers
      </h1>

      <div className={styles.grid}>
        <div className={styles.meta}>
          <ScrambleText delay={0}>{site.mark}</ScrambleText>
          <ScrambleText delay={0.2}>{site.city}</ScrambleText>
          <ScrambleText delay={0.4}>{site.code}</ScrambleText>
          <ScrambleText delay={0.6}>{site.codeLabel}</ScrambleText>
        </div>

        <HeroLines />

        <div className={styles.footer}>
          <div className={styles.wordmarkWrap} aria-hidden="true">
            <span className={styles.wordmark}>
              {site.name.toUpperCase()}
              <em>®</em>
            </span>
          </div>

          <a href="#intro" className={styles.explore}>
            <span className={styles.exploreSlash}>/</span>
            <span className={styles.exploreLabel}>Explore</span>
            <span className={styles.exploreIcon}>
              <ArrowDown />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
