import { allBooks } from "@/book";
import type { Book, TreeNode } from "@/book";

/** 검색 결과 타입 */
export interface SearchResult {
  id: string;
  title: string;
  category: string;
  path: string;
  snippet: string;
  score: number;
}

/** 검색 인덱스 항목 (내부용) */
interface IndexEntry {
  id: string;
  title: string;
  /** 소속 책 제목 (카테고리) */
  category: string;
  /** URL 경로 */
  path: string;
  /** 상위 노드 제목 (스니펫용) */
  breadcrumb: string;
}

/** 캐시된 검색 인덱스 */
let cachedIndex: IndexEntry[] | null = null;

/**
 * 트리를 재귀 순회하며 leaf 노드를 수집한다.
 */
function collectLeaves(
  nodes: TreeNode[],
  book: Book,
  slugPath: string[],
  titlePath: string[],
): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const node of nodes) {
    const currentSlugs = [...slugPath, node.slug];
    const currentTitles = [...titlePath, node.title];

    if (!node.children || node.children.length === 0) {
      entries.push({
        id: node.id,
        title: node.title,
        category: book.title,
        path: `/${book.basePath}/${currentSlugs.join("/")}`,
        breadcrumb: currentTitles.join(" > "),
      });
    } else {
      entries.push(
        ...collectLeaves(node.children, book, currentSlugs, currentTitles),
      );
    }
  }

  return entries;
}

/**
 * 모든 책의 leaf 노드를 수집하여 검색 인덱스를 생성한다.
 */
export function buildSearchIndex(): IndexEntry[] {
  if (cachedIndex) return cachedIndex;

  const entries: IndexEntry[] = [];

  for (const book of allBooks) {
    entries.push(...collectLeaves(book.children, book, [], [book.title]));
  }

  cachedIndex = entries;
  return entries;
}

/**
 * 검색어와 대상 문자열의 매칭 점수를 계산한다.
 */
function computeScore(entry: IndexEntry, query: string): number {
  const q = query.toLowerCase().trim();
  const title = entry.title.toLowerCase();
  const breadcrumb = entry.breadcrumb.toLowerCase();

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (breadcrumb.includes(q)) return 30;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    let tokenScore = 0;
    for (const token of tokens) {
      if (title.includes(token)) {
        tokenScore += 20;
      } else if (breadcrumb.includes(token)) {
        tokenScore += 10;
      }
    }
    if (tokenScore > 0) return tokenScore;
  }

  return 0;
}

/**
 * 검색 쿼리로 콘텐츠를 검색한다.
 */
export function searchContent(query: string, limit = 20): SearchResult[] {
  if (!query.trim()) return [];

  const index = buildSearchIndex();

  const scored = index
    .map((entry) => ({
      entry,
      score: computeScore(entry, query),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ entry, score }) => ({
    id: entry.id,
    title: entry.title,
    category: entry.category,
    path: entry.path,
    snippet: entry.breadcrumb,
    score,
  }));
}
