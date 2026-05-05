import { notFound } from "next/navigation";
import { wirelessComm } from "@/book/wireless-comm";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function WirelessCommCatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(wirelessComm.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="wireless-comm"
      book={wirelessComm}
    />
  );
}
