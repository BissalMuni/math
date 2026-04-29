/** 변경 전/후 비교 뷰 */
export function DiffView({
  before,
  after,
}: {
  before?: string | null;
  after?: string | null;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">변경 전</h3>
        <pre className="max-h-96 overflow-auto rounded-lg border border-red-200 bg-red-50 p-4 text-xs">
          {before || "(없음)"}
        </pre>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">변경 후</h3>
        <pre className="max-h-96 overflow-auto rounded-lg border border-green-200 bg-green-50 p-4 text-xs">
          {after || "(없음)"}
        </pre>
      </div>
    </div>
  );
}
