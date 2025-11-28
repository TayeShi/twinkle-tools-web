'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  files: ImageFile[];
  onFilesAdded: (files: File[]) => Promise<ImageFile[]>;
  onFileRemoved: (id: string) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export function ImageUploader({
  files,
  onFilesAdded,
  onFileRemoved,
  maxFiles = 20,
  disabled = false
}: ImageUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      // 使用 Hook 的 addFiles 方法来处理文件
      await onFilesAdded(acceptedFiles);
    } catch (error) {
      console.error('Error adding files:', error);
    }
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.bmp', '.tiff']
    },
    maxFiles: maxFiles - files.length,
    disabled: disabled || files.length >= maxFiles
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* 拖拽上传区域 */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300",
              "hover:border-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 hover:scale-[1.02]",
              isDragActive && "border-blue-500 bg-blue-100/70 dark:bg-blue-900/50 scale-[1.02]",
              (disabled || files.length >= maxFiles) && "cursor-not-allowed opacity-50"
            )}
          >
            <input {...getInputProps()} />
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            
            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  🎯 拖放图片到这里...
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">✨ 释放鼠标即可添加文件</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                  🚀 拖放图片到这里，或点击选择文件
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  📂 支持 JPG、PNG、WebP、GIF 等格式，最大 50MB
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{files.length}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">/</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{maxFiles}</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">个文件</span>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="mt-6 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-105"
              disabled={disabled || files.length >= maxFiles}
            >
              📁 选择图片
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 已选择的文件列表 */}
      {files.length > 0 && (
        <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                📁 已选择的图片
              </h3>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium">
                  🎯 {files.length} 个文件
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  📦 {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative group border-2 border-green-200 dark:border-green-700 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* 删除按钮 */}
                    <button
                      onClick={() => onFileRemoved(file.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    
                    {/* 文件状态指示器 */}
                    <div className="absolute top-3 left-3 p-2 rounded-full bg-green-500/90 text-white">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/50 dark:to-emerald-950/50">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate mb-1" title={file.name}>
                      📎 {file.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        📏 {formatFileSize(file.size)}
                      </span>
                      {file.dimensions && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          📐 {file.dimensions.width}×{file.dimensions.height}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}