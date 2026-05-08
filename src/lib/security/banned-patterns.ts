/**
 * 댓글 본문에서 차단·플래그할 패턴 정의.
 *
 * 운영 중 새 인젝션 사례가 발견되면 BANNED_PATTERNS 에 항목만 추가하면 된다.
 * 패턴 id 는 flag_reason 에 그대로 기록되어 사후 추적이 가능하다.
 *
 * 설계 원칙:
 *   - 오탐(false positive) 최소화 — 정상 한국어 댓글이 걸리면 안 된다
 *   - 한국어 + 영어 모두 커버
 *   - LLM 인젝션 마커(ChatML 등)는 강한 신호 — 정상 입력엔 절대 안 들어감
 */

export interface BannedPattern {
  id: string;
  pattern: RegExp;
  reason: string;
}

export const BANNED_PATTERNS: BannedPattern[] = [
  // ── LLM 제어 토큰 (강한 신호) ──────────────────────────────
  {
    id: "chatml-marker",
    pattern: /<\|(?:im_start|im_end|system|user|assistant|endoftext)\|>/i,
    reason: "LLM 제어 토큰",
  },
  {
    id: "role-tag",
    pattern: /<\/?(?:system|assistant)>/i,
    reason: "LLM 역할 태그",
  },
  {
    id: "closing-input-delimiter",
    pattern: /<\/(?:user_input|input|instructions|data|prompt)>/i,
    reason: "입력 격리 구분자 종료",
  },

  // ── 영문 인젝션 명령 ────────────────────────────────────
  {
    id: "ignore-previous-en",
    pattern:
      /\bignore\s+(?:the\s+)?(?:previous|prior|above|all|earlier)\s+(?:instructions?|prompts?|rules?|directions?|messages?)/i,
    reason: "이전 지시 무시 명령(en)",
  },
  {
    id: "disregard-previous-en",
    pattern: /\bdisregard\s+(?:the\s+)?(?:previous|prior|above|all|earlier)/i,
    reason: "이전 지시 무시 명령(en)",
  },
  {
    id: "forget-previous-en",
    pattern: /\bforget\s+(?:everything|all|previous|prior)/i,
    reason: "이전 지시 무시 명령(en)",
  },
  {
    id: "system-override-en",
    pattern: /\b(?:new|updated)\s+(?:system|admin)\s+(?:prompt|instructions?|rules?)/i,
    reason: "시스템 프롬프트 교체 시도(en)",
  },

  // ── 한글 인젝션 명령 ───────────────────────────────────
  {
    id: "ignore-previous-ko",
    // "이전 지시 무시", "위 규칙은 무시하라", "이전 지시는 모두 무시하고" 등
    // 주어(이전/위/기존/모든/앞) + 대상(지시/규칙/...) + 최대 15자 사이 + 동사(무시/잊/...)
    pattern: /(?:이전|위|기존|모든|앞)\s*(?:의?\s*)?(?:지시|규칙|명령|가이드|지침|프롬프트)[^\n]{0,15}?(?:무시|잊|취소|폐기)/,
    reason: "이전 지시 무시 명령(ko)",
  },
  {
    id: "admin-claim-ko",
    // "관리자: ...", "[관리자]: ...", "시스템 : ..." 등을 매칭
    pattern: /(?:^|\s)\[?(?:관리자|시스템|운영자)\]?\s*[:：]\s*\S/,
    reason: "관리자/시스템 사칭(ko)",
  },
  {
    id: "system-override-ko",
    pattern: /(?:새로운?|새|변경된)\s*(?:시스템|관리자)\s*(?:프롬프트|지시|규칙|명령)/,
    reason: "시스템 프롬프트 교체 시도(ko)",
  },
];

/**
 * 정상 입력에 들어올 일 없는 보이지 않는 문자.
 * Unicode "Format" 카테고리(\p{Cf}) — zero-width space, bidi override,
 * word joiner, BOM, 소프트 하이픈 등을 포괄한다.
 */
export const ZERO_WIDTH_CHARS = /\p{Cf}/gu;

/** 제어 문자 (탭 \t, 개행 \n, 캐리지리턴 \r 은 보존) */
export const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
