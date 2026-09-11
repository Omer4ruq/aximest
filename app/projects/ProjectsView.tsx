"use client";

import { useMemo, useState } from "react";
import PageTheme from "../components/PageTheme";
import PageHero from "../components/PageHero";
import FilterPills from "../components/FilterPills";
import Accordion from "../components/Accordion";
import { projectGroups, projects, site } from "../lib/site";
import styles from "./projects.module.css";

export default function ProjectsView() {
  const [group, setGroup] = useState(projectGroups[0]);
  const rows = useMemo(
    () => projects.filter((p) => p.group === group),
    [group],
  );

  return (
    <>
      <PageTheme base="dark" />

      <PageHero
        title="Projects"
        statement="We work with some incredible people."
        note={`${site.name} is a digital transformation and product development consulting firm with a core of marketing, design, sales and software development expertise.`}
        rule={false}
      />

      <div className={styles.filters}>
        <FilterPills
          options={projectGroups}
          active={group}
          onChange={setGroup}
          label="Filter projects"
        />
      </div>

      <section className={styles.list}>
        <Accordion rows={rows} />
      </section>
    </>
  );
}
