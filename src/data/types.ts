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

/** 카테고리 루트 (중학교, 고등학교, LLM) */
export interface CategoryRoot {
  /** 카테고리 ID */
  id: string;
  /** URL 경로 접두사 (예: "middle", "high", "llm") */
  basePath: string;
  /** 카테고리 표시 이름 */
  title: string;
  /** 카테고리 설명 */
  description: string;
  /** 루트 노드 배열 (학년 또는 과목) */
  children: TreeNode[];
}

/** leaf node인지 확인 */
export function isLeafNode(node: TreeNode): boolean {
  return !node.children || node.children.length === 0;
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
