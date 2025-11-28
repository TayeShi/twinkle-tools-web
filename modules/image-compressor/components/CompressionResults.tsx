'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { ImageFile, CompressionProgress } from '../types';

interface CompressionResultsProps {
  files: ImageFile[];
  isCompressing: boolean;
  progress?: CompressionProgress;
  onDownloadSingle: (file: ImageFile) => void;
  onDownloadAll: () => void;
  error?: string;
}

export function CompressionResults({
  files,
  isCompressing,
  progress,
  onDownloadSingle,
  onDownloadAll,
  error
}: CompressionResultsProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalSize = () => {
    return files.reduce((acc, file) => acc + (file.compressedResult?.size || file.size), 0);
  };

  const getOriginalTotalSize = () => {
    return files.reduce((acc, file) => acc + file.size, 0);
  };

  const getTotalCompressionRatio = () => {
    const originalSize = getOriginalTotalSize();
    const compressedSize = getTotalSize();
    
    if (originalSize === 0) return 0;
    return ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
  };

  const getCompressedFilesCount = () => {
    return files.filter(file => file.compressedResult).length;
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 压缩进度 */}
      {isCompressing && progress && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">压缩进度</h3>
                <Badge variant="secondary">
                  {progress.current} / {progress.total}
                </Badge>
              </div>
              
              <Progress value={progress.percentage} className="w-full" />
              
              <p className="text-sm text-muted-foreground">
                正在压缩: {progress.currentFile || '准备中...'} ({progress.percentage}%)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 统计信息 */}
      {getCompressedFilesCount() > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{files.length}</p>
                <p className="text-sm text-muted-foreground">总文件数</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{getCompressedFilesCount()}</p>
                <p className="text-sm text-muted-foreground">已压缩</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {getTotalCompressionRatio()}%
                </p>
                <p className="text-sm text-muted-foreground">总体压缩率</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {formatFileSize(getOriginalTotalSize() - getTotalSize())}
                </p>
                <p className="text-sm text-muted-foreground">节省空间</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button onClick={onDownloadAll} disabled={getCompressedFilesCount() === 0}>
                <Download className="mr-2 h-4 w-4" />
                下载全部 ({getCompressedFilesCount()})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 错误信息 */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 结果列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            压缩结果
            {getCompressedFilesCount() === files.length && files.length > 0 && (
              <Badge variant="default" className="ml-2">
                <CheckCircle className="mr-1 h-3 w-3" />
                全部完成
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium truncate" title={file.name}>
                        {file.name}
                      </h4>
                      {file.compressedResult && (
                        <Badge variant="default" className="text-xs">
                          已压缩
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {/* 原始图片 */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">原始图片</span>
                        </div>
                        <div className="aspect-video relative bg-muted rounded overflow-hidden">
                          <img
                            src={file.preview}
                            alt={`${file.name} 原图`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>大小: {formatFileSize(file.size)}</p>
                          {file.dimensions && (
                            <p>尺寸: {file.dimensions.width} × {file.dimensions.height}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* 压缩后图片 */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {file.compressedResult ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="font-medium">压缩后</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">待压缩</span>
                            </>
                          )}
                        </div>
                        
                        {file.compressedResult ? (
                          <>
                            <div className="aspect-video relative bg-muted rounded overflow-hidden">
                              <img
                                src={file.compressedResult.preview}
                                alt={`${file.name} 压缩后`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="space-y-1 text-xs">
                              <p className="text-green-600">
                                大小: {formatFileSize(file.compressedResult.size)}
                              </p>
                              <p className="text-muted-foreground">
                                尺寸: {file.compressedResult.dimensions.width} × {file.compressedResult.dimensions.height}
                              </p>
                              <p className="text-green-600 font-medium">
                                压缩率: {file.compressedResult.compressionRatio.toFixed(1)}%
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="aspect-video relative bg-muted rounded flex items-center justify-center">
                            <EyeOff className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadSingle(file)}
                    disabled={!file.compressedResult}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    下载
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}