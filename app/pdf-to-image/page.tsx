'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Zap, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 使用客户端组件，不需要动态导入，因为已经有'use client'指令
// PDF.js相关代码会在客户端执行，不会影响SSR
import { usePdfToImage } from '@/modules/pdf-to-image/hooks/usePdfToImage';
import { PdfUploader } from '@/modules/pdf-to-image/components/PdfUploader';
import { ConversionSettings } from '@/modules/pdf-to-image/components/ConversionSettings';
import { ConversionProgress } from '@/modules/pdf-to-image/components/ConversionProgress';
import { ImagePreview } from '@/modules/pdf-to-image/components/ImagePreview';
import { DownloadButton } from '@/modules/pdf-to-image/components/DownloadButton';

export default function PdfToImagePage() {
  // 使用PDF转图片钩子
  const pdfToImage = usePdfToImage();
  const state = pdfToImage.getState();
  
  // 下载状态
  const [isDownloading, setIsDownloading] = useState(false);

  // 处理文件选择
  const handleFileSelected = async (file: File) => {
    await pdfToImage.selectFile(file);
  };

  // 处理开始转换
  const handleStartConversion = async () => {
    await pdfToImage.startConversion();
  };

  // 处理批量下载
  const handleDownloadAll = async () => {
    try {
      setIsDownloading(true);
      await pdfToImage.downloadAll();
    } finally {
      setIsDownloading(false);
    }
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
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                    📄 PDF转图片工具
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    🎨 快速将PDF文件转换为高质量图片，支持多种格式和自定义设置
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
                    ⚡ 智能PDF转图片工具
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                    📄 将PDF文件转换为高质量图片，支持多种格式和自定义设置，快速高效 🚀
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
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-lg block">🎨 多种格式支持</span>
                    <span className="text-blue-600 dark:text-blue-400 text-sm">PNG、JPG、WebP</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/50 group hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-bold text-lg block">⚡ 快速转换</span>
                    <span className="text-green-600 dark:text-green-400 text-sm">高效处理，实时预览</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 group hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-purple-700 dark:text-purple-300 font-bold text-lg block">📄 批量处理</span>
                    <span className="text-purple-600 dark:text-purple-400 text-sm">支持多页PDF转换</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-2 space-y-8">
            {/* PDF上传区域 */}
            <PdfUploader
              selectedFile={state.selectedFile?.file || null}
              pageCount={state.selectedFile?.pageCount}
              onFileSelected={handleFileSelected}
              onStartConversion={handleStartConversion}
              onReset={pdfToImage.reset}
              disabled={state.status === 'converting'}
              isConverting={state.status === 'converting'}
            />

            {/* 转换进度 */}
            {state.status === 'converting' && (
              <ConversionProgress
                progress={state.progress}
                status={state.status}
                error={state.error}
              />
            )}

            {/* 转换结果预览 */}
            <ImagePreview
              images={state.selectedFile?.convertedImages || []}
              onDownloadSingle={pdfToImage.downloadSingle}
              isConverting={state.status === 'converting'}
              disabled={state.status === 'converting'}
            />
          </div>

          {/* 侧边栏设置 */}
          <div className="space-y-8">
            {/* 转换设置 */}
            <ConversionSettings
              config={state.config}
              onConfigChange={pdfToImage.updateConfig}
              disabled={state.status === 'converting'}
            />

            {/* 批量下载按钮 */}
            <DownloadButton
              onDownloadAll={handleDownloadAll}
              imageCount={state.selectedFile?.convertedImages.length || 0}
              disabled={state.status === 'converting'}
              isDownloading={isDownloading}
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
                    <h4 className="font-medium text-sm text-blue-700 dark:text-blue-300">快速开始</h4>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">
                    🎯 选择PDF文件，调整转换设置，点击{'"'}开始转换{'"'}按钮即可将PDF转换为图片。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⚙️</span>
                    <h4 className="font-medium text-sm text-purple-700 dark:text-purple-300">格式选择</h4>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 leading-relaxed">
                    🔧 PNG适合需要透明背景的图片，JPG适合照片，WebP提供更好的压缩比。
                  </p>
                </div>
                
                <div className="group p-4 rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">📦</span>
                    <h4 className="font-medium text-sm text-green-700 dark:text-green-300">批量下载</h4>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 leading-relaxed">
                    🚀 转换完成后，可以点击{'"'}批量下载所有图片{'"'}按钮下载所有转换后的图片。
                  </p>
                </div>

                <div className="group p-4 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🎨</span>
                    <h4 className="font-medium text-sm text-orange-700 dark:text-orange-300">黑白转换</h4>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 leading-relaxed">
                    📂 开启黑白转换可以减小文件大小，适合文档类PDF转换。
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
                  <span className="text-green-600 dark:text-green-400">PDF转换在浏览器本地进行，您的数据不会上传到服务器，保护隐私安全 ✨</span>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
