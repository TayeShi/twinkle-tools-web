/**
 * 图片压缩参数接口
 */
export interface CompressionParams {
  /** 输出图片格式 */
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  /** 最大文件大小（MB） */
  maxSize: number;
  /** 是否转换为黑白 */
  isBlackWhite: boolean;
}

/**
 * 压缩后的图片数据接口
 */
export interface CompressedImage {
  /** 原始图片文件 */
  originalFile: File;
  /** 压缩后的Blob数据 */
  compressedBlob: Blob;
  /** 压缩后的图片URL */
  compressedUrl: string;
  /** 原始文件大小（字节） */
  originalSize: number;
  /** 压缩后文件大小（字节） */
  compressedSize: number;
  /** 原始图片宽度 */
  originalWidth: number;
  /** 原始图片高度 */
  originalHeight: number;
  /** 压缩后图片宽度 */
  compressedWidth: number;
  /** 压缩后图片高度 */
  compressedHeight: number;
}
