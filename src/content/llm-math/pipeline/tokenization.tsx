"use client";

import { InlineMath, BlockMath } from "@/components/math/math-formula";
import { CalcBox, SubSection } from "@/components/content/shared";

export default function Tokenization() {
  return (
    <div className="space-y-8">
      <p className="text-muted">텍스트를 토큰(정수 ID) 시퀀스로 변환합니다. BPE(Byte Pair Encoding) 등의 알고리즘을 사용합니다.</p>

      <CalcBox title="집합론 — 어휘집">
        <p>어휘집 <InlineMath math="V = \{t_1, t_2, \ldots, t_n\}" />은 유한 집합입니다. 부분 문자열 집합을 관리합니다.</p>
      </CalcBox>

      <CalcBox title="빈도/확률 — BPE 병합">
        <p>BPE: 가장 빈도 높은 바이트 쌍을 반복 병합합니다.</p>
        <BlockMath math="\text{freq}(a,b) = \frac{\text{count}(ab)}{\text{total}}" />

        <SubSection title="BPE 계산 예제">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-bg p-5">
          <p className="text-sm text-muted mb-2 font-medium">전제</p>
          <ul className="text-sm text-muted mb-4 list-disc pl-5 space-y-1">
            <li>대규모 텍스트(코퍼스)에서 단어별 등장 횟수를 먼저 셉니다.</li>
            <li>아래 숫자는 예시를 위한 가정입니다 — 실제 BPE 훈련에서는 수십억 단어에서 빈도를 집계합니다.</li>
            <li>각 단어를 글자 단위로 쪼갠 뒤, 빈도가 가장 높은 인접 쌍부터 하나씩 병합합니다.</li>
          </ul>
          <p className="text-sm text-muted mb-4">
            코퍼스 등장 횟수(가정): &ldquo;low&rdquo;(5회), &ldquo;lower&rdquo;(2회), &ldquo;newest&rdquo;(6회), &ldquo;widest&rdquo;(3회)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-sidebar-border">
                  <th className="pr-4 pb-2 font-medium">단계</th>
                  <th className="pr-4 pb-2 font-medium">최빈 쌍</th>
                  <th className="pr-4 pb-2 font-medium">빈도</th>
                  <th className="pb-2 font-medium">결과</th>
                </tr>
              </thead>
              <tbody className="text-muted font-mono text-xs">
                <tr className="border-b border-sidebar-border">
                  <td className="pr-4 py-2">초기</td>
                  <td className="pr-4 py-2">—</td>
                  <td className="pr-4 py-2">—</td>
                  <td className="py-2">l o w · l o w e r · n e w e s t · w i d e s t</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="pr-4 py-2">1</td>
                  <td className="pr-4 py-2">(e, s)</td>
                  <td className="pr-4 py-2">9</td>
                  <td className="py-2">l o w · l o w e r · n e w <strong>es</strong> t · w i d <strong>es</strong> t</td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="pr-4 py-2">2</td>
                  <td className="pr-4 py-2">(es, t)</td>
                  <td className="pr-4 py-2">9</td>
                  <td className="py-2">l o w · l o w e r · n e w <strong>est</strong> · w i d <strong>est</strong></td>
                </tr>
                <tr className="border-b border-sidebar-border">
                  <td className="pr-4 py-2">3</td>
                  <td className="pr-4 py-2">(l, o)</td>
                  <td className="pr-4 py-2">7</td>
                  <td className="py-2"><strong>lo</strong> w · <strong>lo</strong> w e r · n e w est · w i d est</td>
                </tr>
                <tr>
                  <td className="pr-4 py-2">4</td>
                  <td className="pr-4 py-2">(lo, w)</td>
                  <td className="pr-4 py-2">7</td>
                  <td className="py-2"><strong>low</strong> · <strong>low</strong> e r · n e w est · w i d est</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-3">
            이 과정을 수만 회 반복하면 GPT의 어휘 사전(~100K 토큰)이 자동 구축됩니다.
          </p>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="조합론 — 시퀀스 경우의 수">
        <p>어휘 크기 <InlineMath math="V" />, 시퀀스 길이 <InlineMath math="T" /> → 가능한 시퀀스 수:</p>
        <BlockMath math="V^T" />
      </CalcBox>

      <CalcBox title="정보이론 — 최적 부호화">
        <p>최적 토큰 길이는 Shannon 부호화 이론을 따릅니다:</p>
        <BlockMath math="\text{최적 길이} \approx -\log_2 P(\text{token})" />
      </CalcBox>

      <CalcBox title="연결고리 — BPE에서 스마트시티까지">
        <p className="text-muted text-sm mb-6">
          토크나이저 하나가 어떻게 정보이론 → 인공지능 → 도시 설계까지 이어지는지 추적합니다.
        </p>

        <div className="space-y-6 text-sm">

          {/* ── 1. BPE 역사 ── */}
          <SubSection title="① BPE의 역사">
            <div className="rounded-lg border border-sidebar-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-accent-light">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium w-16">연도</th>
                    <th className="text-left px-4 py-2 font-medium w-36">인물</th>
                    <th className="text-left px-4 py-2 font-medium">내용</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sidebar-border text-muted">
                  <tr>
                    <td className="px-4 py-2 font-mono">1994</td>
                    <td className="px-4 py-2">Philip Gage</td>
                    <td className="px-4 py-2">BPE 최초 고안 — 파일 데이터 압축용. NLP와 무관.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">2016</td>
                    <td className="px-4 py-2">Rico Sennrich 외 (에든버러대)</td>
                    <td className="px-4 py-2">
                      BPE를 NLP 토크나이저로 최초 적용. 논문{" "}
                      <em>&ldquo;Neural Machine Translation of Rare Words with Subword Units&rdquo;</em>.
                      압축 알고리즘이 희귀 단어 문제 해결에 그대로 쓰임.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">2018</td>
                    <td className="px-4 py-2">Google (SentencePiece)</td>
                    <td className="px-4 py-2">언어에 독립적인 범용 토크나이저로 발전.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">2019</td>
                    <td className="px-4 py-2">OpenAI (GPT-2)</td>
                    <td className="px-4 py-2">바이트 단위로 확장 (Byte-level BPE) — 모든 언어·이모지 처리 가능.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-2 pl-1">
              핵심: 1994년 파일 압축용으로 나온 알고리즘을 Sennrich가 2016년 언어 처리에 전용한 것이 현재 LLM 토크나이저의 기원입니다.
              파일도 텍스트도 결국 <strong>기호의 나열</strong>이라는 점에서 같은 수학이 작동합니다.
            </p>
          </SubSection>

          {/* ── 2. 정보이론의 경과 ── */}
          <SubSection title="② 정보이론의 경과">
            <div className="space-y-3 text-muted">
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1928</span>
                <div>
                  <span className="font-medium text-foreground">Hartley</span> — 정보량의 첫 수학적 정의.
                  선택지가 <InlineMath math="n" />개일 때 정보 <InlineMath math="H = \log n" />.
                  &ldquo;정보 = 선택의 폭&rdquo;이라는 개념을 최초로 수식화.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1948</span>
                <div>
                  <span className="font-medium text-foreground">Shannon</span> — <em>A Mathematical Theory of Communication</em> 발표.
                  확률 기반 엔트로피 <InlineMath math="H = -\sum p_i \log p_i" /> 정의.
                  Shannon은 사람에게 다음 영어 글자를 예측하게 하는 실험으로 &ldquo;영어는 생각보다 훨씬 예측 가능하다(= 압축 가능하다)&rdquo;는 사실을 증명했습니다.
                  또한 <strong>Shannon 한계</strong>로 압축의 이론적 최솟값을 수식으로 제시.
                  LLM 학습 목표인 Cross-Entropy Loss <InlineMath math="H(p,q)=-\sum p\log q" />는 Shannon 엔트로피에 수렴하는 방향입니다.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1965</span>
                <div>
                  <span className="font-medium text-foreground">Kolmogorov</span> — 알고리즘 정보이론(Kolmogorov Complexity).
                  데이터를 재현하는 가장 짧은 프로그램의 길이 = 그 데이터의 정보량.
                  &ldquo;압축 = 이해&rdquo;를 계산 복잡도로 형식화. 패턴이 있으면 짧게 기술 가능하고, 짧게 기술할수록 더 깊이 이해한 것입니다.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1977</span>
                <div>
                  <span className="font-medium text-foreground">Lempel &amp; Ziv</span> — LZ77/LZ78 범용 압축 알고리즘.
                  사전(dictionary)에 반복 패턴을 저장하고 참조로 치환.
                  이 방식은 BPE 어휘집(vocab)과 완전히 같은 발상 — 자주 나오는 패턴을 짧은 코드 하나로 묶는다.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1984</span>
                <div>
                  <span className="font-medium text-foreground">Rissanen</span> — MDL(Minimum Description Length) 원리.
                  데이터를 가장 짧게 기술하는 모델이 가장 좋은 모델.
                  현재 딥러닝의 정규화·과적합 방지 이론의 수학적 근거.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1994</span>
                <div>
                  <span className="font-medium text-foreground">Philip Gage</span> — BPE 데이터 압축 알고리즘 발표.
                  &ldquo;자주 나오는 바이트 쌍을 새 기호로 치환&rdquo; — 정보이론의 압축 원리를 실용 알고리즘으로 구현.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">1994</span>
                <div>
                  <span className="font-medium text-foreground">Schmidhuber</span> — &ldquo;지능은 압축이다(Compression Progress)&rdquo; 공리 제안.
                  에이전트가 세계를 더 짧게 기술할수록 더 지능적이라는 이론.
                  Kolmogorov Complexity를 인공지능 설계 원리로 연결.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">2016</span>
                <div>
                  <span className="font-medium text-foreground">Sennrich et al.</span> — BPE를 NLP에 이식.
                  파일 압축 알고리즘이 언어 모델 어휘 학습에 그대로 전용됨.
                  &ldquo;텍스트도 결국 기호의 나열&rdquo;이라는 통찰의 실용화.
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-accent shrink-0 w-10 pt-0.5">2023~</span>
                <div>
                  <span className="font-medium text-foreground">LLM 시대</span> — GPT·Claude·Gemini 모두 BPE 계열 토크나이저 사용.
                  학습 목표(Cross-Entropy Loss 최소화)는 Shannon이 1948년에 정의한 엔트로피 한계에 수렴.
                  Sutskever(OpenAI): &ldquo;좋은 압축기는 좋은 예측기다 — 텍스트를 잘 압축하려면 세상을 이해해야 한다.&rdquo;
                </div>
              </div>
            </div>
          </SubSection>

          {/* ── 3. 압축 = 예측 = 지능 ── */}
          <SubSection title="③ 압축 = 예측 = 지능">
            <div className="rounded-lg bg-accent-light p-4 space-y-3 text-muted">
              <p>
                BPE는 자주 함께 나오는 글자 쌍을 하나의 토큰으로 묶습니다. 이것이 <strong>압축</strong>입니다.
                압축을 잘 한다는 것은 패턴을 잘 안다는 것이고, 패턴을 잘 안다는 것은 다음을 잘 예측한다는 것입니다.
              </p>
              <div className="font-mono text-xs bg-black/10 rounded p-3 space-y-1">
                <p>압축률 높음  ↔  패턴을 잘 파악함  ↔  예측 정확  ↔  손실(Loss) 낮음</p>
              </div>
              <p>
                LLM 학습 목표(Cross-Entropy 최소화)와 최적 압축 목표(Shannon 엔트로피 최소화)는 수식이 동일합니다.
                수학적으로 <strong>LLM 학습 = 텍스트 압축</strong>입니다.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="pr-6 pb-1 font-medium text-foreground">구분</th>
                      <th className="pr-6 pb-1 font-medium text-foreground">무손실 압축</th>
                      <th className="pb-1 font-medium text-foreground">손실 압축</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-6 py-0.5 text-foreground font-medium">기계</td>
                      <td className="pr-6 py-0.5">ZIP, BPE 토크나이저</td>
                      <td className="py-0.5">JPEG, MP3, <strong>LLM 학습</strong></td>
                    </tr>
                    <tr>
                      <td className="pr-6 py-0.5 text-foreground font-medium">인간</td>
                      <td className="pr-6 py-0.5">암기</td>
                      <td className="py-0.5">이해·개념화·패러프레이징</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                LLM이 원본 문장을 그대로 암기하지 않는 이유가 여기 있습니다 — 손실 압축이기 때문에 패턴만 남기고 원본은 버립니다.
                이것이 암기가 아니라 이해에 가까운 이유입니다.
              </p>
            </div>
          </SubSection>

          {/* ── 4. 압축의 층위 ── */}
          <SubSection title="④ 압축의 층위">
            <div className="rounded-lg border border-sidebar-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-accent-light">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">층위</th>
                    <th className="text-left px-4 py-2 font-medium">원본</th>
                    <th className="text-left px-4 py-2 font-medium">압축 결과</th>
                    <th className="text-left px-4 py-2 font-medium">버리는 것</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sidebar-border text-muted font-mono text-xs">
                  <tr>
                    <td className="px-4 py-2 font-sans font-medium text-foreground">비트 압축</td>
                    <td className="px-4 py-2">aaabaaab</td>
                    <td className="px-4 py-2">XbXb</td>
                    <td className="px-4 py-2 font-sans">중복 기호</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-sans font-medium text-foreground">BPE 토크나이저</td>
                    <td className="px-4 py-2">l o w</td>
                    <td className="px-4 py-2">low (토큰 1개)</td>
                    <td className="px-4 py-2 font-sans">글자 경계</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-sans font-medium text-foreground">LLM 학습</td>
                    <td className="px-4 py-2">수십 TB 텍스트</td>
                    <td className="px-4 py-2">수백 GB 파라미터</td>
                    <td className="px-4 py-2 font-sans">원본 문장 전부</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-sans font-medium text-foreground">패러프레이징</td>
                    <td className="px-4 py-2">긴 문단</td>
                    <td className="px-4 py-2">핵심 문장</td>
                    <td className="px-4 py-2 font-sans">덜 중요한 의미</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-sans font-medium text-foreground">과학 법칙</td>
                    <td className="px-4 py-2">수많은 관측</td>
                    <td className="px-4 py-2">F = ma</td>
                    <td className="px-4 py-2 font-sans">개별 실험 기록</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-2 pl-1">
              인간의 추상화 자체가 압축입니다. 감각 → 지각 → 개념 → 언어 → 요약 → 법칙 — 매 단계가 손실 압축입니다.
            </p>
          </SubSection>

          {/* ── 5. 공항 → 스마트시티 ── */}
          <SubSection title="⑤ 공항 동선에서 스마트시티까지">
            <div className="rounded-lg bg-accent-light p-4 space-y-3 text-muted">
              <div className="space-y-1">
                <p className="font-medium text-foreground">공항 동선 = LLM 학습과 같은 구조</p>
                <div className="font-mono text-xs bg-black/10 rounded p-3 space-y-1">
                  <p>수백만 명의 실제 이동 경로 (원본 데이터)</p>
                  <p>        ↓ 패턴 추출 (손실 압축)</p>
                  <p>&ldquo;체크인 → 보안 → 면세점 → 게이트&rdquo; (패턴)</p>
                  <p>        ↓ 원본 경로 데이터 폐기</p>
                  <p>새 공항 설계 / 동선 예측 (생성)</p>
                </div>
              </div>
              <p>
                LLM도 동일합니다. 수조 개의 문장(원본) → 패턴(파라미터) → 원본 폐기 → 새 문장 생성.
                데이터만 다르고 수학은 같습니다.
              </p>
              <div className="space-y-1">
                <p className="font-medium text-foreground">이미 적용된 사례</p>
                <ul className="space-y-1 pl-3">
                  <li><strong>Desire Path</strong> — 사람이 가장 많이 밟은 잔디 자리에 나중에 길을 냅니다. 동선 데이터 → 설계.</li>
                  <li><strong>DeepMind × 교통 신호</strong> — 교통 흐름 패턴 압축 → 신호 타이밍 최적화. 서울시도 도입.</li>
                  <li><strong>건물 에너지 관리</strong> — 사람이 오래 머무는 구역 패턴 → 에어컨·조명 배치 최적화.</li>
                </ul>
              </div>
              <p>
                <strong>스마트시티의 핵심</strong>은 센서 데이터(원본)를 압축해 패턴을 뽑고, 그 패턴으로 에너지·동선을 최적화하는 것입니다.
                이 수업에서 배우는 선형대수(행렬 처리), 확률통계(패턴 분석), 최적화(에너지 최소화), 정보이론(압축·예측)이 전부 그 안에 들어갑니다.
              </p>
            </div>
          </SubSection>

          {/* ── 흐름 요약 ── */}
          <SubSection title="오늘의 흐름 요약">
            <div className="rounded-lg border border-sidebar-border p-4">
              <div className="font-mono text-xs text-muted text-center space-y-0.5">
                <p>BPE 토크나이저 (1994 파일압축 → 2016 NLP)</p>
                <p>↓</p>
                <p>vocab = 패턴의 사전</p>
                <p>↓</p>
                <p>압축 = 패턴 추출 = 예측 (Shannon 1948)</p>
                <p>↓</p>
                <p>LLM 학습 = 언어의 손실 압축</p>
                <p>↓</p>
                <p>공항 동선 = 이동의 손실 압축</p>
                <p>↓</p>
                <p>도시 설계에 적용 → 스마트시티</p>
                <p className="pt-1 text-accent">수학이라는 하나의 언어로 언어·도시·지능이 모두 연결됩니다.</p>
              </div>
            </div>
          </SubSection>

        </div>
      </CalcBox>
    </div>
  );
}
