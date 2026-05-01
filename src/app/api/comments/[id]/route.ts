import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/supabase/comments";
import { requirePermission } from "@/lib/auth/require-role";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 댓글 삭제는 super_admin 만 (rollback 권한과 동급)
  const denied = requirePermission(request, "rollback");
  if (denied) return denied;

  const { id } = await params;

  try {
    const result = await deleteComment(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
