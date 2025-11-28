export interface ImageCompressionConfig {
  // 基础配置
  mode: 'quick' | 'detailed';
  outputFormat: 'jpeg' | 'png' | 'webp';
  maxSize?: number; // KB
  quality?: number; // 0-100
  
  // 详细模式参数
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  progressive?: boolean; // for JPEG
  compressionLevel?: number; // for PNG 0-9
  
  // 高级设置
  stripMetadata: boolean;
  preserveExif: boolean;
  enableDithering?: boolean; // for PNG
}

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string;
  dimensions?: {
    width: number;
    height: number;
  };
  compressedResult?: {
    file: File;
    size: number;
    preview: string;
    dimensions: {
      width: number;
      height: number;
    };
    compressionRatio: number;
  };
}

export interface CompressionProgress {
  current: number;
  total: number;
  percentage: number;
  currentFile?: string;
}

export interface CompressionState {
  files: ImageFile[];
  isCompressing: boolean;
  progress?: CompressionProgress;
  config: ImageCompressionConfig;
  error?: string;
}

export interface CompressionEngine {
  compress(
    file: File,
    config: ImageCompressionConfig,
    onProgress?: (progress: number) => void
  ): Promise<{
    file: File;
    size: number;
    preview: string;
    dimensions: { width: number; height: number };
    compressionRatio: number;
  }>;
  
  getImageDimensions(file: File): Promise<{ width: number; height: number }>;
  getSupportedFormats(): string[];
  validateFile(file: File): { valid: boolean; error?: string };
}

export interface ImageCompressorUseCase {
  addFiles(files: File[]): Promise<ImageFile[]>;
  removeFile(id: string): void;
  clearFiles(): void;
  updateConfig(config: Partial<ImageCompressionConfig>): void;
  compressAll(onProgress?: (progress: CompressionProgress) => void): Promise<void>;
  downloadSingle(file: ImageFile): void;
  downloadAll(): void;
  getState(): CompressionState;
}

export type ImageCompressionMode = 'quick' | 'detailed';
export type OutputFormat = 'jpeg' | 'png' | 'webp';

// 预设配置
export const PRESET_CONFIGS = {
  WEB_OPTIMIZED: {
    mode: 'quick' as const,
    outputFormat: 'jpeg' as const,
    maxSize: 200, // 200KB
    quality: 80,
    maintainAspectRatio: true,
    stripMetadata: true,
    preserveExif: false,
  } as ImageCompressionConfig,
  
  HIGH_QUALITY: {
    mode: 'detailed' as const,
    outputFormat: 'png' as const,
    quality: 95,
    maintainAspectRatio: true,
    stripMetadata: false,
    preserveExif: true,
  } as ImageCompressionConfig,
  
  SOCIAL_MEDIA: {
    mode: 'quick' as const,
    outputFormat: 'jpeg' as const,
    maxSize: 100, // 100KB
    quality: 75,
    maintainAspectRatio: true,
    stripMetadata: true,
    preserveExif: false,
  } as ImageCompressionConfig,
} as const;