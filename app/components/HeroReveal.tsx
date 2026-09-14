"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import ScrambleText from "./Scramble";
import { ArrowRight } from "./Icons";
import { services, site } from "../lib/site";
import styles from "./HeroReveal.module.css";

const STATEMENT =
  "A North American team of specialists with profound technical expertise.";

/**
 * The reveal that the red hero slides off. The chrome mark is pinned behind
 * for the whole section, so the grid labels and then the opening statement
 * scroll over it rather than sitting in a section of their own.
 */
export default function HeroReveal() {
  const section = useRef<HTMLElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  // mark tilts a little with scroll
  useEffect(() => {
    const el = section.current;
    const node = mark.current;
    if (!el || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(-1, Math.min(1, 1 - (rect.top + rect.height / 2) / vh));
      node.style.setProperty("--p", p.toFixed(4));
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // statement words warm from grey to full contrast as the block rises
  useEffect(() => {
    const wrapper = copy.current;
    if (!wrapper) return;
    const words = Array.from(wrapper.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.style.removeProperty("color"));
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the block enters from the bottom, 1 when its centre meets the
      // viewport centre — the reference's "top bottom" to "center center"
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh / 2 + rect.height / 2)),
      );
      const reach = progress * (words.length + 6);
      words.forEach((word, i) => {
        const local = Math.max(0, Math.min(1, reach - i));
        const channel = Math.round(167 - local * 167);
        word.style.color = `rgb(${channel}, ${channel}, ${channel})`;
      });
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.reveal} ref={section} id="intro">
      {/* chrome mark, pinned behind everything in this section */}
      <div className={styles.media} aria-hidden="true">
        <div className={styles.mediaWrapper}>
          <span className={styles.mark} ref={mark}>
            {site.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* grid labels, centred and pinned for the first two folds */}
      <div className={styles.grid} aria-hidden="true">
        <div className={styles.gridWrapper}>
          <div className={styles.labels}>
            <ScrambleText delay={0}>{site.mark}</ScrambleText>
            <ul className={styles.stack}>
              {services.map((service, i) => (
                <li key={service.id}>
                  <ScrambleText delay={0.2 + i * 0.1}>{service.title}</ScrambleText>
                </li>
              ))}
            </ul>
            <ScrambleText delay={0.4}>{site.code}</ScrambleText>
            <ScrambleText delay={0.6}>{site.codeLabel}</ScrambleText>
          </div>
        </div>
      </div>

      {/* opening statement, scrolling over the pinned mark */}
      <div className={styles.content}>
        <div className={styles.contentWrapper} ref={copy}>
          <p className={styles.label}>
            <ScrambleText>Who we are</ScrambleText>
            <span>/</span>
          </p>

          <div className={styles.text}>
            <h1 className="sr-only">{STATEMENT}</h1>
            <p className={styles.fadeText} aria-hidden="true">
              {STATEMENT.split(" ").map((word, i) => (
                <span key={i} data-word>
                  {word}{" "}
                </span>
              ))}
            </p>

            <div className={styles.link}>
              <Button href="/contact" icon={<ArrowRight />}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
