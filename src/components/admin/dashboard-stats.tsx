const CHANGE_TYPE_LABELS: Record<string, string> = {
  content_edit: "내용 수정",
  structure_edit: "구조 수정",
  automated_feedback: "자동 반영",
  rollback: "되돌리기",
};

export function DashboardStats({
  total,
  today,
  thisWeek,
  byType,
}: {
  total: number;
  today: number;
  thisWeek: number;
  byType: Record<string, number>;
}) {
  const stats = [
    { label: "전체 변경", value: total },
    { label: "오늘", value: today },
    { label: "이번 주", value: thisWeek },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {Object.keys(byType).length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mb-3 text-sm font-medium text-gray-700">유형별 분류</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(byType).map(([type, count]) => (
              <span
                key={type}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {CHANGE_TYPE_LABELS[type] || type}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
