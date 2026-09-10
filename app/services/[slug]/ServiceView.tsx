"use client";

import Link from "next/link";
import PageTheme from "../../components/PageTheme";
import Button from "../../components/Button";
import Media from "../../components/Media";
import ServiceGlyph from "../../components/ServiceGlyph";
import { ArrowDown, ArrowRight, ArrowUpRight } from "../../components/Icons";
import { useRevealGroup } from "../../hooks/useReveal";
import type { Service } from "../../lib/site";
import { serviceDetail, services } from "../../lib/site";
import styles from "./service.module.css";

export default function ServiceView({ service }: { service: Service }) {
  const detail = serviceDetail[service.id];
  const reveal = useRevealGroup<HTMLOListElement>();
  const others = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageTheme theme="dark" />

      {/* ---- hero ---- */}
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.heroIndex}>S{service.index.slice(2)}</span>
          <span className={styles.heroSlash}>/</span>
          <h1 className={styles.heroName}>{service.title}</h1>
        </div>

        <figure className={styles.heroMedia}>
          <Media seed={3} dark />
        </figure>

        <span className={styles.heroAbbr} aria-hidden="true">
          {detail.abbr}
        </span>

        <div className={styles.heroFoot}>
          <span>{service.title}</span>
          <span>{service.count} Services</span>
          <span className={styles.heroSlash}>/</span>
          <a href="#detail" className={styles.heroExplore}>
            Explore
            <span className={styles.heroExploreIcon}>
              <ArrowDown />
            </span>
          </a>
        </div>
      </header>

      {/* ---- dark body ---- */}
      <section className={styles.body} id="detail">
        <div className={styles.bodyLeft}>
          <div className={styles.bodyLabel}>
            <span>{service.index.slice(2)}</span>
            <span className={styles.heroSlash}>/</span>
            <span>{service.title}</span>
          </div>
          <span className={styles.bodyGlyph}>
            <ServiceGlyph id={service.id} />
          </span>
        </div>

        <div className={styles.bodyRight}>
          <h2 className={styles.statement}>{detail.statement}</h2>
          <p className={styles.intro}>{detail.intro}</p>

          <ol className={styles.caps}>
            {detail.capabilities.map((cap, i) => (
              <li key={cap} className={styles.cap}>
                <span className={styles.capNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.capName}>{cap}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- sub-services ---- */}
      <section className={styles.sub}>
        <div className={styles.subHead}>
          <h2 className={styles.subTitle}>{service.title} Services</h2>
          <span className={styles.subCount}>({detail.items.length})</span>
        </div>

        <ol className={styles.cards} ref={reveal}>
          {detail.items.map((item, i) => (
            <li
              key={item.n}
              className={styles.cardItem}
              data-reveal
              style={{ ["--stagger" as string]: `${(i % 4) * 0.09}s` }}
            >
              <article className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.cardIndex}>
                    {detail.abbr}
                    <br />
                    {item.n}
                  </span>
                  <span className={styles.cardDot} aria-hidden="true" />
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>

                <span className={styles.cardCta}>
                  Explore
                  <span className={styles.cardArrow}>
                    <ArrowRight />
                  </span>
                </span>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- next services ---- */}
      <section className={styles.more}>
        <h2 className={styles.moreTitle}>Other services</h2>
        <ul>
          {others.map((other) => (
            <li key={other.id}>
              <Link href={other.slug} className={styles.moreLink}>
                <span className={styles.moreIndex}>{other.index}</span>
                <span className={styles.moreName}>{other.title}</span>
                <span className={styles.moreArrow}>
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.moreCta}>
          <p>Tell us what you are building and we will scope it with you.</p>
          <Button href="/contact" hoverLabel="Say hello" icon={<ArrowRight />}>
            Start a project
          </Button>
        </div>
      </section>
    </>
  );
}
