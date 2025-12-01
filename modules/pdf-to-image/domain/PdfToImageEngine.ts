import { PdfToImageConfig, PdfFile, PdfPageInfo, ConvertedImage, ConversionProgress } from '../types';

// 动态导入PDF.js，确保只在客户端执行
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfjsLib: any;

// PDF转图片引擎类
export class PdfToImageEngine {
  private config: PdfToImageConfig;
  private onProgress?: (progress: ConversionProgress) => void;
  private onPageConverted?: (pageIndex: number, image: ConvertedImage) => void;
  private isCancelled = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pdfjsLib: any = null;

  constructor(config: PdfToImageConfig) {
    this.config = config;
    // 初始化PDF.js，仅在客户端环境
    this.initPdfJs();
  }

  // 初始化PDF.js
  private initPdfJs(): void {
    if (typeof window !== 'undefined' && !this.pdfjsLib) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this.pdfjsLib = require('pdfjs-dist');
      // 使用本地worker文件，避免CDN访问问题
      // 在Next.js中，worker文件会被正确处理
      this.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;
    }
  }

  // 设置配置
  setConfig(config: PdfToImageConfig): void {
    this.config = config;
  }

  // 设置进度回调
  setOnProgress(callback: (progress: ConversionProgress) => void): void {
    this.onProgress = callback;
  }

  // 设置页面转换完成回调
  setOnPageConverted(callback: (pageIndex: number, image: ConvertedImage) => void): void {
    this.onPageConverted = callback;
  }

  // 取消转换
  cancel(): void {
    this.isCancelled = true;
  }

  // 重置取消状态
  resetCancel(): void {
    this.isCancelled = false;
  }

  // 解析PDF文件
  async parsePdfFile(file: File): Promise<PdfFile> {
    // 确保PDF.js已初始化
    this.initPdfJs();
    if (!this.pdfjsLib) {
      throw new Error('PDF.js is not initialized. This feature only works in client-side environment.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await this.pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${this.pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    }).promise;

    const pageCount = pdf.numPages;
    const pages: PdfPageInfo[] = [];

    // 获取所有页面信息
    for (let i = 0; i < pageCount; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      
      pages.push({
        index: i,
        originalWidth: viewport.width,
        originalHeight: viewport.height,
        rotation: viewport.rotation,
      });
      
      page.cleanup();
    }

    await pdf.cleanup();

    return {
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      pageCount,
      pages,
      convertedImages: [],
      status: 'pending',
      progress: 0,
    };
  }

  // 将PDF页面转换为图片
  async convertPdfToImages(pdfFile: PdfFile): Promise<ConvertedImage[]> {
    // 确保PDF.js已初始化
    this.initPdfJs();
    if (!this.pdfjsLib) {
      throw new Error('PDF.js is not initialized. This feature only works in client-side environment.');
    }

    this.resetCancel();
    const arrayBuffer = await pdfFile.file.arrayBuffer();
    const pdf = await this.pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${this.pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    }).promise;

    const convertedImages: ConvertedImage[] = [];
    const startTime = Date.now();

    for (let i = 0; i < pdfFile.pageCount; i++) {
      if (this.isCancelled) {
        await pdf.cleanup();
        throw new Error('Conversion cancelled');
      }

      const pageStartTime = Date.now();
      const page = await pdf.getPage(i + 1);
      const pageInfo = pdfFile.pages[i];

      // 计算缩放比例
      const scale = this.calculateScale(pageInfo);
      const viewport = page.getViewport({ scale });

      // 创建Canvas元素
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // 设置Canvas尺寸
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 渲染PDF页面到Canvas
      await page.render({
        canvasContext: context,
        viewport,
        canvas,
      }).promise;

      // 处理图片（黑白转换等）
      const processedCanvas = this.processImage(canvas);

      // 转换为指定格式
      const imageUrl = this.canvasToDataUrl(processedCanvas);
      
      // 创建ConvertedImage对象
      const image: ConvertedImage = {
        id: crypto.randomUUID(),
        pageIndex: i,
        url: imageUrl,
        format: this.config.format,
        width: processedCanvas.width,
        height: processedCanvas.height,
        size: this.getDataUrlSize(imageUrl),
        conversionTime: Date.now() - pageStartTime,
      };

      convertedImages.push(image);
      
      // 调用页面转换完成回调
      if (this.onPageConverted) {
        this.onPageConverted(i, image);
      }

      // 计算并调用进度回调
      const progress = {
        currentPage: i + 1,
        totalPages: pdfFile.pageCount,
        overallProgress: (i + 1) / pdfFile.pageCount,
        estimatedTimeRemaining: this.estimateTimeRemaining(
          Date.now() - startTime,
          i + 1,
          pdfFile.pageCount
        ),
      };

      if (this.onProgress) {
        this.onProgress(progress);
      }

      // 清理资源
      page.cleanup();
    }

    await pdf.cleanup();
    return convertedImages;
  }

  // 计算缩放比例
  private calculateScale(pageInfo: PdfPageInfo): number {
    const { maxWidth, maxHeight } = this.config;
    const { originalWidth, originalHeight } = pageInfo;

    // 计算宽度和高度的缩放比例
    const widthScale = maxWidth / originalWidth;
    const heightScale = maxHeight / originalHeight;

    // 使用较小的缩放比例，确保图片不超过最大尺寸
    let scale = Math.min(widthScale, heightScale);

    // 确保缩放比例至少为1
    scale = Math.max(scale, 1);

    return scale;
  }

  // 处理图片（黑白转换等）
  private processImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const { isBlackWhite } = this.config;
    
    if (!isBlackWhite) {
      return canvas;
    }

    // 创建新的Canvas用于处理
    const processedCanvas = document.createElement('canvas');
    processedCanvas.width = canvas.width;
    processedCanvas.height = canvas.height;
    
    const context = processedCanvas.getContext('2d');
    if (!context) {
      return canvas;
    }

    // 绘制原始图像
    context.drawImage(canvas, 0, 0);

    // 获取图像数据
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 转换为黑白
    for (let i = 0; i < data.length; i += 4) {
      // 计算灰度值
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      
      // 设置黑白值（阈值128）
      const value = gray > 128 ? 255 : 0;
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      // 保留原始Alpha通道
    }

    // 将处理后的数据放回Canvas
    context.putImageData(imageData, 0, 0);

    return processedCanvas;
  }

  // 将Canvas转换为Data URL
  private canvasToDataUrl(canvas: HTMLCanvasElement): string {
    const { format, quality } = this.config;
    
    switch (format) {
      case 'jpg':
        return canvas.toDataURL('image/jpeg', quality);
      case 'webp':
        return canvas.toDataURL('image/webp', quality);
      case 'png':
      default:
        return canvas.toDataURL('image/png');
    }
  }

  // 计算Data URL的大小
  private getDataUrlSize(dataUrl: string): number {
    // 移除Data URL前缀
    const base64 = dataUrl.split(',')[1];
    // 计算字节大小（base64编码每4个字符对应3个字节）
    return Math.ceil((base64.length * 3) / 4);
  }

  // 估计剩余时间
  private estimateTimeRemaining(
    elapsedTime: number,
    processedPages: number,
    totalPages: number
  ): number {
    if (processedPages === 0) return 0;
    
    const avgTimePerPage = elapsedTime / processedPages;
    const remainingPages = totalPages - processedPages;
    
    return avgTimePerPage * remainingPages;
  }

  // 下载图片
  downloadImage(image: ConvertedImage, pdfFileName: string): void {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${pdfFileName}_page_${image.pageIndex + 1}.${image.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 批量下载图片（ZIP格式）
  async downloadAllImages(images: ConvertedImage[], pdfFileName: string): Promise<void> {
    // 这里简化处理，实际项目中应该使用JSZip库来创建ZIP文件
    // 目前先逐个下载
    for (const image of images) {
      this.downloadImage(image, pdfFileName);
    }
  }
}
