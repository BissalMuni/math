"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅶ. 보안성 검토 — 자주 묻는 Q&A */
export default function SecurityReviewContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        보안성 검토 시 심사관이 묻는 8가지 질문과 모범 답변.
        Pod 책임 주체, 보안 패치, 데이터센터 점검, 해킹 책임, Worker Node, HA, Spring/Tomcat/Nginx 관계, kubectl 운영.
      </p>
      <ComingSoon title="Ⅶ. 보안성 검토 — 자주 묻는 Q&A 8개" />
    </div>
  );
}
