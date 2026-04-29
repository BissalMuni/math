import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getContentChangeById } from "@/lib/supabase/content-changes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  const { id } = await params;

  try {
    const change = await getContentChangeById(id);
    if (!change) {
      return NextResponse.json({ error: "이력을 찾을 수 없습니다" }, { status: 404 });
    }
    return NextResponse.json({ data: change });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
