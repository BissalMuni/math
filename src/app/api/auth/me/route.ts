import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth/session";
import { ROLE_LABELS, ROLE_PERMISSIONS } from "@/lib/auth/constants";

export async function GET() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
  }

  return NextResponse.json({
    role: session.role,
    label: ROLE_LABELS[session.role],
    permissions: ROLE_PERMISSIONS[session.role],
  });
}
