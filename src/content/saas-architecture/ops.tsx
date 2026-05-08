"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅴ. 운영·관리 도구 — §15 NHN 콘솔, §16 CLI/API/Terraform, §17 kubectl */
export default function OpsContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        시스템을 조작·관리하는 3가지 도구. GUI(NHN 콘솔), CLI(NHN/REST/Terraform), K8s 표준 도구(kubectl)의 역할과 사용 시점.
      </p>

      {/* ===== §15 NHN Cloud 콘솔 ===== */}
      <CalcBox title="■ §15. NHN Cloud 콘솔 (GUI)">
        <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm mb-4">
          <table className="w-full">
            <tbody className="divide-y divide-sidebar-border">
              <tr><td className="px-3 py-2 font-medium w-32">URL</td><td className="px-3 py-2 font-mono text-xs">https://console-gov.toast.com (공공기관용)</td></tr>
              <tr><td className="px-3 py-2 font-medium">용도</td><td className="px-3 py-2">인프라 생성·관리 (Web 클릭)</td></tr>
              <tr><td className="px-3 py-2 font-medium">주 사용자</td><td className="px-3 py-2">운영자, 인프라 담당자</td></tr>
            </tbody>
          </table>
        </div>

        <SubSection title="● 주요 콘솔 화면">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">메뉴</th>
                  <th className="px-3 py-2 text-left">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">Compute → Instance</td><td className="px-3 py-2">VM 생성·삭제·시작·정지</td></tr>
                <tr><td className="px-3 py-2 font-medium">Container → NKS</td><td className="px-3 py-2">K8s 클러스터 생성·노드 관리</td></tr>
                <tr><td className="px-3 py-2 font-medium">Container → NCR</td><td className="px-3 py-2">Docker 이미지 저장소</td></tr>
                <tr><td className="px-3 py-2 font-medium">Database → RDS</td><td className="px-3 py-2">PostgreSQL 인스턴스 관리</td></tr>
                <tr><td className="px-3 py-2 font-medium">Database → Memorystore</td><td className="px-3 py-2">Redis 관리</td></tr>
                <tr><td className="px-3 py-2 font-medium">Network → Load Balancer</td><td className="px-3 py-2">LB 설정</td></tr>
                <tr><td className="px-3 py-2 font-medium">Network → Security Group</td><td className="px-3 py-2">방화벽 룰</td></tr>
                <tr><td className="px-3 py-2 font-medium">Storage → Object Storage</td><td className="px-3 py-2">파일 저장소</td></tr>
                <tr><td className="px-3 py-2 font-medium">Security → App Security</td><td className="px-3 py-2">WAF 룰</td></tr>
                <tr><td className="px-3 py-2 font-medium">Monitoring → System Monitoring</td><td className="px-3 py-2">메트릭·알람</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-3">→ 클릭 몇 번으로 인프라 구성 가능, 운영 인력 적은 공공기관에 적합.</p>
        </SubSection>
      </CalcBox>

      {/* ===== §16 CLI / API / Terraform ===== */}
      <CalcBox title="■ §16. NHN CLI / API / Terraform">
        <SubSection title="● §16.1 NHN Cloud CLI">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`# 설치
pip install nhncloud-cli

# 설정
nhncli configure

# 인스턴스 목록
nhncli compute instance list

# 인스턴스 시작
nhncli compute instance start --id i-abc123`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §16.2 REST API">
          <p className="text-sm mb-2">NHN Cloud의 모든 서비스는 REST API로도 제어 가능.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`curl -X GET "https://kr1-api-instance.infrastructure.cloud.toast.com/v2/{appKey}/servers" \\
  -H "X-TC-AUTHENTICATION-ID: {access-key}" \\
  -H "X-TC-AUTHENTICATION-SECRET: {secret-key}"`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">API 문서: https://docs.nhncloud.com</p>
        </SubSection>

        <SubSection title="● §16.3 Terraform (IaC — Infrastructure as Code)">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 mb-3">
            <pre>{`terraform {
  required_providers {
    nhncloud = { source = "nhn/nhncloud" }
  }
}

resource "nhncloud_compute_instance" "law_matcher_web" {
  name = "law-matcher-web1"
  flavor_id = "u2.c4m8"  # 4vCPU 8GB
  image_id = "ubuntu-22.04"
  count = 2
}`}</pre>
          </div>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-3">
            <pre>{`terraform init
terraform plan   # 변경사항 미리보기
terraform apply  # 실제 적용`}</pre>
          </div>
          <p className="text-sm text-muted mt-2">→ 코드로 관리하면 재현 가능, Git 추적 가능, 롤백 쉬움.</p>
        </SubSection>

        <SubSection title="● §16.4 도구 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">도구</th>
                  <th className="px-3 py-2 text-left">장점</th>
                  <th className="px-3 py-2 text-left">단점</th>
                  <th className="px-3 py-2 text-left">추천 상황</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">콘솔 (GUI)</td><td className="px-3 py-2">직관적</td><td className="px-3 py-2">반복 작업 불편</td><td className="px-3 py-2">초기 구축, 일회성</td></tr>
                <tr><td className="px-3 py-2 font-medium">CLI</td><td className="px-3 py-2">자동화 가능</td><td className="px-3 py-2">명령어 학습</td><td className="px-3 py-2">정기 점검, 백업 스크립트</td></tr>
                <tr><td className="px-3 py-2 font-medium">Terraform</td><td className="px-3 py-2">코드 관리</td><td className="px-3 py-2">학습 비용 ↑</td><td className="px-3 py-2">운영 안정화 후</td></tr>
                <tr><td className="px-3 py-2 font-medium">REST API</td><td className="px-3 py-2">가장 유연</td><td className="px-3 py-2">코드 작성</td><td className="px-3 py-2">커스텀 자동화</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>

      {/* ===== §17 kubectl ===== */}
      <CalcBox title="■ §17. kubectl (K8s CLI)">
        <SubSection title="● §17.1 한 줄 정의">
          <Insight>K8s 클러스터를 명령어로 조작하는 CLI 도구. 발음: &quot;큐브 컨트롤&quot; (kube-control).</Insight>
        </SubSection>

        <SubSection title="● §17.2 자주 쓰는 명령어">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`# 조회
kubectl get nodes              # Worker Node 목록
kubectl get pods               # Pod 목록
kubectl describe pod <name>    # 자세한 정보

# 로그
kubectl logs <pod-name>        # Pod 로그
kubectl logs -f <pod-name>     # 실시간 로그

# 디버깅
kubectl exec -it <pod> -- bash # Pod 안에 들어가기

# 배포
kubectl apply -f deployment.yaml
kubectl set image deployment/law-matcher app=ncr.gov-ntruss.com/law-matcher:1.1
kubectl rollout status deployment/law-matcher
kubectl rollout undo deployment/law-matcher  # 롤백

# 자원
kubectl scale deployment law-matcher --replicas=5
kubectl top pods`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §17.3 NHN NKS 연결">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4">
            <pre>{`# 1. kubectl 설치
choco install kubernetes-cli  # Windows

# 2. NHN 콘솔에서 kubeconfig 다운로드
# 3. ~/.kube/config 위치에 저장
# 4. 연결 확인
kubectl get nodes`}</pre>
          </div>
        </SubSection>

        <SubSection title="● §17.4 콘솔 vs kubectl 비교">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">작업</th>
                  <th className="px-3 py-2 text-left">추천</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2">클러스터 생성</td><td className="px-3 py-2">NHN 콘솔</td></tr>
                <tr><td className="px-3 py-2">일상 배포</td><td className="px-3 py-2 font-medium">kubectl</td></tr>
                <tr><td className="px-3 py-2">Pod 로그 조회</td><td className="px-3 py-2">kubectl</td></tr>
                <tr><td className="px-3 py-2">Pod 디버깅</td><td className="px-3 py-2 font-medium">kubectl</td></tr>
                <tr><td className="px-3 py-2">자원 확장 (Worker Node)</td><td className="px-3 py-2">NHN 콘솔</td></tr>
                <tr><td className="px-3 py-2">보안그룹 변경</td><td className="px-3 py-2">NHN 콘솔</td></tr>
                <tr><td className="px-3 py-2">모니터링 대시보드</td><td className="px-3 py-2">NHN 콘솔</td></tr>
                <tr><td className="px-3 py-2">자동화 스크립트</td><td className="px-3 py-2 font-medium">kubectl</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">→ 둘 다 쓰는 게 일반적. 콘솔은 인프라 변경, kubectl은 애플리케이션 운영.</p>
        </SubSection>

        <SubSection title="● §17.5 보안 측면">
          <div className="rounded-lg border border-sidebar-border overflow-hidden text-sm">
            <table className="w-full">
              <thead className="bg-sidebar-bg">
                <tr>
                  <th className="px-3 py-2 text-left">항목</th>
                  <th className="px-3 py-2 text-left">주의사항</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sidebar-border">
                <tr><td className="px-3 py-2 font-medium">kubeconfig 파일</td><td className="px-3 py-2">절대 외부 노출 금지 (Git 커밋 X)</td></tr>
                <tr><td className="px-3 py-2 font-medium">접근 IP 제한</td><td className="px-3 py-2">NKS API Server에 접근 가능 IP 제한</td></tr>
                <tr><td className="px-3 py-2 font-medium">RBAC</td><td className="px-3 py-2">사용자별 권한 분리 (개발자=읽기, 운영자=배포)</td></tr>
                <tr><td className="px-3 py-2 font-medium">MFA</td><td className="px-3 py-2">NHN 계정 자체에 MFA 적용</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </CalcBox>
    </div>
  );
}
