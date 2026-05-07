import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/supabase/images";
import { requirePermission, getRoleFromRequest } from "@/lib/auth/require-role";
import { ROLE_LABELS, hasPermission } from "@/lib/auth/constants";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 이미지 삭제는 editor 이상만
  const denied = requirePermission(request, "edit_content");
  if (denied) return denied;

  const { id } = await params;

  // 본인 업로드만 삭제 가능 (rollback 권한 보유 시 우회)
  // uploaded_by 는 JWT 역할에서 도출 — 클라이언트 입력은 무시
  const role = getRoleFromRequest(request);
  const uploadedBy = role ? ROLE_LABELS[role] : "";
  const canOverride = role ? hasPermission(role, "rollback") : false;

  try {
    const result = await deleteImage(id, uploadedBy, canOverride);
    if (!result.success) {
      const status = result.error?.includes("찾을 수") ? 404 : 403;
      return NextResponse.json({ error: result.error }, { status });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
