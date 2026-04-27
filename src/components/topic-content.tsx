"use client";

import { Suspense, useRef } from "react";
import { ProgressCheck } from "@/components/progress-check";
import { AutoSectionComment } from "@/components/auto-section-comment";
import { getContentComponent } from "@/content/registry";
import type { TreeNode } from "@/data";

/** 소단원 콘텐츠 표시 + 모든 section h2 옆에 의견 버튼 자동 주입 */
export function TopicContent({ node, contentPath }: { node: TreeNode; contentPath: string }) {
  const Content = getContentComponent(node.id);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">{node.title}</h1>
        <ProgressCheck topicId={node.id} />
      </div>

      <div ref={containerRef}>
        {Content ? (
          <Suspense fallback={<p className="text-muted">콘텐츠를 불러오는 중...</p>}>
            <Content />
          </Suspense>
        ) : (
          <p className="text-muted italic">이 단원의 콘텐츠가 준비 중입니다.</p>
        )}
      </div>

      {/* 모든 <section><h2> 옆에 의견 버튼 자동 주입 */}
      <AutoSectionComment containerRef={containerRef} />
    </>
  );
}
