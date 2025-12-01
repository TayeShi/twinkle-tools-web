'use client';

import React, { useState, useEffect } from 'react';
import { Image, Zap, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/Header';
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <Header
        icon={<Image className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
        title="🖼️ 图片压缩转换"
        description="🎨 智能压缩，批量处理，保护隐私"
        iconGradient="bg-gradient-to-r from-cyan-400 to-blue-500"
      />

      <div className="container mx-auto px-4 py-8">
        {/* 工具介绍 */}
        <div className="mb-8">
          <Card className="border-2 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-cyan-400 text-2xl font-bold">
                    ⚡ 智能图片压缩工具
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 mt-2 text-lg">
                    🎨 支持多种图片格式的压缩和转换，提供快速模式和详细参数设置，可批量处理图片 🚀
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 group hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-600">
                  <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-cyan-400 font-bold text-lg block">🎨 支持多种格式</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">JPG、PNG、WebP等</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 group hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-300 hover:scale-105 border-2 border-emerald-200 dark:border-emerald-700">
                  <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-300 font-bold text-lg block">⚡ 快速 + 详细模式</span>
                    <span className="text-emerald-700 dark:text-emerald-400 text-sm">预设配置 + 专业调整</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 group hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-600">
                  <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                    <Image className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg block">📦 批量处理支持</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">同时处理多个文件</span>
                  </div>
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
              <Card className="border-2 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-cyan-400">
                        🚀 开始压缩
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-700 dark:text-slate-300">⚡️ 准备压缩</span>
                        <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-cyan-400 font-bold text-lg">
                          {state.files.length} 个文件
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        📦 总大小: {state.files.reduce((acc, file) => acc + file.size, 0).toLocaleString()} bytes
                      </p>
                    </div>
                    <Button
                      onClick={handleCompressAll}
                      disabled={state.isCompressing || state.files.length === 0}
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 px-8 py-4 text-lg shadow-lg shadow-cyan-500/25"
                    >
                      {state.isCompressing ? (
                        <>
                          <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ⏳ 压缩中...
                        </>
                      ) : (
                        <>
                          <Play className="mr-3 h-5 w-5" />
                          🎯 开始压缩
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
            <Card className="border-2 border-blue-200 dark:border-blue-600 bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span className="text-2xl">💡</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    📖 使用提示
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="group p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚡️</span>
                    <h4 className="font-medium text-sm text-cyan-700 dark:text-cyan-300">快速模式</h4>
                  </div>
                  <p className="text-sm text-cyan-800 dark:text-cyan-400 leading-relaxed">
                    🎯 使用预设配置，适合大多数场景。选择网页优化或社交媒体预设即可获得良好的效果。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚙️</span>
                    <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300">详细模式</h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
                    🔧 可以精确控制输出格式、质量、尺寸等参数，适合有特定需求的专业用户。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">📦</span>
                    <h4 className="font-medium text-sm text-emerald-700 dark:text-emerald-300">批量处理</h4>
                  </div>
                  <p className="text-sm text-emerald-800 dark:text-emerald-400 leading-relaxed">
                    🚀 支持同时上传多个文件，系统会并行处理，提高效率。
                  </p>
                </div>

                <div className="group p-4 rounded-lg bg-lime-50 dark:bg-lime-950/50 border border-lime-200 dark:border-lime-700 hover:bg-lime-100 dark:hover:bg-lime-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🎨</span>
                    <h4 className="font-medium text-sm text-lime-700 dark:text-lime-300">格式支持</h4>
                  </div>
                  <p className="text-sm text-lime-800 dark:text-lime-400 leading-relaxed">
                    📂 输入支持：JPG、PNG、WebP、GIF、BMP、TIFF<br />
                    📤 输出支持：JPG、PNG、WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 性能说明 */}
            <Alert className="border-2 border-emerald-200 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30">
              <AlertDescription className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <div>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">🔒 安全提示：</span>
                  <span className="text-emerald-800 dark:text-emerald-400">图片压缩在浏览器本地进行，您的数据不会上传到服务器，保护隐私安全 ✨</span>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}