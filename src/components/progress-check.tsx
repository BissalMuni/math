"use client";

import { useProgress } from "@/lib/progress";

/** 소단원 완료 체크 토글 */
export function ProgressCheck({ topicId }: { topicId: string }) {
  const { completed, toggle } = useProgress(topicId);

  return (
    <button
      onClick={toggle}
      className={`
        flex-shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors
        ${
          completed
            ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
            : "border-sidebar-border text-muted hover:border-accent hover:text-accent"
        }
      `}
      aria-label={completed ? "완료 취소" : "완료 표시"}
    >
      {completed ? "✓ 완료" : "○ 미완료"}
    </button>
  );
}
