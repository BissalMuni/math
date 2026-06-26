"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 개요 — 이 책의 목적과 연구 항목 추가 방법 */
export default function AiResearchOverview() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        이 책은 <span className="font-medium">AI 최신 연구 결과·논문·기사</span>를 읽고 정리·축적하는 연구 노트다.
      </p>
      <p className="text-muted mb-8">
        하나의 연구 주제(논문·기사·실험)를 하나의 소단원(leaf)으로 만들어 계속 쌓아간다.
      </p>

      <CalcBox title="■ 이 책의 목적">
        <SubSection title="● 무엇을 담는가">
          <p className="text-sm">① 새로 발표된 논문의 핵심 아이디어·실험 결과 요약</p>
          <p className="text-sm">② 주요 AI 기업·연구소의 기술 기사·릴리스 노트</p>
          <p className="text-sm">③ 직접 읽고 검증한 내용과 개인적 해석·메모</p>
        </SubSection>

        <SubSection title="● 다른 책과의 차이">
          <p className="text-sm">
            <span className="font-medium">LLM</span> 책이 트랜스포머의 정적인 원리를 다룬다면, 이 책은 <span className="font-medium">시시각각 바뀌는 최신 동향</span>을 시점별로 누적한다.
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ 연구 항목 추가 방법">
        <p className="text-sm mb-3">
          새 연구 주제가 생기면 평평한(flat) 구조에 leaf 하나를 더한다.
        </p>
        <SubSection title="● 절차">
          <p className="text-sm">① <code>src/book/data/ai-research.json</code>의 <code>children</code>에 노드 추가 (<code>id</code>·<code>slug</code>·<code>title</code>)</p>
          <p className="text-sm">② <code>src/content/ai-research/&lt;slug&gt;.tsx</code> 콘텐츠 파일 작성</p>
          <p className="text-sm">③ 제목 형식: 트리 title은 <code>Ⅰ. Ⅱ. Ⅲ.</code> 로마자 번호 사용</p>
        </SubSection>

        <Insight>
          관리자 UI(<code>/admin/structure</code>)의 구조 편집 탭에서도 노드를 추가할 수 있다. 콘텐츠 파일이 아직 없으면 &quot;준비 중&quot;으로 표시된다.
        </Insight>
      </CalcBox>
    </div>
  );
}
