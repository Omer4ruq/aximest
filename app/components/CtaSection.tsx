"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import Media from "./Media";
import { ArrowRight, ArrowRightLong } from "./Icons";
import { useRevealGroup } from "../hooks/useReveal";
import styles from "./CtaSection.module.css";

/**
 * Closing statement. Four oversized lines sit on the grid at different
 * offsets and drift horizontally as the section scrolls past.
 */
export default function CtaSection() {
  const reveal = useRevealGroup<HTMLElement>();
  const lines = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = reveal.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const drift = [-2.5, 3, -1.6, 2.2];
    let frame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(
        -1,
        Math.min(1, 1 - (rect.top + rect.height / 2) / (vh / 2 + rect.height / 2)),
      );
      lines.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(${p * drift[i]}vw, 0, 0)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reveal]);

  const line = (i: number, className: string, children: React.ReactNode) => (
    <span
      className={`${styles.line} ${className}`}
      ref={(el) => {
        lines.current[i] = el;
      }}
      aria-hidden="true"
    >
      <span
        className={styles.mask}
        data-reveal="mask"
        style={{ ["--stagger" as string]: `${i * 0.07}s` }}
      >
        <span>{children}</span>
      </span>
    </span>
  );

  return (
    <section className={styles.section} ref={reveal} id="contact-cta">
      <div className={styles.grid}>
        <h2 className={styles.title}>
          <span className="sr-only">We Drive Your Systems Fwrd</span>
          {line(0, styles.l1, <><span className={styles.left}>We</span><span className={styles.right}>Drive</span></>)}
          {line(
            1,
            styles.l2,
            <>
              <i className={styles.arrow}>
                <ArrowRightLong />
              </i>
              Your
            </>,
          )}
          {line(2, styles.l3, "Systems")}
          {line(3, styles.l4, "Fwrd")}
        </h2>

        <div className={styles.aside}>
          <p className={styles.sub} data-reveal>
            Digital architectures for an ever-shifting world.
          </p>
          <span data-reveal style={{ ["--stagger" as string]: "0.08s" }}>
            <Button
              href="/contact"
              icon={<ArrowRight />}
              className={styles.button}
            >
              Let&apos;s talk
            </Button>
          </span>
        </div>
      </div>

      <div className={styles.strip} aria-hidden="true">
        <Media seed={2} />
      </div>
    </section>
  );
}
