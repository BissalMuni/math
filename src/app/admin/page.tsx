import { getSessionFromCookies } from "@/lib/auth/session";
import { getChangeSummary } from "@/lib/supabase/content-changes";
import { getContentChanges } from "@/lib/supabase/content-changes";
import { hasPermission } from "@/lib/auth/constants";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { ChangeTable } from "@/components/admin/change-table";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  const canViewAudit = hasPermission(session.role, "view_audit");

  // super_admin만 통계 + 최근 이력 표시
  if (!canViewAudit) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">관리자 대시보드</h1>
        <p className="text-gray-500">
          현재 역할로는 수정 이력을 조회할 수 없습니다.
        </p>
      </div>
    );
  }

  const [summary, recent] = await Promise.all([
    getChangeSummary(),
    getContentChanges({ limit: 5 }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>

      <DashboardStats
        total={summary.total}
        today={summary.today}
        thisWeek={summary.thisWeek}
        byType={summary.byType}
      />

      <div>
        <h2 className="mb-3 text-lg font-semibold">최근 변경</h2>
        <div className="rounded-lg border border-gray-200 bg-white">
          <ChangeTable changes={recent.data} showDetail />
        </div>
      </div>
    </div>
  );
}
