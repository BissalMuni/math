import fs from "node:fs";

const files = [
  "src/structure/data/middle-school.json",
  "src/structure/data/high-school.json",
  "src/structure/data/llm-math.json",
  "src/structure/data/llm-learning.json",
];

const romans = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");

  // 1) "title": "N. xxx" → "title": "ROMAN. xxx" (N=1..12, 큰 수부터)
  for (let i = 12; i >= 1; i--) {
    const old = `"title": "${i}. `;
    const neu = `"title": "${romans[i - 1]}. `;
    s = s.split(old).join(neu);
  }

  // 2) Fix broken "title": "Ⅰ.xxx" (no space) → "title": "Ⅰ. xxx"
  for (const r of romans) {
    const re = new RegExp(`"title": "${r}\\.(?! )`, "g");
    s = s.replace(re, `"title": "${r}. `);
  }

  fs.writeFileSync(f, s);
  console.log(`updated: ${f}`);
}
