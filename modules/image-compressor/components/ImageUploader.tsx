'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
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
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              "hover:border-primary hover:bg-accent/50",
              isDragActive && "border-primary bg-accent/50",
              (disabled || files.length >= maxFiles) && "cursor-not-allowed opacity-50"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            
            {isDragActive ? (
              <p className="text-lg font-medium">拖放图片到这里...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-medium">拖放图片到这里，或点击选择文件</p>
                <p className="text-sm text-muted-foreground">
                  支持 JPG、PNG、WebP、GIF 等格式，最大 50MB
                </p>
                <p className="text-xs text-muted-foreground">
                  已选择 {files.length}/{maxFiles} 个文件
                </p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="mt-4"
              disabled={disabled || files.length >= maxFiles}
            >
              选择图片
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 已选择的文件列表 */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">已选择的图片</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* 删除按钮 */}
                    <button
                      onClick={() => onFileRemoved(file.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
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