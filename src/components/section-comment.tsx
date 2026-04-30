"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { Comment, FeedbackType, FeedbackLevel } from "@/lib/types";

const TYPE_LABELS: Record<FeedbackType, string> = {
  content: "내용 편집",
  structure: "구조 편집",
};

const LEVEL_LABELS: Record<FeedbackLevel, string> = {
  major: "대목차",
  medium: "중목차",
  minor: "소목차",
  section: "섹션",
};

const LEVEL_BADGE_COLOR: Record<FeedbackLevel, string> = {
  major:   "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  medium:  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  minor:   "bg-blue-100   text-blue-700   dark:bg-blue-950   dark:text-blue-300",
  section: "bg-slate-100  text-slate-700  dark:bg-slate-800  dark:text-slate-300",
};

/**
 * 목차/섹션 단위 의견 버튼 + 인라인 폼
 *
 * 사용법:
 *   <SectionComment sectionSlug="prime-composite" sectionTitle="소수와 합성수" level="section" />
 *   <SectionComment sectionSlug="number-and-operation" sectionTitle="Ⅰ. 수와 연산" level="major" />
 *
 * content_path = {현재URL}/{sectionSlug}  (usePathname 사용)
 */
export function SectionComment({
  sectionSlug,
  sectionTitle,
  level = "section",
}: {
  sectionSlug: string;
  sectionTitle: string;
  level?: FeedbackLevel;
}) {
  const pathname = usePathname();
  const contentPath = `${pathname}/${sectionSlug}`;

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("content");
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
          feedback_type: feedbackType,
          level,
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
    <span className="inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full border border-sidebar-border px-2 py-0.5 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
        aria-expanded={open ? "true" : "false"}
      >
        💬 의견{comments.length > 0 ? ` (${comments.length})` : ""}
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-sidebar-border bg-sidebar-bg p-4 space-y-3">
          {/* 헤더: 레벨 뱃지 */}
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded ${LEVEL_BADGE_COLOR[level]}`}>
              {LEVEL_LABELS[level]}
            </span>
            <span className="text-muted truncate">{sectionTitle}</span>
          </div>

          {/* 기존 의견 */}
          {!fetched ? (
            <p className="text-xs text-muted">불러오는 중...</p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-muted">아직 의견이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-2 text-sm group">
                  <span className="shrink-0 text-xs text-muted mt-0.5">
                    {new Date(c.created_at).toLocaleDateString("ko-KR", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-words">
                    {/* 종류 뱃지 */}
                    <span className={`mr-1 text-[10px] px-1.5 py-0.5 rounded
                      ${c.feedback_type === "structure"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`}>
                      {TYPE_LABELS[c.feedback_type] ?? "내용 편집"}
                    </span>
                    {c.body}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    className="shrink-0 text-[10px] text-muted opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* 편집 종류 토글 */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted">편집 종류:</span>
            {(["content", "structure"] as FeedbackType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFeedbackType(t)}
                className={`px-2 py-1 rounded border transition-colors ${
                  feedbackType === t
                    ? "border-accent text-accent bg-accent-light"
                    : "border-sidebar-border text-muted hover:border-accent/50"
                }`}
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* 입력 폼 */}
          <div className="flex gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
              }}
              placeholder={
                feedbackType === "structure"
                  ? `"${sectionTitle}" 구조 편집 의견 (목차 추가·재배치 등, Ctrl+Enter)`
                  : `"${sectionTitle}" 내용 편집 의견 (Ctrl+Enter)`
              }
              rows={2}
              maxLength={3000}
              className="flex-1 resize-none rounded-lg border border-sidebar-border bg-transparent px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading || !body.trim()}
              className="shrink-0 self-end rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white disabled:opacity-40 hover:opacity-90"
            >
              {loading ? "..." : "등록"}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
