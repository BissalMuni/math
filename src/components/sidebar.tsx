"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allCategories, type TreeNode } from "@/data";
import { SidebarAuth } from "@/components/sidebar-auth";

/** 사이드바 네비게이션 */
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-sidebar-bg border border-sidebar-border p-2 lg:hidden"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 overflow-y-auto
          border-r border-sidebar-border bg-sidebar-bg
          transition-transform lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-lg font-bold" onClick={() => setIsOpen(false)}>
              📐 수학 학습
            </Link>
            <SidebarAuth />
          </div>
          <nav>
            {allCategories.map((category) => (
              <CategorySection
                key={category.id}
                basePath={category.basePath}
                title={category.title}
                nodes={category.children}
                onNavigate={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

/** 카테고리 섹션 (중학교, 고등학교, LLM) */
function CategorySection({
  basePath,
  title,
  nodes,
  onNavigate,
}: {
  basePath: string;
  title: string;
  nodes: TreeNode[];
  onNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-1 rounded px-2 py-1.5 text-sm font-semibold hover:bg-accent-light"
      >
        <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
        {title}
      </button>
      {isExpanded && (
        <div className="ml-2">
          {nodes.map((node) => (
            <TreeNavNode
              key={node.id}
              node={node}
              path={`/${basePath}`}
              depth={0}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** 트리 노드 재귀 컴포넌트 */
function TreeNavNode({
  node,
  path,
  depth,
  onNavigate,
}: {
  node: TreeNode;
  path: string;
  depth: number;
  onNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const currentPath = `${path}/${node.slug}`;
  const isLeaf = !node.children || node.children.length === 0;
  const isActive = pathname === currentPath;

  if (isLeaf) {
    return (
      <Link
        href={currentPath}
        onClick={onNavigate}
        className={`
          block rounded px-2 py-1 text-sm
          ${isActive ? "bg-accent-light text-accent font-medium" : "text-muted hover:bg-accent-light hover:text-foreground"}
        `}
        style={{ paddingLeft: `${(depth + 1) * 8 + 8}px` }}
      >
        {node.title}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-1 rounded px-2 py-1 text-sm hover:bg-accent-light"
        style={{ paddingLeft: `${depth * 8 + 8}px` }}
      >
        <span className="text-[10px] text-muted">{isExpanded ? "▼" : "▶"}</span>
        <span className="truncate">{node.title}</span>
      </button>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNavNode
              key={child.id}
              node={child}
              path={currentPath}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
