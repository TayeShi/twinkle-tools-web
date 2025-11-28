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
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  ⚡ 压缩进度
                </h3>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:text-blue-300 border-blue-200">
                  📊 {progress.current} / {progress.total}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <Progress value={progress.percentage} className="w-full h-3 bg-blue-100 dark:bg-blue-900" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    🎯 {progress.currentFile || '准备中...'}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {progress.percentage}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 统计信息 */}
      {getCompressedFilesCount() > 0 && (
        <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 inline-flex items-center justify-center">
                  <p className="text-2xl font-bold text-white">{files.length}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">📁 总文件数</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 inline-flex items-center justify-center">
                  <p className="text-2xl font-bold text-white">{getCompressedFilesCount()}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">✅ 已压缩</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 inline-flex items-center justify-center">
                  <p className="text-2xl font-bold text-white">{getTotalCompressionRatio()}%</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">📊 总体压缩率</p>
              </div>
              <div className="text-center space-y-2">
                <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 inline-flex items-center justify-center">
                  <p className="text-2xl font-bold text-white">{formatFileSize(getOriginalTotalSize() - getTotalSize())}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">💰 节省空间</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={onDownloadAll} 
                disabled={getCompressedFilesCount() === 0}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 px-8 py-3"
              >
                <Download className="mr-2 h-4 w-4" />
                📦 下载全部 ({getCompressedFilesCount()})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 错误信息 */}
      {error && (
        <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-red-500 text-white">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300">⚠️ 错误提示</h4>
                <p className="text-red-600 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 结果列表 */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              📋 压缩结果
            </span>
            {getCompressedFilesCount() === files.length && files.length > 0 && (
              <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
                <CheckCircle className="mr-1 h-3 w-3" />
                ✨ 全部完成
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {files.map((file) => (
              <div key={file.id} className="border-2 border-purple-200 dark:border-purple-700 rounded-xl p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="font-semibold text-slate-700 dark:text-slate-300 truncate" title={file.name}>
                        📎 {file.name}
                      </h4>
                      {file.compressedResult && (
                        <Badge variant="default" className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-xs">
                          ✅ 已压缩
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 原始图片 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                          <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-blue-700 dark:text-blue-300">📷 原始图片</span>
                        </div>
                        <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg overflow-hidden border-2 border-blue-200 dark:border-blue-800">
                          <img
                            src={file.preview}
                            alt={`${file.name} 原图`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 space-y-2">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            📏 大小: <span className="font-bold">{formatFileSize(file.size)}</span>
                          </p>
                          {file.dimensions && (
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              📐 尺寸: <span className="font-bold">{file.dimensions.width} × {file.dimensions.height}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* 压缩后图片 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                          {file.compressedResult ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-green-700 dark:text-green-300">🎯 压缩后</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              <span className="font-medium text-slate-600 dark:text-slate-400">⏳ 待压缩</span>
                            </>
                          )}
                        </div>
                        
                        {file.compressedResult ? (
                          <>
                            <div className="aspect-video relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg overflow-hidden border-2 border-green-200 dark:border-green-800">
                              <img
                                src={file.compressedResult.preview}
                                alt={`${file.name} 压缩后`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 space-y-2">
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                📏 大小: <span className="font-bold">{formatFileSize(file.compressedResult.size)}</span>
                              </p>
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                📐 尺寸: <span className="font-bold">{file.compressedResult.dimensions.width} × {file.compressedResult.dimensions.height}</span>
                              </p>
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                📊 压缩率: <span className="font-bold text-green-600">{file.compressedResult.compressionRatio.toFixed(1)}%</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="aspect-video relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg flex items-center justify-center border-2 border-slate-300 dark:border-slate-700">
                            <EyeOff className="h-12 w-12 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadSingle(file)}
                    disabled={!file.compressedResult}
                    className="border-2 border-green-200 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950 transition-all duration-300 hover:scale-105"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    💾 下载
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