"use client";

import { useState, useCallback } from "react";
import type { TreeNode, CategoryRoot } from "@/structure/types";

// ─── 타입 ────────────────────────────────────────────────────────────────────

interface Props {
  categories: CategoryRoot[];
}

interface EditingNode {
  id: string;
  title: string;
  slug: string;
}

// ─── 유틸 ────────────────────────────────────────────────────────────────────

/** 고유 ID 생성 */
function generateId(parentId: string, index: number): string {
  return `${parentId}-new${index}`;
}

/** 트리 깊은 복사 */
function cloneTree(nodes: TreeNode[]): TreeNode[] {
  return nodes.map((n) => ({
    ...n,
    children: n.children ? cloneTree(n.children) : undefined,
  }));
}

/** 트리에서 특정 노드의 부모와 인덱스 찾기 */
function findParentAndIndex(
  nodes: TreeNode[],
  targetId: string
): { parent: TreeNode[] | null; index: number } {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === targetId) return { parent: nodes, index: i };
    if (nodes[i].children) {
      const result = findParentAndIndex(nodes[i].children!, targetId);
      if (result.parent) return result;
    }
  }
  return { parent: null, index: -1 };
}

/** 트리에서 ID로 노드 찾기 */
function findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

/** slug 유효성 검사 (영문 케밥케이스) */
function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────────

