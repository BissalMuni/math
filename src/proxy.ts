import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "math_session";

/** JWT 서명 키 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** super_admin 전용 경로 */
const SUPER_ADMIN_PATHS = ["/admin/changes/", "/api/admin/rollback"];

/** 역할이 super_admin 전용 경로에 접근 가능한지 확인 */
function requiresSuperAdmin(pathname: string): boolean {
  // /admin/changes/[id] 상세 페이지 (목록은 제외)
  if (pathname.match(/^\/admin\/changes\/[^/]+$/)) return true;
  return SUPER_ADMIN_PATHS.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin, /api/admin 경로만 보호
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // 쿠키에서 세션 토큰 읽기
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // JWT 검증
  const secret = getSecret();
  if (!secret) {
    if (isAdminApi) {
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;

    // super_admin 전용 경로 체크
    if (requiresSuperAdmin(pathname) && role !== "super_admin") {
      if (isAdminApi) {
        return NextResponse.json({ error: "권한 없음" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // 역할 정보를 요청 헤더에 추가 (API route에서 사용)
    const response = NextResponse.next({
      request: {
        headers: new Headers({
          ...Object.fromEntries(request.headers),
          "x-user-role": role,
        }),
      },
    });

    return response;
  } catch {
    // JWT 만료 또는 무효
    if (isAdminApi) {
      return NextResponse.json({ error: "세션 만료" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
