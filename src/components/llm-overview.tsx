"use client";

import { useState } from "react";
import Link from "next/link";
import {
  llmConcepts,
  llmFields,
  llmCurriculumGroups,
  type LlmConcept,
} from "@/data/llm-concepts";

type Tab = "pipeline" | "field" | "curriculum";

/** 개념 → /llm URL (분야별 콘텐츠 파일 사용) */
function conceptUrl(c: LlmConcept) {
  return `/llm/fields/${c.field === "선형대수" ? "linear-algebra"
    : c.field === "미적분" ? "calculus"
    : c.field === "확률과 통계" ? "probability"
    : c.field === "정보이론" ? "information-theory"
    : c.field === "최적화" ? "optimization"
    : "numerical-methods"}/${c.slug}`;
}

/** 개념 링크 */
function ConceptLink({ c }: { c: LlmConcept }) {
  return (
    <Link
      href={conceptUrl(c)}
      className="block text-sm text-muted hover:text-accent py-0.5"
    >
      {c.title}
    </Link>
  );
}

/** LLM 수학 개요 — 3탭 뷰 */
export function LlmOverview() {
  const [tab, setTab] = useState<Tab>("pipeline");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">LLM 수학</h1>
      <p className="text-muted mb-6">
        LLM에 쓰이는 수학 개념 — 총 {llmConcepts.length}개
      </p>

      {/* 탭 */}
      <div className="flex gap-1 mb-8 border-b border-sidebar-border">
        {(
          [
            { key: "pipeline" as Tab, label: "LLM 처리 절차별" },
            { key: "field" as Tab,    label: "수학 분야별" },
            { key: "curriculum" as Tab, label: "교육과정별" },
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

      {tab === "pipeline"   && <PipelineView />}
      {tab === "field"      && <FieldView />}
      {tab === "curriculum" && <CurriculumView />}
    </div>
  );
}

/** LLM 처리 절차별 뷰 */
function PipelineView() {
  // 모든 pipeline 태그 수집 (등장 순서 유지, 중복 제거)
  const stageOrder: string[] = [];
  for (const c of llmConcepts) {
    for (const p of c.pipelines) {
      if (!stageOrder.includes(p)) stageOrder.push(p);
    }
  }

  return (
    <div className="space-y-4">
      {stageOrder.map((stage) => {
        const concepts = llmConcepts.filter((c) => c.pipelines.includes(stage));
        return (
          <div key={stage} className="rounded-xl border border-sidebar-border p-5">
            <h2 className="text-base font-semibold mb-3">{stage}</h2>
            <div className="space-y-0.5">
              {concepts.map((c) => <ConceptLink key={c.id} c={c} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 수학 분야별 뷰 */
function FieldView() {
  return (
    <div className="space-y-4">
      {llmFields.map((field) => {
        const concepts = llmConcepts.filter((c) => c.field === field);
        return (
          <div key={field} className="rounded-xl border border-sidebar-border p-5">
            <h2 className="text-base font-semibold mb-3">{field}</h2>
            <div className="space-y-0.5">
              {concepts.map((c) => <ConceptLink key={c.id} c={c} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 교육과정별 뷰 */
function CurriculumView() {
  return (
    <div className="space-y-6">
      {llmCurriculumGroups.map((group) => (
        <div key={group.label} className="rounded-xl border border-sidebar-border p-5">
          <h2 className="text-lg font-semibold mb-4">{group.label}</h2>
          <div className="space-y-4">
            {group.levels.map((level) => {
              const concepts = llmConcepts.filter((c) => c.curriculum === level);
              if (concepts.length === 0) return null;
              return (
                <div key={level}>
                  <h3 className="text-sm font-medium text-muted mb-2">{level}</h3>
                  <div className="ml-3 space-y-0.5">
                    {concepts.map((c) => <ConceptLink key={c.id} c={c} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
