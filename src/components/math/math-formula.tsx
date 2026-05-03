"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

/** 인라인 수식 */
export function InlineMath({ math }: { math: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: false,
      });
    }
  }, [math]);

  return <span ref={ref} />;
}

/** 블록 수식 */
export function BlockMath({ math }: { math: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [math]);

  return <div ref={ref} className="my-4 overflow-x-auto" />;
}
