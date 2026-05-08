"use client";

import { ComingSoon } from "@/components/content/shared";

/** Ⅳ. 가용성·부하분산 — Load Balancer + High Availability */
export default function AvailabilityContent() {
  return (
    <div className="space-y-8">
      <p className="text-muted">
        분담 영역 — Load Balancer(LB)와 High Availability(HA).
        LB가 헬스체크로 자동 장애 감지·인계하여 HA를 달성하는 메커니즘을 다룬다.
      </p>
      <ComingSoon title="Ⅳ. 가용성·부하분산 — LB + HA" />
    </div>
  );
}
