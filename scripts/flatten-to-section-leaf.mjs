/**
 * 트리 구조 변경 스크립트:
 * - 중단원(학년/과목 → 대단원 → 중단원)에서 children(소단원)을 제거하고 leaf로 만듦
 * - 각 중단원에 대해 stub TSX 콘텐츠 파일 생성 (former 소단원 titles → CalcBox 제목)
 * - 새 leaf id 매핑(map registry용 entries) 생성해 stdout 출력
 *
 * 실행: node scripts/flatten-to-section-leaf.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const STUB_TEMPLATE_NAME = "stub";

/** kebab-case → PascalCase */
function toPascalCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** 콘텐츠 파일 stub 생성 */
function buildStub({ comment, componentName, topics }) {
  const calcBoxes = topics
    .map(
      (t) => `      <CalcBox title="${t.title.replace(/"/g, '\\"')}">
        <p className="text-muted italic">콘텐츠 준비 중입니다.</p>
      </CalcBox>`
    )
    .join("\n\n");

  return `"use client";

import { CalcBox } from "@/components/content/shared";

/** ${comment} */
export default function ${componentName}() {
  return (
    <div className="space-y-8">
${calcBoxes}
    </div>
  );
}
`;
}

/**
 * 책 데이터에서 중단원(=원래 소단원의 부모)을 leaf로 만들고 콘텐츠 파일을 생성한다.
 *
 * @param {object} root - 책 CategoryRoot
 * @param {(section: object, ancestors: object[]) => string} resolveContentDir - 중단원 콘텐츠 파일이 들어갈 디렉토리(absolute)
 * @returns {{ id: string, importPath: string }[]} - map registry 엔트리(leaf id, content import path)
 */
function flattenAndStub(root, resolveContentDir) {
  const entries = [];

  function walk(node, ancestors) {
    if (!node.children || node.children.length === 0) return;

    // 중단원 식별: depth가 정확히 3(book → grade/subject → chapter → section)이고
    // children이 모두 leaf인 경우. ancestors는 [root, grade/subject, chapter] 3개.
    const isSection = ancestors.length === 3;
    const allChildrenAreLeaves = node.children.every(
      (c) => !c.children || c.children.length === 0
    );

    if (isSection && allChildrenAreLeaves) {
      // 이 노드가 새 leaf가 됨
      const topics = node.children.map((c) => ({ title: c.title, slug: c.slug }));
      const ancestorsClone = [...ancestors, node];

      const dir = resolveContentDir(node, ancestors);
      const filePath = path.join(dir, `${node.slug}.tsx`);
      const componentName = toPascalCase(node.slug) || "Topic";

      const breadcrumb = ancestorsClone
        .map((a) => a.title)
        .concat(node.title)
        .join(" > ");

      const stub = buildStub({
        comment: breadcrumb,
        componentName: componentName.replace(/[^A-Za-z0-9]/g, ""),
        topics,
      });

      fs.mkdirSync(dir, { recursive: true });
      // 기존 파일이 있으면 보존(나중에 수동 병합용)
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, stub, "utf8");
      }

      const importPathRel = path
        .relative(path.join(ROOT, "src"), filePath)
        .replace(/\\/g, "/")
        .replace(/\.tsx$/, "");

      entries.push({
        id: node.id,
        importPath: `@/${importPathRel}`,
      });

      // children 제거 → leaf
      delete node.children;
      return;
    }

    // 중간 노드: 더 들어감
    for (const child of node.children) {
      walk(child, [...ancestors, node]);
    }
  }

  walk(root, []);
  return entries;
}

// ==== 중등수학 ====
const middlePath = path.join(ROOT, "src/structure/data/middle-school.json");
const middle = JSON.parse(fs.readFileSync(middlePath, "utf8"));

const middleEntries = flattenAndStub(middle, (_section, ancestors) => {
  // ancestors: [middleRoot, gradeNode, chapterNode]
  const gradeNode = ancestors[1];
  const gradeFolder = `grade${gradeNode.slug}`;
  return path.join(ROOT, "src/content/middle", gradeFolder);
});

fs.writeFileSync(middlePath, JSON.stringify(middle, null, 2) + "\n", "utf8");

// ==== 고등수학 ====
const highPath = path.join(ROOT, "src/structure/data/high-school.json");
const high = JSON.parse(fs.readFileSync(highPath, "utf8"));

const highEntries = flattenAndStub(high, (_section, ancestors) => {
  // ancestors: [highRoot, subjectNode, chapterNode]
  const subjectNode = ancestors[1];
  return path.join(ROOT, "src/content/high", subjectNode.slug);
});

fs.writeFileSync(highPath, JSON.stringify(high, null, 2) + "\n", "utf8");

// ==== Map registry 엔트리 출력 ====
console.log("\n// ── 중등수학 ──");
for (const e of middleEntries) {
  console.log(`  "${e.id}": () => import("${e.importPath}"),`);
}
console.log("\n// ── 고등수학 ──");
for (const e of highEntries) {
  console.log(`  "${e.id}": () => import("${e.importPath}"),`);
}

console.log(`\n// 중등 ${middleEntries.length}개, 고등 ${highEntries.length}개 생성됨`);
