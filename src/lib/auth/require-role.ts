import { NextRequest, NextResponse } from "next/server";
import type { Role } from "./constants";
import { hasPermission } from "./constants";

/**
 * 프록시에서 주입한 x-user-role 헤더로 역할 확인.
 * 필요한 권한이 없으면 403 응답 반환.
 */
export function getRoleFromRequest(request: NextRequest): Role | null {
  const role = request.headers.get("x-user-role");
  if (!role) return null;
  return role as Role;
}

/** 특정 권한이 필요한 API route 가드 */
export function requirePermission(
  request: NextRequest,
  permission: string
): NextResponse | null {
  const role = getRoleFromRequest(request);
  if (!role) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }
  if (!hasPermission(role, permission)) {
    return NextResponse.json({ error: "권한 없음" }, { status: 403 });
  }
  return null; // 통과
}
