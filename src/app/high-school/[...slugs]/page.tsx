import { notFound } from "next/navigation";
import { highSchool } from "@/book/high-school";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function HighSchoolCatchAll({
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
      basePath="high-school"
      category={highSchool}
    />
  );
}
