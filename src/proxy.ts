import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLES, hasPermission, type Role } from "@/lib/auth/constants";

const COOKIE_NAME = "math_session";

/** JWT 서명 키 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** 경로별 최소 권한 매핑 */
const ROUTE_PERMISSIONS: { path: string; permission: string; role?: Role }[] = [
  // superadmin 전용 — 구조 편집 (바구니/책 생성 등)
  { path: "/admin/super", role: "superadmin", permission: "manage_books" },
  { path: "/api/admin/baskets", permission: "edit_structure" },
  { path: "/api/admin/books", permission: "edit_structure" },
  // admin 이상 — 이력 조회, 롤백
  { path: "/api/admin/rollback", permission: "rollback" },
  { path: "/api/admin/changes", permission: "view_audit" },
  // subadmin 이상 — 책/바구니 관리
  { path: "/admin/structure", permission: "edit_structure" },
  { path: "/api/admin/structure", permission: "edit_structure" },
];

/** 경로에 필요한 최소 역할/권한 확인 */
function checkRouteAccess(pathname: string, role: Role): boolean {
  for (const route of ROUTE_PERMISSIONS) {
    if (pathname.startsWith(route.path)) {
      if (route.role && role !== route.role) return false;
      return hasPermission(role, route.permission);
    }
  }
  // 기본 admin 경로는 editor 이상이면 접근 가능
  return ROLES.indexOf(role) >= ROLES.indexOf("editor");
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
  const isAdminGuarded =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  // JWT 세션 확인 (있으면 role 추출 → x-user-role 헤더로 주입)
  let role: Role | null = null;
  const secret = getSecret();
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (secret && token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const r = payload.role as Role;
      if (ROLES.includes(r)) role = r;
    } catch {
      // 무효 토큰은 미인증으로 처리
    }
  }

  // /admin, /api/admin 만 미인증/권한 부족 시 리다이렉트
  if (isAdminGuarded) {
    if (!secret || !role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!checkRouteAccess(pathname, role)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // /api/comments, /api/images 등은 헤더만 주입하고 통과 —
  // 라우트 핸들러 안의 requirePermission 이 401/403 을 결정한다.
  return passWithRole(request, role);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/comments/:path*",
    "/api/images/:path*",
  ],
};
