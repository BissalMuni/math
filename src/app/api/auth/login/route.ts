import { NextRequest, NextResponse } from "next/server";
import {
  authenticate,
  createSession,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { ROLE_LABELS } from "@/lib/auth/constants";

export async function POST(request: NextRequest) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { password } = body;
  if (!password) {
    return NextResponse.json({ error: "비밀번호를 입력하세요" }, { status: 400 });
  }

  const role = authenticate(password);
  if (!role) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다" }, { status: 401 });
  }

  const token = await createSession(role);
  const response = NextResponse.json({
    role,
    label: ROLE_LABELS[role],
  });

  response.cookies.set(sessionCookieOptions(token));
  return response;
}
