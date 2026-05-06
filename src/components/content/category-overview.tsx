"use client";

import Link from "next/link";
import type { Book, TreeNode } from "@/book";
import { SectionComment } from "@/components/feedback/section-comment";

/** 카테고리 개요 페이지 (학년/과목 목록 표시) */
export function CategoryOverview({ book }: { book: Book }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-muted mb-8">{book.description}</p>

      <div className="space-y-12">
        {book.children.map((node) => (
          <SubjectCard
            key={node.id}
            node={node}
            basePath={book.basePath}
          />
        ))}
      </div>
    </div>
  );
}

/** 학년/과목 카드 — 그 아래 chapter(=대단원) / section(=중단원) 단위로 의견 버튼 노출 */
function SubjectCard({
  node,
  basePath,
}: {
  node: TreeNode;
  basePath: string;
}) {
  const leafCount = countLeaves(node);

  return (
    <div className="rounded-xl border border-sidebar-border p-6">
      <h2 className="text-xl font-semibold mb-3">{node.title}</h2>
      {node.children && (
        <div className="space-y-4">
          {node.children.map((chapter) => (
            <div
              key={chapter.id}
              className="rounded-lg border border-sidebar-border/70 p-4"
            >
              {/* chapter가 leaf인 경우(e.g. prologue 단발 항목) → 바로 링크 */}
              {!chapter.children ? (
                <Link
                  href={`/${basePath}/${node.slug}/${chapter.slug}`}
                  className="block text-sm text-muted hover:text-accent"
                >
                  {chapter.title}
                </Link>
              ) : (
                <>
                  <h3 className="text-sm font-medium text-muted mb-2 flex items-center gap-2">
                    <span>{chapter.title}</span>
                    {/* 대목차 — 대단원 */}
                    <SectionComment
                      sectionSlug={chapter.id}
                      sectionTitle={chapter.title}
                      level="major"
                    />
                  </h3>
                  <div className="ml-2 space-y-1">
                    {chapter.children.map((section) => (
                      <SectionLink
                        key={section.id}
                        node={section}
                        basePath={basePath}
                        parentSlugs={[node.slug, chapter.slug]}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">{leafCount}개 소단원</p>
    </div>
  );
}

/** 중단원/소단원 링크 노드 */
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
    // node = 중단원 (children = 소단원 leaf)
    return (
      <div className="rounded-md border border-sidebar-border/50 p-3">
        <span className="text-sm text-foreground inline-flex items-center gap-2">
          {node.title}
          {/* 중목차 — 중단원 */}
          <SectionComment
            sectionSlug={node.id}
            sectionTitle={node.title}
            level="medium"
          />
        </span>
        <div className="ml-2 mt-1 space-y-1">
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
