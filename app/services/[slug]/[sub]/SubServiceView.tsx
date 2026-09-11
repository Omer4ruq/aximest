"use client";

import Link from "next/link";
import Button from "../../../components/Button";
import Media from "../../../components/Media";
import ScrambleText from "../../../components/Scramble";
import { ArrowDown, ArrowRight } from "../../../components/Icons";
import { useInView } from "../../../hooks/useInView";
import type { Service } from "../../../lib/site";
import { serviceDetail } from "../../../lib/site";
import styles from "./sub.module.css";

type Detail = (typeof serviceDetail)[string];
type Item = Detail["items"][number];

export default function SubServiceView({
  service,
  detail,
  item,
}: {
  service: Service;
  detail: Detail;
  item: Item;
}) {
  const caps = useInView<HTMLOListElement>();
  const siblings = detail.items.filter((other) => other.slug !== item.slug);

  return (
    <>
      <header className={styles.hero}>
        <Link href={service.slug} className={styles.back}>
          <span className={styles.backIcon}>
            <ArrowRight />
          </span>
          <ScrambleText>{service.title}</ScrambleText>
        </Link>

        <div className={styles.heroMain}>
          <div className={styles.heroLabel}>
            <ScrambleText>{item.n}</ScrambleText>
            <ScrambleText delay={0.1}>{item.title}</ScrambleText>
          </div>

          <h1 className={styles.statement}>{item.body}</h1>

          <p className={styles.intro}>
            Part of our {service.title.toLowerCase()} practice — {service.count}{" "}
            services in all, delivered by the same senior engineers who scope
            them.
          </p>

          <div className={styles.heroFoot}>
            <Button href="/contact" icon={<ArrowRight />} className={styles.heroCta}>
              Let&apos;s Talk
            </Button>
            <span className={styles.slash}>/</span>
            <a href="#detail" className={styles.explore}>
              Explore
              <span className={styles.exploreIcon}>
                <ArrowDown />
              </span>
            </a>
          </div>
        </div>

        <figure className={styles.heroMedia}>
          <Media seed={3} dark />
          <figcaption className={styles.heroMediaLabel}>
            <ScrambleText delay={0.2}>{detail.abbr}</ScrambleText>
            <ScrambleText delay={0.25}>{item.n}</ScrambleText>
          </figcaption>
        </figure>
      </header>

      <section className={styles.body} id="detail">
        <div className={styles.bodyLabel}>
          <span>{item.n}</span>
          <span className={styles.slash}>/</span>
          <span>{service.title}</span>
        </div>

        <div className={styles.bodyMain}>
          <h2 className={styles.bodyTitle}>{item.title}</h2>
          <p className={styles.bodyText}>{item.body}</p>

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

      <section className={styles.more}>
        <h2 className={styles.moreTitle}>
          More in {service.title}
        </h2>
        <ul>
          {siblings.map((other) => (
            <li key={other.slug}>
              <Link
                href={`${service.slug}/${other.slug}`}
                className={styles.moreLink}
              >
                <span className={styles.moreIndex}>{other.n}</span>
                <span className={styles.moreName}>{other.title}</span>
                <span className={styles.moreArrow}>
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
