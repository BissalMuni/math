import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { type Role, ROLES } from "./constants";

const COOKIE_NAME = "math_session";
const EXPIRY = "24h";

/** ENV에서 JWT 서명 키 가져오기 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET 환경변수가 없습니다");
  return new TextEncoder().encode(secret);
}

/** 역할별 ENV 비밀번호 매핑 */
const ROLE_ENV_MAP: Record<Role, string> = {
  reader: "ROLE_READER_PASSWORD",
  content_editor: "ROLE_CONTENT_EDITOR_PASSWORD",
  structure_editor: "ROLE_STRUCTURE_EDITOR_PASSWORD",
  super_admin: "ROLE_SUPER_ADMIN_PASSWORD",
};

/** 타이밍 안전한 문자열 비교 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // 길이가 다르면 동일 길이로 맞춰서 비교 (타이밍 공격 방지)
    const bufA = Buffer.from(a.padEnd(64, "\0"));
    const bufB = Buffer.from(b.padEnd(64, "\0"));
    timingSafeEqual(bufA, bufB);
    return false;
  }
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/** 비밀번호로 역할 확인 — 일치하는 역할 반환, 없으면 null */
export function authenticate(password: string): Role | null {
  // 높은 권한부터 확인 (super_admin → reader)
  for (const role of [...ROLES].reverse()) {
    const envKey = ROLE_ENV_MAP[role];
    const envPassword = process.env[envKey];
    if (envPassword && safeCompare(password, envPassword)) {
      return role;
    }
  }
  return null;
}

/** JWT 세션 토큰 생성 */
export async function createSession(role: Role): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret());
}

/** JWT 토큰 검증 — 유효하면 { role }, 아니면 null */
export async function verifySession(
  token: string
): Promise<{ role: Role } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = payload.role as Role;
    if (ROLES.includes(role)) return { role };
    return null;
  } catch {
    return null;
  }
}

/** 쿠키에서 세션 읽기 (Server Component / Route Handler 용) */
export async function getSessionFromCookies(): Promise<{
  role: Role;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** 세션 쿠키 설정용 옵션 반환 */
export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24, // 24시간
  };
}

/** 세션 쿠키 삭제용 옵션 반환 */
export function sessionCookieDeleteOptions() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

/** 쿠키 이름 내보내기 (미들웨어에서 사용) */
export { COOKIE_NAME };
