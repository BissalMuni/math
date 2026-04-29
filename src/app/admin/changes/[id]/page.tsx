import { redirect, notFound } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { getContentChangeById } from "@/lib/supabase/content-changes";
import { DiffView } from "@/components/admin/diff-view";
import { RollbackButton } from "@/components/admin/rollback-button";
import Link from "next/link";

const CHANGE_TYPE_LABELS: Record<string, string> = {
  content_edit: "내용 수정",
  structure_edit: "구조 수정",
  automated_feedback: "자동 반영",
  rollback: "되돌리기",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

export default async function ChangeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");
  if (!hasPermission(session.role, "view_audit")) redirect("/admin");

  const { id } = await params;
  const change = await getContentChangeById(id);
  if (!change) notFound();

  const canRollback =
    hasPermission(session.role, "rollback") &&
    change.before_content &&
    change.change_type !== "rollback";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/changes"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; 이력 목록
        </Link>
        <h1 className="text-2xl font-bold">수정 상세</h1>
      </div>

      {/* 메타 정보 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <dt className="text-gray-500">유형</dt>
            <dd className="mt-1 font-medium">
              {CHANGE_TYPE_LABELS[change.change_type] || change.change_type}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">실행자</dt>
            <dd className="mt-1 font-medium">{change.actor}</dd>
          </div>
          <div>
            <dt className="text-gray-500">시간</dt>
            <dd className="mt-1 font-medium">{formatDate(change.created_at)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">파일</dt>
            <dd className="mt-1 font-mono text-xs">{change.file_path}</dd>
          </div>
          {change.commit_sha && (
            <div>
              <dt className="text-gray-500">커밋</dt>
              <dd className="mt-1 font-mono text-xs">{change.commit_sha}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Diff */}
      {change.diff && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold">Diff</h2>
          <pre className="max-h-64 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
            {change.diff}
          </pre>
        </div>
      )}

      {/* Before / After */}
      {(change.before_content || change.after_content) && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold">변경 전/후</h2>
          <DiffView
            before={change.before_content}
            after={change.after_content}
          />
        </div>
      )}

      {/* 롤백 */}
      {canRollback && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <p className="mb-3 text-sm text-orange-700">
            이 변경을 되돌려 파일을 이전 상태로 복구합니다.
          </p>
          <RollbackButton changeId={change.id} />
        </div>
      )}
    </div>
  );
}
