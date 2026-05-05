import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { allBooks } from "@/book";
import { allBaskets } from "@/basket";
import { getGitHubConfig, commitFiles } from "@/lib/admin/github";
import {
  genBookDataJSON,
  genBookLoader,
  genBookIndex,
  genMapIndex,
  genStructureSerializer,
  genOverviewPage,
  genCatchAllPage,
  genBasketFile,
  genBasketIndex,
  toCamelCase,
  type PathConvention,
} from "@/lib/admin/templates";

/** 기존 책들의 경로 패턴 추론 */
function inferPathConvention(bookId: string): PathConvention {
  // llm-learning은 flat (1단계), 나머지는 nested (2단계)
  if (bookId === "llm-learning") return "flat";
  return "nested";
}

/** POST: 새 책 생성 */
export async function POST(request: NextRequest) {
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
    id: string;
    title: string;
    description: string;
    pathConvention: PathConvention;
    basketId: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { id, title, description, pathConvention, basketId } = body;

  // 유효성 검사
  if (!id || !title || !pathConvention || !basketId) {
    return NextResponse.json(
      { error: "id, title, pathConvention, basketId 필수" },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    return NextResponse.json(
      { error: "id는 kebab-case만 허용 (예: korean-grammar)" },
      { status: 400 }
    );
  }

  if (allBooks.some((b) => b.id === id)) {
    return NextResponse.json(
      { error: `이미 존재하는 책 ID: ${id}` },
      { status: 409 }
    );
  }

  try {
    // 기존 책 + 새 책의 전체 목록
    const allBookIds = [...allBooks.map((b) => b.id), id];
    const allBookConfigs = [
      ...allBooks.map((b) => ({ id: b.id, pathConvention: inferPathConvention(b.id) })),
      { id, pathConvention },
    ];

    // 바구니 업데이트: 지정된 바구니에 새 책 추가
    const updatedBaskets = allBaskets.map((b) => ({
      id: b.id,
      title: b.title,
      bookIds: b.id === basketId ? [...b.bookIds, id] : [...b.bookIds],
    }));

    // 바구니가 존재하지 않으면 에러
    if (!updatedBaskets.some((b) => b.id === basketId)) {
      return NextResponse.json(
        { error: `존재하지 않는 바구니: ${basketId}` },
        { status: 400 }
      );
    }

    // 생성할 파일 목록
    const files: { path: string; content: string }[] = [
      // 1. 책 데이터 JSON
      { path: `src/book/data/${id}.json`, content: genBookDataJSON(id, title, description || "") },
      // 2. 책 로더
      { path: `src/book/${id}.ts`, content: genBookLoader(id) },
      // 3. book/index.ts 재생성
      { path: "src/book/index.ts", content: genBookIndex(allBookIds) },
      // 4. map/index.ts 재생성
      { path: "src/map/index.ts", content: genMapIndex(allBookConfigs) },
      // 5. structure-serializer.ts 재생성
      { path: "src/lib/structure-serializer.ts", content: genStructureSerializer(allBookIds) },
      // 6. 앱 라우트: 개요 페이지
      { path: `src/app/${id}/page.tsx`, content: genOverviewPage(id) },
      // 7. 앱 라우트: catch-all
      { path: `src/app/${id}/[...slugs]/page.tsx`, content: genCatchAllPage(id) },
    ];

    // 8. 바구니 파일 재생성 (변경된 바구니만)
    const targetBasket = updatedBaskets.find((b) => b.id === basketId)!;
    files.push({
      path: `src/basket/${basketId}.ts`,
      content: genBasketFile(targetBasket.id, targetBasket.title, targetBasket.bookIds),
    });

    const result = await commitFiles(
      gh,
      files,
      `feat(book): add new book "${title}" (${id})`
    );

    return NextResponse.json({
      success: true,
      commit: result.sha,
      filesChanged: result.filesChanged,
      bookId: id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json(
      { error: `GitHub 커밋 실패: ${message}` },
      { status: 500 }
    );
  }
}
