import { notFound } from "next/navigation";
import { llmLearning } from "@/data/llm-learning";
import { findNodeBySlugs } from "@/data";
import { TopicPage } from "@/components/topic-page";

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
      basePath="llm-learn"
      category={llmLearning}
    />
  );
}
