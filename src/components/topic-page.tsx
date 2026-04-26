import { Breadcrumb } from "@/components/breadcrumb";
import { TopicContent } from "@/components/topic-content";
import { isLeafNode, type TreeNode, type CategoryRoot } from "@/data";
import Link from "next/link";

/** 소단원(leaf) 콘텐츠 페이지 또는 중간 노드 목록 */
export function TopicPage({
  node,
  slugs,
  basePath,
  category,
}: {
  node: TreeNode;
  slugs: string[];
  basePath: string;
  category: CategoryRoot;
}) {
  // breadcrumb 아이템 생성
  const breadcrumbItems = buildBreadcrumb(category, slugs, basePath);

  // leaf 노드 → 콘텐츠 표시
  if (isLeafNode(node)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 lg:pl-8">
        <Breadcrumb items={breadcrumbItems} />
        <TopicContent node={node} />
      </div>
    );
  }

  // 중간 노드 → 하위 목록 표시
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:pl-8">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-6">{node.title}</h1>
      {node.children && (
        <div className="space-y-2">
          {node.children.map((child) => {
            const childPath = `/${basePath}/${[...slugs, child.slug].join("/")}`;
            return (
              <Link
                key={child.id}
                href={childPath}
                className="block rounded-lg border border-sidebar-border p-4 hover:border-accent hover:bg-accent-light transition-colors"
              >
                <span className="font-medium">{child.title}</span>
                {child.children && (
                  <span className="ml-2 text-xs text-muted">
                    ({child.children.length}개 하위 항목)
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** slug 경로에서 breadcrumb 아이템 생성 */
function buildBreadcrumb(
  category: CategoryRoot,
  slugs: string[],
  basePath: string
) {
  const items: { label: string; href?: string }[] = [
    { label: category.title, href: `/${basePath}` },
  ];

  let currentNodes = category.children;
  const pathParts: string[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    pathParts.push(slug);
    const found = currentNodes.find((n) => n.slug === slug);
    if (!found) break;

    const isLast = i === slugs.length - 1;
    items.push({
      label: found.title,
      href: isLast ? undefined : `/${basePath}/${pathParts.join("/")}`,
    });

    if (found.children) {
      currentNodes = found.children;
    }
  }

  return items;
}
