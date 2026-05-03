"use client";

import { useState } from "react";

interface Props {
  onSubmit: (body: string) => Promise<void>;
  loading: boolean;
}

/** 의견 작성 폼 */
export function CommentForm({ onSubmit, loading }: Props) {
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    await onSubmit(trimmed);
    setBody("");
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          // Ctrl+Enter 또는 Cmd+Enter로 제출
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
        }}
        placeholder="의견을 입력하세요 (Ctrl+Enter로 제출)"
        maxLength={3000}
        rows={2}
        className="flex-1 resize-none rounded-lg border border-sidebar-border bg-transparent px-3 py-2 text-sm focus:border-accent focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !body.trim()}
        className="shrink-0 self-end rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
      >
        {loading ? "등록 중..." : "등록"}
      </button>
    </div>
  );
}
