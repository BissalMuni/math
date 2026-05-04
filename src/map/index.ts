import { type ComponentType, lazy } from "react";
import { findNodePath, type CategoryRoot, type TreeNode } from "@/structure";

/**
 * 책별 path 컨벤션:
 *   수학 책:
 *     middle:   middle/grade{학년slug}/{leaf.slug}
 *     high:     high/{과목slug}/{leaf.slug}
 *     llm-math: llm-math/{branch.slug}/{leaf.slug}
 *   LLM 학습 책:
 *     llm/{leaf.slug}
 *
 * 콘텐츠 파일은 `src/content/{도출된경로}.tsx`에 있어야 함.
 * 파일이 없으면 null 반환 → "준비 중" 표시.
 */

function deriveMathPath(book: CategoryRoot, leaf: TreeNode): string | null {
  const path = findNodePath(book.children, leaf.id);
  if (!path || path.length < 2) return null;

  const category = path[0]; // middle / high / llm-math
  const second = path[1]; // 학년 / 과목 / branch

  if (category.slug === "middle") {
    return `middle/grade${second.slug}/${leaf.slug}`;
  }
  if (category.slug === "high") {
    return `high/${second.slug}/${leaf.slug}`;
  }
  if (category.slug === "llm-math") {
    return `llm-math/${second.slug}/${leaf.slug}`;
  }
  return null;
}

function deriveLlmLearnPath(leaf: TreeNode): string {
  return `llm/${leaf.slug}`;
}

function derivePath(book: CategoryRoot, leaf: TreeNode): string | null {
  if (book.id === "math") return deriveMathPath(book, leaf);
  if (book.id === "llm-learn") return deriveLlmLearnPath(leaf);
  return null;
}

/**
 * book + leaf로 콘텐츠 컴포넌트 가져오기.
 * 컨벤션 기반 경로 도출 → React.lazy로 동적 import.
 * 매핑 없거나 파일 없으면 null → "준비 중" 표시.
 */
export function getContentComponent(
  book: CategoryRoot,
  leaf: TreeNode
): ComponentType | null {
  const path = derivePath(book, leaf);
  if (!path) return null;
  return lazy(() => import(`@/content/${path}.tsx`));
}
