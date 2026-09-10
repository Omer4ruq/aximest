"use client";

import { useEffect, useRef, useState } from "react";
import { useRevealGroup } from "../hooks/useReveal";
import { pillars } from "../lib/site";
import styles from "./Pillars.module.css";

export default function Pillars() {
  const reveal = useRevealGroup<HTMLElement>();
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = panels.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = nodes.indexOf(entry.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const node = panels.current[i];
    if (!node) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(node, { offset: -110 });
    else node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.section} id="expertise" ref={reveal}>
      <div className={styles.tabsWrap}>
        <div className={styles.tabs} role="tablist" aria-label="What defines us">
          {pillars.map((pillar, i) => (
            <button
              key={pillar.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={styles.tab}
              data-active={active === i}
              onClick={() => goTo(i)}
            >
              {pillar.label}
            </button>
          ))}
        </div>
      </div>

      {pillars.map((pillar, pi) => (
        <div
          key={pillar.key}
          className={styles.panel}
          ref={(el) => {
            panels.current[pi] = el;
          }}
        >
          <div className={styles.panelHead}>
            <span className={styles.slash}>/</span>
            <h2 className={styles.panelTitle}>
              <span className={styles.mask} data-reveal="mask">
                <span>{pillar.label}</span>
              </span>
            </h2>
          </div>

          <ol className={styles.items}>
            {pillar.items.map((item, ii) => (
              <li key={item.n} className={styles.item}>
                <span
                  className={styles.itemNum}
                  data-reveal
                  style={{ ["--stagger" as string]: `${ii * 0.05}s` }}
                >
                  {item.n}
                </span>
                <h3
                  className={styles.itemTitle}
                  data-reveal
                  style={{ ["--stagger" as string]: `${ii * 0.05 + 0.04}s` }}
                >
                  {item.title}
                </h3>
                <p
                  className={styles.itemBody}
                  data-reveal
                  style={{ ["--stagger" as string]: `${ii * 0.05 + 0.08}s` }}
                >
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <span className={styles.panelIndex} aria-hidden="true">
            {pi + 1}
          </span>
        </div>
      ))}
    </section>
  );
}
