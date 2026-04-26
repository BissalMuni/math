import { notFound } from "next/navigation";
import { highSchool, findNodeBySlugs } from "@/data";
import { TopicPage } from "@/components/topic-page";

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
