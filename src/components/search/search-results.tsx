"use client";

import Link from "next/link";
import type { SearchResult } from "@/lib/search";

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(
    new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"),
  );

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-700/60 dark:text-yellow-50"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

/** /search 페이지 결과 목록 — 쿼리 토큰 하이라이팅 */
export function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0 && query) {
    return (
      <div role="status" aria-live="polite" className="py-12 text-center">
        <span className="text-gray-500 dark:text-gray-400">
          &quot;{query}&quot;에 대한 검색 결과가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div role="region" aria-label={`검색 결과 ${results.length}건`} aria-live="polite">
      {results.map((item) => (
        <div
          key={item.path}
          className="border-b border-gray-100 py-3 dark:border-gray-800"
        >
          <Link href={item.path} className="no-underline">
            <div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {highlightText(item.title, query)}
              </span>
              <span className="ml-2 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {item.category}
              </span>
            </div>
            <p className="mb-0 mt-1 text-sm text-gray-500 dark:text-gray-400">
              {highlightText(item.snippet, query)}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
