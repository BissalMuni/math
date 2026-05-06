"use client";

import { InlineMath } from "@/components/math/math-formula";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅱ. 위상 변조(PSK) */
export default function PhaseModulationContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        현대 통신의 핵심인 위상 변조(Phase Shift Keying)를 다룹니다.
        sin과 cos의 관계가 직교 변조의 기초입니다.
      </p>

      <CalcBox title="■ 위상(Phase)이란">
        <p className="text-sm mb-3">
          파동이 &ldquo;어디서부터 시작하는가&rdquo;를 나타냅니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`sin (0°)    0에서 시작해서 올라감   /\\/\\/\\
cos (90°)   봉우리에서 시작          \\/\\/\\/

같은 파동인데 90도 어긋난 관계`}</pre>
        </div>
      </CalcBox>

      <CalcBox title="■ 위상 변조(PSK) 원리">
        <SubSection title="● BPSK — 2가지 위상">
          <p className="text-sm mb-2">파동을 뒤집어서 0과 1을 구분합니다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`0 → /\\/\\  (정방향)
1 → \\/\\/  (180도 뒤집기)

파동 1번에 1비트`}</pre>
          </div>
        </SubSection>
        <SubSection title="● QPSK — 4가지 위상">
          <p className="text-sm mb-2">위상을 4단계로 나누면 파동 1번에 2비트를 담을 수 있습니다.</p>
          <div className="text-sm space-y-1">
            <p>• 0° → 00</p>
            <p>• 90° → 01</p>
            <p>• 180° → 10</p>
            <p>• 270° → 11</p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ Keying vs Modulation">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">용어</th>
                <th className="px-3 py-2 text-left">대상</th>
                <th className="px-3 py-2 text-left">의미</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2">Modulation</td><td className="px-3 py-2">아날로그 신호</td><td className="px-3 py-2">연속적 변형</td></tr>
              <tr><td className="px-3 py-2">Keying</td><td className="px-3 py-2">디지털 신호</td><td className="px-3 py-2">딱 떨어지는 전환</td></tr>
            </tbody>
          </table>
        </div>
        <SubSection title="● Keying의 어원">
          <p className="text-sm mb-2">
            전신(모스부호) 시대에 Key(키)를 눌러 ON/OFF하던 행위에서 유래했습니다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`전신 Key   →  누름/안누름  →  ON/OFF  →  1/0
디지털도 결국 1과 0
→ "Key를 누르듯 신호를 전환한다"`}</pre>
          </div>
        </SubSection>
        <Insight>
          &ldquo;키 하나에 딱 떨어지는 값&rdquo; — 이것은 본질적으로 양자(量子)적 개념입니다.
          문자도 A는 A, B는 B — 중간이 없는 불연속적(디지털) 존재입니다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ sin과 cos의 직교성">
        <p className="text-sm mb-3">
          sin과 cos는 90도 어긋나 있어서 서로 간섭을 안 합니다.
          같은 주파수인데 동시에 두 채널로 쓸 수 있습니다.
        </p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
          <pre>{`sin에 데이터 실고    (I채널)
cos에 데이터 실고    (Q채널)
동시에 같이 보냄

→ 같은 주파수로 두 배 데이터 전송`}</pre>
        </div>
        <p className="text-sm text-muted mt-3">
          이것이 QAM의 Q — <strong>Quadrature</strong>(직교)의 의미입니다.
        </p>
      </CalcBox>
    </div>
  );
}
