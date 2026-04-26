import Link from "next/link";
import type { CategoryRoot, TreeNode } from "@/data";

/** 카테고리 개요 페이지 (학년/과목 목록 표시) */
export function CategoryOverview({ category }: { category: CategoryRoot }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
      <p className="text-muted mb-8">{category.description}</p>

      <div className="space-y-6">
        {category.children.map((node) => (
          <SubjectCard
            key={node.id}
            node={node}
            basePath={category.basePath}
          />
        ))}
      </div>
    </div>
  );
}

/** 과목/학년 카드 */
function SubjectCard({
  node,
  basePath,
}: {
  node: TreeNode;
  basePath: string;
}) {
  // leaf 수 계산
  const leafCount = countLeaves(node);

  return (
    <div className="rounded-xl border border-sidebar-border p-6">
      <h2 className="text-xl font-semibold mb-3">{node.title}</h2>
      {node.children && (
        <div className="space-y-2">
          {node.children.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="text-sm font-medium text-muted mb-1">
                {chapter.title}
              </h3>
              {chapter.children && (
                <div className="ml-4 space-y-0.5">
                  {chapter.children.map((section) => (
                    <SectionLink
                      key={section.id}
                      node={section}
                      basePath={basePath}
                      parentSlugs={[node.slug, chapter.slug]}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">{leafCount}개 소단원</p>
    </div>
  );
}

/** 중단원 링크 (소단원 나열) */
function SectionLink({
  node,
  basePath,
  parentSlugs,
}: {
  node: TreeNode;
  basePath: string;
  parentSlugs: string[];
}) {
  if (node.children && node.children.length > 0) {
    return (
      <div className="mb-1">
        <span className="text-sm text-foreground">{node.title}</span>
        <div className="ml-3 mt-0.5 space-y-0.5">
          {node.children.map((topic) => (
            <Link
              key={topic.id}
              href={`/${basePath}/${[...parentSlugs, node.slug, topic.slug].join("/")}`}
              className="block text-sm text-muted hover:text-accent"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // leaf node 직접 링크
  const href = `/${basePath}/${[...parentSlugs, node.slug].join("/")}`;
  return (
    <Link href={href} className="block text-sm text-muted hover:text-accent">
      {node.title}
    </Link>
  );
}

/** leaf 노드 수 계산 */
function countLeaves(node: TreeNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}
