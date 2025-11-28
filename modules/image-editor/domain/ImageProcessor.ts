import type {
  ImageAdjustments,
  CropParams,
  ScaleParams,
  FlipParams,
  FilterType,
  ExportOptions
} from '../types';

/**
 * 核心图片处理类
 * 基于Canvas API实现各种图片编辑功能
 */
export class ImageProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * 重置Canvas大小
   */
  private resetCanvas(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * 绘制原始图片到Canvas
   */
  private drawImage(image: HTMLImageElement): void {
    this.resetCanvas(image.width, image.height);
    this.ctx.drawImage(image, 0, 0);
  }

  /**
   * 应用裁剪
   */
  private applyCrop(crop: CropParams): void {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    tempCanvas.width = crop.width;
    tempCanvas.height = crop.height;
    
    tempCtx.drawImage(
      this.canvas,
      crop.x, crop.y, crop.width, crop.height,
      0, 0, crop.width, crop.height
    );
    
    this.canvas = tempCanvas;
    this.ctx = tempCtx;
  }

  /**
   * 应用缩放和翻转
   */
  private applyScaleAndFlip(scale: ScaleParams, flip: FlipParams): void {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    const width = this.canvas.width * Math.abs(scale.scaleX);
    const height = this.canvas.height * Math.abs(scale.scaleY);
    
    tempCanvas.width = width;
    tempCanvas.height = height;
    
    tempCtx.save();
    
    // 应用缩放和翻转
    tempCtx.translate(
      flip.horizontal ? width : 0,
      flip.vertical ? height : 0
    );
    tempCtx.scale(
      flip.horizontal ? -scale.scaleX : scale.scaleX,
      flip.vertical ? -scale.scaleY : scale.scaleY
    );
    
    tempCtx.drawImage(this.canvas, 0, 0);
    tempCtx.restore();
    
    this.canvas = tempCanvas;
    this.ctx = tempCtx;
  }

  /**
   * 应用调整参数
   */
  private applyAdjustments(adjustments: ImageAdjustments): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      
      // 亮度调整：0-100 对应 -255 到 255
      const brightnessValue = (adjustments.brightness - 50) * 5.1;
      r += brightnessValue;
      g += brightnessValue;
      b += brightnessValue;
      
      // 对比度调整：0-100 对应原来的 -100 到 100
      const contrastValue = adjustments.contrast - 50;
      const contrastFactor = (259 * (contrastValue + 255)) / (255 * (259 - contrastValue));
      r = contrastFactor * (r - 128) + 128;
      g = contrastFactor * (g - 128) + 128;
      b = contrastFactor * (b - 128) + 128;
      
      // 饱和度调整：0-100 对应 0 到 2 的饱和度倍数
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      const saturationValue = (adjustments.saturation - 50) / 50;
      r = gray + (r - gray) * (1 + saturationValue);
      g = gray + (g - gray) * (1 + saturationValue);
      b = gray + (b - gray) * (1 + saturationValue);
      
      // 色温调整：0-100 对应原来的 -100 到 100
      const tempValue = adjustments.temperature - 50;
      if (tempValue > 0) {
        // 暖色
        r += tempValue * 5.1;
        g += tempValue * 2.54;
      } else {
        // 冷色
        b += Math.abs(tempValue) * 5.1;
        g += Math.abs(tempValue) * 2.54;
      }
      
      // 色调调整：0-100 对应 -180° 到 180°
      const hueValue = (adjustments.hue - 50) * 3.6;
      if (hueValue !== 0) {
        const hueRadians = (hueValue * Math.PI) / 180;
        const cosHue = Math.cos(hueRadians);
        const sinHue = Math.sin(hueRadians);
        
        const newR = 0.299 * r + 0.587 * g + 0.114 * b +
                     0.701 * r * cosHue + 0.587 * g * cosHue - 0.299 * b * cosHue +
                     0.168 * r * sinHue - 0.330 * g * sinHue + 0.162 * b * sinHue;
        
        const newG = 0.299 * r + 0.587 * g + 0.114 * b +
                     -0.299 * r * cosHue + 0.413 * g * cosHue + 0.299 * b * cosHue +
                     -0.328 * r * sinHue + 0.035 * g * sinHue + 0.293 * b * sinHue;
        
        const newB = 0.299 * r + 0.587 * g + 0.114 * b +
                     -0.300 * r * cosHue - 0.588 * g * cosHue + 0.886 * b * cosHue +
                     1.250 * r * sinHue - 1.050 * g * sinHue - 0.200 * b * sinHue;
        
        r = newR;
        g = newG;
        b = newB;
      }
      
      // 白平衡调整：0-100 对应 0 到 2 的倍数
      const whiteBalanceValue = (adjustments.whiteBalance - 50) / 50;
      const whiteBalanceFactor = 1 + whiteBalanceValue;
      r *= whiteBalanceFactor;
      g *= whiteBalanceFactor;
      b *= whiteBalanceFactor;
      
      // 阴影和高光调整：0-100 对应原来的 -100 到 100
      const shadowValue = (adjustments.shadows - 50) / 50;
      const highlightValue = (adjustments.highlights - 50) / 50;
      const shadowFactor = 1 + shadowValue;
      const highlightFactor = 1 - highlightValue;
      
      const avg = (r + g + b) / 3;
      if (avg < 128) {
        // 阴影区域
        r *= shadowFactor;
        g *= shadowFactor;
        b *= shadowFactor;
      } else {
        // 高光区域
        r *= highlightFactor;
        g *= highlightFactor;
        b *= highlightFactor;
      }
      
      // 限制值在0-255之间
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * 应用滤镜
   */
  private applyFilter(filter: FilterType): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      switch (filter) {
        case 'vintage':
          // 复古滤镜
          data[i] = Math.min(255, r * 1.2 + 30);
          data[i + 1] = Math.min(255, g * 1.1 + 20);
          data[i + 2] = Math.min(255, b * 0.9);
          break;
          
        case 'blackAndWhite':
          // 黑白滤镜
          const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
          data[i] = data[i + 1] = data[i + 2] = gray;
          break;
          
        case 'sepia':
          // 褐色滤镜
          const sepiaR = 0.393 * r + 0.769 * g + 0.189 * b;
          const sepiaG = 0.349 * r + 0.686 * g + 0.168 * b;
          const sepiaB = 0.272 * r + 0.534 * g + 0.131 * b;
          data[i] = Math.min(255, sepiaR);
          data[i + 1] = Math.min(255, sepiaG);
          data[i + 2] = Math.min(255, sepiaB);
          break;
          
        case 'cool':
          // 冷色调
          data[i] = r * 0.9;
          data[i + 1] = g * 0.95;
          data[i + 2] = b * 1.1;
          break;
          
        case 'warm':
          // 暖色调
          data[i] = r * 1.1;
          data[i + 1] = g * 1.05;
          data[i + 2] = b * 0.9;
          break;
          
        case 'vibrant':
          // 鲜艳
          const avg = (r + g + b) / 3;
          const factor = 1.3;
          data[i] = avg + (r - avg) * factor;
          data[i + 1] = avg + (g - avg) * factor;
          data[i + 2] = avg + (b - avg) * factor;
          break;
          
        case 'muted':
          // 柔和
          const avgMuted = (r + g + b) / 3;
          const factorMuted = 0.7;
          data[i] = avgMuted + (r - avgMuted) * factorMuted;
          data[i + 1] = avgMuted + (g - avgMuted) * factorMuted;
          data[i + 2] = avgMuted + (b - avgMuted) * factorMuted;
          break;
          
        case 'dreamy':
          // 梦幻
          data[i] = Math.min(255, r * 1.05 + 20);
          data[i + 1] = Math.min(255, g * 1.1 + 30);
          data[i + 2] = Math.min(255, b * 1.15 + 40);
          break;
          
        case 'dramatic':
          // 戏剧化
          const contrast = 1.5;
          const brightness = -20;
          data[i] = Math.min(255, Math.max(0, (r - 128) * contrast + 128 + brightness));
          data[i + 1] = Math.min(255, Math.max(0, (g - 128) * contrast + 128 + brightness));
          data[i + 2] = Math.min(255, Math.max(0, (b - 128) * contrast + 128 + brightness));
          break;
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * 处理图片
   */
  processImage(
    image: HTMLImageElement,
    adjustments: ImageAdjustments,
    crop: CropParams | null,
    scale: ScaleParams,
    flip: FlipParams,
    filter: FilterType
  ): HTMLCanvasElement {
    // 绘制原始图片
    this.drawImage(image);
    
    // 应用裁剪
    if (crop) {
      this.applyCrop(crop);
    }
    
    // 应用缩放和翻转
    this.applyScaleAndFlip(scale, flip);
    
    // 应用调整参数
    this.applyAdjustments(adjustments);
    
    // 应用滤镜
    if (filter !== 'none') {
      this.applyFilter(filter);
    }
    
    // 返回处理后的Canvas副本
    const resultCanvas = document.createElement('canvas');
    const resultCtx = resultCanvas.getContext('2d')!;
    resultCanvas.width = this.canvas.width;
    resultCanvas.height = this.canvas.height;
    resultCtx.drawImage(this.canvas, 0, 0);
    
    return resultCanvas;
  }

  /**
   * 导出图片
   */
  exportImage(
    canvas: HTMLCanvasElement,
    options: ExportOptions
  ): Promise<Blob> {
    return new Promise((resolve) => {
      let { width, height } = canvas;
      
      // 应用最大尺寸限制
      if (options.keepAspectRatio) {
        const aspectRatio = width / height;
        if (width > options.maxWidth) {
          width = options.maxWidth;
          height = width / aspectRatio;
        }
        if (height > options.maxHeight) {
          height = options.maxHeight;
          width = height * aspectRatio;
        }
      } else {
        width = Math.min(width, options.maxWidth);
        height = Math.min(height, options.maxHeight);
      }
      
      // 创建缩放后的Canvas
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d')!;
      exportCanvas.width = Math.round(width);
      exportCanvas.height = Math.round(height);
      
      exportCtx.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        0, 0, exportCanvas.width, exportCanvas.height
      );
      
      // 导出为Blob
      exportCanvas.toBlob(
        (blob) => resolve(blob!),
        `image/${options.format}`,
        options.quality / 100
      );
    });
  }

  /**
   * 创建图片URL
   */
  createImageUrl(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL();
  }

  /**
   * 释放图片URL
   */
  revokeImageUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}
