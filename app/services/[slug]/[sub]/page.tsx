import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceView from "./SubServiceView";
import { serviceDetail, services } from "../../../lib/site";

type Params = { slug: string; sub: string };

function find(slug: string, sub: string) {
  const service = services.find((s) => s.slug === `/services/${slug}`);
  if (!service) return null;
  const detail = serviceDetail[service.id];
  const index = detail.items.findIndex((item) => item.slug === sub);
  if (index < 0) return null;
  return { service, detail, item: detail.items[index], index };
}

export function generateStaticParams(): Params[] {
  return services.flatMap((service) => {
    const slug = service.slug.replace("/services/", "");
    return serviceDetail[service.id].items.map((item) => ({ slug, sub: item.slug }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const found = find(slug, sub);
  if (!found) return {};
  return {
    title: `${found.item.title} — ${found.service.title}`,
    description: found.item.body,
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, sub } = await params;
  const found = find(slug, sub);
  if (!found) notFound();

  return (
    <SubServiceView
      service={found.service}
      detail={found.detail}
      item={found.item}
    />
  );
}
