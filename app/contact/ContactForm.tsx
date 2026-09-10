"use client";

import { useState } from "react";
import Button from "../components/Button";
import { ArrowRight } from "../components/Icons";
import styles from "./contact.module.css";

const BUDGETS = ["< $50k", "$50k – $150k", "$150k – $500k", "$500k +"];
const INTERESTS = [
  "Advisory",
  "Blockchain",
  "Product Development",
  "Enterprise Software",
  "Artificial Intelligence (AI)",
];

export default function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggle = (value: string) =>
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.slash}>/</span> What can we help with?
        </legend>
        <div className={styles.chips}>
          {INTERESTS.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.chip}
              data-active={interests.includes(item)}
              onClick={() => toggle(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span className={styles.slash}>/</span> Budget
        </legend>
        <div className={styles.chips}>
          {BUDGETS.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.chip}
              data-active={budget === item}
              onClick={() => setBudget(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Company</span>
          <input name="company" autoComplete="organization" />
        </label>
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.label}>Tell us about the project</span>
          <textarea name="message" rows={4} required />
        </label>
      </div>

      <div className={styles.submitRow}>
        <p className={styles.note} role="status">
          {sent
            ? "Thanks — we'll get back to you within one business day."
            : "We reply to every enquiry within one business day."}
        </p>
        <Button color="black" hoverLabel="Send it" icon={<ArrowRight />} type="submit">
          Send enquiry
        </Button>
      </div>
    </form>
  );
}
