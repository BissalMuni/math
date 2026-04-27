"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SectionComment } from "@/components/section-comment";

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

    // slug 생성 헬퍼
    const toSlug = (text: string) =>
      text
        .replace(/[^\w가-힣]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    const inject = () => {
      const added: Portal[] = [];

      // ① section > h2 (중학교 등 기존 콘텐츠)
      root.querySelectorAll("section").forEach((section) => {
        const h2 = section.querySelector("h2");
        if (!h2 || injectedRef.current.has(h2)) return;
        injectedRef.current.add(h2);

        const rawId = section.getAttribute("id");
        const rawTitle = h2.textContent?.trim() ?? "";
        const slug = rawId || toSlug(rawTitle);

        const host = document.createElement("span");
        host.className = "sc-host inline-block ml-2 align-middle";
        h2.appendChild(host);
        added.push({ host, sectionSlug: slug, sectionTitle: rawTitle });
      });

      // ② section 밖의 h2 (llm-learn 등 CalcBox 콘텐츠)
      root.querySelectorAll("h2").forEach((h2) => {
        if (injectedRef.current.has(h2)) return;
        if (h2.closest("section")) return; // ①에서 이미 처리
        injectedRef.current.add(h2);

        const rawTitle = h2.textContent?.trim() ?? "";
        const slug = toSlug(rawTitle);

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
