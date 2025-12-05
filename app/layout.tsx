import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import PathDetector from "../components/PathDetector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twinkle Tools - 实用工具集",
  description: "Twinkle Tools 是一个集合了各种实用工具的网站，提供高效、便捷的在线工具服务。",
};

// 需要排除Header和Footer的路径列表
const excludePaths = ["/admin", "/login"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PathDetector excludePaths={excludePaths}>
          <main className="flex-grow">{children}</main>
        </PathDetector>
      </body>
    </html>
  );
}
