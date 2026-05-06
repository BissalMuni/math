import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Sidebar } from "@/components/navigation/sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "수학 학습",
  description: "중·고등 수학 + LLM 수학을 인터랙티브 웹으로 학습",
};

// 하이드레이션 전 localStorage에서 테마를 읽어 <html data-theme>을 미리 설정 (FOUC 방지)
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-full flex">
        <ThemeProvider>
          <Sidebar />
          <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
