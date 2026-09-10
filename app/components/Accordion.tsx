"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

export type AccordionRow = {
  n: string;
  name: string;
  kind: string;
  body: string;
};

/** Numbered rows separated by dashed rules; each opens in place. */
export default function Accordion({ rows }: { rows: AccordionRow[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ol className={styles.list}>
      {rows.map((row, i) => {
        const isOpen = open === row.n;
        return (
          <li
            key={row.n}
            className={styles.row}
            style={{ ["--index" as string]: String(i) }}
          >
            <button
              type="button"
              className={styles.head}
              aria-expanded={isOpen}
              aria-controls={`acc-${row.n}`}
              onClick={() => setOpen(isOpen ? null : row.n)}
            >
              <span className={styles.num}>{row.n}</span>
              <span className={styles.name}>{row.name}</span>
              <span className={styles.kind}>{row.kind}</span>
              <span className={styles.plus} data-open={isOpen} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>

            <div className={styles.panel} data-open={isOpen} id={`acc-${row.n}`}>
              <div className={styles.panelInner}>
                <p>{row.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
