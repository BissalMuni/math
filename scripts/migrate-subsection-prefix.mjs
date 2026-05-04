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

const CIRCLE_TO_PAREN = {
  "①": "(1)", "②": "(2)", "③": "(3)", "④": "(4)", "⑤": "(5)",
  "⑥": "(6)", "⑦": "(7)", "⑧": "(8)", "⑨": "(9)", "⑩": "(10)",
  "⑪": "(11)", "⑫": "(12)", "⑬": "(13)", "⑭": "(14)", "⑮": "(15)",
};

let totalFiles = 0;
let totalSubSections = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let count = 0;

  const updated = content.replace(/<SubSection\b([^>]*)>/g, (full, attrs) => {
    if (!attrs.includes("title=")) return full;
    const newAttrs = attrs.replace(/title="([^"]+)"/, (m, t) => {
      const firstChar = t[0];
      if (CIRCLE_TO_PAREN[firstChar]) {
        count++;
        const rest = t.slice(1).replace(/^\s+/, "");
        return `title="${CIRCLE_TO_PAREN[firstChar]} ${rest}"`;
      }
      return m;
    });
    return `<SubSection${newAttrs}>`;
  });

  if (count > 0 && updated !== content) {
    fs.writeFileSync(file, updated);
    totalFiles++;
    totalSubSections += count;
    console.log(`  ${count.toString().padStart(2)} SubSection  →  ${file}`);
  }
}

console.log(`\nTotal: ${totalSubSections} SubSection prefixes migrated across ${totalFiles} files.`);
