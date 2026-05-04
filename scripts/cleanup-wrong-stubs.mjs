/**
 * 잘못 생성된 대단원-level stub TSX 파일들을 삭제
 * (원본 JSON에서 chapter slug 수집 → 해당 파일 삭제)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

function collectChapterSlugs(root, resolveDir) {
  const items = [];
  function walk(node, ancestors) {
    if (!node.children) return;
    if (ancestors.length === 2) {
      // node = 대단원
      const dir = resolveDir(node, ancestors);
      const file = path.join(dir, `${node.slug}.tsx`);
      items.push(file);
    }
    for (const c of node.children) walk(c, [...ancestors, node]);
  }
  walk(root, []);
  return items;
}

const middle = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/middle-school.json"), "utf8")
);
const high = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/structure/data/high-school.json"), "utf8")
);

const middleChapters = collectChapterSlugs(middle, (_chapter, ancestors) => {
  const grade = ancestors[1];
  return path.join(ROOT, "src/content/middle", `grade${grade.slug}`);
});

const highChapters = collectChapterSlugs(high, (_chapter, ancestors) => {
  const subject = ancestors[1];
  return path.join(ROOT, "src/content/high", subject.slug);
});

let deleted = 0;
for (const f of [...middleChapters, ...highChapters]) {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log(`deleted: ${path.relative(ROOT, f)}`);
    deleted++;
  }
}
console.log(`\nTotal deleted: ${deleted}`);
