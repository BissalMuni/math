/**
 * 원본 TS 파일에서 JSON 데이터 복원
 */
import fs from "node:fs";
import path from "node:path";

function tsToJson(tsPath, jsonPath) {
  let ts = fs.readFileSync(tsPath, "utf8");
  // import 줄, 주석, TS 타입 어노테이션 제거
  ts = ts.replace(/^import[^;]+;\s*/m, "");
  ts = ts.replace(/\/\*\*[\s\S]*?\*\//g, "");
  ts = ts.replace(/\/\/.*$/gm, "");
  ts = ts.replace(/export const \w+\s*:\s*CategoryRoot\s*=\s*/, "");
  ts = ts.replace(/;[\s]*$/m, "");
  const data = eval("(" + ts + ")");
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  return data;
}

const ROOT = path.resolve(import.meta.dirname, "..");

const middle = tsToJson(
  path.join(ROOT, ".tmp/orig-middle.ts"),
  path.join(ROOT, "src/structure/data/middle-school.json")
);
const high = tsToJson(
  path.join(ROOT, ".tmp/orig-high.ts"),
  path.join(ROOT, "src/structure/data/high-school.json")
);

console.log(`middle: ${middle.children.length} grades`);
console.log(`high: ${high.children.length} subjects`);
