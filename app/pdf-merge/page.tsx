import type { Metadata } from "next";
import PdfMerge from './PdfMerge';

export const metadata: Metadata = {
  title: "PDF合并工具 - 合并多个PDF或图片为一个PDF",
  description: "在线合并多个PDF或图片（JPG/PNG）为一个PDF，支持拖拽添加、排序、预览与下载。",
  keywords: "PDF合并, 合并PDF, 图片转PDF, 合并图片为PDF, 在线PDF工具",
  openGraph: {
    title: "PDF合并工具 - 合并多个PDF或图片为一个PDF",
    description: "在线合并多个PDF或图片（JPG/PNG）为一个PDF，支持拖拽添加、排序、预览与下载。",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "PDF合并工具 - 合并多个PDF或图片为一个PDF",
    description: "在线合并多个PDF或图片（JPG/PNG）为一个PDF，支持拖拽添加、排序、预览与下载。"
  }
};

const PdfMergePage = () => {
  return <PdfMerge />;
};

export default PdfMergePage;

