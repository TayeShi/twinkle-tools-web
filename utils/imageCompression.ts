import { CompressionParams, CompressedImage } from './types';

/**
 * 压缩图片（基于文件大小）
 * @param file 原始图片文件
 * @param params 压缩参数
 * @returns 压缩后的图片数据
 */
export const compressImage = async (file: File, params: CompressionParams): Promise<CompressedImage> => {
  return new Promise((resolve, reject) => {
    // 验证文件是否为图片
    if (!file.type.startsWith('image/')) {
      reject(new Error('请选择图片文件'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // 创建Canvas元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('获取Canvas上下文失败'));
          return;
        }
        
        // 目标文件大小（字节）
        const targetSize = params.maxSize * 1024 * 1024;
        
        // 应用黑白滤镜（如果需要）
        const applyFilters = () => {
          if (params.isBlackWhite) {
            ctx.filter = 'grayscale(100%)';
          } else {
            ctx.filter = 'none';
          }
        };
        
        // 初始尺寸和质量
        let width = img.width;
        let height = img.height;
        let quality = params.format === 'image/png' ? 0.8 : 0.9;
        
        // 压缩尝试次数
        let attempt = 0;
        const maxAttempts = 20; // 最多尝试20次
        
        // 动态调整压缩的函数
        const compress = () => {
          attempt++;
          
          // 设置Canvas尺寸
          canvas.width = width;
          canvas.height = height;
          
          // 每次绘制前都重新应用滤镜，确保正确生效
          applyFilters();
          
          // 绘制图片
          ctx.drawImage(img, 0, 0, width, height);
          
          // 进行压缩
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas转换为Blob失败'));
                return;
              }
              
              const originalSize = file.size;
              const compressedSize = blob.size;
              
              // 检查是否符合要求：
              // 1. 大小符合目标要求（如果设置了目标大小）
              // 2. 或者已经尝试了足够多次
              const meetsSizeRequirement = params.maxSize === 0 || compressedSize <= targetSize;
              const isLastAttempt = attempt >= maxAttempts;
              
              // 如果压缩后的文件比原图大，我们需要比较不同格式的大小
              // 对于小文件，格式转换可能导致变大，所以我们需要特殊处理
              if (meetsSizeRequirement || isLastAttempt) {
                // 如果压缩后文件比原文件大，且没有设置目标大小，我们需要返回较小的文件
                if (compressedSize > originalSize && params.maxSize === 0) {
                  // 对于小文件，我们尝试使用更低的质量重新压缩
                  if (quality > 0.3) {
                    quality = Math.max(0.1, quality * 0.5);
                    compress();
                    return;
                  }
                }
                
                resolve({
                  originalFile: file,
                  compressedBlob: blob,
                  compressedUrl: URL.createObjectURL(blob),
                  originalSize: originalSize,
                  compressedSize: compressedSize,
                  originalWidth: img.width,
                  originalHeight: img.height,
                  compressedWidth: width,
                  compressedHeight: height
                });
              } else {
                // 压缩后的大小仍然不符合要求，继续调整参数
                const sizeRatio = compressedSize / targetSize;
                
                if (sizeRatio > 1.5 && attempt < 10) {
                  // 大小超出较多，且尝试次数较少，先调整尺寸
                  width = Math.round(width * 0.8);
                  height = Math.round(height * 0.8);
                } else {
                  // 调整质量
                  quality = Math.max(0.1, quality * 0.7);
                }
                
                // 继续压缩
                compress();
              }
            },
            params.format,
            quality
          );
        };
        
        // 开始压缩
        compress();
      };
      
      img.onerror = () => {
        reject(new Error('图片加载失败'));
      };
      
      // 加载图片数据
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    
    // 读取文件为DataURL
    reader.readAsDataURL(file);
  });
};

/**
 * 格式化文件大小
 * @param bytes 文件大小（字节）
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
};
