"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. 인프라 계층 — §8 Worker Node, §9 Hypervisor, §10 Physical Server, §11 Network·Storage, §12 Data Center */
export default function InfrastructureContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        NHN 책임 영역 — ⑥ Worker Node부터 ⑩ Data Center까지의 인프라 계층. VM·가상화·물리서버·네트워크·데이터센터의 역할과 책임 분담.
      </p>

      {/* ===== §8 Worker Node ===== */}
      <CalcBox title="■ §8. ⑥ Worker Node (VM) — 심화">
        <SubSection title="● §8.1 한 줄 정의">
          <Insight>
            Pod이 실제로 돌아가는 가상 서버 1대 = NHN Instance 한 대 = Linux 서버
          </Insight>
        </SubSection>

        <SubSection title="● §8.2 그림으로 이해">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`┌──────────────────────────────────────────────────────┐
│  NHN Cloud 데이터센터                                 │
│                                                       │
│  ┌─────────── 물리 서버 1대 (256GB RAM, 64 core) ──┐ │
│  │  Hypervisor (KVM)                              │ │
│  │  ┌──────────────┐ ┌──────────────┐            │ │
│  │  │ Worker Node1 │ │ Worker Node2 │            │ │
│  │  │ (VM, 4vCPU)  │ │ (VM, 4vCPU)  │            │ │
│  │  │              │ │              │            │ │
│  │  │ 안에 Pod들   │ │ 안에 Pod들   │            │ │
│  │  │ Pod1 (NKS)   │ │ Pod2 (NKS)   │            │ │
│  │  └──────────────┘ └──────────────┘            │ │
│  │                                                │ │
│  │  ※ 다른 고객 VM들도 같은 물리 서버에 있음      │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §8.3 용어 분해">
          <p className="text-sm mb-2"><span className="font-medium">&quot;Worker&quot;의 의미</span> — K8s에서는 서버를 2가지 역할로 나눈다:</p>
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm mb-3">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">종류</th>
                  <th className="px-3 py-2 text-left">역할</th>
                  <th className="px-3 py-2 text-left">운영</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Master Node (Control Plane)</td><td className="px-3 py-2">K8s 자체 운영. Pod 어디에 띄울지 결정</td><td className="px-3 py-2">NHN (NKS)</td></tr>
                <tr><td className="px-3 py-2 font-medium">Worker Node</td><td className="px-3 py-2">실제로 Pod이 돌아가는 곳. 트래픽 처리</td><td className="px-3 py-2">NHN (NKS)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            <span className="font-medium">&quot;Node&quot;</span> — K8s에서 클러스터를 구성하는 서버 1대. <span className="font-medium">&quot;VM&quot;</span> — Virtual Machine. NHN Cloud의 IaaS 상품인 Instance가 곧 VM.
          </p>
        </SubSection>

        <SubSection title="● §8.4 무엇이 들어있나">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`[Worker Node 1 (VM)]
├── 운영체제: Ubuntu 22.04 LTS
├── 컨테이너 런타임: containerd
├── kubelet                       ← K8s 명령을 받아 컨테이너 띄우는 에이전트
├── kube-proxy                    ← 네트워크 라우팅
└── Pod들
    ├── law-matcher Pod 1
    ├── (다른 시스템 Pod)
    └── ...`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §8.5 사양 예시">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">값</th>
                  <th className="px-3 py-2 text-left">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">CPU</td><td className="px-3 py-2">4 vCPU</td><td className="px-3 py-2">Spring Boot 1~2개 + 여유</td></tr>
                <tr><td className="px-3 py-2 font-medium">RAM</td><td className="px-3 py-2">8 GB</td><td className="px-3 py-2">JVM 힙 2GB + Pod 여유 + OS</td></tr>
                <tr><td className="px-3 py-2 font-medium">Disk</td><td className="px-3 py-2">100 GB SSD</td><td className="px-3 py-2">컨테이너 이미지 캐시</td></tr>
                <tr><td className="px-3 py-2 font-medium">OS</td><td className="px-3 py-2">Ubuntu 22.04 LTS</td><td className="px-3 py-2">NHN 기본 이미지</td></tr>
                <tr><td className="px-3 py-2 font-medium">개수</td><td className="px-3 py-2">2~5대</td><td className="px-3 py-2">Auto Scaling</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="● §8.6 한 Node에 Pod이 몇 개 들어가나">
          <p className="text-sm mb-2">
            일반적으로 한 Node에 5~20개 Pod이 들어간다. K8s가 자동으로 균형 분배.
          </p>
          <Insight>
            보안성검토를 위해선 law-matcher Pod 1·2를 다른 Node에 분산해야 한다(한 Node 죽어도 다른 Node에서 살아있도록). K8s podAntiAffinity 설정으로 자동 처리.
          </Insight>
        </SubSection>

        <SubSection title="● §8.7 Worker Node 1대가 죽으면">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`정상 상태:
