"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allBooks, type TreeNode, type Book } from "@/book";
import { allBaskets, type Basket } from "@/basket";
import { SidebarAuth } from "@/components/navigation/sidebar-auth";
import { SearchDialog } from "@/components/search/search-dialog";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

/** 사이드바 네비게이션 — 바구니 → 책 → 트리 3단 */
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
          <div className="flex flex-col gap-3 mb-4">
            <Link href="/" className="text-lg font-bold" onClick={() => setIsOpen(false)}>
              📐 Learning
            </Link>
            <div className="flex justify-start">
              <DarkModeToggle />
            </div>
            <SidebarAuth />
          </div>

          {/* 검색 버튼 */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="mb-4 flex w-full items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-sm text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <span>검색...</span>
            <kbd className="ml-auto rounded border border-sidebar-border px-1 py-0.5 text-[10px]">
              /
            </kbd>
          </button>

          <nav>
            {allBaskets.map((basket) => (
              <BasketSection
                key={basket.id}
                basket={basket}
                onNavigate={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* 검색 다이얼로그 */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/** 바구니 섹션 — 헤더 + 소속 책 목록 */
function BasketSection({
  basket,
  onNavigate,
}: {
  basket: Basket;
  onNavigate: () => void;
}) {
  const books = basket.bookIds
    .map((id) => allBooks.find((b) => b.id === id))
    .filter((b): b is Book => b !== undefined);

  if (books.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="flex items-center gap-1.5 px-2 mb-1 text-[11px] font-bold tracking-wide text-muted uppercase">
        <span aria-hidden>🧺</span>
        {basket.title}
      </h3>
      {books.map((book) => (
        <BookSection
          key={`${basket.id}-${book.id}`}
          book={book}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

/** 책 섹션 — 토글 + 트리 */
function BookSection({
  book,
  onNavigate,
}: {
  book: Book;
  onNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-sm font-semibold hover:bg-accent-light"
      >
        <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
        <span aria-hidden>📖</span>
        {book.title}
      </button>
      {isExpanded && (
        <div className="ml-2">
          {book.children.map((node) => (
            <TreeNavNode
              key={node.id}
              node={node}
              path={`/${book.basePath}`}
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
