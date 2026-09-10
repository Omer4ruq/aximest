"use client";

import { Fragment } from "react";
import { ArrowRightLong } from "../components/Icons";
import styles from "./contact.module.css";

/** Oversized "→ Connect" ticker standing in for the page title. */
export default function ContactMarquee() {
  const group = (
    <span className={styles.marqueeGroup} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <Fragment key={i}>
          <span className={styles.marqueeIcon}>
            <ArrowRightLong />
          </span>
          <span className={styles.marqueeWord}>Connect</span>
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className={styles.marquee}>
      <h1 className="sr-only">Contact</h1>
      <div className={styles.marqueeTrack}>
        {group}
        {group}
      </div>
    </div>
  );
}
