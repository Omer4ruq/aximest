"use client";

import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import Media from "../components/Media";
import ScrambleText from "../components/Scramble";
import { useInView } from "../hooks/useInView";
import { ArrowRight } from "../components/Icons";
import { articles, site } from "../lib/site";
import styles from "./articles.module.css";

const PER_PAGE = 4;

export default function ArticlesView() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const grid = useInView<HTMLUListElement>();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  return (
    <>
      <PageHero
        title="Articles"
        badge="Currently in English only"
        statement={`Engineering insights from ${site.name} — AI, blockchain, and custom software, built and shipped by senior developers.`}
      />

      <section className={styles.browse}>
        <h2 className={styles.browseTitle}>Browse all posts</h2>

        <div className={styles.controls}>
          <div className={styles.searchCol}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search post..."
              aria-label="Search posts"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
            />
            <p className={styles.count}>
              {filtered.length} Articles • Filters [{query ? 1 : 0}]
            </p>
          </div>

          <div className={styles.pager}>
            <button
              type="button"
              className={styles.pagerBtn}
              onClick={() => setPage((v) => Math.max(0, v - 1))}
              disabled={current === 0}
            >
              <span className={styles.pagerIconLeft}>
                <ArrowRight />
              </span>
              Prev
            </button>
            <span className={styles.pagerCount}>
              | {current + 1} of {pages} |
            </span>
            <button
              type="button"
              className={styles.pagerBtn}
              onClick={() => setPage((v) => Math.min(pages - 1, v + 1))}
              disabled={current >= pages - 1}
            >
              Next
              <span className={styles.pagerIcon}>
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>

        <ul className={styles.grid} ref={grid}>
          {visible.map((article, i) => (
            <li key={article.id} className={styles.card}>
              <div className={styles.cardHead}>
                <ScrambleText delay={(i % 4) * 0.1}>{article.id}</ScrambleText>
                <ScrambleText delay={(i % 4) * 0.1 + 0.05}>
                  {article.date}
                </ScrambleText>
              </div>

              <div className={styles.cardBody}>
                <ScrambleText
                  as="p"
                  className={styles.tags}
                  delay={(i % 4) * 0.1 + 0.1}
                >
                  {article.tags.join(", ")}
                </ScrambleText>
                <h3 className={styles.title}>{article.title}</h3>
                <figure className={styles.thumb}>
                  <Media seed={i} />
                  <figcaption>{article.title}</figcaption>
                </figure>
              </div>
            </li>
          ))}
        </ul>

        {!visible.length ? (
          <p className={styles.empty}>No posts match that search.</p>
        ) : null}
      </section>
    </>
  );
}
