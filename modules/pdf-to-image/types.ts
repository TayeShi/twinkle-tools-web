// PDF转图片配置类型
export interface PdfToImageConfig {
  // 图片格式
  format: 'png' | 'jpg' | 'webp';
  // 最大宽度（px）
  maxWidth: number;
  // 最大高度（px）
  maxHeight: number;
  // 是否转换为黑白
  isBlackWhite: boolean;
  // 图片质量（0-1）
  quality: number;
  // 最大文件大小（bytes）
  maxFileSize?: number;
}

// PDF页面信息
export interface PdfPageInfo {
  // 页面索引
  index: number;
  // 原始宽度
  originalWidth: number;
  // 原始高度
  originalHeight: number;
  // 旋转角度
  rotation: number;
}

// 转换后的图片信息
export interface ConvertedImage {
  // 图片ID
  id: string;
  // 对应PDF页面索引
  pageIndex: number;
  // 图片URL
  url: string;
  // 图片格式
  format: string;
  // 图片宽度
  width: number;
  // 图片高度
  height: number;
  // 图片大小（bytes）
  size: number;
  // 转换时间（ms）
  conversionTime: number;
}

// PDF文件信息
export interface PdfFile {
  // 文件ID
  id: string;
  // 原始文件
  file: File;
  // 文件名
  name: string;
  // 文件大小（bytes）
  size: number;
  // PDF页面数量
  pageCount: number;
  // 页面信息列表
  pages: PdfPageInfo[];
  // 转换后的图片列表
  convertedImages: ConvertedImage[];
  // 转换状态
  status: 'pending' | 'converting' | 'completed' | 'error';
  // 转换进度（0-1）
  progress: number;
  // 错误信息
  error?: string;
}

// 转换进度信息
export interface ConversionProgress {
  // 当前页面
  currentPage: number;
  // 总页面数
  totalPages: number;
  // 整体进度（0-1）
  overallProgress: number;
  // 预计剩余时间（ms）
  estimatedTimeRemaining?: number;
}

// 转换状态
export type ConversionStatus = 'idle' | 'converting' | 'completed' | 'error';

// PDF转图片状态
export interface PdfToImageState {
  // 配置信息
  config: PdfToImageConfig;
  // 选中的PDF文件
  selectedFile: PdfFile | null;
  // 转换状态
  status: ConversionStatus;
  // 转换进度
  progress: ConversionProgress;
  // 错误信息
  error?: string;
}

// 转换事件类型
export type ConversionEvent = 
  | { type: 'file_selected'; file: PdfFile }
  | { type: 'conversion_started' }
  | { type: 'page_converted'; pageIndex: number; image: ConvertedImage }
  | { type: 'conversion_progress'; progress: ConversionProgress }
  | { type: 'conversion_completed'; images: ConvertedImage[] }
  | { type: 'conversion_error'; error: string }
  | { type: 'config_changed'; config: PdfToImageConfig };

// 默认配置
export const DEFAULT_CONFIG: PdfToImageConfig = {
  format: 'png',
  maxWidth: 1920,
  maxHeight: 1080,
  isBlackWhite: false,
  quality: 0.9,
  maxFileSize: undefined,
};
