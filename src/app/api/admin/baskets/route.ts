import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { allBaskets } from "@/basket";
import { allBooks } from "@/book";
import { getGitHubConfig, commitFiles } from "@/lib/admin/github";
import { genBasketFile, genBasketIndex } from "@/lib/admin/templates";

/** GET: 현재 바구니 목록 */
export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  return NextResponse.json({
    baskets: allBaskets,
    availableBooks: allBooks.map((b) => ({ id: b.id, title: b.title })),
  });
}

/** PUT: 바구니 전체 업데이트 */
export async function PUT(request: NextRequest) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  const gh = getGitHubConfig();
  if (!gh) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN 또는 GITHUB_REPO가 설정되지 않았습니다" },
      { status: 500 }
    );
  }

  let body: {
    baskets: { id: string; title: string; bookIds: string[] }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { baskets } = body;

  if (!baskets || !Array.isArray(baskets) || baskets.length === 0) {
    return NextResponse.json(
      { error: "최소 1개의 바구니 필요" },
      { status: 400 }
    );
  }

  // 유효성 검사: 모든 바구니 ID는 kebab-case
  for (const b of baskets) {
    if (!b.id || !b.title) {
      return NextResponse.json(
        { error: "모든 바구니에 id와 title 필요" },
        { status: 400 }
      );
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.id)) {
      return NextResponse.json(
        { error: `바구니 ID는 kebab-case만 허용: ${b.id}` },
        { status: 400 }
      );
    }
  }

  // 유효성 검사: 참조된 bookId가 실제 존재하는지
  const validBookIds = new Set(allBooks.map((b) => b.id));
  for (const b of baskets) {
    for (const bookId of b.bookIds) {
      if (!validBookIds.has(bookId)) {
        return NextResponse.json(
          { error: `존재하지 않는 책 ID: ${bookId} (바구니: ${b.id})` },
          { status: 400 }
        );
      }
    }
  }

  // 유효성 검사: 모든 책이 최소 1개 바구니에 소속
  const assignedBooks = new Set(baskets.flatMap((b) => b.bookIds));
  const orphanBooks = allBooks.filter((b) => !assignedBooks.has(b.id));
  if (orphanBooks.length > 0) {
    return NextResponse.json(
      {
        error: `모든 책은 최소 1개 바구니에 소속 필요. 미소속: ${orphanBooks
          .map((b) => b.title)
          .join(", ")}`,
      },
      { status: 400 }
    );
  }

  try {
    // 파일 생성: 각 바구니 파일 + index.ts
    const files: { path: string; content: string }[] = baskets.map((b) => ({
      path: `src/basket/${b.id}.ts`,
      content: genBasketFile(b.id, b.title, b.bookIds),
    }));

    // 삭제된 바구니 처리: 기존에 있었지만 새 목록에 없는 바구니는
    // GitHub Tree API로는 삭제가 복잡하므로, index.ts에서 참조 안 하면 무시됨
    files.push({
      path: "src/basket/index.ts",
      content: genBasketIndex(baskets),
    });

    const result = await commitFiles(
      gh,
      files,
      `refactor(basket): update basket configuration via admin UI`
    );

    return NextResponse.json({
      success: true,
      commit: result.sha,
      filesChanged: result.filesChanged,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json(
      { error: `GitHub 커밋 실패: ${message}` },
      { status: 500 }
    );
  }
}
