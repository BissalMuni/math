"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RollbackButton({ changeId }: { changeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleRollback() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changeId }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "되돌리기 실패");
        return;
      }

      alert("되돌리기 완료");
      router.refresh();
    } catch {
      alert("서버 연결 실패");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
      >
        되돌리기
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-orange-600">정말 되돌리시겠습니까?</span>
      <button
        onClick={handleRollback}
        disabled={loading}
        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "처리 중..." : "확인"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        취소
      </button>
    </div>
  );
}
