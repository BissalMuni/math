import { notFound } from "next/navigation";
import {
  math,
  middleSchool,
  highSchool,
  findNodeBySlugs,
  type CategoryRoot,
} from "@/structure";
import { TopicPage } from "@/components/content/topic-page";
import { CategoryOverview } from "@/components/content/category-overview";
import { LlmOverview } from "@/components/content/llm-overview";

const CATEGORY_BY_SLUG: Record<string, CategoryRoot> = {
  middle: middleSchool,
  high: highSchool,
};

export default async function MathCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;

  // /math/{category} — 카테고리 개요
  if (slugs.length === 1) {
    const slug = slugs[0];

    // /math/llm-math — 분야/파이프라인 탭 개요
    if (slug === "llm-math") return <LlmOverview />;

    const original = CATEGORY_BY_SLUG[slug];
    if (original) {
      const synthetic: CategoryRoot = {
        ...original,
        basePath: `math/${slug}`,
      };
      return <CategoryOverview category={synthetic} />;
    }
  }

  const node = findNodeBySlugs(math.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="math"
      category={math}
    />
  );
}
