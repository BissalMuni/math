import { NextRequest, NextResponse } from "next/server";
import { getImages, uploadImage } from "@/lib/supabase/images";
import { requirePermission, getRoleFromRequest } from "@/lib/auth/require-role";
import { ROLE_LABELS } from "@/lib/auth/constants";

export async function GET(request: NextRequest) {
  const contentPath = request.nextUrl.searchParams.get("content_path");
  if (!contentPath) {
    return NextResponse.json({ error: "content_path 필요" }, { status: 400 });
  }

  try {
    const data = await getImages(contentPath);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // 이미지 업로드는 editor 이상만 (내용 편집 권한과 동급)
  const denied = requirePermission(request, "edit_content");
  if (denied) return denied;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "잘못된 폼 데이터" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const contentPath = formData.get("content_path") as string | null;

  if (!file || !contentPath) {
    return NextResponse.json({ error: "file, content_path 필요" }, { status: 400 });
  }

  // uploaded_by 는 클라이언트 입력을 신뢰하지 않고 JWT 역할에서 도출
  const role = getRoleFromRequest(request);
  const uploadedBy = role ? ROLE_LABELS[role] : "익명";

  try {
    const data = await uploadImage(file, contentPath.trim(), uploadedBy);
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("[api/images POST] upload failed:", err);
    const message = err instanceof Error ? err.message : "업로드 실패";
    const status = message.includes("MB") || message.includes("png") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
