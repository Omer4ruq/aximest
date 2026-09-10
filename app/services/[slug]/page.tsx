import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceView from "./ServiceView";
import { services } from "../../lib/site";

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

  return <ServiceView service={service} />;
}
