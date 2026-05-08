import { type ComponentType, createElement, lazy } from "react";
import { findNodePath, type Book, type TreeNode } from "@/book";

const NotReadyContent: ComponentType = () =>
  createElement(
    "p",
    { className: "text-muted italic" },
    "이 단원의 콘텐츠가 준비 중입니다."
  );

/**
 * 책별 path 컨벤션 (책 = 폴더 1:1):
 *   middle-school: middle-school/grade{학년slug}/{leaf.slug}
 *   high-school:   high-school/{과목slug}/{leaf.slug}
 *   llm-math:      llm-math/{branch.slug}/{leaf.slug}
 *   llm-learning:  llm-learning/{leaf.slug}
 *
 * 콘텐츠 파일은 `src/content/{도출된경로}.tsx`에 있어야 함.
 * 파일이 없으면 null 반환 → "준비 중" 표시.
 */

function deriveMiddleSchoolPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const grade = path[0]; // 학년 slug "1" / "2" / "3"
  return `middle-school/grade${grade.slug}/${leaf.slug}`;
}

function deriveHighSchoolPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const subject = path[0]; // 과목 slug
  return `high-school/${subject.slug}/${leaf.slug}`;
}

function deriveLlmMathPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const branch = path[0]; // fields / pipeline
  return `llm-math/${branch.slug}/${leaf.slug}`;
}

function deriveLlmLearningPath(leaf: TreeNode): string {
  return `llm-learning/${leaf.slug}`;
}

function deriveAiMemoryPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const chapter = path[0]; // 장 slug
  return `ai-memory/${chapter.slug}/${leaf.slug}`;
}

function deriveWirelessCommPath(book: Book, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;
  const chapter = path[0]; // 장 slug
  return `wireless-comm/${chapter.slug}/${leaf.slug}`;
}

function deriveSaasArchitecturePath(leaf: TreeNode): string {
  // 깊이 2 (책 → 리프). 평평한 구조이므로 leaf.slug만 사용.
  return `saas-architecture/${leaf.slug}`;
}

function derivePath(book: Book, leaf: TreeNode): string | null {
  switch (book.id) {
    case "middle-school":     return deriveMiddleSchoolPath(book, leaf);
    case "high-school":       return deriveHighSchoolPath(book, leaf);
    case "llm-math":          return deriveLlmMathPath(book, leaf);
    case "llm-learning":      return deriveLlmLearningPath(leaf);
    case "ai-memory":         return deriveAiMemoryPath(book, leaf);
    case "wireless-comm":     return deriveWirelessCommPath(book, leaf);
    case "saas-architecture": return deriveSaasArchitecturePath(leaf);
    default: return null;
  }
}

/**
 * book + leaf로 콘텐츠 컴포넌트 가져오기.
 * 컨벤션 기반 경로 도출 → React.lazy로 동적 import.
 * 매핑 없으면 null. 파일이 없으면 "준비 중" 컴포넌트로 fallback.
 */
export function getContentComponent(
  book: Book,
  leaf: TreeNode
): ComponentType | null {
  const path = derivePath(book, leaf);
  if (!path) return null;
  return lazy(() =>
    import(`@/content/${path}.tsx`).catch(() => ({ default: NotReadyContent }))
  );
}
