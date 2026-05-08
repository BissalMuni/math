import { notFound } from "next/navigation";
import { saasArchitecture } from "@/book/saas-architecture";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function SaasArchitectureCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(saasArchitecture.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="saas-architecture"
      book={saasArchitecture}
    />
  );
}
