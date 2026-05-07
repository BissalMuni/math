import { getSessionFromCookies } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/constants";
import { redirect } from "next/navigation";
import { AdminAttachmentsClient } from "@/components/admin/admin-attachments-client";

export default async function AdminAttachmentsPage() {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");

  // admin 이상만 첨부파일 통합 관리 가능 (조회 + 타인 업로드 삭제 권한)
  if (!hasPermission(session.role, "view_audit")) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">첨부파일 관리</h1>
        <p className="mt-1 text-sm text-muted">
          전체 첨부 이미지 조회·필터·미리보기·삭제. 본인이 업로드하지 않은 파일도 삭제할 수 있습니다.
        </p>
      </div>

      <AdminAttachmentsClient />
    </div>
  );
}
