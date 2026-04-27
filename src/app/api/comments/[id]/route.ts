import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/supabase/comments";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const author = request.nextUrl.searchParams.get("author");

  if (!author) {
    return NextResponse.json({ error: "author 필요" }, { status: 400 });
  }

  try {
    const result = await deleteComment(id, author);
    if (!result.success) {
      const status = result.error?.includes("찾을 수") ? 404 : 403;
      return NextResponse.json({ error: result.error }, { status });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
