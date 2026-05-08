"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅷ. 부록 — 기술 용어 (YAML·KVM·WAF+OWASP·JPA+QueryDSL·NAT Gateway) */
export default function AppendixContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        본문에 등장한 기술 용어 5가지 상세 설명.
        설정 파일 형식, 가상화 기술, 웹 보안, DB 접근, 외부 인터넷 출구.
      </p>
      <ComingSoon title="Ⅷ. 부록 — YAML · KVM · WAF · JPA · NAT Gateway" />
    </div>
  );
}
