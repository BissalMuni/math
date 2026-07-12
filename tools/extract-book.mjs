// extract-book.mjs — 책 하나(book-generic)를 소스로 추출한다.
//   장(章)=롱폼, 리프=순서 있는 단편. 리프 .tsx 를 vite SSR 로 렌더해
//   ① 정제 본문(산문) ② 계산된 SVG 다이어그램(자산) ③ 수식 LaTeX 를 뽑는다.
//   출력: _book_out/<book>/manifest.json + _book_out/<book>/svg/<leaf>-<n>.svg
//
// 사용:  node tools/extract-book.mjs [bookId]   (기본 ai-memory)
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const BOOK = process.argv[2] || "ai-memory";

// ── vite (pnpm transitive) 를 스토어에서 직접 로드 ──────────────────────────
function findVite() {
  const store = path.join(ROOT, "node_modules/.pnpm");
  const dir = fs.readdirSync(store).find((d) => d.startsWith("vite@"));
  if (!dir) throw new Error("vite 를 node_modules/.pnpm 에서 못 찾음");
  return path.join(store, dir, "node_modules/vite/dist/node/index.js");
}

// ── 본문 HTML → 구조 있는 산문 ──────────────────────────────────────────────
function htmlToProse(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, "")            // SVG 는 따로 자산화
    .replace(/<li[^>]*>/g, "\n• ")
    .replace(/<\/(p|h1|h2|h3|h4|li|div|section)>/g, "\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean)
    .join("\n");
}

// ── 소스에서 수식 LaTeX 추출 (math-formula 는 client-only → SSR 빈칸) ────────
function extractFormulas(src) {
  const out = [];
  // math="..."  |  math={"..."}  |  math={`...`}
  const re = /\bmath=(?:"([^"]*)"|\{"([^"]*)"\}|\{`([^`]*)`\})/g;
  let m;
  while ((m = re.exec(src))) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

async function main() {
  const bookPath = path.join(ROOT, "src/book/data", `${BOOK}.json`);
  if (!fs.existsSync(bookPath)) throw new Error(`책 트리 없음: ${bookPath}`);
  const book = JSON.parse(fs.readFileSync(bookPath, "utf-8"));
  const base = book.basePath || BOOK;

  const outDir = path.join(ROOT, "_book_out", BOOK);
  const svgDir = path.join(outDir, "svg");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(svgDir, { recursive: true });

  const { createServer } = await import(pathToFileURL(findVite()).href);
  const react = require("@vitejs/plugin-react");
  const server = await createServer({
    root: ROOT, configFile: false, logLevel: "error", appType: "custom",
    server: { middlewareMode: true },
    plugins: [(react.default || react)()],
    resolve: { alias: { "@": path.join(ROOT, "src") } },
  });

  const chapters = [];
  let nLeaf = 0, nStub = 0, nSvg = 0;

  const topChildren = book.children || [];
  for (let ci = 0; ci < topChildren.length; ci++) {
    const ch = topChildren[ci];
    const leaves = [];
    const kids = ch.children || [];
    for (let li = 0; li < kids.length; li++) {
      const leaf = kids[li];
      const rel = `src/content/${base}/${ch.slug}/${leaf.slug}.tsx`;
      const abs = path.join(ROOT, rel);
      const rec = {
        id: leaf.id, slug: leaf.slug, title: leaf.title,
        order_in_chapter: li + 1, tsx: rel,
        stub: false, prose: "", chars: 0, svgs: [], formulas: [],
      };
      if (!fs.existsSync(abs)) {
        rec.stub = true; nStub++; leaves.push(rec); continue;
      }
      try {
        const src = fs.readFileSync(abs, "utf-8");
        const mod = await server.ssrLoadModule("/" + rel);
        const html = renderToStaticMarkup(createElement(mod.default));
        const prose = htmlToProse(html);
        const svgBlocks = html.match(/<svg[\s\S]*?<\/svg>/g) || [];
        // ComingSoon 스텁 판정: 본문 빈약 + SVG 없음
        if (prose.replace(/\s/g, "").length < 40 && svgBlocks.length === 0) {
          rec.stub = true; nStub++; leaves.push(rec); continue;
        }
        rec.prose = prose;
        rec.chars = prose.replace(/\s/g, "").length;
        rec.formulas = extractFormulas(src);
        svgBlocks.forEach((svg, i) => {
          const name = `${ch.slug}__${leaf.slug}-${i + 1}.svg`;
          // React SSR SVG 엔 xmlns 가 없어 <img>/래스터로는 렌더 안 됨 — 주입해 독립 파일로.
          if (!/xmlns=/.test(svg.slice(0, 200)))
            svg = svg.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
          fs.writeFileSync(path.join(svgDir, name), svg, "utf-8");
          rec.svgs.push(`svg/${name}`);
          nSvg++;
        });
        nLeaf++;
        console.log(`  ✓ ${ch.slug}/${leaf.slug}  ${rec.chars}자 · svg ${rec.svgs.length} · 수식 ${rec.formulas.length}`);
      } catch (e) {
        rec.error = String(e.message || e);
        console.error(`  ✗ ${rel}\n    ${rec.error.split("\n")[0]}`);
      }
      leaves.push(rec);
    }
    chapters.push({
      id: ch.id, slug: ch.slug, title: ch.title,
      chapter_order: ci + 1, leaf_count: leaves.length, leaves,
    });
  }

  await server.close();

  const manifest = {
    book: BOOK, base, title: book.title, description: book.description || "",
    chapter_count: chapters.length, leaf_total: nLeaf + nStub,
    leaf_ready: nLeaf, leaf_stub: nStub, svg_total: nSvg,
    generated_from: rel_root(), chapters,
  };
  fs.writeFileSync(path.join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\n[완료] ${BOOK} — 장 ${chapters.length} · 리프 ${nLeaf}(+스텁 ${nStub}) · SVG ${nSvg}`);
  console.log(`  → ${path.relative(ROOT, path.join(outDir, "manifest.json"))}`);
}

function rel_root() { return "math"; }

main().catch((e) => { console.error(e.stack || e); process.exit(1); });
