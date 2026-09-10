"use client";

import { useMemo, useState } from "react";
import PageTheme from "../components/PageTheme";
import FilterPills from "../components/FilterPills";
import Accordion from "../components/Accordion";
import { stack, stackGroups, site } from "../lib/site";
import styles from "./expertise.module.css";

export default function ExpertiseView() {
  const [group, setGroup] = useState(stackGroups[0]);
  const rows = useMemo(
    () => (group === "All" ? stack : stack.filter((s) => s.group === group)),
    [group],
  );

  return (
    <>
      <PageTheme theme="dark" />

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.intro}>
            <h1 className={styles.title}>
              <span className={styles.mask}>
                <span>Core-Level Control</span>
              </span>
            </h1>
            <p className={styles.body}>
              {site.name}&apos;s powerhouse team of senior full-stack developers
              brings unmatched expertise and knowledge across a wide range of
              tech stacks.
            </p>
          </div>

          <div className={styles.filters}>
            <FilterPills
              options={stackGroups}
              active={group}
              onChange={setGroup}
              label="Filter by category"
            />
          </div>
        </div>

        <div className={styles.right}>
          {rows.length ? (
            <Accordion rows={rows} />
          ) : (
            <p className={styles.empty}>Nothing under that category yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
