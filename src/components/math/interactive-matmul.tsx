"use client";

import { useEffect, useRef, useState } from "react";

type ColorKey =
  | "gray" | "blue" | "orange" | "green"
  | "purple" | "teal" | "yellow" | "red";

const LABEL_COLOR: Record<ColorKey, string> = {
  gray: "#8b949e", blue: "#58a6ff", orange: "#ffa657", green: "#3fb950",
  purple: "#bc8cff", teal: "#39d0d8", yellow: "#e3b341", red: "#ff7b72",
};

const TINT_CLASS: Record<ColorKey, { border: string; bg: string; hl: string; cell: string }> = {
  gray:   { border: "#30363d", bg: "#161b22", hl: "#2a2f3a", cell: "#e6edf3" },
  blue:   { border: "#2a4a7f", bg: "#161b22", hl: "#1f3a5f", cell: "#79c0ff" },
  orange: { border: "#7a4800", bg: "#161b22", hl: "#3d2800", cell: "#ffc07a" },
  green:  { border: "#1e5c2e", bg: "#161b22", hl: "#1a3a24", cell: "#7de08a" },
  purple: { border: "#5a3a90", bg: "#161b22", hl: "#2d1f4a", cell: "#d4aaff" },
  teal:   { border: "#1a6068", bg: "#161b22", hl: "#0d3035", cell: "#70e8ee" },
  yellow: { border: "#7a5e00", bg: "#161b22", hl: "#3d2e00", cell: "#f0cc70" },
  red:    { border: "#7a2e2a", bg: "#161b22", hl: "#3d1a18", cell: "#ff9e98" },
};

function fmt(v: number) { return (v >= 0 ? " " : "") + v.toFixed(2); }

function matmul(A: number[][], B: number[][]): number[][] {
  const m = A.length, k = A[0].length, n = B[0].length;
  const C = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      for (let p = 0; p < k; p++)
        C[i][j] += A[i][p] * B[p][j];
  return C;
}

export function transposeMat(M: number[][]): number[][] {
  const r = M.length, c = M[0].length;
  return Array.from({ length: c }, (_, i) =>
    Array.from({ length: r }, (_, j) => M[j][i])
  );
}

export interface InteractiveMatmulProps {
  matA: number[][];
  matB: number[][];
  aLabel: string;
  bLabel: string;
  cLabel: string;
  aColor?: ColorKey;
  bColor?: ColorKey;
  cColor?: ColorKey;
  ballAColor?: string;
  ballBColor?: string;
  divisor?: number;
  divisorLabel?: string;
  /** 위젯 외곽 색상 (border) — 기본은 cColor와 동일 */
  borderColor?: ColorKey;
}

