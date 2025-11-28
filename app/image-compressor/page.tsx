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
      <header className="border-b bg-gradient-to-r from-white/90 to-purple-50/90 dark:from-slate-900/90 dark:to-purple-950/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" size="lg" className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 px-6 py-3">
                  <ArrowLeft className="mr-3 h-5 w-5" />
                  🏠 返回首页
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    🖼️ 图片压缩转换
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    🎨 智能压缩，批量处理，保护隐私
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 工具介绍 */}
        <div className="mb-8">
          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-2xl font-bold">
                    ⚡ 智能图片压缩工具
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                    🎨 支持多种图片格式的压缩和转换，提供快速模式和详细参数设置，可批量处理图片 🚀
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 group hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-lg block">🎨 支持多种格式</span>
                    <span className="text-blue-600 dark:text-blue-400 text-sm">JPG、PNG、WebP等</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/50 group hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-bold text-lg block">⚡ 快速 + 详细模式</span>
                    <span className="text-green-600 dark:text-green-400 text-sm">预设配置 + 专业调整</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 group hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <Image className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-purple-700 dark:text-purple-300 font-bold text-lg block">📦 批量处理支持</span>
                    <span className="text-purple-600 dark:text-purple-400 text-sm">同时处理多个文件</span>
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
              <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        🚀 开始压缩
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-600 dark:text-slate-400">⚡️ 准备压缩</span>
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg">
                          {state.files.length} 个文件
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        📦 总大小: {state.files.reduce((acc, file) => acc + file.size, 0).toLocaleString()} bytes
                      </p>
                    </div>
                    <Button
                      onClick={handleCompressAll}
                      disabled={state.isCompressing || state.files.length === 0}
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg shadow-lg"
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
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span className="text-2xl">💡</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    📖 使用提示
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="group p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚡️</span>
                    <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300">快速模式</h4>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
                    🎯 使用预设配置，适合大多数场景。选择网页优化或社交媒体预设即可获得良好的效果。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚙️</span>
                    <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">详细模式</h4>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 leading-relaxed">
                    🔧 可以精确控制输出格式、质量、尺寸等参数，适合有特定需求的专业用户。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">📦</span>
                    <h4 className="font-medium text-sm text-green-700 dark:text-green-300">批量处理</h4>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 leading-relaxed">
                    🚀 支持同时上传多个文件，系统会并行处理，提高效率。
                  </p>
                </div>

                <div className="group p-4 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🎨</span>
                    <h4 className="font-medium text-sm text-orange-700 dark:text-orange-300">格式支持</h4>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 leading-relaxed">
                    📂 输入支持：JPG、PNG、WebP、GIF、BMP、TIFF<br />
                    📤 输出支持：JPG、PNG、WebP
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 性能说明 */}
            <Alert className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <AlertDescription className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <div>
                  <span className="font-semibold text-green-700 dark:text-green-300">🔒 安全提示：</span>
                  <span className="text-green-600 dark:text-green-400">图片压缩在浏览器本地进行，您的数据不会上传到服务器，保护隐私安全 ✨</span>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}