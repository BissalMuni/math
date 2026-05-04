import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 수학 책 통합 마이그레이션
      { source: "/middle", destination: "/math/middle", permanent: true },
      { source: "/middle/:path*", destination: "/math/middle/:path*", permanent: true },
      { source: "/high", destination: "/math/high", permanent: true },
      { source: "/high/:path*", destination: "/math/high/:path*", permanent: true },
      { source: "/llm", destination: "/math/llm-math", permanent: true },
      { source: "/llm/:path*", destination: "/math/llm-math/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
