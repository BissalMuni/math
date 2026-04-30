"use client";

import { useEffect, useState } from "react";
import type { Role } from "./constants";

export interface SessionInfo {
  role: Role;
  label: string;
  permissions: readonly string[];
}

let cache: SessionInfo | null | undefined; // undefined = 미조회, null = 비로그인
const subscribers = new Set<(s: SessionInfo | null) => void>();
let inFlight: Promise<SessionInfo | null> | null = null;

async function load(): Promise<SessionInfo | null> {
  if (cache !== undefined) return cache;
  if (inFlight) return inFlight;
  inFlight = fetch("/api/auth/me", { cache: "no-store" })
    .then((res) => (res.ok ? (res.json() as Promise<SessionInfo>) : null))
    .catch(() => null)
    .then((s) => {
      cache = s;
      subscribers.forEach((fn) => fn(s));
      return s;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

/** 세션 캐시 무효화 (로그인/로그아웃 직후 호출) */
export function invalidateSession() {
  cache = undefined;
  load();
}

/**
 * 모든 컴포넌트가 단일 캐시를 공유하는 가벼운 세션 훅.
 * AutoSectionComment 가 여러 SectionComment 를 띄워도 /api/auth/me 는 1회만 호출됨.
 */
export function useSession() {
  // 초기값에서 캐시를 그대로 사용 (effect 안에서 setState 하지 않음)
  const [session, setSession] = useState<SessionInfo | null | undefined>(
    () => cache
  );

  useEffect(() => {
    let active = true;

    if (cache === undefined) {
      load().then((s) => active && setSession(s));
    }

    const update = (s: SessionInfo | null) => {
      if (active) setSession(s);
    };
    subscribers.add(update);
    return () => {
      active = false;
      subscribers.delete(update);
    };
  }, []);

  return {
    session: session ?? null,
    loading: session === undefined,
    can: (perm: string) => !!session && session.permissions.includes(perm),
  };
}
