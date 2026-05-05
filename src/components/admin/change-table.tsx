import Link from "next/link";
import type { ContentChange } from "@/lib/types";

const CHANGE_TYPE_LABELS: Record<string, string> = {
  content_edit: "내용 수정",
  structure_edit: "구조 수정",
  automated_feedback: "자동 반영",
  rollback: "되돌리기",
};

const CHANGE_TYPE_COLORS: Record<string, string> = {
  content_edit: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  structure_edit: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  automated_feedback: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  rollback: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

export function ChangeTable({
  changes,
  showDetail = false,
}: {
  changes: ContentChange[];
  showDetail?: boolean;
}) {
  if (changes.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        수정 이력이 없습니다
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-sidebar-border text-xs text-muted">
          <tr>
            <th className="px-4 py-3">시간</th>
            <th className="px-4 py-3">유형</th>
            <th className="px-4 py-3">실행자</th>
            <th className="px-4 py-3">파일</th>
            {showDetail && <th className="px-4 py-3">상세</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {changes.map((c) => (
            <tr key={c.id} className="hover:bg-sidebar-bg">
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {formatDate(c.created_at)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    CHANGE_TYPE_COLORS[c.change_type] || "bg-accent-light text-foreground"
                  }`}
                >
                  {CHANGE_TYPE_LABELS[c.change_type] || c.change_type}
                </span>
              </td>
              <td className="px-4 py-3 text-muted">{c.actor}</td>
              <td className="px-4 py-3 font-mono text-xs text-foreground">
                {c.file_path}
              </td>
              {showDetail && (
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/changes/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    보기
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
