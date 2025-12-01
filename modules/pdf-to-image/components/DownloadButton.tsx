'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DownloadButtonProps {
  // 批量下载回调
  onDownloadAll: () => Promise<void>;
  // 图片数量
  imageCount: number;
  // 是否禁用
  disabled?: boolean;
  // 是否正在下载
  isDownloading?: boolean;
}

export function DownloadButton({ onDownloadAll, imageCount, disabled = false, isDownloading = false }: DownloadButtonProps) {
  return (
    <Card className="border-2 border-green-200 dark:border-green-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full">
            <Button
              onClick={onDownloadAll}
              disabled={disabled || imageCount === 0 || isDownloading}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg shadow-lg"
            >
              {isDownloading ? (
                <>
                  <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ⏳ 下载中...
                </>
              ) : (
                <>
                  <Package className="mr-3 h-5 w-5" />
                  📦 批量下载所有图片
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              📊 共 {imageCount} 张图片
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              💡 点击按钮将下载所有转换后的图片
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
