/** 책 (Book) — 학습 단위. URL·폴더·관리의 독립 단위. */
export interface Book {
  /** 책 ID = URL prefix = 폴더명 어간 (Book Naming Authority) */
  id: string;
  /** URL 경로 접두사 (id와 동일) */
  basePath: string;
  /** 책 표시 이름 (UX용 자연어, id와 별개) */
  title: string;
  /** 책 설명 */
  description: string;
  /** 루트 노드 배열 (학년·과목·분류 등) */
  children: TreeNode[];
}

/** 교육과정 트리 노드 타입 */
export interface TreeNode {
  /** 고유 ID (예: "m1-prime-composite") */
  id: string;
  /** URL 세그먼트 (예: "prime-composite") */
  slug: string;
  /** 표시 이름 (예: "소수와 합성수") */
  title: string;
  /** 하위 노드 (leaf node는 없음) */
  children?: TreeNode[];
}

/** 트리에서 id로 노드와 경로(조상 배열)를 찾기 */
export function findNodePath(
  nodes: TreeNode[],
  targetId: string,
  path: TreeNode[] = []
): TreeNode[] | null {
  for (const node of nodes) {
    const currentPath = [...path, node];
    if (node.id === targetId) return currentPath;
    if (node.children) {
      const found = findNodePath(node.children, targetId, currentPath);
      if (found) return found;
    }
  }
  return null;
}

/** slug 경로 배열로 leaf node 찾기 */
export function findNodeBySlugs(
  nodes: TreeNode[],
  slugs: string[]
): TreeNode | null {
  if (slugs.length === 0) return null;
  const [current, ...rest] = slugs;
  const node = nodes.find((n) => n.slug === current);
  if (!node) return null;
  if (rest.length === 0) return node;
  if (!node.children) return null;
  return findNodeBySlugs(node.children, rest);
}

/** leaf node인지 확인 */
export function isLeafNode(node: TreeNode): boolean {
  return !node.children || node.children.length === 0;
}
