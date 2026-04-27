"use client";

import type { Comment } from "@/lib/types";

interface Props {
  comment: Comment;
  currentAuthor: string;
  onDelete: (id: string) => void;
}

/** 개별 의견 */
export function CommentItem({ comment, currentAuthor, onDelete }: Props) {
  const isOwner = comment.author === currentAuthor && currentAuthor !== "";
  const date = new Date(comment.created_at).toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="flex gap-3 rounded-lg px-3 py-3 hover:bg-accent-light group">
      {/* 아바타 */}
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-border text-xs font-medium">
        {comment.author.slice(0, 1).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{comment.author}</span>
          <time className="text-xs text-muted">{date}</time>
        </div>
        <p className="mt-1 text-sm whitespace-pre-wrap break-words">{comment.body}</p>
      </div>

      {/* 삭제 버튼 (본인 글만) */}
      {isOwner && (
        <button
          onClick={() => {
            if (confirm("삭제하시겠습니까?")) onDelete(comment.id);
          }}
          className="shrink-0 self-start opacity-0 group-hover:opacity-100 text-xs text-muted hover:text-red-500 transition-opacity"
          aria-label="삭제"
        >
          삭제
        </button>
      )}
    </article>
  );
}
