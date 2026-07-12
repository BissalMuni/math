import { notFound } from "next/navigation";
import { autohotkey } from "@/book/autohotkey";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function AutohotkeyCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(autohotkey.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="autohotkey"
      book={autohotkey}
    />
  );
}
