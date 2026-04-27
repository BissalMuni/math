import { ComingSoon } from "./shared";
import type { TreeNode } from "@/data";

/** 준비 중 stub — node.title을 받아서 표시 */
export function StubContent({ node }: { node: TreeNode }) {
  return <ComingSoon title={node.title} />;
}
