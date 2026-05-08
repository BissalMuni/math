import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 20, 50) : 20;

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const results = searchContent(query, limit);
  return NextResponse.json({ results });
}
