import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { getContentChanges } from "@/lib/supabase/content-changes";
import { ChangeTable } from "@/components/admin/change-table";
import Link from "next/link";

export default async function ChangesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; change_type?: string; file_path?: string }>;
}) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");
  if (!hasPermission(session.role, "view_audit")) redirect("/admin");

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 20;

  const { data, count } = await getContentChanges({
    limit,
    offset: (page - 1) * limit,
    change_type: params.change_type,
    file_path: params.file_path,
  });

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">수정 이력</h1>

      {/* 필터 */}
      <div className="flex gap-2">
        {["", "content_edit", "structure_edit", "automated_feedback", "rollback"].map(
          (type) => {
            const label = type
              ? { content_edit: "내용", structure_edit: "구조", automated_feedback: "자동", rollback: "롤백" }[type]
              : "전체";
            const isActive = (params.change_type || "") === type;
            return (
              <Link
                key={type}
                href={`/admin/changes${type ? `?change_type=${type}` : ""}`}
                className={`rounded-full px-3 py-1 text-sm ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            );
          }
        )}
      </div>

      {/* 테이블 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <ChangeTable changes={data} showDetail />
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/changes?page=${page - 1}${params.change_type ? `&change_type=${params.change_type}` : ""}`}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            >
              이전
            </Link>
          )}
          <span className="text-sm text-gray-500">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/admin/changes?page=${page + 1}${params.change_type ? `&change_type=${params.change_type}` : ""}`}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            >
              다음
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
