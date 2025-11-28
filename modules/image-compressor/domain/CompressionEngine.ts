import { 
  ImageCompressionConfig, 
  CompressionEngine, 
  OutputFormat 
} from '../types';

export class BrowserCompressionEngine implements CompressionEngine {
  private supportedFormats = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ];

  getSupportedFormats(): string[] {
    return this.supportedFormats;
  }

  validateFile(file: File): { valid: boolean; error?: string } {
    // 检查文件类型
    if (!this.supportedFormats.includes(file.type)) {
      return {
        valid: false,
        error: `不支持的文件格式：${file.type}。支持的格式：${this.supportedFormats.join(', ')}`
      };
    }

    // 检查文件大小（最大 50MB）
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `文件大小超过限制。最大支持 50MB，当前文件大小：${(file.size / 1024 / 1024).toFixed(2)}MB`
      };
    }

    return { valid: true };
  }

  async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        const dimensions = { width: img.width, height: img.height };
        URL.revokeObjectURL(url);
        resolve(dimensions);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('无法加载图片'));
      };
      
      img.src = url;
    });
  }

  async compress(
    file: File,
    config: ImageCompressionConfig,
    onProgress?: (progress: number) => void
  ): Promise<{
    file: File;
    size: number;
    preview: string;
    dimensions: { width: number; height: number };
    compressionRatio: number;
  }> {
    try {
      onProgress?.(10);

      // 创建图片对象
      const originalDimensions = await this.getImageDimensions(file);
      onProgress?.(20);

      // 创建 canvas 进行压缩
      const { canvas, ctx, img } = await this.createCanvas(file, originalDimensions, config);
      onProgress?.(40);

      // 调整尺寸
      this.resizeImage(canvas, ctx, img, config);
      onProgress?.(60);

      // 转换为目标格式
      const blob = await this.canvasToBlob(canvas, config, onProgress);
      onProgress?.(90);

      // 创建压缩后的文件
      const compressedFile = new File([blob], this.getFileName(file, config.outputFormat), {
        type: `image/${config.outputFormat}`,
        lastModified: Date.now()
      });

      // 如果指定了最大大小且当前文件仍然太大，进行二次压缩
      let finalFile = compressedFile;
      if (config.maxSize && compressedFile.size > config.maxSize * 1024) {
        finalFile = await this.compressToSize(
          compressedFile, 
          config.maxSize * 1024, 
          config.outputFormat,
          (progress) => onProgress?.(90 + progress * 0.09)
        );
      }

      onProgress?.(100);

      // 生成预览
      const preview = URL.createObjectURL(finalFile);
      const compressedDimensions = await this.getImageDimensions(finalFile);

      return {
        file: finalFile,
        size: finalFile.size,
        preview,
        dimensions: compressedDimensions,
        compressionRatio: (file.size - finalFile.size) / file.size * 100
      };

    } catch (error) {
      throw new Error(`图片压缩失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  private async createCanvas(
    file: File,
    dimensions: { width: number; height: number },
    config: ImageCompressionConfig
  ): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; img: HTMLImageElement }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('无法创建 Canvas 上下文'));
          return;
        }

        URL.revokeObjectURL(url);
        resolve({ canvas, ctx, img });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('图片加载失败'));
      };
      
      img.src = url;
    });
  }

  private resizeImage(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    config: ImageCompressionConfig
  ): void {
    let { width, height } = { width: img.width, height: img.height };

    // 如果指定了宽高，进行尺寸调整
    if (config.width || config.height) {
      if (config.maintainAspectRatio) {
        const aspectRatio = width / height;
        
        if (config.width && !config.height) {
          width = config.width;
          height = Math.round(width / aspectRatio);
        } else if (config.height && !config.width) {
          height = config.height;
          width = Math.round(height * aspectRatio);
        } else if (config.width && config.height) {
          width = config.width;
          height = config.height;
        }
      } else {
        width = config.width || width;
        height = config.height || height;
      }
    }

    canvas.width = width;
    canvas.height = height;

    // 设置绘制质量和样式
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 绘制图片
    ctx.drawImage(img, 0, 0, width, height);
  }

  private async canvasToBlob(
    canvas: HTMLCanvasElement,
    config: ImageCompressionConfig,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const mimeType = `image/${config.outputFormat}`;
      const quality = config.quality !== undefined ? config.quality / 100 : 0.8;

      // JPEG 和 WebP 支持质量参数
      if (config.outputFormat !== 'png') {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('图片转换失败'));
            }
          },
          mimeType,
          quality
        );
      } else {
        // PNG 使用压缩级别（如果支持）
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('图片转换失败'));
            }
          },
          mimeType
        );
      }
    });
  }

  private async compressToSize(
    file: File,
    targetSize: number,
    format: OutputFormat,
    onProgress?: (progress: number) => void
  ): Promise<File> {
    const maxAttempts = 10;
    let quality = 0.8;
    let compressedFile = file;
    let attempt = 0;

    while (compressedFile.size > targetSize && attempt < maxAttempts) {
      quality -= 0.1;
      if (quality <= 0.1) quality = 0.1;

      compressedFile = await this.compressWithQuality(compressedFile, quality, format);
      attempt++;

      onProgress?.(attempt / maxAttempts * 100);
    }

    return compressedFile;
  }

  private async compressWithQuality(
    file: File,
    quality: number,
    format: OutputFormat
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: `image/${format}`,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('压缩失败'));
            }
          },
          `image/${format}`,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('图片加载失败'));
      };

      img.src = url;
    });
  }

  private getFileName(file: File, format: OutputFormat): string {
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExt}_compressed.${format}`;
  }
}