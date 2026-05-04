import { notFound } from "next/navigation";
import { llmLearning } from "@/book/llm-learning";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function LlmLearnCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(llmLearning.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="llm-learning"
      category={llmLearning}
    />
  );
}
