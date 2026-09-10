import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import ServiceGlyph from "../../components/ServiceGlyph";
import Button from "../../components/Button";
import { ArrowRight, ArrowUpRight } from "../../components/Icons";
import { services } from "../../lib/site";
import styles from "./service.module.css";

type Params = { slug: string };

const find = (slug: string) =>
  services.find((s) => s.slug === `/services/${slug}`);

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug.replace("/services/", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = find(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = find(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageHero
        label="Services"
        title={service.title}
        intro={service.description}
        index={service.index}
      />

      <section className={styles.body}>
        <span className={styles.count}>{`${service.count} services`}</span>

        <div className={styles.panel}>
          <span className={styles.glyph}>
            <ServiceGlyph id={service.id} />
          </span>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Tell us what you are building and we will scope it with you.
          </p>
          <Button href="/contact" color="black" hoverLabel="Say hello" icon={<ArrowRight />}>
            Start a project
          </Button>
        </div>
      </section>

      <section className={styles.more}>
        <h2 className={styles.moreTitle}>Other services</h2>
        <ul className={styles.moreList}>
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
      </section>
    </>
  );
}
