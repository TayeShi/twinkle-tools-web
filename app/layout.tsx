import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twinkle Tools - 在线图片处理工具 | 浏览器端处理，保护隐私",
  description: "完全在浏览器中运行的图片处理工具，支持图片压缩、格式转换等功能。不上传数据到服务器，100%保护您的隐私。快速、安全、免费。",
  keywords: ["图片压缩", "图片格式转换", "在线图片工具", "浏览器端处理", "隐私保护", "图片处理", "JPG压缩", "PNG压缩", "WEBP转换"],
  authors: [{ name: "Twinkle Tools" }],
  openGraph: {
    title: "Twinkle Tools - 在线图片处理工具 | 浏览器端处理，保护隐私",
    description: "完全在浏览器中运行的图片处理工具，支持图片压缩、格式转换等功能。不上传数据到服务器，100%保护您的隐私。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twinkle Tools - 在线图片处理工具 | 浏览器端处理，保护隐私",
    description: "完全在浏览器中运行的图片处理工具，支持图片压缩、格式转换等功能。不上传数据到服务器，100%保护您的隐私。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
