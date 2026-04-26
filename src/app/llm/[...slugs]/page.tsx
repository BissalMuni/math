import { notFound } from "next/navigation";
import { llmConceptTree, findNodeBySlugs } from "@/data";
import { TopicPage } from "@/components/topic-page";

export default async function LlmCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(llmConceptTree.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="llm"
      category={llmConceptTree}
    />
  );
}
