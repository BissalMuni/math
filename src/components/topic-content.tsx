"use client";

import { Suspense } from "react";
import { ProgressCheck } from "@/components/progress-check";
import { ContentPathContext } from "@/components/content-path-context";
import { getContentComponent } from "@/content/registry";
import type { TreeNode } from "@/data";

/** 소단원 콘텐츠 표시 (콘텐츠가 있으면 렌더링, 없으면 준비 중 표시) */
export function TopicContent({ node, contentPath }: { node: TreeNode; contentPath: string }) {
  const Content = getContentComponent(node.id);

  return (
    <ContentPathContext.Provider value={contentPath}>
      <div className="flex items-start justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">{node.title}</h1>
        <ProgressCheck topicId={node.id} />
      </div>
      {Content ? (
        <Suspense fallback={<p className="text-muted">콘텐츠를 불러오는 중...</p>}>
          <Content />
        </Suspense>
      ) : (
        <p className="text-muted italic">이 단원의 콘텐츠가 준비 중입니다.</p>
      )}
    </ContentPathContext.Provider>
  );
}
