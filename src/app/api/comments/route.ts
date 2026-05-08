import { NextRequest, NextResponse } from "next/server";
import { getComments, createComment } from "@/lib/supabase/comments";
import { requirePermission, getRoleFromRequest } from "@/lib/auth/require-role";
import { ROLE_LABELS } from "@/lib/auth/constants";
import { sanitizeCommentBody } from "@/lib/security/comment-sanitizer";
import type { FeedbackType, FeedbackLevel } from "@/lib/types";

const VALID_TYPES: FeedbackType[] = ["content", "structure"];
const VALID_LEVELS: FeedbackLevel[] = ["major", "medium", "minor", "section"];

export async function GET(request: NextRequest) {
  const contentPath = request.nextUrl.searchParams.get("content_path");
  if (!contentPath) {
    return NextResponse.json({ error: "content_path 필요" }, { status: 400 });
  }

  try {
    const data = await getComments(contentPath);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: {
    content_path?: string;
    author?: string;
    body?: string;
    section_title?: string;
    feedback_type?: string;
    level?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const {
    content_path,
    author,
    body: commentBody,
    section_title,
    feedback_type,
    level,
  } = body;

  if (!content_path || !commentBody) {
    return NextResponse.json({ error: "content_path, body 필요" }, { status: 400 });
  }

  // 분류 값 검증 (잘못된 값이면 기본값으로)
  const fbType: FeedbackType = VALID_TYPES.includes(feedback_type as FeedbackType)
    ? (feedback_type as FeedbackType)
    : "content";
  const fbLevel: FeedbackLevel = VALID_LEVELS.includes(level as FeedbackLevel)
    ? (level as FeedbackLevel)
    : "section";

  // 권한 체크: 내용 편집 vs 구조 편집 분리
  const required = fbType === "structure" ? "edit_structure" : "edit_content";
  const denied = requirePermission(request, required);
  if (denied) return denied;

  // 작성자는 역할 라벨로 자동 기록 (클라이언트 입력 무시)
  const role = getRoleFromRequest(request);
  const trimmedAuthor = role ? ROLE_LABELS[role] : (author?.trim().slice(0, 50) || "익명");

  // ① 입력단 방어 — sanitize + 의심 패턴 플래그
  const { body: sanitizedBody, flagged, flagReason } = sanitizeCommentBody(commentBody);

  if (!sanitizedBody) {
    return NextResponse.json({ error: "내용이 비어있습니다" }, { status: 400 });
  }

  if (flagged) {
    // 운영자 사후 검토용 — 어떤 댓글이 어떤 사유로 걸렸는지 추적
    console.warn("[comments] flagged on insert:", {
      contentPath: content_path,
      author: trimmedAuthor,
      reason: flagReason,
    });
  }

  try {
    const data = await createComment({
      contentPath: content_path.trim(),
      author: trimmedAuthor,
      body: sanitizedBody,
      sectionTitle: section_title?.trim(),
      feedbackType: fbType,
      level: fbLevel,
      flagged,
      flagReason,
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "등록 실패" }, { status: 500 });
  }
}
