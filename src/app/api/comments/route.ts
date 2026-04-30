import { NextRequest, NextResponse } from "next/server";
import { getComments, createComment } from "@/lib/supabase/comments";
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

  if (!content_path || !author || !commentBody) {
    return NextResponse.json({ error: "content_path, author, body 필요" }, { status: 400 });
  }

  const trimmedAuthor = author.trim().slice(0, 50);
  const trimmedBody = commentBody.trim().slice(0, 3000);

  if (!trimmedAuthor || !trimmedBody) {
    return NextResponse.json({ error: "내용이 비어있습니다" }, { status: 400 });
  }

  // 분류 값 검증 (잘못된 값이면 기본값으로)
  const fbType: FeedbackType = VALID_TYPES.includes(feedback_type as FeedbackType)
    ? (feedback_type as FeedbackType)
    : "content";
  const fbLevel: FeedbackLevel = VALID_LEVELS.includes(level as FeedbackLevel)
    ? (level as FeedbackLevel)
    : "section";

  try {
    const data = await createComment({
      contentPath: content_path.trim(),
      author: trimmedAuthor,
      body: trimmedBody,
      sectionTitle: section_title?.trim(),
      feedbackType: fbType,
      level: fbLevel,
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "등록 실패" }, { status: 500 });
  }
}