export function StructureTreeEditor({ categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id ?? ""
  );
  const [trees, setTrees] = useState<Record<string, TreeNode[]>>(() => {
    const map: Record<string, TreeNode[]> = {};
    for (const cat of categories) {
      map[cat.id] = cloneTree(cat.children);
    }
    return map;
  });
  const [editingNode, setEditingNode] = useState<EditingNode | null>(null);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeSlug, setNewNodeSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set()
  );

  const currentCategory = categories.find(
    (c) => c.id === selectedCategoryId
  );
  const currentTree = trees[selectedCategoryId] ?? [];

  // 변경 여부 확인
  const originalTree = categories.find(
    (c) => c.id === selectedCategoryId
  )?.children;
  const hasChanges =
    JSON.stringify(currentTree) !== JSON.stringify(originalTree);

  /** 트리 업데이트 */
  const updateTree = useCallback(
    (updater: (nodes: TreeNode[]) => TreeNode[]) => {
      setTrees((prev) => ({
        ...prev,
        [selectedCategoryId]: updater(cloneTree(prev[selectedCategoryId] ?? [])),
      }));
    },
    [selectedCategoryId]
  );

  /** 토글 펼치기/접기 */
  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  /** 노드 삭제 */
  const deleteNode = (nodeId: string) => {
    const node = findNodeById(currentTree, nodeId);
    const childCount = node?.children?.length ?? 0;
    const msg =
      childCount > 0
        ? `"${node?.title}" 및 하위 ${childCount}개 노드를 삭제하시겠습니까?`
        : `"${node?.title}"을(를) 삭제하시겠습니까?`;

    if (!confirm(msg)) return;

    updateTree((nodes) => {
      const { parent, index } = findParentAndIndex(nodes, nodeId);
      if (parent) parent.splice(index, 1);
      return nodes;
    });
  };

  /** 노드 수정 저장 */
  const saveEdit = () => {
    if (!editingNode) return;
    if (!isValidSlug(editingNode.slug)) {
      alert("slug는 영문 소문자와 하이픈만 사용 (예: my-topic)");
      return;
    }

    updateTree((nodes) => {
      const node = findNodeById(nodes, editingNode.id);
      if (node) {
        node.title = editingNode.title;
        node.slug = editingNode.slug;
      }
      return nodes;
    });
    setEditingNode(null);
  };

  /** 새 노드 추가 */
  const addNode = (parentId: string) => {
    if (!newNodeTitle.trim() || !newNodeSlug.trim()) {
      alert("제목과 slug를 모두 입력해주세요");
      return;
    }
    if (!isValidSlug(newNodeSlug)) {
      alert("slug는 영문 소문자와 하이픈만 사용 (예: my-topic)");
      return;
    }

    updateTree((nodes) => {
      const parent = findNodeById(nodes, parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        const newId = generateId(
          parentId,
          parent.children.length + 1
        );
        parent.children.push({
          id: newId,
          slug: newNodeSlug.trim(),
          title: newNodeTitle.trim(),
        });
      }
      return nodes;
    });

    // 부모 펼치기
    setExpandedNodes((prev) => new Set(prev).add(parentId));
    setAddingTo(null);
    setNewNodeTitle("");
    setNewNodeSlug("");
  };

  /** 루트 레벨 노드 추가 */
  const addRootNode = () => {
    if (!newNodeTitle.trim() || !newNodeSlug.trim()) {
      alert("제목과 slug를 모두 입력해주세요");
      return;
    }
    if (!isValidSlug(newNodeSlug)) {
      alert("slug는 영문 소문자와 하이픈만 사용");
      return;
    }

    updateTree((nodes) => {
      const newId = `${selectedCategoryId}-root${nodes.length + 1}`;
      nodes.push({
        id: newId,
        slug: newNodeSlug.trim(),
        title: newNodeTitle.trim(),
      });
      return nodes;
    });
    setAddingTo(null);
    setNewNodeTitle("");
    setNewNodeSlug("");
  };

  /** 노드 위로 이동 */
  const moveUp = (nodeId: string) => {
    updateTree((nodes) => {
      const { parent, index } = findParentAndIndex(nodes, nodeId);
      if (parent && index > 0) {
        [parent[index - 1], parent[index]] = [parent[index], parent[index - 1]];
      }
      return nodes;
    });
  };

  /** 노드 아래로 이동 */
  const moveDown = (nodeId: string) => {
    updateTree((nodes) => {
      const { parent, index } = findParentAndIndex(nodes, nodeId);
      if (parent && index < parent.length - 1) {
        [parent[index], parent[index + 1]] = [parent[index + 1], parent[index]];
      }
      return nodes;
    });
  };

  /** GitHub에 저장 */
  const handleSave = async () => {
    if (!currentCategory || !hasChanges) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/structure", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: {
            ...currentCategory,
            children: currentTree,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "저장 실패" });
        return;
      }

      setMessage({
        type: "success",
        text: `저장 완료 (commit: ${data.commit?.slice(0, 7)})`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "네트워크 오류",
      });
    } finally {
      setSaving(false);
    }
  };

  // ── 노드 렌더링 ──────────────────────────────────────────────────────────

  const renderNode = (node: TreeNode, depth: number) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isEditing = editingNode?.id === node.id;
    const isAddingChild = addingTo === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`group flex items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-50 ${
            depth === 0 ? "font-medium" : ""
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {/* 펼치기/접기 */}
          <button
            onClick={() => toggleExpand(node.id)}
            className="flex h-5 w-5 items-center justify-center text-gray-400 hover:text-gray-600"
          >
            {hasChildren ? (isExpanded ? "▾" : "▸") : "·"}
          </button>

          {/* 제목 + slug */}
          {isEditing ? (
            <div className="flex flex-1 items-center gap-2">
              <input
                type="text"
                value={editingNode.title}
                onChange={(e) =>
                  setEditingNode({ ...editingNode, title: e.target.value })
                }
                className="rounded border px-2 py-0.5 text-sm"
                placeholder="제목"
                autoFocus
              />
              <input
                type="text"
                value={editingNode.slug}
                onChange={(e) =>
                  setEditingNode({ ...editingNode, slug: e.target.value })
                }
                className="rounded border px-2 py-0.5 text-sm font-mono"
                placeholder="slug"
              />
              <button
                onClick={saveEdit}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                확인
              </button>
              <button
                onClick={() => setEditingNode(null)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                취소
              </button>
            </div>
          ) : (
            <>
              <span
                className="flex-1 cursor-pointer text-sm"
                onClick={() => toggleExpand(node.id)}
              >
                {node.title}
              </span>
              <span className="font-mono text-xs text-gray-400">
                {node.slug}
              </span>

              {/* 액션 버튼 */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() =>
                    setEditingNode({
                      id: node.id,
                      title: node.title,
                      slug: node.slug,
                    })
                  }
                  className="rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-200"
                  title="수정"
                >
                  ✏
                </button>
                <button
                  onClick={() => {
                    setAddingTo(node.id);
                    setNewNodeTitle("");
                    setNewNodeSlug("");
                  }}
                  className="rounded px-1.5 py-0.5 text-xs text-green-600 hover:bg-green-50"
                  title="하위 추가"
                >
                  +
                </button>
                <button
                  onClick={() => moveUp(node.id)}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-200"
                  title="위로"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(node.id)}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-200"
                  title="아래로"
                >
                  ↓
                </button>
                <button
                  onClick={() => deleteNode(node.id)}
                  className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-50"
                  title="삭제"
                >
                  ×
                </button>
              </div>
            </>
          )}
        </div>

        {/* 하위 노드 추가 폼 */}
        {isAddingChild && (
          <div
            className="flex items-center gap-2 py-1"
            style={{ paddingLeft: `${(depth + 1) * 20 + 28}px` }}
          >
            <input
              type="text"
              value={newNodeTitle}
              onChange={(e) => setNewNodeTitle(e.target.value)}
              className="rounded border px-2 py-0.5 text-sm"
              placeholder="제목"
              autoFocus
            />
            <input
              type="text"
              value={newNodeSlug}
              onChange={(e) => setNewNodeSlug(e.target.value)}
              className="w-32 rounded border px-2 py-0.5 text-sm font-mono"
              placeholder="slug"
            />
            <button
              onClick={() => addNode(node.id)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              추가
            </button>
            <button
              onClick={() => setAddingTo(null)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              취소
            </button>
          </div>
        )}

        {/* 하위 노드 */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // ── 렌더링 ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* 카테고리 탭 */}
      <div className="flex gap-2 border-b pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategoryId(cat.id);
              setEditingNode(null);
              setAddingTo(null);
            }}
            className={`rounded-t px-4 py-2 text-sm font-medium ${
              selectedCategoryId === cat.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* 트리 */}
      <div className="rounded border bg-white">
        <div className="max-h-[600px] overflow-y-auto p-2">
          {currentTree.map((node) => renderNode(node, 0))}
        </div>

        {/* 루트 노드 추가 */}
        <div className="border-t p-2">
          {addingTo === "__root__" ? (
            <div className="flex items-center gap-2 px-2">
              <input
                type="text"
                value={newNodeTitle}
                onChange={(e) => setNewNodeTitle(e.target.value)}
                className="rounded border px-2 py-0.5 text-sm"
                placeholder="제목"
                autoFocus
              />
              <input
                type="text"
                value={newNodeSlug}
                onChange={(e) => setNewNodeSlug(e.target.value)}
                className="w-32 rounded border px-2 py-0.5 text-sm font-mono"
                placeholder="slug"
              />
              <button
                onClick={addRootNode}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                추가
              </button>
              <button
                onClick={() => setAddingTo(null)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAddingTo("__root__");
                setNewNodeTitle("");
                setNewNodeSlug("");
              }}
              className="text-sm text-green-600 hover:text-green-800"
            >
              + 루트 노드 추가
            </button>
          )}
        </div>
      </div>

      {/* 메시지 */}
      {message && (
        <div
          className={`rounded px-4 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 저장 버튼 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`rounded px-6 py-2 text-sm font-medium text-white ${
            hasChanges && !saving
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300"
          }`}
        >
          {saving ? "저장 중..." : "GitHub에 저장"}
        </button>
        {hasChanges && (
          <span className="text-xs text-amber-600">변경사항이 있습니다</span>
        )}
      </div>
    </div>
  );
}
