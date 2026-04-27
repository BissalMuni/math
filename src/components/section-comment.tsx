"use client";

import { useState, useEffect, useCallback } from "react";
import { useContentPath } from "@/components/content-path-context";
import type { Comment } from "@/lib/types";

/** 소목차(section) 단위 의견 버튼 + 인라인 폼
 *
 * 사용법:
 *   <SectionComment sectionSlug="prime-composite" sectionTitle="소수와 합성수" />
 *
 * content_path = {pagePath}/{sectionSlug}
 * author = "익명" (고정)
 */
export function SectionComment({
  sectionSlug,
  sectionTitle,
}: {
  sectionSlug: string;
  sectionTitle: string;
}) {
  const basePath = useContentPath();
  // 섹션 고유 경로: /middle/grade1/prime-factorization-concept/prime-composite
  const contentPath = `${basePath}/${sectionSlug}`;

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?content_path=${encodeURIComponent(contentPath)}`);
      const data = await res.json();
      setComments(data.data || []);
    } catch {
      // 무시
    } finally {
      setFetched(true);
    }
  }, [contentPath]);

  // 패널 열릴 때 한 번만 조회
  useEffect(() => {
    if (open && !fetched) fetchComments();
  }, [open, fetched, fetchComments]);

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_path: contentPath,
          author: "익명",
          body: trimmed,
          section_title: sectionTitle,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "등록 실패");
        return;
      }
      setBody("");
      await fetchComments();
    } catch {
      setError("등록 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    try {
      await fetch(`/api/comments/${id}?author=${encodeURIComponent("익명")}`, {
        method: "DELETE",
      });
      await fetchComments();
    } catch {
      // 무시
    }
  };

  return (
    <div className="mt-1">
      {/* 의견 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        aria-expanded={open}
      >
        <span>💬</span>
        <span>의견 {comments.length > 0 ? `(${comments.length})` : ""}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {/* 인라인 패널 */}
      {open && (
        <div className="mt-3 rounded-xl border border-sidebar-border bg-sidebar-bg p-4 space-y-3">
          {/* 기존 의견 */}
          {!fetched ? (
            <p className="text-xs text-muted">불러오는 중...</p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-muted">아직 의견이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-2 text-sm group">
                  <span className="shrink-0 font-mono text-xs text-muted mt-0.5">
                    {new Date(c.created_at).toLocaleDateString("ko-KR", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-words">{c.body}</span>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="shrink-0 text-[10px] text-muted opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 입력 폼 */}
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
              }}
              placeholder={`"${sectionTitle}" 에 대한 의견 (Ctrl+Enter)`}
              rows={2}
              maxLength={3000}
              className="flex-1 resize-none rounded-lg border border-sidebar-border bg-transparent px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !body.trim()}
              className="shrink-0 self-end rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white disabled:opacity-40 hover:opacity-90"
            >
              {loading ? "..." : "등록"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
