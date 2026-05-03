import { notFound } from "next/navigation";
import { highSchool, findNodeBySlugs } from "@/structure";
import { TopicPage } from "@/components/content/topic-page";

export default async function HighCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(highSchool.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="high"
      category={highSchool}
    />
  );
}
