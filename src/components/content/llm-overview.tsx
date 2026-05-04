"use client";

import { useState } from "react";
import Link from "next/link";
import { llmConceptTree } from "@/structure/llm-math";
import type { TreeNode } from "@/structure";

type Tab = "pipeline" | "field";

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

/** LLM 수학 개요 — 분야/단계 카드 (2탭) */
export function LlmOverview() {
  const [tab, setTab] = useState<Tab>("pipeline");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">LLM 수학</h1>
      <p className="text-muted mb-6">LLM에 쓰이는 수학 개념</p>

      {/* 탭 */}
      <div className="flex gap-1 mb-8 border-b border-sidebar-border">
        {(
          [
            { key: "pipeline" as Tab, label: "LLM 처리 절차별" },
            { key: "field" as Tab,    label: "수학 분야별" },
          ]
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "pipeline" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {pipelineBranch?.children?.map((node) => (
            <CardLink key={node.id} basePath="pipeline" node={node} />
          ))}
        </div>
      )}
      {tab === "field" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {fieldsBranch?.children?.map((node) => (
            <CardLink key={node.id} basePath="fields" node={node} />
          ))}
        </div>
      )}
    </div>
  );
}
