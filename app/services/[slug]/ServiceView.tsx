"use client";

import Link from "next/link";
import PageTheme, { ThemeZone } from "../../components/PageTheme";
import Button from "../../components/Button";
import Media from "../../components/Media";
import ServiceGlyph from "../../components/ServiceGlyph";
import ScrambleText, { scrambleWithin } from "../../components/Scramble";
import { ArrowDown, ArrowRight, ArrowUpRight } from "../../components/Icons";
import { useInView, useColumnParallax } from "../../hooks/useInView";
import type { Service } from "../../lib/site";
import { serviceDetail, services } from "../../lib/site";
import styles from "./service.module.css";

export default function ServiceView({ service }: { service: Service }) {
  const detail = serviceDetail[service.id];
  const caps = useInView<HTMLOListElement>();
  const cards = useColumnParallax<HTMLOListElement>();
  const others = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageTheme base="dark" />

      {/* ---- hero ---- */}
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.heroIndex}>S{service.index.slice(2)}</span>
          <span className={styles.heroSlash}>/</span>
          <h1 className={styles.heroName}>{service.title}</h1>
        </div>

        {/* media and wordmark share a bottom edge, the wordmark in front */}
        <div className={styles.heroStage}>
          <figure className={styles.heroMedia}>
            <Media seed={3} dark />
            <figcaption className={styles.heroCounter}>
              <ScrambleText delay={0.2}>{`${service.count} Services`}</ScrambleText>
            </figcaption>
          </figure>

          <span className={styles.heroAbbr} aria-hidden="true">
            {detail.abbr}
          </span>
        </div>

        <div className={styles.heroFoot}>
          <ScrambleText delay={0.3}>{service.title}</ScrambleText>
          <ScrambleText delay={0.4}>{`${service.count} Services`}</ScrambleText>
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
            <ScrambleText delay={0}>{service.index.slice(2)}</ScrambleText>
            <span className={styles.heroSlash}>/</span>
            <ScrambleText delay={0.1}>{service.title}</ScrambleText>
          </div>
          <span className={styles.bodyGlyph}>
            <ServiceGlyph id={service.id} />
          </span>
        </div>

        <div className={styles.bodyRight}>
          <h2 className={styles.statement}>{detail.statement}</h2>
          <p className={styles.intro}>{detail.intro}</p>

          <ol className={styles.caps} ref={caps}>
            {detail.capabilities.map((cap, i) => (
              <li
                key={cap}
                className={styles.cap}
                style={{ ["--index" as string]: String(i) }}
              >
                <ScrambleText className={styles.capNum} delay={i * 0.1}>
                  {String(i + 1).padStart(2, "0")}
                </ScrambleText>
                <span className={styles.capName}>{cap}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- sub-services: the page turns light as this scrolls in ---- */}
      <ThemeZone theme="light">
        <section className={styles.sub}>
          <div className={styles.subHead}>
            <h2 className={styles.subTitle}>{service.title} Services</h2>
            <span className={styles.subCount}>({detail.items.length})</span>
          </div>

          <ol className={styles.cards} ref={cards}>
          {detail.items.map((item, i) => (
            <li key={item.n} className={styles.cardItem}>
              <article
                className={styles.card}
                onPointerEnter={(e) => scrambleWithin(e.currentTarget)}
              >
                <Link
                  href={`${service.slug}/${item.slug}`}
                  className={styles.cardLink}
                  aria-label={item.title}
                >
                  <span className="sr-only">{item.title}</span>
                </Link>

                <div className={styles.cardHeader}>
                  <p className={styles.cardLabel}>
                    <ScrambleText delay={(i % 4) * 0.1}>{detail.abbr}</ScrambleText>
                    <ScrambleText delay={(i % 4) * 0.1 + 0.05}>{item.n}</ScrambleText>
                  </p>
                  <i className={styles.cardIndicator} aria-hidden="true" />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.cardText}>
                    <p>{item.body}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardCta}>
                    <ScrambleText delay={(i % 4) * 0.1 + 0.1}>Explore</ScrambleText>
                    <span className={styles.cardArrow}>
                      <ArrowRight />
                    </span>
                  </span>
                </div>
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
                <ScrambleText className={styles.moreIndex}>
                  {other.index}
                </ScrambleText>
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
            <Button href="/contact" icon={<ArrowRight />}>
              Start a project
            </Button>
          </div>
        </section>
      </ThemeZone>
    </>
  );
}
