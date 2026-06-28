"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/* ─────────────────────────────────────────────────────────────
   7개 장 메타 — 사슬 순서대로
───────────────────────────────────────────────────────────── */
const CHAPTERS = [
  {
    ch: "1장",
    label: "개념",
    color: "#6366f1",
    brief: "토큰 공장이란",
    detail: "AI 팩토리/토큰 공장 개념, 이 책의 7개 장 사슬. ← 지금 여기.",
    isCurrent: true,
  },
  {
    ch: "2장",
    label: "컴퓨트",
    color: "#0ea5e9",
    brief: "토큰을 생산하는 심장",
    detail:
      "GPU·AI 가속기(Hopper/Blackwell 계열, AMD MI, 구글 TPU), 서버·랙 빌딩블록, 노드 내 NVLink·노드 간 InfiniBand/이더넷 인터커넥트, 스토리지 계층.",
    isCurrent: false,
  },
  {
    ch: "3장",
    label: "전력",
    color: "#f59e0b",
    brief: "돌리는 전기",
    detail:
      "전력 수요(MW~GW)·PUE 개념, 계통 연결 병목·154/345kV 수전, 변전소·UPS·비상발전, 전력구매계약(PPA)·입지 선정.",
    isCurrent: false,
  },
  {
    ch: "4장",
    label: "발전",
    color: "#10b981",
    brief: "전기의 원천",
    detail:
      "태양광·풍력·ESS와 24/7 무탄소 매칭, SMR 소형모듈원자로(분산·안정 기저부하), 핵융합의 잠재력(상용화 미정), 전력믹스 트레이드오프.",
    isCurrent: false,
  },
  {
    ch: "5장",
    label: "냉각",
    color: "#06b6d4",
    brief: "물과 열 관리",
    detail:
      "전기→열 보존, 고밀도 랙의 열 문제, 공랭 한계 → 직접칩냉각(D2C)·액침, 냉각탑 물 사용(WUE), 폐열 재활용·ESG.",
    isCurrent: false,
  },
  {
    ch: "6장",
    label: "네트워크",
    color: "#8b5cf6",
    brief: "토큰의 유통",
    detail:
      "데이터센터 간 DCI·장거리 광백본, 해저 케이블(대륙 간 전송), 엣지·CDN으로 사용자까지 최단 경로.",
    isCurrent: false,
  },
  {
    ch: "7장",
    label: "공급망",
    color: "#ec4899",
    brief: "누가 무엇을 만드나",
    detail:
      "변압기·스위치기어·UPS·CDU·냉각탑·트랜시버·케이블 등 핵심 설비 지도, 반도체·전력기기·냉각·네트워크 밸류체인, 한국의 AI 데이터센터 전략.",
    isCurrent: false,
  },
];

/* ─────────────────────────────────────────────────────────────
   7장 수평 사슬 SVG
   노드 중심 x: 50, 150, 250, 350, 450, 550, 650
   viewBox: 0 0 700 80
───────────────────────────────────────────────────────────── */
const NODE_CENTERS = [50, 150, 250, 350, 450, 550, 650];
const NODE_W = 72;
const NODE_H = 38;

