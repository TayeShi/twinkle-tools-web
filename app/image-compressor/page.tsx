'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image, Zap, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useImageCompressor } from '@/modules/image-compressor/hooks/useImageCompressor';
import { ImageUploader } from '@/modules/image-compressor/components/ImageUploader';
import { CompressionSettings } from '@/modules/image-compressor/components/CompressionSettings';
import { CompressionResults } from '@/modules/image-compressor/components/CompressionResults';
import { ImageFile } from '@/modules/image-compressor/types';

export default function ImageCompressorPage() {
  const compressor = useImageCompressor();
  const state = compressor.getState();

  const handleAddFiles = async (files: File[]) => {
    return await compressor.addFiles(files);
  };

  const handleRemoveFile = (id: string) => {
    compressor.removeFile(id);
  };

  const handleCompressAll = async () => {
    await compressor.compressAll();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回首页
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <Image className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  图片压缩转换
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 工具介绍 */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>智能图片压缩工具</span>
              </CardTitle>
              <CardDescription>
                支持多种图片格式的压缩和转换，提供快速模式和详细参数设置，可批量处理图片。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-blue-500" />
                  <span>支持 JPEG、PNG、WebP 格式</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4 text-green-500" />
                  <span>快速模式 + 详细参数</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image className="h-4 w-4 text-purple-500" />
                  <span>批量处理图片</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 上传区域 */}
            <ImageUploader
              files={state.files}
              onFilesAdded={handleAddFiles}
              onFileRemoved={handleRemoveFile}
              disabled={state.isCompressing}
            />

            {/* 压缩控制按钮 */}
            {state.files.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">开始压缩</h3>
                      <p className="text-sm text-muted-foreground">
                        准备压缩 {state.files.length} 个文件
                      </p>
                    </div>
                    <Button
                      onClick={handleCompressAll}
                      disabled={state.isCompressing || state.files.length === 0}
                      size="lg"
                    >
                      {state.isCompressing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          压缩中...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          开始压缩
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 压缩结果 */}
            <CompressionResults
              files={state.files}
              isCompressing={state.isCompressing}
              progress={state.progress}
              onDownloadSingle={compressor.downloadSingle}
              onDownloadAll={compressor.downloadAll}
              error={state.error}
            />
          </div>

          {/* 侧边栏设置 */}
          <div className="space-y-8">
            <CompressionSettings
              config={state.config}
              onConfigChange={compressor.updateConfig}
            />

            {/* 使用提示 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">使用提示</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">快速模式</h4>
                  <p className="text-sm text-muted-foreground">
                    使用预设配置，适合大多数场景。选择网页优化或社交媒体预设即可获得良好的效果。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">详细模式</h4>
                  <p className="text-sm text-muted-foreground">
                    可以精确控制输出格式、质量、尺寸等参数，适合有特定需求的专业用户。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">批量处理</h4>
                  <p className="text-sm text-muted-foreground">
                    支持同时上传多个文件，系统会并行处理，提高效率。
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">格式支持</h4>
                  <p className="text-sm text-muted-foreground">
                    输入支持 JPG、PNG、WebP、GIF、BMP、TIFF<br />
                    输出支持 JPG、PNG、WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 性能说明 */}
            <Alert>
              <AlertDescription>
                <strong>性能提示：</strong>图片压缩在浏览器本地进行，您的数据不会上传到服务器，保护隐私安全。
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}