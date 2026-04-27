import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "@/lib/supabase/images";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const uploadedBy = request.nextUrl.searchParams.get("uploaded_by");

  if (!uploadedBy) {
    return NextResponse.json({ error: "uploaded_by 필요" }, { status: 400 });
  }

  try {
    const result = await deleteImage(id, uploadedBy);
    if (!result.success) {
      const status = result.error?.includes("찾을 수") ? 404 : 403;
      return NextResponse.json({ error: result.error }, { status });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
