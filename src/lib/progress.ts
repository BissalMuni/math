"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "math-progress";

/** 완료한 소단원 ID 목록 가져오기 */
function getCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

/** 완료 상태 저장 */
function saveCompleted(completed: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
}

/** 소단원 진도 추적 hook */
export function useProgress(topicId: string) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(getCompleted().has(topicId));
  }, [topicId]);

  const toggle = useCallback(() => {
    const set = getCompleted();
    if (set.has(topicId)) {
      set.delete(topicId);
    } else {
      set.add(topicId);
    }
    saveCompleted(set);
    setCompleted(set.has(topicId));
  }, [topicId]);

  return { completed, toggle };
}
