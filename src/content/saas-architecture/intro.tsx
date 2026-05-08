"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅰ. 개요 — 시스템 전체 구조 + 책임 분담 */
export default function IntroContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        SaaS 시스템을 구성하는 10개 계층의 책임 분담 모델 개요.
        응용 SW부터 물리 데이터센터까지 CSAP 책임공유모델에 따라 운영기관과 CSP가 책임을 나눠 가진다.
      </p>
      <ComingSoon title="Ⅰ. 개요 — 시스템 전체 구조 + 책임 분담" />
    </div>
  );
}
