'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ImageEditorCanvasProps {
  onImageUpload: (image: HTMLImageElement) => void;
}

export const ImageEditorCanvas = ({ onImageUpload }: ImageEditorCanvasProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 确保 canvas 初始宽度为 0，显示上传文案
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 0;
      canvasRef.current.height = 0;
    }
  }, []);

  // 处理图片加载
  const handleImageLoad = useCallback((image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置Canvas大小
    canvas.width = image.width;
    canvas.height = image.height;

    // 绘制图片
    ctx.drawImage(image, 0, 0);

    // 通知父组件
    onImageUpload(image);
  }, [onImageUpload]);

  // 处理文件上传
  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => handleImageLoad(img);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [handleImageLoad]);

  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  // 处理拖拽事件
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  // 触发文件选择
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="relative w-full h-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      <div
        className={`w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300 ${isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700' 
          : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
        />
        
        {!canvasRef.current?.width && (
          <div className="text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              拖拽图片到此处或点击上传
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              支持 JPG、PNG、WebP 等格式
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              📂 选择图片
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
