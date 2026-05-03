/** 준비 중 페이지 */
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="py-16 text-center text-muted">
      <p className="text-4xl mb-4">🚧</p>
      <p className="font-medium">{title}</p>
      <p className="text-sm mt-2">준비 중입니다</p>
    </div>
  );
}

/** 단계 번호 뱃지 */
export function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
        {n}
      </span>
      <span className="font-semibold">{label}</span>
    </div>
  );
}

/** 행렬/벡터 시각화 */
export function Matrix({
  data,
  label,
  color = "default",
}: {
  data: (number | string)[][];
  label?: string;
  color?: "default" | "blue" | "green" | "orange" | "purple";
}) {
  const colors = {
    default: "border-sidebar-border bg-sidebar-bg",
    blue:    "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950",
    green:   "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950",
    orange:  "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950",
    purple:  "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950",
  };

  return (
    <div className="inline-flex flex-col items-center gap-1">
      {label && <span className="text-xs text-muted font-mono">{label}</span>}
      <div className={`rounded-lg border p-3 font-mono text-sm ${colors[color]}`}>
        {data.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((cell, j) => (
              <span key={j} className="w-12 text-right">
                {typeof cell === "number" ? cell.toFixed(2) : cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 화살표 연산자 */
export function Arrow({ op }: { op?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 text-muted">
      {op && <span className="text-xs mb-1">{op}</span>}
      <span className="text-lg">→</span>
    </div>
  );
}

/** 계산 단계 박스
 *  AutoSectionComment가 <section><h2> 패턴을 찾아 의견 버튼을 주입하므로
 *  CalcBox는 의도적으로 section + h2로 마크업한다.
 *  h2 기본 폰트 크기를 무력화하기 위해 text-base를 명시. */
export function CalcBox({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <section className="rounded-xl border border-sidebar-border bg-sidebar-bg p-5 mb-6">
      {title && <h2 className="text-base font-semibold mb-3 text-accent">{title}</h2>}
      {children}
    </section>
  );
}

/** 인사이트 박스 */
export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-accent bg-accent-light px-5 py-4 mb-6 text-sm leading-relaxed">
      💡 {children}
    </div>
  );
}
