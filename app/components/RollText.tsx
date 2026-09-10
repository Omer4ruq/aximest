"use client";

import styles from "./RollText.module.css";

/**
 * Per-character vertical roll on hover — the signature link interaction.
 * Characters leave upward and their clones arrive from below, staggered.
 */
export default function RollText({
  children,
  className = "",
  stagger = 0.018,
}: {
  children: string;
  className?: string;
  stagger?: number;
}) {
  const chars = Array.from(children);

  return (
    <span className={`${styles.roll} ${className}`} aria-label={children}>
      <span className={styles.layer} aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={`a-${i}`}
            className={styles.char}
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
      <span className={`${styles.layer} ${styles.clone}`} aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={`b-${i}`}
            className={styles.char}
            style={{ transitionDelay: `${i * stagger}s` }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}
