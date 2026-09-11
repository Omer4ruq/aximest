"use client";

import Link from "next/link";
import SectionHead from "./SectionHead";
import Button from "./Button";
import ServiceGlyph from "./ServiceGlyph";
import ScrambleText from "./Scramble";
import { ArrowRight } from "./Icons";
import { useRevealGroup } from "../hooks/useReveal";
import { services } from "../lib/site";
import styles from "./Services.module.css";

export default function Services() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className={styles.section} id="services" ref={ref}>
      <SectionHead
        label="Services"
        title="Tech stacks for a rapidly evolving world:"
        count={`/00${services.length}`}
      />

      {/* Stacked list: every card pins at the top and is nudged down by its
          own index, so the headers pile up one under the next. */}
      <ol
        className={styles.list}
        style={{ ["--total-items" as string]: String(services.length) }}
      >
        {services.map((service, i) => (
          <li
            key={service.id}
            className={styles.item}
            style={{ ["--scroll-index" as string]: String(i) }}
          >
            <article className={styles.card}>
              <ScrambleText className={styles.index}>
                {service.index}
              </ScrambleText>

              <h3 className={styles.title}>
                <Link href={service.slug} className={styles.titleLink}>
                  <span className={styles.titleMask} data-reveal="mask">
                    <span>{service.title}</span>
                  </span>
                </Link>
              </h3>

              <div className={styles.content}>
                <p className={styles.body} data-reveal>
                  {service.description}
                </p>

                <span data-reveal>
                  <Button
                    href={service.slug}
                    icon={<ArrowRight />}
                    className={styles.button}
                  >
                    {`Explore ${service.count} Services`}
                  </Button>
                </span>
              </div>

              <Link
                href={service.slug}
                className={styles.media}
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className={styles.glyph}>
                  <ServiceGlyph id={service.id} />
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
