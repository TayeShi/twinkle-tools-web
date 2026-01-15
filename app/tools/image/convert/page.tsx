'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import FileUploader from '@/components/FileUploader'
import { useImageToolStore } from '@/stores/imageToolStore'
import { convertImage, formatFileSize } from '@/components/lib/imageProcessor'
import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'

const formatOptions = [
  { id: 'image/jpeg', name: 'JPG', extension: 'jpg' },
  { id: 'image/png', name: 'PNG', extension: 'png' },
  { id: 'image/webp', name: 'WEBP', extension: 'webp' },
]

export default function ConvertPage() {
  const {
    originalFile,
    processedBlob,
    previewUrl,
    originalSize,
    processedSize,
    processingStatus,
    errorMessage,
    compressionQuality,
    outputFormat,
    setOriginalFile,
    setProcessedBlob,
    setProcessingStatus,
    setError,
    setCompressionQuality,
    setOutputFormat,
    setCurrentTool,
    reset,
  } = useImageToolStore()

  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    setCurrentTool('convert')
    setCompressionQuality(100)
    return () => reset()
  }, [setCurrentTool, reset, setCompressionQuality])

  const handleConvert = async () => {
    if (!originalFile) return

    setProcessingStatus('processing')
    setError(null)

    try {
      const convertedBlob = await convertImage(originalFile, outputFormat, compressionQuality)
      setProcessedBlob(convertedBlob)
      setProcessingStatus('completed')
    } catch (error) {
      setError(error instanceof Error ? error.message : '转换失败')
      setProcessingStatus('error')
    }
  }

  const handleDownload = () => {
    if (!processedBlob || !originalFile) return

    const format = formatOptions.find(f => f.id === outputFormat)
    const extension = format?.extension || 'jpg'

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement('a')
    a.href = url

    const fileName = originalFile.name
    const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.')) || fileName
    a.download = `${nameWithoutExtension}.${extension}`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    reset()
    setShowComparison(false)
    setCompressionQuality(100)
  }

  const getCurrentFormat = () => {
    if (!originalFile) return null
    const format = formatOptions.find(f => f.id === originalFile.type)
    return format?.name || originalFile.type
  }

  const getTargetFormat = () => {
    const format = formatOptions.find(f => f.id === outputFormat)
    return format?.name || outputFormat
  }

  const getSizeChange = () => {
    if (originalSize === 0 || processedSize === 0) return 0
    return ((processedSize - originalSize) / originalSize) * 100
  }

  return (
    <>
      <Header />

      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
              格式转换
            </h1>
            <p className="text-lg text-slate-600">
              快速转换图片格式，支持 JPG、PNG、WEBP 互转
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
                      <h3 className="text-lg font-bold text-slate-900">转换设置</h3>
                      <button
                        onClick={handleReset}
                        className="text-sm font-medium text-slate-500 hover:text-secondary-600 transition-colors"
                      >
                        重新上传
                      </button>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        {formatOptions.map((format) => (
                          <button
                            key={format.id}
                            onClick={() => setOutputFormat(format.id)}
                            className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${
                              outputFormat === format.id
                                ? 'border-secondary-500 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-secondary-300 hover:bg-slate-50'
                            }`}
                          >
                            {format.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <DocumentIcon className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">转换方向</p>
                            <p className="text-xs text-blue-700">
                              {getCurrentFormat()} <ArrowsRightLeftIcon className="inline h-4 w-4 mx-1" /> {getTargetFormat()}
                            </p>
                          </div>
                        </div>
                        <ArrowsRightLeftIcon className="h-8 w-8 text-blue-300" />
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">
                          输出质量: {compressionQuality}%
                        </label>
                        <span className="text-xs text-slate-500">
                          {compressionQuality < 50 ? '低质量' : compressionQuality < 80 ? '中等' : '高质量'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={compressionQuality}
                        onChange={(e) => setCompressionQuality(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary-600"
                      />
                      <div className="mt-2 flex justify-between text-xs text-slate-400">
                        <span>低质量</span>
                        <span>高质量</span>
                      </div>
                    </div>

                    {processingStatus === 'completed' ? (
                      <button
                        onClick={handleConvert}
                        className="btn-secondary w-full"
                      >
                        <ArrowsRightLeftIcon className="h-5 w-5" />
                        重新转换
                      </button>
                    ) : (
                      <button
                        onClick={handleConvert}
                        disabled={processingStatus === 'processing'}
                        className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingStatus === 'processing' ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            转换中...
                          </>
                        ) : (
                          <>
                            <ArrowsRightLeftIcon className="h-5 w-5" />
                            开始转换
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
                        <h3 className="text-lg font-bold text-slate-900">转换结果</h3>
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <CheckCircleIcon className="h-5 w-5" />
                          转换成功
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                          <p className="text-xs text-slate-500 mb-1">原始大小</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {formatFileSize(originalSize)}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{getCurrentFormat()}</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 p-4 border border-secondary-200">
                          <p className="text-xs text-secondary-600 mb-1">转换后</p>
                          <p className="text-2xl font-bold text-secondary-700">
                            {formatFileSize(processedSize)}
                          </p>
                          <p className="text-xs text-secondary-500 mt-1">{getTargetFormat()}</p>
                        </div>
                      </div>

                      {getSizeChange() !== 0 && (
                        <div className={`mb-6 rounded-xl p-4 border ${
                          getSizeChange() > 0
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm mb-1">
                                {getSizeChange() > 0 ? '文件变大' : '文件变小'}
                              </p>
                              <p className={`text-3xl font-bold ${
                                getSizeChange() > 0 ? 'text-orange-600' : 'text-green-600'
                              }`}>
                                {getSizeChange() > 0 ? '+' : ''}{getSizeChange().toFixed(1)}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500 mb-1">大小变化</p>
                              <p className={`text-lg font-semibold ${
                                getSizeChange() > 0 ? 'text-orange-600' : 'text-green-600'
                              }`}>
                                {getSizeChange() > 0 ? '+' : ''}{formatFileSize(processedSize - originalSize)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleDownload}
                        className="btn-primary w-full"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        下载转换后的图片
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
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">上传图片</p>
                      <p>拖拽或点击上传，支持 JPG、PNG、WEBP 格式</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">选择格式</p>
                      <p>选择目标格式：JPG、PNG 或 WEBP</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">调整质量</p>
                      <p>可选：调整输出质量（默认 100%）</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">开始转换</p>
                      <p>点击按钮开始格式转换</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold">
                      5
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">下载保存</p>
                      <p>下载转换后的图片到本地</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 mb-2">💡 格式说明</p>
                  <div className="space-y-2 text-xs text-blue-700">
                    <p><strong>JPG:</strong> 适合照片，文件较小</p>
                    <p><strong>PNG:</strong> 适合图形，支持透明</p>
                    <p><strong>WEBP:</strong> 现代格式，体积最小</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
