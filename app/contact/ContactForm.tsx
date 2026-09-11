"use client";

import { useState } from "react";
import Button from "../components/Button";
import { ArrowRight } from "../components/Icons";
import ScrambleText from "../components/Scramble";
import styles from "./contact.module.css";

const SUBJECTS = [
  "New project",
  "Advisory / fractional CTO",
  "Blockchain",
  "Product development",
  "Enterprise software",
  "Artificial intelligence",
  "Something else",
];

function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  delay?: number;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        <ScrambleText delay={delay}>{label}</ScrambleText>
        {required ? <em>*</em> : null}
      </span>
      <input
        className={styles.input}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className={styles.field}>
        <span className={styles.label}>
          <ScrambleText delay={0}>Subject</ScrambleText>
          <em>*</em>
        </span>
        <span className={styles.selectWrap}>
          <select className={styles.input} name="subject" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <svg viewBox="0 0 12 8" fill="none" width="100%" height="100%">
              <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </span>
      </label>

      <Field label="First name" name="firstName" autoComplete="given-name" delay={0.1} />
      <Field label="Last name" name="lastName" autoComplete="family-name" delay={0.2} />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" delay={0.3} />
      <Field label="Email" name="email" type="email" autoComplete="email" delay={0.4} />

      <label className={styles.field}>
        <span className={styles.label}>
          <ScrambleText delay={0.5}>Message</ScrambleText>
          <em>*</em>
        </span>
        <textarea className={styles.textarea} name="message" rows={4} required />
      </label>

      <div className={styles.submitRow}>
        <p className={styles.note} role="status">
          {sent
            ? "Received — a senior engineer will reply within one business day."
            : ""}
        </p>
        <Button icon={<ArrowRight />} type="submit" className={styles.submit}>
          Transmit
        </Button>
      </div>
    </form>
  );
}
