import { NextRequest, NextResponse } from "next/server";
import { getImages, uploadImage } from "@/lib/supabase/images";

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
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "잘못된 폼 데이터" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const contentPath = formData.get("content_path") as string | null;
  const uploadedBy = formData.get("uploaded_by") as string | null;

  if (!file || !contentPath || !uploadedBy) {
    return NextResponse.json({ error: "file, content_path, uploaded_by 필요" }, { status: 400 });
  }

  try {
    const data = await uploadImage(file, contentPath.trim(), uploadedBy.trim());
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "업로드 실패";
    const status = message.includes("MB") || message.includes("png") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
