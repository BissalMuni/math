/**
 * 댓글 본문 sanitizer — DB 저장 직전(① 입력단)에 호출된다.
 *
 * 책임:
 *   1. 보이지 않는 문자(zero-width, bidi override 등) 제거 — 항상
 *   2. 제어 문자 제거 — 항상
 *   3. 길이 초과 시 자르고 플래그
 *   4. 인젝션 패턴 감지 시 플래그 (본문은 보존)
 *
 * 설계 결정:
 *   - 본문은 정제하되 보존한다 — 운영자가 원본을 사후 검토할 수 있어야 함
 *   - 플래그된 댓글은 fetch-feedback.sh 의 자동화 쿼리에서 제외된다
 *   - 정상 댓글에 영향이 가지 않도록 패턴은 보수적으로 선택
 */

import {
  BANNED_PATTERNS,
  ZERO_WIDTH_CHARS,
  CONTROL_CHARS,
} from "./banned-patterns";

export const COMMENT_BODY_MAX_LENGTH = 3000;

export interface SanitizeResult {
  /** 정제된 본문 (제로폭·제어 문자 제거 + 길이 초과 시 절단) */
  body: string;
  /** 의심 패턴 또는 길이 초과로 플래그된 경우 true */
  flagged: boolean;
  /** 플래그 사유 — DB flag_reason 컬럼에 그대로 저장 */
  flagReason?: string;
}

export function sanitizeCommentBody(raw: string): SanitizeResult {
  // 1. 항상 정제 — 보이지 않는 문자·제어 문자 제거 후 trim
  const normalized = raw
    .replace(ZERO_WIDTH_CHARS, "")
    .replace(CONTROL_CHARS, "")
    .trim();

  let body = normalized;
  let flagged = false;
  let flagReason: string | undefined;

  // 2. 길이 초과 — 자르고 플래그
  if (body.length > COMMENT_BODY_MAX_LENGTH) {
    body = body.slice(0, COMMENT_BODY_MAX_LENGTH);
    flagged = true;
    flagReason = "길이 초과 (length-exceeded)";
  }

  // 3. 인젝션 패턴 감지 — 첫 매칭만 기록 (플래그 사유 노이즈 방지)
  for (const p of BANNED_PATTERNS) {
    if (p.pattern.test(body)) {
      flagged = true;
      const next = `${p.reason} (${p.id})`;
      flagReason = flagReason ? `${flagReason}; ${next}` : next;
      break;
    }
  }

  return { body, flagged, flagReason };
}
