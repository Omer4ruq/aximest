"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { pillars } from "../lib/site";
import styles from "./Pillars.module.css";

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  // Rows stay hidden until the panel is on screen, then run their stagger.
  // Under reduced motion the CSS drops the transitions, so they simply appear.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      id="expertise"
      ref={sectionRef}
      data-inview={inView}
    >
      <div className={styles.nav}>
        <div className={styles.navList} role="tablist" aria-label="What defines us">
          {pillars.map((pillar, i) => (
            <Button
              key={pillar.key}
              color={active === i ? "grey" : "default"}
              className={styles.tab}
              role="tab"
              id={`tab-${pillar.key}`}
              aria-controls={`panel-${pillar.key}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const next =
                  e.key === "ArrowRight"
                    ? (i + 1) % pillars.length
                    : (i - 1 + pillars.length) % pillars.length;
                setActive(next);
                document.getElementById(`tab-${pillars[next].key}`)?.focus();
              }}
            >
              {pillar.label}
            </Button>
          ))}
        </div>
      </div>

      {/* One panel; the cards share a single grid cell and cross-fade. */}
      <div className={styles.panel}>
        {pillars.map((pillar, i) => (
          <div
            key={pillar.key}
            className={styles.card}
            id={`panel-${pillar.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${pillar.key}`}
            data-active={active === i}
            aria-hidden={active !== i}
          >
            <span className={styles.separator} aria-hidden="true">
              /
            </span>

            <h2 className={styles.title}>{pillar.label}</h2>

            <ol className={styles.list}>
              {pillar.items.map((item, ii) => (
                <li
                  key={item.n}
                  className={styles.item}
                  style={{ ["--index" as string]: String(ii) }}
                >
                  <span className={styles.itemIndex}>{item.n}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <div className={styles.itemContent}>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
