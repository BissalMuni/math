import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/require-role";
import { allCategories } from "@/structure";
import {
  serializeCategoryToTS,
  collectLeafIds,
  getCategoryMeta,
} from "@/lib/structure-serializer";
import type { CategoryRoot } from "@/structure/types";

/** GitHub API 기본 설정 */
function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo" 형식
  if (!token || !repo) return null;
  return { token, repo };
}

/** GitHub API 호출 헬퍼 */
async function githubFetch(
  repo: string,
  path: string,
  token: string,
  options?: RequestInit
) {
  const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text}`);
  }
  return res.json();
}

/** GET: 현재 구조 데이터 반환 */
export async function GET(request: NextRequest) {
  const denied = requirePermission(request, "edit_structure");
  if (denied) return denied;

  // llm-concepts는 llm-concepts.ts + llm-math.ts로 구성되어 별도 처리 필요 → 제외
  const editable = allCategories.filter(
    (c) => getCategoryMeta(c.id) !== null
  );

  return NextResponse.json({ categories: editable });
}

/** PUT: 구조 변경 사항을 GitHub에 커밋 */
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

  let body: { category: CategoryRoot; newLeafIds?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { category } = body;
  if (!category?.id || !category?.children) {
    return NextResponse.json(
      { error: "category 데이터 필요" },
      { status: 400 }
    );
  }

  const meta = getCategoryMeta(category.id);
  if (!meta) {
    return NextResponse.json(
      { error: `편집 불가능한 카테고리: ${category.id}` },
      { status: 400 }
    );
  }

  try {
    // 1) main 브랜치의 최신 커밋 SHA 가져오기
    const ref = await githubFetch(
      gh.repo,
      "git/ref/heads/main",
      gh.token
    );
    const latestSha = ref.object.sha;

    // 2) 구조 파일 내용 생성
    const structureContent = serializeCategoryToTS(category);
    const structurePath = `src/structure/${meta.fileName}`;

    // 3) 새 leaf node에 대한 빈 콘텐츠 파일 생성
    const currentLeafIds = collectLeafIds(
      allCategories.find((c) => c.id === category.id)?.children ?? []
    );
    const newLeafIds = collectLeafIds(category.children).filter(
      (id) => !currentLeafIds.includes(id)
    );

    // 4) 파일 목록 구성 (blob 생성)
    const files: { path: string; content: string }[] = [
      { path: structurePath, content: structureContent },
    ];

    // 새 leaf node에 대한 빈 콘텐츠 파일
    for (const leafId of newLeafIds) {
      const node = findLeafById(category.children, leafId);
      if (!node) continue;

      const contentPath = `src/content/${category.basePath}/${node.slug}.tsx`;
      const componentName = slugToComponentName(node.slug);
      const templateContent = generateContentTemplate(
        componentName,
        node.title
      );
      files.push({ path: contentPath, content: templateContent });
    }

    // 5) GitHub Tree API로 커밋 생성
    // blob 생성
    const treeItems = await Promise.all(
      files.map(async (file) => {
        const blob = await githubFetch(
          gh.repo,
          "git/blobs",
          gh.token,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: file.content,
              encoding: "utf-8",
            }),
          }
        );
        return {
          path: file.path,
          mode: "100644" as const,
          type: "blob" as const,
          sha: blob.sha,
        };
      })
    );

    // 새 트리 생성
    const newTree = await githubFetch(
      gh.repo,
      "git/trees",
      gh.token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base_tree: latestSha,
          tree: treeItems,
        }),
      }
    );

    // 커밋 생성
    const commitMessage = `structure(${category.id}): update via admin UI`;
    const newCommit = await githubFetch(
      gh.repo,
      "git/commits",
      gh.token,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: commitMessage,
          tree: newTree.sha,
          parents: [latestSha],
        }),
      }
    );

    // main ref 업데이트
    await githubFetch(
      gh.repo,
      "git/refs/heads/main",
      gh.token,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sha: newCommit.sha }),
      }
    );

    return NextResponse.json({
      success: true,
      commit: newCommit.sha,
      filesChanged: files.map((f) => f.path),
      newLeafIds,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return NextResponse.json(
      { error: `GitHub 커밋 실패: ${message}` },
      { status: 500 }
    );
  }
}

/** 트리에서 id로 leaf node 찾기 */
function findLeafById(
  nodes: CategoryRoot["children"],
  id: string
): { slug: string; title: string } | null {
  for (const node of nodes) {
    if (node.id === id) return { slug: node.slug, title: node.title };
    if (node.children) {
      const found = findLeafById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

/** slug → PascalCase 컴포넌트 이름 */
function slugToComponentName(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** 빈 콘텐츠 템플릿 생성 */
function generateContentTemplate(componentName: string, title: string): string {
  return `"use client";

import { CalcBox } from "@/components/content/shared";

export default function ${componentName}() {
  return (
    <div className="space-y-8">
      <p className="text-muted">${title} — 콘텐츠 준비 중입니다.</p>

      <CalcBox title="개요">
        <p>이 단원의 내용이 곧 추가됩니다.</p>
      </CalcBox>
    </div>
  );
}
`;
}
