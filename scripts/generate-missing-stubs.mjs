/**
 * 모든 leaf에 대해 컨벤션 경로의 콘텐츠 파일이 존재하는지 확인하고
 * 없으면 빈 stub TSX 파일을 생성한다.
 *
 * 컨벤션:
 *   수학 책:
 *     middle:   middle/grade{학년slug}/{leaf.slug}.tsx
 *     high:     high/{과목slug}/{leaf.slug}.tsx
 *     llm-math: llm-math/{branch.slug}/{leaf.slug}.tsx
 *   LLM 학습:
 *     llm/{leaf.slug}.tsx
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

function toPascalCase(slug) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("")
    .replace(/[^A-Za-z0-9]/g, "") || "Topic";
}

function buildStub(componentName, breadcrumb) {
  return `"use client";

import { CalcBox } from "@/components/content/shared";

/** ${breadcrumb} */
export default function ${componentName}() {
  return (
    <div className="space-y-8">
      <p className="text-muted italic">콘텐츠 준비 중입니다.</p>
    </div>
  );
}
`;
}

let created = 0;
let existed = 0;

/** leaf 1개 처리 */
function ensureFile(relPath, leafTitle, ancestors) {
  const filePath = path.join(ROOT, "src/content", relPath + ".tsx");
  if (fs.existsSync(filePath)) {
    existed++;
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const componentName = toPascalCase(path.basename(relPath));
  const breadcrumb = [...ancestors.map((a) => a.title), leafTitle].join(" > ");
  fs.writeFileSync(filePath, buildStub(componentName, breadcrumb), "utf8");
  console.log(`created: src/content/${relPath}.tsx`);
  created++;
}

/** 트리 walk → 각 leaf에 대해 컨벤션 경로 도출 */
function walkBook(book, deriveRel) {
  function walk(node, ancestors) {
    if (!node.children || node.children.length === 0) {
      const rel = deriveRel(node, ancestors);
      if (rel) ensureFile(rel, node.title, ancestors);
      return;
    }
    for (const c of node.children) walk(c, [...ancestors, node]);
  }
  walk(book, []);
}

// ── 수학 책 (math.ts에서 합쳐지지만 데이터 소스는 3개 JSON) ──
const middle = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/middle-school.json"), "utf8")
);
const high = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/high-school.json"), "utf8")
);
const llmMath = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/llm-math.json"), "utf8")
);
const llmLearn = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/llm-learning.json"), "utf8")
);

// 중등수학: middle/grade{학년slug}/{leaf.slug}
walkBook(middle, (leaf, ancestors) => {
  // ancestors: [middleRoot, gradeNode, chapterNode]
  if (ancestors.length < 2) return null;
  const grade = ancestors[1];
  return `middle/grade${grade.slug}/${leaf.slug}`;
});

// 고등수학: high/{과목slug}/{leaf.slug}
walkBook(high, (leaf, ancestors) => {
  if (ancestors.length < 2) return null;
  const subject = ancestors[1];
  return `high/${subject.slug}/${leaf.slug}`;
});

// LLM 수학: llm-math/{branch.slug}/{leaf.slug}
walkBook(llmMath, (leaf, ancestors) => {
  if (ancestors.length < 2) return null;
  const branch = ancestors[1];
  return `llm-math/${branch.slug}/${leaf.slug}`;
});

// LLM 학습: llm/{leaf.slug}
walkBook(llmLearn, (leaf) => `llm/${leaf.slug}`);

console.log(`\nCreated ${created} new stub files (${existed} already existed).`);
