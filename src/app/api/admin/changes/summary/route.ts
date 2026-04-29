import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { getChangeSummary } from "@/lib/supabase/content-changes";

export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "view_audit");
  if (denied) return denied;

  try {
    const summary = await getChangeSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
