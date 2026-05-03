"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SectionComment } from "@/components/feedback/section-comment";

interface Portal {
  host: HTMLElement;
  sectionSlug: string;
  sectionTitle: string;
}

/**
 * 컨텐츠 영역의 모든 <h2>, <h3> 옆에 SectionComment 버튼 자동 주입.
 * - h2: CalcBox 소목차 (level="section")
 * - h3: SubSection 소소목차 (level="section")
 * React.lazy 로 늦게 로드된 컨텐츠도 MutationObserver 로 감지.
 */
export function AutoSectionComment({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [portals, setPortals] = useState<Portal[]>([]);
  // 이미 처리한 h2 추적
  const injectedRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const inject = () => {
      // h2 (CalcBox 소목차) + h3 (SubSection 소소목차) 모두 감지
      const headings = root.querySelectorAll("h2, h3");
      const added: Portal[] = [];

      headings.forEach((heading) => {
        if (injectedRef.current.has(heading)) return;
        injectedRef.current.add(heading);

        // 부모 section의 id 우선, 없으면 제목으로 slug 생성
        const parentSection = heading.closest("section");
        const rawId = parentSection?.getAttribute("id");
        const rawTitle = heading.textContent?.trim() ?? "";
        const slug =
          rawId && heading.tagName === "H2"
            ? rawId
            : rawTitle
                .replace(/[^\w가-힣]/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
                .toLowerCase();

        // heading 안에 주입 컨테이너 삽입
        const host = document.createElement("span");
        host.className = "sc-host inline-block ml-2 align-middle";
        heading.appendChild(host);

        added.push({ host, sectionSlug: slug, sectionTitle: rawTitle });
      });

      if (added.length > 0) {
        setPortals((prev) => [...prev, ...added]);
      }
    };

    // 초기 실행 (콘텐츠가 이미 있을 경우)
    inject();

    // React.lazy 로 늦게 로드되는 컨텐츠 감지
    const observer = new MutationObserver(inject);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [containerRef]);

  return (
    <>
      {portals.map(({ host, sectionSlug, sectionTitle }) =>
        createPortal(
          <SectionComment sectionSlug={sectionSlug} sectionTitle={sectionTitle} />,
          host
        )
      )}
    </>
  );
}
