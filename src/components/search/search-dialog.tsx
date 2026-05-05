"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { searchContent, type SearchResult } from "@/lib/search";

/** 검색 다이얼로그 — 사이드바 버튼으로 열림 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      // 약간의 딜레이 후 포커스 (애니메이션 고려)
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Esc 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setResults(searchContent(value));
    } else {
      setResults([]);
    }
  }, []);

  if (!open) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-[100] bg-black/40"
        onClick={onClose}
      />

      {/* 다이얼로그 */}
      <div className="fixed inset-x-4 top-[10vh] z-[101] mx-auto max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        {/* 검색 입력 */}
        <div className="flex items-center border-b border-gray-200 px-4 dark:border-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="flex-1 border-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-gray-400"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 sm:inline-block dark:border-gray-600">
            ESC
          </kbd>
        </div>

        {/* 결과 목록 */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-gray-500">
              &quot;{query}&quot;에 대한 결과가 없습니다
            </p>
          )}
          {results.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className="block rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.title}
                </span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {item.category}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {item.snippet}
              </p>
            </Link>
          ))}
          {!query && (
            <p className="px-3 py-6 text-center text-sm text-gray-400">
              단원명이나 키워드를 입력하세요
            </p>
          )}
        </div>
      </div>
    </>
  );
}
