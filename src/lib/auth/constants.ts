/** 역할 목록 (권한 낮은 순서) */
export const ROLES = [
  "reader",
  "editor",
  "subadmin",
  "admin",
  "superadmin",
] as const;

export type Role = (typeof ROLES)[number];

/** 역할별 권한 */
export const ROLE_PERMISSIONS: Record<Role, readonly string[]> = {
  reader: ["read"],
  editor: ["read", "edit_content"],
  subadmin: ["read", "edit_content", "edit_structure"],
  admin: ["read", "edit_content", "edit_structure", "view_audit", "rollback"],
  superadmin: ["read", "edit_content", "edit_structure", "view_audit", "rollback", "manage_books", "manage_baskets"],
};

/** 역할별 한국어 라벨 */
export const ROLE_LABELS: Record<Role, string> = {
  reader: "읽기 전용",
  editor: "편집자",
  subadmin: "부관리자",
  admin: "관리자",
  superadmin: "최고 관리자",
};

/** 역할이 특정 권한을 가지는지 확인 */
export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
