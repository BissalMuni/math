import { notFound } from "next/navigation";
import { aiMemory } from "@/book/ai-memory";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function AiMemoryCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(aiMemory.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="ai-memory"
      book={aiMemory}
    />
  );
}
