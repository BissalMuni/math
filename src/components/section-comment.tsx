"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Comment, FeedbackType, FeedbackLevel } from "@/lib/types";
import { useSession } from "@/lib/auth/use-session";

const TYPE_LABELS: Record<FeedbackType, string> = {
  content: "내용 편집",
  structure: "구조 편집",
};

const TYPE_BADGE: Record<FeedbackType, string> = {
  content:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  structure:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

const TYPE_BUTTON_ICON: Record<FeedbackType, string> = {
  content: "💬",
  structure: "🏗️",
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
 * 목차/섹션 단위 의견 버튼 + 인라인 폼.
 * 역할(role)에 따라 버튼이 분기된다:
 *   - 비로그인        : 버튼 미표시 (로그인 안내 링크만)
 *   - content_editor  : 💬 내용 의견 버튼만
 *   - structure_editor: 🏗️ 구조 의견 버튼만
 *   - super_admin     : 두 종류 버튼 모두 표시 + 댓글 삭제 가능
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
  const { session, loading, can } = useSession();
  const contentPath = `${pathname}/${sectionSlug}`;

  const canContent = can("edit_content");
  const canStructure = can("edit_structure");
  const canDelete = can("rollback");

  if (loading) return null;

  // 비로그인: 작은 안내만 (목차마다 큰 안내 띄우면 시끄러우므로 점만)
  if (!session) {
    return (
      <Link
        href="/login"
        className="ml-2 inline-flex items-center text-[10px] text-muted/60 hover:text-accent transition-colors"
        title="로그인하면 의견을 남길 수 있습니다"
      >
        🔒
      </Link>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      {canContent && (
        <FeedbackButton
          feedbackType="content"
          contentPath={contentPath}
          sectionTitle={sectionTitle}
          level={level}
          canDelete={canDelete}
        />
      )}
      {canStructure && (
        <FeedbackButton
          feedbackType="structure"
          contentPath={contentPath}
          sectionTitle={sectionTitle}
          level={level}
          canDelete={canDelete}
        />
      )}
    </span>
  );
}

/** 단일 종류(내용 또는 구조)의 버튼 + 폼 */
function FeedbackButton({
  feedbackType,
  contentPath,
  sectionTitle,
  level,
  canDelete,
}: {
  feedbackType: FeedbackType;
  contentPath: string;
  sectionTitle: string;
  level: FeedbackLevel;
  canDelete: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/comments?content_path=${encodeURIComponent(contentPath)}`
      );
      const data = await res.json();
      // 클라이언트 측에서 종류별로 필터 (서버는 전체 반환)
      const all: Comment[] = data.data || [];
      setComments(all.filter((c) => (c.feedback_type ?? "content") === feedbackType));
    } catch {
      // 무시
    } finally {
      setFetched(true);
    }
  }, [contentPath, feedbackType]);

  const handleToggle = () => {
    setOpen((v) => {
      const next = !v;
      if (next && !fetched) fetchComments();
      return next;
    });
  };

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
          body: trimmed,
          section_title: sectionTitle,
          feedback_type: feedbackType,
          level,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
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
      await fetch(`/api/comments/${id}`, { method: "DELETE" });
      await fetchComments();
    } catch {
      // 무시
    }
  };

  const placeholder =
    feedbackType === "structure"
      ? `"${sectionTitle}" 구조 편집 의견 (목차 추가·재배치 등, Ctrl+Enter)`
      : `"${sectionTitle}" 내용 편집 의견 (Ctrl+Enter)`;

  return (
    <span className="inline-block">
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex items-center gap-1 rounded-full border border-sidebar-border px-2 py-0.5 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
        aria-expanded={open ? "true" : "false"}
        title={TYPE_LABELS[feedbackType]}
      >
        {TYPE_BUTTON_ICON[feedbackType]} {TYPE_LABELS[feedbackType]}
        {comments.length > 0 ? ` (${comments.length})` : ""}
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-sidebar-border bg-sidebar-bg p-4 space-y-3">
          {/* 헤더: 종류 + 레벨 뱃지 */}
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-0.5 rounded ${TYPE_BADGE[feedbackType]}`}>
              {TYPE_LABELS[feedbackType]}
            </span>
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
                    <span className="mr-1 text-[10px] text-muted">
                      {c.author}
                    </span>
                    {c.body}
                  </span>
                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      className="shrink-0 text-[10px] text-muted opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                    >
                      삭제
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* 입력 폼 */}
          <div className="flex gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
              }}
              placeholder={placeholder}
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
