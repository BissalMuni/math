"use client";

import Link from "next/link";
import {
  llmConcepts,
  llmFields,
  llmCurriculumGroups,
  type LlmConcept,
} from "@/structure/llm-concepts";

/** 개념 → URL */
function conceptUrl(c: LlmConcept) {
  const fieldSlug =
    c.field === "선형대수"   ? "linear-algebra"
    : c.field === "미적분"   ? "calculus"
    : c.field === "확률과 통계" ? "probability"
    : c.field === "정보이론" ? "information-theory"
    : c.field === "최적화"   ? "optimization"
    : "numerical-methods";
  return `/llm/fields/${fieldSlug}/${c.slug}`;
}

function ConceptLink({ c }: { c: LlmConcept }) {
  return (
    <Link href={conceptUrl(c)} className="block text-sm text-muted hover:text-accent py-0.5">
      {c.title}
    </Link>
  );
}

/** LLM 처리 절차별 */
export function LlmByPipeline() {
  const stageOrder: string[] = [];
  for (const c of llmConcepts) {
    for (const p of c.pipelines) {
      if (!stageOrder.includes(p)) stageOrder.push(p);
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">LLM 처리 절차별</h1>
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
    </div>
  );
}

/** 수학 분야별 */
export function LlmByField() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">수학 분야별</h1>
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
    </div>
  );
}

/** 교육과정별 */
export function LlmByCurriculum() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">교육과정별</h1>
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
    </div>
  );
}
