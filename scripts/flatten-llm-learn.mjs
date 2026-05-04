/**
 * LLM 학습 트리 평탄화: chapter 단위(ll-ch*, ll-p*)가 leaf가 되도록
 * sub-leaf children 제거.
 *
 * 평탄화 후 구조:
 *   llm-learn (book)
 *   └── prologue / part1~5 / epilogue
 *       └── ll-p1~p4, ll-ch1~ch13 (모두 leaf)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(ROOT, "src/structure/data/llm-learning.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

let removed = 0;
function flatten(node, depth) {
  if (!node.children) return;
  // depth 2 = chapter level (book.children = parts/prologue/epilogue at depth 1,
  // their children = chapters at depth 2)
  if (depth === 2) {
    // chapter면서 children이 있으면 → 모두 leaf로
    const allLeaves = node.children.every((c) => !c.children);
    if (allLeaves && node.children.length > 0) {
      removed += node.children.length;
      delete node.children;
    }
    return;
  }
  for (const c of node.children) flatten(c, depth + 1);
}

flatten(data, 0);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`removed ${removed} sub-leaves`);
