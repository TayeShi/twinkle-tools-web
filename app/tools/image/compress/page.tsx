'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import FileUploader from '@/components/FileUploader'
import { useImageToolStore } from '@/stores/imageToolStore'
import { compressImage, formatFileSize, calculateCompressionRatio } from '@/components/lib/imageProcessor'
import {
  ArrowDownTrayIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline'

export default function CompressPage() {
  const {
    originalFile,
    processedBlob,
    previewUrl,
    originalSize,
    processedSize,
    processingStatus,
    errorMessage,
    compressionQuality,
    setOriginalFile,
    setProcessedBlob,
    setProcessingStatus,
    setError,
    setCompressionQuality,
    setCurrentTool,
    reset,
  } = useImageToolStore()

  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    setCurrentTool('compress')
    return () => reset()
  }, [setCurrentTool, reset])

  const handleCompress = async () => {
    if (!originalFile) return

    setProcessingStatus('processing')
    setError(null)

    try {
      const compressedBlob = await compressImage(originalFile, compressionQuality)
      setProcessedBlob(compressedBlob)
      setProcessingStatus('completed')
    } catch (error) {
      setError(error instanceof Error ? error.message : '压缩失败')
      setProcessingStatus('error')
    }
  }

  const handleDownload = () => {
    if (!processedBlob || !originalFile) return

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed_${originalFile.name}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    reset()
    setShowComparison(false)
  }

  const compressionRatio = calculateCompressionRatio(originalSize, processedSize)

  return (
    <>
      <Header />

      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              图片压缩
            </h1>
            <p className="text-lg text-slate-600">
              高质量压缩图片，保持清晰度同时大幅减小文件大小
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {!originalFile ? (
                <FileUploader
                  onFileSelect={setOriginalFile}
                  accept="image/jpeg,image/png,image/webp"
                />
              ) : (
                <>
                  <div className="section-card">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">压缩设置</h3>
                      <button
                        onClick={handleReset}
                        className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
                      >
                        重新上传
                      </button>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">
                          压缩质量: {compressionQuality}%
                        </label>
                        <span className="text-xs text-slate-500">
                          {compressionQuality < 30 ? '高压缩' : compressionQuality < 70 ? '中等' : '高质量'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={compressionQuality}
                        onChange={(e) => setCompressionQuality(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="mt-2 flex justify-between text-xs text-slate-400">
                        <span>最小</span>
                        <span>最大</span>
                      </div>
                    </div>

                    {processingStatus === 'completed' ? (
                      <button
                        onClick={handleCompress}
                        className="btn-primary w-full"
                      >
                        <SparklesIcon className="h-5 w-5" />
                        重新压缩
                      </button>
                    ) : (
                      <button
                        onClick={handleCompress}
                        disabled={processingStatus === 'processing'}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingStatus === 'processing' ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            处理中...
                          </>
                        ) : (
                          <>
                            <SparklesIcon className="h-5 w-5" />
                            开始压缩
                          </>
                        )}
                      </button>
                    )}

                    {errorMessage && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        <XCircleIcon className="h-5 w-5 flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  {previewUrl && (
                    <div className="section-card">
                      <h3 className="mb-4 text-lg font-bold text-slate-900">图片预览</h3>
                      <div className="overflow-hidden rounded-xl bg-slate-50 border border-slate-200">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full object-contain"
                          style={{ maxHeight: '400px' }}
                        />
                      </div>
                    </div>
                  )}

                  {processingStatus === 'completed' && processedBlob && (
                    <div className="section-card">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">压缩结果</h3>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <CheckCircleIcon className="h-5 w-5" />
                          压缩成功
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                          <p className="text-xs text-slate-500 mb-1">原始大小</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {formatFileSize(originalSize)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 border border-green-200">
                          <p className="text-xs text-green-600 mb-1">压缩后</p>
                          <p className="text-2xl font-bold text-green-700">
                            {formatFileSize(processedSize)}
                          </p>
                        </div>
                      </div>

                      {compressionRatio > 0 && (
                        <div className="mb-6 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 p-4 border border-primary-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-primary-700 mb-1">压缩率</p>
                              <p className="text-3xl font-bold text-primary-700">
                                {compressionRatio.toFixed(1)}%
                              </p>
                            </div>
                            <SparklesIcon className="h-12 w-12 text-primary-300" />
                          </div>
                          <p className="mt-2 text-xs text-primary-600">
                            体积减小 {formatFileSize(originalSize - processedSize)}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={handleDownload}
                        className="btn-secondary w-full"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        下载压缩后的图片
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="section-card sticky top-32">
                <h3 className="mb-4 text-lg font-bold text-slate-900">使用说明</h3>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">上传图片</p>
                      <p>拖拽或点击上传，支持 JPG、PNG、WEBP 格式</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">调整质量</p>
                      <p>拖动滑块调整压缩质量，数值越小压缩率越高</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">开始压缩</p>
                      <p>点击按钮开始压缩，查看压缩效果</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">下载保存</p>
                      <p>下载压缩后的图片到本地</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 p-4 border border-primary-200">
                  <p className="text-sm font-medium text-primary-800 mb-2">💡 提示</p>
                  <p className="text-xs text-primary-700">
                    推荐质量设置为 60-80%，可以获得较好的压缩效果和视觉质量平衡
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
