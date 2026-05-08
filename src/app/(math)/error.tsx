'use client';

export default function MathError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
      {/* 오류 아이콘 */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">오류가 발생했습니다</h2>
      <p className="mb-6 text-gray-500">
        {error.message || '페이지를 로드하는 중 문제가 발생했습니다.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
