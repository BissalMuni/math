import fs from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";

// Recursive collect all .tsx files under src/content
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

// Strip existing prefix: circled numerals, Roman, or Arabic + period/space
const STRIP_PREFIX = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ\d]+(?:\.|장\.)?\s+/;

let totalFiles = 0;
let totalCalcBoxes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let count = 0;

  // Match CalcBox opening tag, extract attributes
  const updated = content.replace(/<CalcBox\b([^>]*)>/g, (full, attrs) => {
    if (!attrs.includes("title=")) return full;
    const newAttrs = attrs.replace(/title="([^"]+)"/, (m, t) => {
      count++;
      const stripped = t.replace(STRIP_PREFIX, "");
      return `title="${count}. ${stripped}"`;
    });
    return `<CalcBox${newAttrs}>`;
  });

  if (count > 0 && updated !== content) {
    fs.writeFileSync(file, updated);
    totalFiles++;
    totalCalcBoxes += count;
    console.log(`  ${count.toString().padStart(2)} CalcBox  →  ${file}`);
  }
}

console.log(`\nTotal: ${totalCalcBoxes} CalcBox titles updated across ${totalFiles} files.`);
