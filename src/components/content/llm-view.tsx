"use client";

import Link from "next/link";
import { llmConceptTree } from "@/structure/llm-math";
import type { TreeNode } from "@/structure";

const fieldsBranch = llmConceptTree.children.find((c) => c.slug === "fields");
const pipelineBranch = llmConceptTree.children.find((c) => c.slug === "pipeline");

function CardLink({ basePath, node }: { basePath: string; node: TreeNode }) {
  return (
    <Link
      href={`/llm/${basePath}/${node.slug}`}
      className="block rounded-xl border border-sidebar-border p-5 hover:border-accent hover:bg-accent-light transition-colors"
    >
      <h2 className="text-base font-semibold">{node.title}</h2>
    </Link>
  );
}

/** LLM 처리 절차별 — 단계 카드 */
export function LlmByPipeline() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">LLM 처리 절차별</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {pipelineBranch?.children?.map((node) => (
          <CardLink key={node.id} basePath="pipeline" node={node} />
        ))}
      </div>
    </div>
  );
}

/** 수학 분야별 — 분야 카드 */
export function LlmByField() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">수학 분야별</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {fieldsBranch?.children?.map((node) => (
          <CardLink key={node.id} basePath="fields" node={node} />
        ))}
      </div>
    </div>
  );
}
