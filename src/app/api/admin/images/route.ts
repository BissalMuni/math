import { NextRequest, NextResponse } from "next/server";
import { getAllImages } from "@/lib/supabase/images";
import { requirePermission } from "@/lib/auth/require-role";

export async function GET(request: NextRequest) {
  // 첨부(이미지) 통합 관리 — admin 이상 (감사·롤백 권한과 동급)
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const limit = Number(searchParams.get("limit") ?? "50");
  const offset = Number(searchParams.get("offset") ?? "0");

  try {
    const data = await getAllImages({
      contentPath: searchParams.get("content_path") ?? undefined,
      uploadedBy: searchParams.get("uploaded_by") ?? undefined,
      fileName: searchParams.get("file_name") ?? undefined,
      limit: Number.isFinite(limit) ? limit : 50,
      offset: Number.isFinite(offset) ? offset : 0,
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("[api/admin/images GET] failed:", err);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
