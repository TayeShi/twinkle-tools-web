import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twinkle Tools - 在线图片处理工具',
  description: '完全在浏览器中运行的在线图片处理工具，不上传任何数据到服务器，保护用户隐私，提供快速、安全的图片处理体验',
  keywords: '图片压缩, 图片格式转换, 在线图片工具, 隐私保护, 图片处理',
  openGraph: {
    title: 'Twinkle Tools - 在线图片处理工具',
    description: '完全在浏览器中运行的在线图片处理工具，不上传任何数据到服务器',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twinkle Tools - 在线图片处理工具',
    description: '完全在浏览器中运行的在线图片处理工具',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
