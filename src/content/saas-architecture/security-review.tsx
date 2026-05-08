"use client";

import { CalcBox, SubSection } from "@/components/content/shared";

/** Ⅶ. 보안성 검토 가이드 — §21 자주 묻는 Q&A */
export default function SecurityReviewContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-8">
        보안성 검토 시 심사관이 묻는 8가지 질문과 모범 답변. Pod 책임 주체, 보안 패치, 데이터센터 점검, 해킹 책임, Worker Node, HA, Spring/Tomcat/Nginx 관계, kubectl 운영.
      </p>

      <CalcBox title="■ §21. 자주 묻는 Q&A">
        <SubSection title='● Q1. "Pod는 NHN이 만들어 주는 건가요?"'>
          <p className="text-sm">
            Pod는 쿠버네티스(K8s)의 표준 개념으로, NHN이 아닌 구글이 만든 오픈소스 표준이다. 운영기관(강남구청)이 K8s YAML 명세 파일에 Pod를 정의하고, NHN이 운영하는 NKS(NHN Kubernetes Service) 환경에서 자동 실행된다. <span className="font-medium">Pod 명세는 강남구청, Pod 실행 환경은 NHN</span>으로 책임이 분담된다.
          </p>
        </SubSection>

        <SubSection title='● Q2. "서버 보안 패치는 누가 하나요?"'>
          <p className="text-sm mb-2">계층별로 분담된다.</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">응용 SW의 라이브러리 패치</span>: 강남구청 (개발자가 의존성 업데이트)</li>
            <li><span className="font-medium">컨테이너 베이스 이미지 패치</span>: 강남구청 (Dockerfile의 base image 갱신)</li>
            <li><span className="font-medium">Worker Node OS 패치</span>: NHN (NKS가 자동 처리)</li>
            <li><span className="font-medium">Hypervisor·물리 서버 패치</span>: NHN 100%</li>
          </ul>
        </SubSection>

        <SubSection title='● Q3. "데이터센터에 직접 가서 점검할 수 있나요?"'>
          <p className="text-sm">
            CSAP 인증 데이터센터의 출입통제 정책상 일반 고객의 직접 출입은 불가하다. 대신 <span className="font-medium">CSAP 인증서</span>(NHN이 KISA로부터 받음)로 물리 보안 통제가 검증되어 있으며, 운영기관은 NHN의 정기 보안 감사 보고서를 통해 점검 결과를 확인할 수 있다.
          </p>
        </SubSection>

        <SubSection title='● Q4. "해킹당하면 누구 책임인가요?"'>
          <p className="text-sm mb-2">침해 지점에 따라 다르다.</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">응용 SW 취약점(SQL Injection 등)으로 침해</span>: 운영기관 책임 (시큐어코딩 적용 결과서 §1 참조)</li>
            <li><span className="font-medium">OS 취약점·Hypervisor 탈출</span>: CSP(NHN) 책임</li>
            <li><span className="font-medium">계정 탈취 (피싱)</span>: 사용자 교육·MFA 미적용 시 운영기관 책임</li>
          </ul>
          <p className="text-sm mt-2">침해 사고 발생 시 NHN 24/7 보안관제와 협력하여 대응한다.</p>
        </SubSection>

        <SubSection title='● Q5. "Worker Node가 뭐고 누가 운영하나요?"'>
          <p className="text-sm">
            Worker Node는 쿠버네티스에서 Pod이 실제로 실행되는 가상 서버다. 본 시스템은 NHN Cloud의 NKS를 이용하므로, <span className="font-medium">Worker Node의 사양과 개수는 운영기관(강남구청)이 결정</span>하고, <span className="font-medium">VM 생성·OS 설치·보안 패치·장애 복구는 NHN이 자동 처리</span>한다. 운영기관 책임은 Worker Node 위에 띄울 Pod 명세 작성과 모니터링 임계치 설정에 한정되며, 인프라 보안은 CSP(NHN)와 책임공유모델로 분담된다.
          </p>
        </SubSection>

        <SubSection title='● Q6. "HA는 어떻게 보장하나요?"'>
          <p className="text-sm mb-2">본 시스템은 NHN Cloud의 관리형 Load Balancer를 통해 자동 HA를 보장한다.</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">이중화</span>: Spring Boot Pod를 최소 2개, 최대 5개까지 Auto Scaling으로 운영</li>
            <li><span className="font-medium">헬스 체크</span>: NHN LB가 5초 간격으로 <code className="text-xs">/actuator/health</code> 엔드포인트를 호출하여 상태 확인</li>
            <li><span className="font-medium">자동 인계 (Failover)</span>: 헬스 체크 3회 실패 시 해당 Pod를 분산 대상에서 자동 제외</li>
            <li><span className="font-medium">자동 복구</span>: 쿠버네티스(NKS)가 죽은 Pod를 자동 재시작 (RTO 5초 이내)</li>
            <li><span className="font-medium">Worker Node 장애</span>: 다른 Node로 Pod 자동 재배치</li>
            <li><span className="font-medium">SLA</span>: NHN Cloud LB 99.95% 가용성 보장</li>
          </ul>
        </SubSection>

        <SubSection title='● Q7. "Spring Boot, Tomcat, Nginx의 관계는?"'>
          <p className="text-sm mb-2">본 프로젝트의 응용 SW는 Spring Boot 3.x로 작성된 Java 애플리케이션이다.</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li><span className="font-medium">Spring Boot</span>: Java 웹 서버 프레임워크 (응용 SW)</li>
            <li><span className="font-medium">Tomcat</span>: Spring Boot에 내장된 Java Servlet 컨테이너 (HTTP 처리)</li>
            <li><span className="font-medium">Nginx</span>: 현재 docker-compose 환경에서는 Nginx 컨테이너가 LB·SSL 종료 역할을 하고 있으나, NHN Cloud 배포 시 <span className="font-medium">NHN 관리형 Load Balancer</span>가 이 역할을 대체하여 Nginx 컨테이너는 제거된다.</li>
          </ul>
        </SubSection>

        <SubSection title='● Q8. "kubectl로 운영자가 직접 명령을 내릴 수 있나요?"'>
          <p className="text-sm mb-2">
            kubectl은 K8s 표준 CLI 도구로, NKS도 동일하게 지원한다. 다만 <span className="font-medium">모든 kubectl 명령은 Bastion Host를 경유</span>하여 실행하도록 정책을 설정한다.
          </p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>kubeconfig 파일은 운영기관이 보관 (외부 노출 금지)</li>
            <li>NKS API Server 접근은 강남구청 관리자망 IP만 허용</li>
            <li>사용자별 RBAC 권한 분리 (개발자=읽기 전용, 운영자=배포 권한)</li>
            <li>모든 명령은 NHN의 audit log에 기록되어 6개월 이상 보존</li>
          </ul>
        </SubSection>
      </CalcBox>
    </div>
  );
}
