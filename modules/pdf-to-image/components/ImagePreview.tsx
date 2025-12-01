'use client';

import React, { useState } from 'react';
import { Download, Eye, Info, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConvertedImage } from '../types';

interface ImagePreviewProps {
  // 转换后的图片列表
  images: ConvertedImage[];
  // 单张下载回调
  onDownloadSingle: (image: ConvertedImage) => void;
  // 是否正在转换
  isConverting?: boolean;
  // 是否禁用
  disabled?: boolean;
}

export function ImagePreview({ images, onDownloadSingle, isConverting = false, disabled = false }: ImagePreviewProps) {
  // 放大查看的图片
  const [zoomedImage, setZoomedImage] = useState<ConvertedImage | null>(null);

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // 格式化转换时间
  const formatConversionTime = (ms: number): string => {
    if (ms < 1000) return ms + ' ms';
    return (ms / 1000).toFixed(2) + ' s';
  };

  return (
    <div className="space-y-6">
      {/* 标题和统计 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          🖼️ 转换结果
        </h2>
        {images.length > 0 && (
          <div className="flex items-center space-x-4">
            <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg">
              📊 {images.length} 张图片
            </span>
            <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold text-lg">
              📦 总大小: {formatFileSize(images.reduce((acc, img) => acc + img.size, 0))}
            </span>
          </div>
        )}
      </div>

      {/* 空状态 */}
      {images.length === 0 && !isConverting && (
        <Card className="border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-6 rounded-full bg-gradient-to-r from-gray-400 to-slate-500 text-white">
                <Eye className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
                👀 暂无转换结果
              </h3>
              <p className="text-slate-500 dark:text-slate-500 max-w-md mx-auto">
                📄 选择PDF文件并点击{'"'}开始转换{'"'}按钮，转换后的图片将显示在这里
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 转换中状态 */}
      {isConverting && (
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                ⏳ 正在转换...
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                📊 转换进度：{images.length} / {images.length + 1} 页
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 图片网格 */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card
              key={image.id}
              className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-4">
                {/* 图片预览 */}
                <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] mb-4">
                  <img
                    src={image.url}
                    alt={`Page ${image.pageIndex + 1}`}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-3 py-1 text-sm font-medium">
                    📄 第 {image.pageIndex + 1} 页
                  </div>
                </div>

                {/* 图片信息 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">图片信息</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">尺寸：</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {image.width} × {image.height} px
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">格式：</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {image.format.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">大小：</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatFileSize(image.size)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">耗时：</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatConversionTime(image.conversionTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                {/* 查看大图 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                  disabled={disabled}
                  onClick={() => {
                    // 简单实现：在新窗口打开图片
                    window.open(image.url, '_blank', 'width=800,height=600');
                  }}
                >
                  <Eye className="h-4 w-4" />
                  <span>查看</span>
                </Button>

                {/* 下载按钮 */}
                <Button
                  onClick={() => onDownloadSingle(image)}
                  size="sm"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                  disabled={disabled}
                >
                  <Download className="h-4 w-4" />
                  <span>下载</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
