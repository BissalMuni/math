import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLES, type Role } from "@/lib/auth/constants";

const COOKIE_NAME = "math_session";

/** JWT 서명 키 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** superadmin 전용 경로 */
const SUPERADMIN_PATHS = ["/admin/super/", "/api/admin/books", "/api/admin/baskets"];

/** admin 이상만 접근 가능한 경로 */
const ADMIN_PATHS = ["/admin/changes/", "/api/admin/rollback", "/api/admin/structure"];

/** 경로별 최소 역할 확인 */
function getRequiredRole(pathname: string): Role | null {
  // superadmin 전용
  if (SUPERADMIN_PATHS.some((p) => pathname.startsWith(p))) return "superadmin";
  // admin 전용 (변경이력 상세, 롤백, 구조 API)
  if (pathname.match(/^\/admin\/changes\/[^/]+$/)) return "admin";
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) return "admin";
  return null;
}

/** 역할이 최소 역할 이상인지 확인 */
function isRoleAtLeast(role: Role, minimum: Role): boolean {
  return ROLES.indexOf(role) >= ROLES.indexOf(minimum);
}

/** 요청 헤더에 x-user-role 을 주입한 NextResponse 반환 */
function passWithRole(request: NextRequest, role: Role | null) {
  const requestHeaders = new Headers(request.headers);
  // 외부 위조 방지: 클라이언트가 보낸 x-user-role 은 무조건 제거
  requestHeaders.delete("x-user-role");
  if (role) requestHeaders.set("x-user-role", role);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isApi = pathname.startsWith("/api");

  // 쿠키에서 세션 토큰 풀어 역할 추출
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = getSecret();
  let role: Role | null = null;

  if (token && secret) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const r = payload.role as Role;
      if (ROLES.includes(r)) role = r;
    } catch {
      role = null;
    }
  }

  // ────────────────────────────────────────────────
  // /admin 페이지 + /api/admin: 강제 게이트
  // ────────────────────────────────────────────────
  if (isAdminPage || isAdminApi) {
    if (!role) {
      if (isAdminApi) {
        return NextResponse.json({ error: "인증 필요" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 서버 설정 오류 (token 은 있지만 secret 이 없는 케이스)
    if (token && !secret) {
      if (isAdminApi) {
        return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 경로별 최소 역할 확인
    const required = getRequiredRole(pathname);
    if (required && !isRoleAtLeast(role, required)) {
      if (isAdminApi) {
        return NextResponse.json({ error: "권한 없음" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return passWithRole(request, role);
  }

  // ────────────────────────────────────────────────
  // 그 외 /api/* (예: /api/comments): 헤더만 주입, 차단은 핸들러가 판단
  // ────────────────────────────────────────────────
  if (isApi) {
    return passWithRole(request, role);
  }

  // 일반 페이지는 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
