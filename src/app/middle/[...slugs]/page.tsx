import { notFound } from "next/navigation";
import { middleSchool, findNodeBySlugs } from "@/data";
import { TopicPage } from "@/components/topic-page";

export default async function MiddleCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(middleSchool.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="middle"
      category={middleSchool}
    />
  );
}
