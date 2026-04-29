import { NextRequest, NextResponse } from "next/server";
import { requirePermission, getRoleFromRequest } from "@/lib/auth/require-role";
import {
  getContentChangeById,
  logContentChange,
} from "@/lib/supabase/content-changes";
import { join } from "path";

export async function POST(request: NextRequest) {
  const denied = requirePermission(request, "rollback");
  if (denied) return denied;

  let body: { changeId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { changeId } = body;
  if (!changeId) {
    return NextResponse.json({ error: "changeId 필요" }, { status: 400 });
  }

  try {
    const change = await getContentChangeById(changeId);
    if (!change) {
      return NextResponse.json({ error: "이력을 찾을 수 없습니다" }, { status: 404 });
    }

    if (!change.before_content) {
      return NextResponse.json(
        { error: "이전 내용이 없어 되돌릴 수 없습니다" },
        { status: 400 }
      );
    }

    // 현재 파일 내용 읽기 (롤백 이력 기록용)
    const fs = await import("fs/promises");
    const filePath = join(process.cwd(), change.file_path);
    let currentContent: string;
    try {
      currentContent = await fs.readFile(filePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "파일을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    // 파일 되돌리기
    await fs.writeFile(filePath, change.before_content, "utf-8");

    // 롤백 이력 기록
    const role = getRoleFromRequest(request) || "super_admin";
    await logContentChange({
      role,
      actor: role,
      change_type: "rollback",
      file_path: change.file_path,
      diff: null,
      before_content: currentContent,
      after_content: change.before_content,
      metadata: { rollback_of: changeId },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "되돌리기 실패" }, { status: 500 });
  }
}
