import { notFound } from "next/navigation";
import { middleSchool } from "@/book/middle-school";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function MiddleSchoolCatchAll({
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
      basePath="middle-school"
      category={middleSchool}
    />
  );
}