function ChainFlowSvg({
  active,
  onSelect,
}: {
  active: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <svg
      width="100%"
      viewBox="0 0 700 80"
      style={{ fontFamily: "sans-serif", cursor: "pointer" }}
      aria-label="7개 장 인과 사슬"
    >
      {/* 화살표 */}
      {NODE_CENTERS.slice(0, -1).map((cx, i) => {
        const x1 = cx + NODE_W / 2 + 1;
        const x2 = NODE_CENTERS[i + 1] - NODE_W / 2 - 1;
        const mx = (x1 + x2) / 2;
        return (
          <g key={i}>
            <line x1={x1} y1={40} x2={mx} y2={40} stroke="#94a3b8" strokeWidth={1.5} />
            <polygon points={`${mx},34 ${x2},40 ${mx},46`} fill="#94a3b8" />
          </g>
        );
      })}

      {/* 노드 */}
      {CHAPTERS.map((ch, i) => {
        const cx = NODE_CENTERS[i];
        const isActive = active === i;
        return (
          <g key={ch.ch} onClick={() => onSelect(i)}>
            <rect
              x={cx - NODE_W / 2}
              y={40 - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              fill={isActive ? ch.color : ch.color + "22"}
              stroke={ch.color}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <text
              x={cx}
              y={36}
              textAnchor="middle"
              fontSize={9}
              fill={isActive ? "#fff" : ch.color}
              fontWeight={700}
            >
              {ch.ch}
            </text>
            <text
              x={cx}
              y={48}
              textAnchor="middle"
              fontSize={10}
              fill={isActive ? "#fff" : "#1e293b"}
              fontWeight={500}
            >
              {ch.label}
            </text>
          </g>
        );
      })}

      <text x={350} y={74} textAnchor="middle" fontSize={9} fill="#94a3b8">
        각 장 클릭 → 다루는 내용 확인
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────────────────────── */
export default function AdcAiFactory() {
  const [activeChap, setActiveChap] = useState<number | null>(0);

  const handleSelect = (i: number) => setActiveChap(activeChap === i ? null : i);

  return (
    <div className="space-y-8">
      <p className="text-muted">
        젠슨 황(NVIDIA CEO)은 현대 데이터센터를 <strong>"AI 팩토리"</strong>로 재정의했다.
        반도체 공장(fab)이 칩을 생산하듯, AI 팩토리는 <strong>토큰</strong>을 생산한다.
        이 책은 그 공장이 어떻게 지어지고 돌아가는지 —{" "}
        <em>짓고 → 전기 넣고 → 식히고 → 내보내고 → 누가 만드나</em> — 를 사슬처럼 따라간다.
      </p>

      {/* ── 1. AI 팩토리 개념 ── */}
      <CalcBox title="■ AI 팩토리·토큰 공장이란">
        <SubSection title="● 개념의 전환">
          <p>
            전통적 데이터센터는 <strong>IT 인프라</strong>였다 — 파일을 저장하고, 웹페이지를 서빙하고,
            데이터베이스를 돌리는 곳. 워크로드는 예측 가능하고, 연산량은 비교적 일정했다.
          </p>
          <p className="mt-3">
            AI 추론(inference) 시대는 이 그림을 바꾼다. 사용자가 프롬프트를 입력하는 순간,
            GPU 수천 장이 동시에 돌아 단어 조각(토큰)을 하나씩 생성한다.
            토큰이 공장의 <em>생산물</em>이고, GPU는 <em>기계</em>, 전기는 <em>연료</em>,
            냉각은 <em>열 처리 공정</em>, 네트워크는 <em>물류</em>다.
          </p>
          <p className="mt-3">
            젠슨 황은 2023년 GTC 기조연설에서 이 전환을 공식화했다.
            그 이후 NVIDIA는 "AI Factory"를 차세대 데이터센터의 공식 명칭으로 사용하고 있다.
            개념은 단순하다:{" "}
            <strong>인풋은 전기와 데이터, 아웃풋은 인텔리전스(토큰)</strong>.
          </p>
        </SubSection>

        <SubSection title="● 전통 DC와 AI 팩토리의 차이">
          <p>
            ① <strong>전력 밀도 급증</strong>: 일반 서버 랙은 5–10 kW/rack 수준이었지만,
            GPU 랙은 40–100 kW/rack을 요구하며 차세대 시스템은 그 이상이다.
          </p>
          <p>
            ② <strong>전력 규모 급등</strong>: 하이퍼스케일 AI 클러스터는 단일 단지에서
            수백 MW를 소비한다. 중소 도시 전력 소비에 맞먹는다.
          </p>
          <p>
            ③ <strong>냉각 방식 전환</strong>: 공기만으로는 GPU 열을 감당할 수 없어,
            직접칩냉각(D2C)·액침(Immersion) 방식으로 이행 중이다.
          </p>
          <p>
            ④ <strong>공급망 병목</strong>: 고압 변압기·스위치기어 등 전력 설비의 납기가
            1–2년 이상 늘어, 부지 확보만큼 부품 확보가 핵심 과제가 됐다.
          </p>
        </SubSection>

        <Insight>
          AI 팩토리는 단순 서버실이 아니라{" "}
          <strong>전력·냉각·부품 공급망</strong>까지 포함하는 복합 인프라 시스템이다.
          이 사슬의 어느 고리 하나가 끊겨도 토큰 생산은 멈춘다.
        </Insight>
      </CalcBox>

      {/* ── 2. 7개 장 사슬 ── */}
      <CalcBox title="■ 토큰 생산 사슬 — 이 책의 7개 장">
        <p className="mb-4 text-muted">
          이 책은 데이터센터가 탄생하고 운영되는 인과 사슬을 7개 장으로 따른다.
          아래 다이어그램의 각 장을 클릭하면 무엇을 다루는지 볼 수 있다.
        </p>

        <ChainFlowSvg active={activeChap} onSelect={handleSelect} />

        {activeChap !== null && (
          <div
            className="mt-4 rounded-xl border-2 p-4 transition-all"
            style={{
              borderColor: CHAPTERS[activeChap].color,
              backgroundColor: CHAPTERS[activeChap].color + "12",
            }}
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: CHAPTERS[activeChap].color }}
              >
                {CHAPTERS[activeChap].ch}
              </span>
              <span className="font-semibold">{CHAPTERS[activeChap].label}</span>
              <span className="text-sm text-muted">— {CHAPTERS[activeChap].brief}</span>
              {CHAPTERS[activeChap].isCurrent && (
                <span className="ml-auto text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">
                  지금 여기
                </span>
              )}
            </div>
            <p className="text-sm">{CHAPTERS[activeChap].detail}</p>
          </div>
        )}

        <Insight>
          사슬은 순환하지 않고 선형이다. GPU(2장)를 돌리려면 전기(3장)가 있어야 하고,
          그 전기는 어딘가서 발전(4장)된다. 모든 열은 냉각(5장)이 처리하고,
          생산된 토큰은 네트워크(6장)가 배달한다. 이 모든 장비는 공급망(7장)에서 온다.
        </Insight>
      </CalcBox>

      {/* ── 3. 한국의 AI 데이터센터 붐 ── */}
      <CalcBox title="■ 한국의 AI 데이터센터 붐">
        <SubSection title="● 정부·정책 방향">
          <p>
            한국 정부(과학기술정보통신부)는 AI 인프라 확충을 국가 전략으로 추진 중이다.
            국가AI컴퓨팅센터 구축, K-Cloud 사업을 통한 공공 AI 자원 확대,
            민간 AI 데이터센터 투자 유치를 위한 입지·전력 지원 방안 등이 정책 패키지로 논의된다.
          </p>
          <p className="mt-2">
            전력망 제약 완화, 비수도권 AI 특화 단지 조성, 재생에너지 연계 인센티브 등이 함께 검토된다.
            다만 수도권 집중과 계통 포화라는 구조적 병목은 단기 해결이 쉽지 않다.
          </p>
        </SubSection>

        <SubSection title="● 기업 투자와 전략적 위치">
          <p>
            ① <strong>국내 빅테크·통신사</strong>: 네이버·카카오·SK텔레콤·KT 등이
            AI 데이터센터 신·증축 계획을 발표하고 있다.
          </p>
          <p>
            ② <strong>글로벌 하이퍼스케일러</strong>: Microsoft·Google·Amazon 등도 한국 투자를
            확대하는 추세다. 안정적 인터넷 인프라와 높은 IT 인재 밀도가 강점이다.
          </p>
          <p>
            ③ <strong>반도체 연계 기회</strong>: 삼성전자·SK하이닉스의 HBM 생산 능력은
            AI 데이터센터 메모리 수요와 직결된다.
            "AI 팩토리를 짓는 나라이면서 그 핵심 부품(HBM)을 만드는 나라"라는 독특한 위치가
            한국의 전략적 기회다.
          </p>
          <p>
            ④ <strong>구조적 과제</strong>: 수도권 전력망 포화, 변압기 납기 장기화,
            재생에너지 비중 제약 등이 투자 속도를 늦추는 요인이다.
          </p>
        </SubSection>

        <Insight>
          AI 데이터센터는 단순 IT 인프라가 아니라 <strong>국가 경쟁력</strong>이다.
          전기·물·토지·반도체·광케이블 — 모든 자원이 집결되는 이 공장을
          어디에, 어떻게 짓느냐가 AI 시대 주도권을 좌우한다.
        </Insight>
      </CalcBox>
    </div>
  );
}
