import { notFound } from "next/navigation";
import { llmMath } from "@/book/llm-math";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function LlmMathCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(llmMath.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="llm-math"
      book={llmMath}
    />
  );
}
