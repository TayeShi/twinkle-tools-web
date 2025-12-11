/**
 * PDF转图片工具函数
 */

import { PdfConversionParams, ConvertedImage, CompressionParams } from './types';
import { compressImage } from './imageCompression';

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * PDF转换回调接口
 */
interface PdfConversionCallbacks {
  onProgress: (currentPage: number, totalPages: number) => void;
  onComplete: (images: ConvertedImage[], totalPages: number) => void;
  onError: (error: Error) => void;
}

/**
 * 将PDF转换为图片
 * @param pdfFile PDF文件
 * @param params 转换参数
 * @param callbacks 回调函数
 */
export const convertPdfToImages = async (
  pdfFile: File,
  params: PdfConversionParams,
  callbacks: PdfConversionCallbacks
): Promise<void> => {
  try {
    // 检查是否在客户端环境中
    if (typeof window === 'undefined') {
      throw new Error('PDF转换只能在客户端环境中执行');
    }
    
    // 动态导入PDF.js
    const pdfjsLib = await import('pdfjs-dist');
    
    // 设置PDF.js工作线程
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
    
    // 将PDF文件转换为ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // 使用PDF.js加载PDF
    const pdfDocument = await pdfjsLib.getDocument(arrayBuffer).promise;
    const totalPages = pdfDocument.numPages;
    if (totalPages === 0) {
      throw new Error('PDF文件没有页面内容');
    }
    
    // 转换过程
    const images: ConvertedImage[] = [];
    
    // 遍历每一页
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      // 更新进度
      callbacks.onProgress(pageNumber, totalPages);
      
      // 获取PDF页
      const page = await pdfDocument.getPage(pageNumber);
      
      // 设置缩放比例
      const scale = 2.0;
      const viewport = page.getViewport({ scale });
      
      // 创建Canvas元素
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('无法创建Canvas上下文');
      }
      
      // 设置Canvas尺寸
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // 渲染PDF页到Canvas
      const renderContext = {
        canvas: canvas,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      
      // 如果是黑白模式，转换为灰度
      if (params.isBlackWhite) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // R
          data[i + 1] = avg; // G
          data[i + 2] = avg; // B
        }
        
        context.putImageData(imageData, 0, 0);
      }
      
      // 直接使用canvas.toBlob获取Blob对象，避免Base64编码问题
      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, params.format);
      });
      
      if (!imageBlob) {
        throw new Error('Canvas转换为Blob失败');
      }
      
      // 创建临时File对象用于压缩
      const tempFileName = `page_${pageNumber}.${params.format.split('/')[1]}`;
      const tempFile = new File([imageBlob], tempFileName, { type: params.format });
      
      // 准备压缩参数
      const compressionParams: CompressionParams = {
        format: params.format,
        maxSize: params.maxSize,
        isBlackWhite: params.isBlackWhite
      };
      
      // 调用压缩函数
      const compressedResult = await compressImage(tempFile, compressionParams);
      
      // 创建最终的图片对象
      const image: ConvertedImage = {
        imageUrl: compressedResult.compressedUrl,
        format: params.format,
        size: compressedResult.compressedSize,
        width: compressedResult.compressedWidth,
        height: compressedResult.compressedHeight,
        pageNumber
      };
      
      images.push(image);
    }
    
    // 完成转换
    callbacks.onComplete(images, totalPages);
  } catch (error) {
    callbacks.onError(error instanceof Error ? error : new Error('转换失败'));
  }
};
