"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 개요 — §1 시스템 전체 구조, §2 책임 분담 한눈에 보기 */
export default function IntroContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        본 시스템은 응용 SW부터 물리 데이터센터까지 10개 계층으로 구성된다.
      </p>
      <p className="text-muted mb-8">
        각 계층의 책임은 CSAP 책임공유모델에 따라 운영기관(강남구청)과 CSP(NHN Cloud)가 분담한다.
      </p>

      <CalcBox title="■ §1. 시스템 전체 구조">
        <SubSection title="● §1.1 전체 계층도">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`┌──────────────────────────────────────────────┐
│  ① 사용자 (강남구청 직원, 외부 API)            │  ← 사람·외부 시스템
├──────────────────────────────────────────────┤
│  ② 응용 SW (Spring Boot 코드)                 │  🟢 강남구청
│  ③ JVM (Java 17 런타임)                       │  🟢 강남구청
│  ④ 컨테이너 (Docker 이미지 인스턴스)           │  🟢 강남구청
│  ⑤ Pod (K8s 단위)                             │  🟢 강남구청
├──────────────────────────────────────────────┤
│  ⑥ Worker Node (VM)                           │  🟡 분담 (NKS 사용 시 NHN 비중 ↑)
├──────────────────────────────────────────────┤
│  ⑦ Hypervisor (가상화 계층)                   │  🔴 NHN
│  ⑧ Physical Server (물리 서버)                │  🔴 NHN
│  ⑨ Network · Storage 백본                    │  🔴 NHN
│  ⑩ Data Center (건물·전력·냉방)               │  🔴 NHN
└──────────────────────────────────────────────┘

🟢 강남구청 책임   🟡 분담   🔴 NHN 책임`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §1.2 사이드 시스템 (가용성·부하분산)">
          <p className="text-sm">
            위 10계층 외에 사용자와 응용 SW 사이를 잇는 <span className="font-medium">Load Balancer(LB)</span>, 그리고 LB·Pod·DB를 자동 이중화하는 <span className="font-medium">High Availability(HA)</span> 메커니즘이 있다. (제4부 참고)
          </p>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §2. 책임 분담 한눈에 보기">
        <p className="text-sm mb-3">
          §1.1의 계층도가 &quot;누가 책임지는가&quot;를 보여준다면, 본 표는 &quot;구체적으로 어떤 작업을, 얼마나 자주 수행하는가&quot;를 명시한다.
        </p>

        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <thead className="bg-sidebar-bg">
              <tr>
                <th className="px-3 py-2 text-left">계층</th>
                <th className="px-3 py-2 text-left">강남구청 담당</th>
                <th className="px-3 py-2 text-left">NHN 담당</th>
                <th className="px-3 py-2 text-left">운영 빈도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sidebar-border">
              <tr>
                <td className="px-3 py-2 font-medium">① 사용자</td>
                <td className="px-3 py-2">계정 발급·회수, 권한 부여 (RBAC)</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">인사 발생 시 (월 수회)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">② 응용 SW (Spring Boot)</td>
                <td className="px-3 py-2">코드 개발, 라이브러리 패치, 시큐어코딩 점검</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">상시 (스프린트 단위)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">③ JVM</td>
                <td className="px-3 py-2">Dockerfile에 JRE 17 베이스 이미지 지정</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">분기 1회 (보안 패치)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">④ 컨테이너</td>
                <td className="px-3 py-2">Dockerfile 작성, 이미지 빌드·NCR 푸시</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">배포 시 (주~월 단위)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑤ Pod</td>
                <td className="px-3 py-2">K8s YAML 작성 (replicas, probe, 자원 한도)</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">변경 시 (분기~반기)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑥ Worker Node (NKS)</td>
                <td className="px-3 py-2">사양·개수 결정, 모니터링 임계치 설정</td>
                <td className="px-3 py-2">VM 생성, OS 설치·패치, kubelet 운영, 장애 자동 복구</td>
                <td className="px-3 py-2">초기 1회 + 사양 변경 시</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑦ Hypervisor</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">KVM 기반 격리, Live Migration 자동 운영</td>
                <td className="px-3 py-2">- (CSAP 인증서로 갈음)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑧ Physical Server</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">하드웨어 설치·교체, 펌웨어 패치</td>
                <td className="px-3 py-2">-</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑨ Network·Storage</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">VPC 백본, DDoS 방어, 분산 스토리지 3중 복제</td>
                <td className="px-3 py-2">-</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">⑩ Data Center</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">출입통제, UPS·발전기, 항온항습</td>
                <td className="px-3 py-2">-</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">LB / HA</td>
                <td className="px-3 py-2">LB 헬스체크 임계치·인증서 등록</td>
                <td className="px-3 py-2">LB 자체 이중화, SLA 99.95% 보장</td>
                <td className="px-3 py-2">인증서 갱신 시 (연 1회)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Insight>
          운영기관(강남구청) 작업의 90% 이상이 ②~⑤ 응용 SW 계층에 집중. 인프라 계층은 NHN의 자동 운영이 주축.
        </Insight>
      </CalcBox>
    </div>
  );
}
