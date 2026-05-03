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
 * 컨텐츠 영역의 모든 <section> <h2> 옆에 SectionComment 버튼 자동 주입.
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
      const sections = root.querySelectorAll("section");
      const added: Portal[] = [];

      sections.forEach((section) => {
        const h2 = section.querySelector("h2");
        if (!h2 || injectedRef.current.has(h2)) return;

        injectedRef.current.add(h2);

        // section id 우선, 없으면 제목으로 slug 생성
        const rawId = section.getAttribute("id");
        const rawTitle = h2.textContent?.trim() ?? "";
        const slug =
          rawId ||
          rawTitle
            .replace(/[^\w가-힣]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

        // h2 안에 주입 컨테이너 삽입
        const host = document.createElement("span");
        host.className = "sc-host inline-block ml-2 align-middle";
        h2.appendChild(host);

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
