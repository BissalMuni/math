/** 역할 목록 (권한 낮은 순서) */
export const ROLES = [
  "reader",
  "content_editor",
  "structure_editor",
  "super_admin",
] as const;

export type Role = (typeof ROLES)[number];

/** 역할별 권한 */
export const ROLE_PERMISSIONS: Record<Role, readonly string[]> = {
  reader: ["read"],
  content_editor: ["read", "edit_content"],
  structure_editor: ["read", "edit_structure"],
  super_admin: ["read", "edit_content", "edit_structure", "view_audit", "rollback"],
};

/** 역할별 한국어 라벨 */
export const ROLE_LABELS: Record<Role, string> = {
  reader: "읽기 전용",
  content_editor: "내용 수정자",
  structure_editor: "구조 수정자",
  super_admin: "최고 관리자",
};

/** 역할이 특정 권한을 가지는지 확인 */
export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
