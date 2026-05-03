import type { TreeNode, CategoryRoot } from "@/structure/types";

/** 카테고리 ID → 파일명 및 export 변수명 매핑 */
const CATEGORY_META: Record<
  string,
  { fileName: string; varName: string; description: string }
> = {
  middle: {
    fileName: "middle-school.ts",
    varName: "middleSchool",
    description: "중학교 수학 교육과정 (2022 개정)",
  },
  high: {
    fileName: "high-school.ts",
    varName: "highSchool",
    description: "고등학교 수학 교육과정 (2022 개정)",
  },
  "llm-learn": {
    fileName: "llm-learning.ts",
    varName: "llmLearning",
    description: "LLM 학습 — 트랜스포머 아키텍처 완전 가이드",
  },
};

/** TreeNode를 TypeScript 소스 코드 문자열로 변환 */
function serializeNode(node: TreeNode, indent: number): string {
  const pad = " ".repeat(indent);
  const isLeaf = !node.children || node.children.length === 0;

  if (isLeaf) {
    return `${pad}{ id: ${JSON.stringify(node.id)}, slug: ${JSON.stringify(node.slug)}, title: ${JSON.stringify(node.title)} }`;
  }

  const childrenStr = node.children!
    .map((child) => serializeNode(child, indent + 2))
    .join(",\n");

  return [
    `${pad}{`,
    `${pad}  id: ${JSON.stringify(node.id)},`,
    `${pad}  slug: ${JSON.stringify(node.slug)},`,
    `${pad}  title: ${JSON.stringify(node.title)},`,
    `${pad}  children: [`,
    childrenStr + ",",
    `${pad}  ],`,
    `${pad}}`,
  ].join("\n");
}

/** CategoryRoot를 완전한 TypeScript 파일 소스로 변환 */
export function serializeCategoryToTS(category: CategoryRoot): string {
  const meta = CATEGORY_META[category.id];
  if (!meta) {
    throw new Error(`알 수 없는 카테고리: ${category.id}`);
  }

  const childrenStr = category.children
    .map((child) => serializeNode(child, 4))
    .join(",\n\n");

  return `import type { CategoryRoot } from "./types";

/** ${meta.description} */
export const ${meta.varName}: CategoryRoot = {
  id: ${JSON.stringify(category.id)},
  basePath: ${JSON.stringify(category.basePath)},
  title: ${JSON.stringify(category.title)},
  description: ${JSON.stringify(category.description)},
  children: [
${childrenStr},
  ],
};
`;
}

/** 트리에서 모든 leaf node id를 수집 */
export function collectLeafIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (!node.children || node.children.length === 0) {
      ids.push(node.id);
    } else {
      ids.push(...collectLeafIds(node.children));
    }
  }
  return ids;
}

/** 카테고리 메타 정보 조회 */
export function getCategoryMeta(categoryId: string) {
  return CATEGORY_META[categoryId] ?? null;
}