export function InteractiveMatmul({
  matA, matB, aLabel, bLabel, cLabel,
  aColor = "gray", bColor = "gray", cColor = "blue",
  ballAColor = "#4a90d9", ballBColor = "#3fb950",
  divisor, divisorLabel = "",
  borderColor,
}: InteractiveMatmulProps) {
  const m = matA.length;
  const k = matA[0].length;
  const n = matB[0].length;
  const matC = matmul(matA, matB).map(row =>
    row.map(v => (divisor ? v / divisor : v))
  );
  const TOTAL = m * n;
  const accentColor = LABEL_COLOR[cColor];
  const borderStyle = LABEL_COLOR[borderColor ?? cColor];

  // SSR-safe unique ID for SVG filter defs
  const uid = useRef(`im-${Math.random().toString(36).slice(2, 9)}`);

  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const calcRef = useRef<HTMLDivElement>(null);

  const [curIdx, setCurIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const curIdxRef = useRef(curIdx);
  curIdxRef.current = curIdx;

  const timersRef = useRef<number[]>([]);
  const framesRef = useRef<number[]>([]);

  function killAll() {
    timersRef.current.forEach(id => clearTimeout(id));
    timersRef.current = [];
    framesRef.current.forEach(id => cancelAnimationFrame(id));
    framesRef.current = [];
  }
  function later(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }

  function setHL(row: number, col: number) {
    const root = rootRef.current; if (!root) return;
    root.querySelectorAll<HTMLElement>(".im-mat-a .im-cell").forEach(c => {
      const hit = +c.dataset.r! === row;
      c.style.background = hit ? TINT_CLASS[aColor].hl : "#1c2128";
      c.style.color = hit ? TINT_CLASS[aColor].cell : "#c9d1d9";
    });
    root.querySelectorAll<HTMLElement>(".im-mat-b .im-cell").forEach(c => {
      const hit = +c.dataset.c! === col;
      c.style.background = hit ? TINT_CLASS[bColor].hl : "#1c2128";
      c.style.color = hit ? TINT_CLASS[bColor].cell : "#c9d1d9";
    });
    root.querySelectorAll<HTMLElement>(".im-mat-c .im-cell").forEach(c => {
      const active = +c.dataset.r! === row && +c.dataset.c! === col;
      c.style.background = active ? TINT_CLASS[cColor].hl : "#1c2128";
      c.style.color = active ? "#fff" : accentColor;
      c.style.boxShadow = active ? `0 0 8px ${accentColor}aa` : "";
    });
  }

  function runPhase(
    segs: { x1: number; y1: number; x2: number; y2: number; color: string }[],
    svg: SVGSVGElement,
    onDone: () => void
  ) {
    const SPEED = 0.026;
    const balls = segs.map(s => {
      const trail = document.createElementNS("http://www.w3.org/2000/svg", "line");
      trail.setAttribute("stroke", s.color);
      trail.setAttribute("stroke-width", "2.5");
      trail.setAttribute("stroke-linecap", "round");
      trail.setAttribute("opacity", "0");
      svg.appendChild(trail);
      const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ball.setAttribute("r", "4");
      ball.setAttribute("fill", s.color);
      ball.setAttribute("opacity", "0");
      ball.setAttribute("filter", s.color === ballAColor ? `url(#gb-${uid.current})` : `url(#gg-${uid.current})`);
      svg.appendChild(ball);
      return { ball, trail, ...s, t: 0, done: false };
    });

    function tick() {
      let alive = false;
      balls.forEach(b => {
        if (b.done) return;
        b.t = Math.min(b.t + SPEED, 1);
        const cx = b.x1 + (b.x2 - b.x1) * b.t;
        const cy = b.y1 + (b.y2 - b.y1) * b.t;
        const tT = Math.max(0, b.t - 0.22);
        const tx = b.x1 + (b.x2 - b.x1) * tT;
        const ty = b.y1 + (b.y2 - b.y1) * tT;
        b.ball.setAttribute("cx", String(cx));
        b.ball.setAttribute("cy", String(cy));
        b.ball.setAttribute("opacity", b.t >= 1 ? "0" : "1");
        b.trail.setAttribute("x1", String(tx));
        b.trail.setAttribute("y1", String(ty));
        b.trail.setAttribute("x2", String(cx));
        b.trail.setAttribute("y2", String(cy));
        b.trail.setAttribute("opacity", b.t >= 1 ? "0" : "0.6");
        if (b.t >= 1) b.done = true; else alive = true;
      });
      if (alive) {
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      } else {
        later(onDone, 120);
      }
    }
    const id = requestAnimationFrame(tick);
    framesRef.current.push(id);
  }

  function showCalcAnimated(row: number, col: number, onDone?: () => void) {
    const aRow = matA[row];
    const bCol = matB.map(r => r[col]);
    const terms = aRow.map((v, i) => ({ x: v, w: bCol[i], prod: v * bCol[i] }));
    const sum = terms.reduce((s, t) => s + t.prod, 0);
    const result = divisor ? sum / divisor : sum;
    const panel = calcRef.current; if (!panel) return;
    const aName = aLabel.split(" ")[0];
    const bName = bLabel.split(" ")[0];
    const cName = cLabel.split(" ")[0];

    panel.innerHTML = `
      <div style="color:#f0883e;font-size:0.78rem;margin-bottom:6px;">
        ${cName}[${row}][${col}] = ${aName}[${row}행] · ${bName}[${col}열]${divisor ? ` ${divisorLabel}` : ""} = <span style="color:#fff">${result.toFixed(2)}</span>
      </div>
      <div class="im-eq-terms" style="display:flex;flex-wrap:wrap;align-items:center;line-height:2;"></div>
      <div class="im-eq-sum" style="display:flex;flex-wrap:wrap;align-items:center;line-height:2;"></div>`;

    const termsEl = panel.querySelector(".im-eq-terms") as HTMLElement;
    const sumEl = panel.querySelector(".im-eq-sum") as HTMLElement;

    const termSpans = terms.map((t, i) => {
      const sp = document.createElement("span");
      sp.style.cssText = "display:inline-flex;align-items:center;opacity:0;transition:opacity 0.3s;";
      sp.innerHTML =
        `<span style="color:#79c0ff;">${fmt(t.x)}</span>` +
        `<span style="color:#8b949e;margin:0 2px;">×</span>` +
        `<span style="color:#7ee787;">${fmt(t.w)}</span>` +
        (i < terms.length - 1 ? `<span style="color:#8b949e;margin:0 2px;"> + </span>` : "");
      termsEl.appendChild(sp);
      return sp;
    });

    sumEl.innerHTML = '<span style="color:#8b949e;margin-right:4px;">= </span>';
    const sumSpans = terms.map((t, i) => {
      const sp = document.createElement("span");
      sp.style.cssText = "display:inline-flex;align-items:center;opacity:0;transition:opacity 0.3s;";
      sp.innerHTML =
        `<span style="color:#e6edf3;">${fmt(t.prod)}</span>` +
        (i < terms.length - 1 ? `<span style="color:#8b949e;margin:0 2px;"> + </span>` : "");
      sumEl.appendChild(sp);
      return sp;
    });
    const resSpan = document.createElement("span");
    resSpan.style.cssText = "opacity:0;transition:opacity 0.35s;color:#8b949e;margin-left:4px;";
    resSpan.innerHTML = divisor
      ? ` = <span style="color:#e6edf3;">${sum.toFixed(2)}</span> ${divisorLabel} = <span style="color:#f0883e;font-weight:bold;font-size:0.85rem;">${result.toFixed(2)}</span>`
      : ` = <span style="color:#f0883e;font-weight:bold;font-size:0.85rem;">${sum.toFixed(2)}</span>`;
    sumEl.appendChild(resSpan);

    const ITEM_MS = Math.max(50, Math.round(560 / k));
    terms.forEach((_, i) => {
      later(() => {
        termSpans[i].style.opacity = "1";
        sumSpans[i].style.opacity = "1";
        if (i === terms.length - 1) {
          later(() => {
            resSpan.style.opacity = "1";
            if (onDone) later(onDone, 700);
          }, 300);
        }
      }, i * ITEM_MS);
    });
  }

  function runStep(idx: number, onDone?: () => void) {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;
    const row = Math.floor(idx / n);
    const col = idx % n;
    setHL(row, col);

    svg.innerHTML = "";
    const viz = root.querySelector(".im-viz") as HTMLElement;
    const vR = viz.getBoundingClientRect();

    const aCells = [...root.querySelectorAll<HTMLElement>(".im-mat-a .im-cell")].filter(c => +c.dataset.r! === row);
    const bCells = [...root.querySelectorAll<HTMLElement>(".im-mat-b .im-cell")].filter(c => +c.dataset.c! === col);
    const cCell = [...root.querySelectorAll<HTMLElement>(".im-mat-c .im-cell")].find(c => +c.dataset.r! === row && +c.dataset.c! === col);
    if (!cCell) return;

    const cR = cCell.getBoundingClientRect();
    const cMx = cR.left - vR.left + cR.width / 2;
    const cMy = cR.top - vR.top + cR.height / 2;

    const phase0: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    const phase1: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    aCells.forEach((ac, i) => {
      const aR = ac.getBoundingClientRect();
      const bc = bCells[i]; if (!bc) return;
      const bR = bc.getBoundingClientRect();
      phase0.push({
        x1: aR.right - vR.left, y1: aR.top - vR.top + aR.height / 2,
        x2: bR.left - vR.left, y2: bR.top - vR.top + bR.height / 2,
        color: ballAColor,
      });
      phase1.push({
        x1: bR.right - vR.left, y1: bR.top - vR.top + bR.height / 2,
        x2: cMx, y2: cMy, color: ballBColor,
      });
    });

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <filter id="gb-${uid.current}" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="gg-${uid.current}" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>`;
    svg.appendChild(defs);

    [...phase0, ...phase1].forEach(s => {
      const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
      (["x1", "y1", "x2", "y2"] as const).forEach(a => ln.setAttribute(a, String(s[a])));
      ln.setAttribute("stroke", s.color);
      ln.setAttribute("stroke-width", "1");
      ln.setAttribute("opacity", "0.11");
      svg.appendChild(ln);
    });

    const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ring.setAttribute("cx", String(cMx));
    ring.setAttribute("cy", String(cMy));
    ring.setAttribute("r", "8");
    ring.setAttribute("fill", "none");
    ring.setAttribute("stroke", accentColor);
    ring.setAttribute("stroke-width", "2");
    svg.appendChild(ring);

    runPhase(phase0, svg, () => {
      runPhase(phase1, svg, () => { /* done */ });
      showCalcAnimated(row, col, onDone);
    });
  }

  function playNext() {
    if (!playingRef.current) return;
    runStep(curIdxRef.current, () => {
      if (!playingRef.current) return;
      later(() => {
        curIdxRef.current = (curIdxRef.current + 1) % TOTAL;
        setCurIdx(curIdxRef.current);
        playNext();
      }, 300);
    });
  }

  // 마운트 시 자동 시작 + 언마운트 시 정리
  useEffect(() => {
    const t = later(playNext, 500);
    return () => {
      clearTimeout(t);
      killAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 진행 도트
  const dots = Array.from({ length: TOTAL }, (_, i) => i);

  return (
    <div
      ref={rootRef}
      style={{
        background: "linear-gradient(135deg, #0f1419, #131820)",
        border: `1px dashed ${borderStyle}`,
        borderRadius: "10px",
        padding: "14px",
        margin: "12px 0",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        color: "#e6edf3",
      }}
    >
      {/* 컨트롤 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => {
            const next = !playing;
            setPlaying(next);
            playingRef.current = next;
            if (next) { killAll(); playNext(); } else killAll();
          }}
          style={btnStyle}
        >{playing ? "⏸ 일시정지" : "▶ 재생"}</button>
        <button
          onClick={() => {
            killAll();
            setPlaying(false); playingRef.current = false;
            const next = (curIdxRef.current - 1 + TOTAL) % TOTAL;
            curIdxRef.current = next; setCurIdx(next);
            runStep(next);
          }}
          style={btnStyle}
        >◀ 이전</button>
        <button
          onClick={() => {
            killAll();
            setPlaying(false); playingRef.current = false;
            const next = (curIdxRef.current + 1) % TOTAL;
            curIdxRef.current = next; setCurIdx(next);
            runStep(next);
          }}
          style={btnStyle}
        >다음 ▶</button>
        <span style={{ fontSize: "0.7rem", color: "#8b949e" }}>진행:</span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 160 }}>
          {dots.map(i => (
            <div
              key={i}
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i < curIdx ? "#3fb950" : i === curIdx ? "#58a6ff" : "#30363d",
                boxShadow: i === curIdx ? "0 0 5px #58a6ff" : "none",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* 시각화 영역 */}
      <div className="im-viz" style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 4, overflowX: "auto" }}>
        <svg ref={svgRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 100, overflow: "visible" }} />
        <MatrixGrid data={matA} label={aLabel} color={aColor} className="im-mat-a" />
        <div style={opStyle}>×</div>
        <MatrixGrid data={matB} label={bLabel} color={bColor} className="im-mat-b" />
        <div style={opStyle}>{divisor ? `${divisorLabel}=` : "="}</div>
        <MatrixGrid
          data={matC}
          label={cLabel}
          color={cColor}
          className="im-mat-c"
          accentColor={accentColor}
          onCellClick={(r, c) => {
            killAll();
            setPlaying(false); playingRef.current = false;
            const next = r * n + c;
            curIdxRef.current = next; setCurIdx(next);
            runStep(next);
          }}
        />
      </div>

      {/* 계산식 패널 */}
      <div
        ref={calcRef}
        style={{
          marginTop: 12,
          background: "#161b22",
          border: "1px solid #30363d",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: "0.7rem",
          minHeight: 80,
          lineHeight: 2,
        }}
      >
        <div style={{ color: "#8b949e", textAlign: "center", paddingTop: 18 }}>잠시 후 자동 시작...</div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "#21262d",
  border: "1px solid #30363d",
  color: "#e6edf3",
  padding: "4px 14px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: "0.72rem",
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
};

const opStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  color: "#8b949e",
  alignSelf: "center",
  margin: "18px 6px 0",
  zIndex: 1,
  position: "relative",
};

function MatrixGrid({
  data, label, color, className, accentColor, onCellClick,
}: {
  data: number[][];
  label: string;
  color: ColorKey;
  className: string;
  accentColor?: string;
  onCellClick?: (r: number, c: number) => void;
}) {
  const cols = data[0].length;
  const tint = TINT_CLASS[color];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, position: "relative" }}>
      <div style={{ fontSize: "0.7rem", marginBottom: 4, color: LABEL_COLOR[color] }}>{label}</div>
      <div
        className={className}
        style={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          padding: "8px 10px",
          borderRadius: 8,
          background: tint.bg,
          border: `1px solid ${tint.border}`,
        }}
      >
        {data.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="im-cell"
              data-r={r}
              data-c={c}
              onClick={onCellClick ? () => onCellClick(r, c) : undefined}
              style={{
                fontSize: "0.64rem",
                textAlign: "right",
                padding: "3px 5px",
                borderRadius: 3,
                whiteSpace: "nowrap",
                cursor: onCellClick ? "pointer" : "default",
                minWidth: 38,
                color: accentColor ?? "#c9d1d9",
                background: "#1c2128",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
              }}
            >
              {fmt(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
