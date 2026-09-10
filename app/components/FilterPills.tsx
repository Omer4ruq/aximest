"use client";

import styles from "./FilterPills.module.css";

export default function FilterPills({
  options,
  active,
  onChange,
  label,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className={styles.pills} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.pill}
          data-active={active === option}
          aria-pressed={active === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
