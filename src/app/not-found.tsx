import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
      {/* 404 아이콘 */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="mb-2 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-gray-500">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