[Node 1] Pod-A, Pod-B
[Node 2] Pod-C, Pod-D

Node 1이 갑자기 죽음:
[Node 1] ☠️ DOWN
[Node 2] Pod-C, Pod-D

K8s가 감지 (몇 초 내):
1. Node 1을 클러스터에서 제외
2. Pod-A, Pod-B를 다른 Node로 재배치
3. 필요하면 새 Worker Node를 NHN에서 자동 임차

복구 후:
[Node 2] Pod-C, Pod-D, Pod-A
[Node 3] Pod-B  ← 자동 추가됨`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 사람이 자고 있어도 NHN과 K8s가 알아서 복구.</p>
        </SubSection>

        <SubSection title="● §8.8 책임 분담 (Worker Node 계층)">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">작업</th>
                  <th className="px-3 py-2 text-left">누가</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">Worker Node 사양 결정 (4vCPU/8GB)</td><td className="px-3 py-2">🟢 강남구청 (콘솔 클릭)</td></tr>
                <tr><td className="px-3 py-2">Worker Node 개수 결정 (2~5대)</td><td className="px-3 py-2">🟢 강남구청</td></tr>
                <tr><td className="px-3 py-2">VM 생성</td><td className="px-3 py-2">🔴 NHN (자동)</td></tr>
                <tr><td className="px-3 py-2">Ubuntu OS 설치</td><td className="px-3 py-2">🔴 NHN</td></tr>
                <tr><td className="px-3 py-2">OS 보안 패치</td><td className="px-3 py-2">🔴 NHN (자동)</td></tr>
                <tr><td className="px-3 py-2">containerd 설치·갱신</td><td className="px-3 py-2">🔴 NHN</td></tr>
                <tr><td className="px-3 py-2">kubelet 설치·갱신</td><td className="px-3 py-2">🔴 NHN</td></tr>
                <tr><td className="px-3 py-2">네트워크 플러그인 (Calico 등)</td><td className="px-3 py-2">🔴 NHN</td></tr>
                <tr><td className="px-3 py-2">Pod 자동 배치·이동</td><td className="px-3 py-2">🔴 NHN (K8s 자동)</td></tr>
                <tr><td className="px-3 py-2">Worker Node 장애 시 새 노드 추가</td><td className="px-3 py-2">🔴 NHN (Cluster Autoscaler)</td></tr>
                <tr><td className="px-3 py-2">모니터링 (CPU·메모리)</td><td className="px-3 py-2">🟡 분담 (NHN 수집, 강남구청 임계치)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 운영기관은 사양·개수만 정하면 끝. 나머지는 NHN이 다 운영.</p>
        </SubSection>

        <SubSection title="● §8.9 docker-compose vs Worker Node">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">docker-compose</th>
                  <th className="px-3 py-2 text-left">Worker Node (NKS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">서버</td><td className="px-3 py-2">1대 (Instance)</td><td className="px-3 py-2">여러 대 (자동 증감)</td></tr>
                <tr><td className="px-3 py-2 font-medium">컨테이너 위치</td><td className="px-3 py-2">그 서버에 직접</td><td className="px-3 py-2">Pod로 묶여 어느 Node든</td></tr>
                <tr><td className="px-3 py-2 font-medium">서버 죽으면</td><td className="px-3 py-2">서비스 중단</td><td className="px-3 py-2">자동 복구</td></tr>
                <tr><td className="px-3 py-2 font-medium">새 서버 필요 시</td><td className="px-3 py-2">수동 임차·설정</td><td className="px-3 py-2">자동 추가 (Cluster Autoscaler)</td></tr>
                <tr><td className="px-3 py-2 font-medium">OS 보안 패치</td><td className="px-3 py-2">직접 (apt update)</td><td className="px-3 py-2">NHN 자동</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      {/* ===== §9 Hypervisor ===== */}
      <CalcBox title="■ §9. ⑦ Hypervisor">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">무엇인가</td><td className="px-3 py-2">1대의 물리 서버 위에 여러 VM(Worker Node)을 만들어주는 SW</td></tr>
              <tr><td className="px-3 py-2 font-medium">종류</td><td className="px-3 py-2">NHN Cloud는 자체 Hypervisor 사용 (KVM 기반 추정)</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">역할</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>VM 단위 자원 격리 (CPU, RAM, Disk, Network)</li>
                    <li>VM 간 메모리·프로세스 완전 분리</li>
                    <li>Live Migration (VM을 다른 물리 서버로 무중단 이동)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">보안 효과</td><td className="px-3 py-2">다른 고객의 VM이 우리 VM에 접근 불가 (CSAP 통제기준)</td></tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">NHN 100%</td></tr>
              <tr><td className="px-3 py-2 font-medium">운영기관 관여</td><td className="px-3 py-2">없음 (CSAP 인증서로 갈음)</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ===== §10 Physical Server ===== */}
      <CalcBox title="■ §10. ⑧ Physical Server">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">무엇인가</td><td className="px-3 py-2">진짜 컴퓨터 (CPU, RAM, SSD, NIC)</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">사양 예시</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>CPU: AMD EPYC 64코어</li>
                    <li>RAM: 512GB</li>
                    <li>SSD: NVMe 수 TB</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">위치</td><td className="px-3 py-2">NHN Cloud 데이터센터 (CSAP 인증)</td></tr>
              <tr><td className="px-3 py-2 font-medium">공유 방식</td><td className="px-3 py-2">한 물리 서버에 여러 고객의 VM이 돌아감 (Hypervisor가 격리)</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">유지보수</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>장애 시 자동으로 다른 물리 서버로 VM 이동</li>
                    <li>정기 펌웨어 패치 (다운타임 없이)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">NHN 100%</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ===== §11 Network · Storage 백본 ===== */}
      <CalcBox title="■ §11. ⑨ Network · Storage 백본">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">무엇인가</td><td className="px-3 py-2">데이터센터 내부의 고속 네트워크 + 분산 스토리지</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">네트워크</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>내부 100Gbps 백본</li>
                    <li>백본 스위치, 코어 라우터</li>
                    <li>DDoS 방어 인프라 (L3/L4)</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">스토리지</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Object Storage 분산 인프라</li>
                    <li>RDS 백업 저장소</li>
                    <li>자동 3중 복제 (이중화)</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">보안</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>VPC 단위 네트워크 격리</li>
                    <li>다른 고객의 트래픽이 우리에게 도달 불가</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">NHN 100%</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>

      {/* ===== §12 Data Center ===== */}
      <CalcBox title="■ §12. ⑩ Data Center">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">무엇인가</td><td className="px-3 py-2">물리적 시설 — 건물, 전력, 냉방 등</td></tr>
              <tr><td className="px-3 py-2 font-medium">위치</td><td className="px-3 py-2">국내 (CSAP 인증 요건: 한국 영토 내)</td></tr>
              <tr><td className="px-3 py-2 font-medium">인증</td><td className="px-3 py-2">CSAP IaaS 인증 보유</td></tr>
              <tr>
                <td className="px-3 py-2 font-medium">물리 보안</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>출입통제 (지문·홍채)</li>
                    <li>24/7 CCTV 감시</li>
                    <li>경비 인력 상주</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">환경 시설</td>
                <td className="px-3 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>무정전 전원장치 (UPS)</li>
                    <li>비상 디젤 발전기 (수일 자체 운영 가능)</li>
                    <li>항온·항습 (서버실 온도 22℃ 유지)</li>
                    <li>화재 진압 시스템 (가스식, 물 분사 X)</li>
                  </ul>
                </td>
              </tr>
              <tr><td className="px-3 py-2 font-medium">이중화</td><td className="px-3 py-2">일부 시설은 다중 데이터센터 운영 (재해 복구)</td></tr>
              <tr><td className="px-3 py-2 font-medium">책임 주체</td><td className="px-3 py-2">NHN 100%</td></tr>
            </tbody>
          </table>
        </div>
      </CalcBox>
    </div>
  );
}
