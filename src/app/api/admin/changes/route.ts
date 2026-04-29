import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getContentChanges } from "@/lib/supabase/content-changes";

export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  const url = request.nextUrl.searchParams;
  const page = parseInt(url.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.get("limit") || "20", 10), 100);
  const file_path = url.get("file_path") || undefined;
  const change_type = url.get("change_type") || undefined;

  try {
    const { data, count } = await getContentChanges({
      limit,
      offset: (page - 1) * limit,
      file_path,
      change_type,
    });
    return NextResponse.json({ data, total: count, page, limit });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
