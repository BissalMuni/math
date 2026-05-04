import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const files = walk("src/content");

// Strip patterns at start of title:
//   "(1) ", "(12) " → 괄호 숫자
//   "①" ~ "⑮" → 원 숫자
//   "1. ", "12. " → Arabic + period
const STRIP = /^(?:\(\d+\)\s*|[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮]\s*|\d+\.\s+)/;

let totalFiles = 0;
let totalSubSections = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let subInCalcBox = 0;
  let count = 0;

  const updated = original.replace(
    /(<CalcBox\b[^>]*>|<SubSection\b[^>]*>)/g,
    (match) => {
      if (match.startsWith("<CalcBox")) {
        subInCalcBox = 0;
        return match;
      }
      // SubSection
      if (!match.includes("title=")) return match;
      subInCalcBox++;
      const n = subInCalcBox;
      const replaced = match.replace(/title="([^"]+)"/, (m, t) => {
        const stripped = t.replace(STRIP, "");
        count++;
        return `title="(${n}) ${stripped}"`;
      });
      return replaced;
    }
  );

  if (count > 0 && updated !== original) {
    fs.writeFileSync(file, updated);
    totalFiles++;
    totalSubSections += count;
    console.log(`  ${count.toString().padStart(2)} SubSection  →  ${file}`);
  }
}

console.log(`\nTotal: ${totalSubSections} SubSection titles updated across ${totalFiles} files.`);
