import type { Metadata } from "next";
import PdfToImage from './PdfToImage';

// SEO元数据
export const metadata: Metadata = {
  title: "PDF转图片工具 - 在线免费PDF转JPG/PNG/WebP",
  description: "免费在线PDF转图片工具，支持PDF转JPG、PDF转PNG、PDF转WebP，支持批量转换、图片压缩、黑白转换，提供图片预览和下载功能。",
  keywords: "PDF转图片, PDF转JPG, PDF转PNG, PDF转WebP, 在线PDF转图片, PDF批量转图片",
  openGraph: {
    title: "PDF转图片工具 - 在线免费PDF转JPG/PNG/WebP",
    description: "免费在线PDF转图片工具，支持PDF转JPG、PDF转PNG、PDF转WebP，支持批量转换、图片压缩、黑白转换，提供图片预览和下载功能。",
    images: [
      {
        url: "https://twinkletools.com/images/pdf-to-image-og.jpg",
        width: 1200,
        height: 630,
        alt: "PDF转图片工具"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF转图片工具 - 在线免费PDF转JPG/PNG/WebP",
    description: "免费在线PDF转图片工具，支持PDF转JPG、PDF转PNG、PDF转WebP，支持批量转换、图片压缩、黑白转换，提供图片预览和下载功能。",
    images: ["https://twinkletools.com/images/pdf-to-image-og.jpg"]
  }
};

// 页面组件
const PdfToImagePage = () => {
  return <PdfToImage />;
};

export default PdfToImagePage;
