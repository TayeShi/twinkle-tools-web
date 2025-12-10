import type { Metadata } from "next";
import ImageCompressor from "./ImageCompressor";

// 添加页面特定的SEO metadata
export const metadata: Metadata = {
  title: "图片压缩工具 - Twinkle Tools",
  description: "免费在线图片压缩工具，支持JPEG、PNG、WebP格式，可自定义压缩大小和黑白转换，批量处理多张图片。",
  keywords: "图片压缩,在线压缩,图片优化,压缩图片,免费压缩工具,JPEG压缩,PNG压缩,WebP压缩",
  openGraph: {
    title: "图片压缩工具 - Twinkle Tools",
    description: "免费在线图片压缩工具，支持多种格式和批量处理。",
    type: "website",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressor />;
}

