/**
 * 새 책/바구니 추가 시 자동 생성할 파일 템플릿.
 * kebab-case ID → camelCase / PascalCase 변환 포함.
 */

/** kebab-case → camelCase ("llm-math" → "llmMath") */
export function toCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/** kebab-case → PascalCase ("llm-math" → "LlmMath") */
export function toPascalCase(kebab: string): string {
  const camel = toCamelCase(kebab);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// ─── 책 관련 템플릿 ─────────────────────────────────────────────

/** src/book/data/{id}.json — 빈 트리 */
export function genBookDataJSON(id: string, title: string, description: string): string {
  const book = { id, basePath: id, title, description, children: [] };
  return JSON.stringify(book, null, 2) + "\n";
}

/** src/book/{id}.ts — 로더 */
export function genBookLoader(id: string): string {
  const camel = toCamelCase(id);
  return `import data from "./data/${id}.json";
import type { Book } from "./types";

export const ${camel} = data as Book;
`;
}

/** src/book/index.ts — 전체 재생성 */
export function genBookIndex(bookIds: string[]): string {
  const exports = bookIds.map((id) => {
    const camel = toCamelCase(id);
    return `export { ${camel} } from "./${id}";`;
  });

  const imports = bookIds.map((id) => {
    const camel = toCamelCase(id);
    return `import { ${camel} } from "./${id}";`;
  });

  const allBooksArray = bookIds.map((id) => toCamelCase(id)).join(", ");

  return `${exports.join("\n")}
export type { TreeNode, Book } from "./types";
export { isLeafNode, findNodePath, findNodeBySlugs } from "./types";

${imports.join("\n")}
import type { Book } from "./types";

/** 모든 책 — ${bookIds.length}개 독립 책 (basket으로 묶어 사이드바 그룹) */
export const allBooks: Book[] = [${allBooksArray}];

/** basePath로 책 찾기 */
export function getBookByPath(basePath: string): Book | undefined {
  return allBooks.find((b) => b.basePath === basePath);
}
`;
}

/** 경로 패턴 타입 */
export type PathConvention = "flat" | "nested";

/** src/map/index.ts — 전체 재생성 */
export function genMapIndex(
  books: { id: string; pathConvention: PathConvention }[]
): string {
  const deriveFns = books.map((b) => {
    const pascal = toPascalCase(b.id);
    if (b.pathConvention === "flat") {
      return `function derive${pascal}Path(leaf: TreeNode): string {
  return \`${b.id}/\${leaf.slug}\`;
}`;
    }
    // nested: 2단계 (parent/leaf)
    // middle-school은 특수 케이스: grade{slug} prefix
    if (b.id === "middle-school") {
      return `function derive${pascal}Path(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const grade = path[0];
  return \`middle-school/grade\${grade.slug}/\${leaf.slug}\`;
}`;
    }
    return `function derive${pascal}Path(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const parent = path[0];
  return \`${b.id}/\${parent.slug}/\${leaf.slug}\`;
}`;
  });

  const switchCases = books.map((b) => {
    const pascal = toPascalCase(b.id);
    if (b.pathConvention === "flat") {
      return `    case "${b.id}": return derive${pascal}Path(leaf);`;
    }
    return `    case "${b.id}": return derive${pascal}Path(book, leaf);`;
  });

  return `import { type ComponentType, lazy } from "react";
import { findNodePath, type Book, type TreeNode } from "@/book";

/**
 * 책별 path 컨벤션 (책 = 폴더 1:1):
 * 콘텐츠 파일은 \`src/content/{도출된경로}.tsx\`에 있어야 함.
 * 파일이 없으면 null 반환 → "준비 중" 표시.
 */

${deriveFns.join("\n\n")}

function derivePath(book: Book, leaf: TreeNode): string | null {
  switch (book.id) {
${switchCases.join("\n")}
    default: return null;
  }
}

/**
 * book + leaf로 콘텐츠 컴포넌트 가져오기.
 * 컨벤션 기반 경로 도출 → React.lazy로 동적 import.
 * 매핑 없거나 파일 없으면 null → "준비 중" 표시.
 */
export function getContentComponent(
  book: Book,
  leaf: TreeNode
): ComponentType | null {
  const path = derivePath(book, leaf);
  if (!path) return null;
  return lazy(() => import(\`@/content/\${path}.tsx\`));
}
`;
}

/** src/lib/structure-serializer.ts — 전체 재생성 */
export function genStructureSerializer(bookIds: string[]): string {
  const entries = bookIds
    .map((id) => `  "${id}": { fileName: "data/${id}.json" },`)
    .join("\n");

  return `import type { Book } from "@/book/types";

/** 책 ID → JSON 데이터 파일 경로 매핑 */
const BOOK_META: Record<string, { fileName: string }> = {
${entries}
};

/** Book을 JSON 문자열로 직렬화 (관리자 편집 → JSON 파일) */
export function serializeBookToJSON(book: Book): string {
  return JSON.stringify(book, null, 2) + "\\n";
}

/** 트리에서 모든 leaf node id를 수집 */
export function collectLeafIds(nodes: Book["children"]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) {
      ids.push(node.id);
    } else {
      ids.push(...collectLeafIds(node.children));
    }
  }
  return ids;
}

/** 책 메타 정보 조회 */
export function getBookMeta(bookId: string) {
  return BOOK_META[bookId] ?? null;
}
`;
}

/** src/app/{id}/page.tsx — 개요 페이지 */
export function genOverviewPage(id: string): string {
  const camel = toCamelCase(id);
  const pascal = toPascalCase(id);
  return `import { ${camel} } from "@/book/${id}";
import { CategoryOverview } from "@/components/content/category-overview";

export default function ${pascal}Page() {
  return <CategoryOverview book={${camel}} />;
}
`;
}

/** src/app/{id}/[...slugs]/page.tsx — catch-all 라우트 */
export function genCatchAllPage(id: string): string {
  const camel = toCamelCase(id);
  const pascal = toPascalCase(id);
  return `import { notFound } from "next/navigation";
import { ${camel} } from "@/book/${id}";
import { findNodeBySlugs } from "@/book";
import { TopicPage } from "@/components/content/topic-page";

export default async function ${pascal}CatchAll({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const node = findNodeBySlugs(${camel}.children, slugs);
  if (!node) notFound();

  return (
    <TopicPage
      node={node}
      slugs={slugs}
      basePath="${id}"
      book={${camel}}
    />
  );
}
`;
}

// ─── 바구니 관련 템플릿 ─────────────────────────────────────────

/** src/basket/{id}.ts — 바구니 정의 */
export function genBasketFile(id: string, title: string, bookIds: string[]): string {
  const camel = toCamelCase(id);
  const bookIdsStr = bookIds.map((b) => `"${b}"`).join(", ");
  return `import type { Basket } from "./types";

export const ${camel}Basket: Basket = {
  id: "${id}",
  title: "${title}",
  bookIds: [${bookIdsStr}],
};
`;
}

/** src/basket/index.ts — 전체 재생성 */
export function genBasketIndex(baskets: { id: string }[]): string {
  const imports = baskets.map((b) => {
    const camel = toCamelCase(b.id);
    return `import { ${camel}Basket } from "./${b.id}";`;
  });

  const allBasketsArray = baskets
    .map((b) => `${toCamelCase(b.id)}Basket`)
    .join(", ");

  return `export type { Basket } from "./types";

${imports.join("\n")}
import type { Basket } from "./types";

/** 모든 바구니 */
export const allBaskets: Basket[] = [${allBasketsArray}];

/** ID로 바구니 찾기 */
export function getBasketById(id: string): Basket | undefined {
  return allBaskets.find((b) => b.id === id);
}

/** 특정 책이 속한 바구니 목록 */
export function getBasketsForBook(bookId: string): Basket[] {
  return allBaskets.filter((b) => b.bookIds.includes(bookId));
}
`;
}
