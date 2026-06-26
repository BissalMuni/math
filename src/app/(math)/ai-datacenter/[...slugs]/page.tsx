import { notFound } from "next/navigation";
import { aiDatacenter } from "@/book/ai-datacenter";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function AiDatacenterCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(aiDatacenter.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="ai-datacenter"
      book={aiDatacenter}
    />
  );
}
