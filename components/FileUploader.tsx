'use client'

import { useCallback, useState } from 'react'
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  className?: string
}

export default function FileUploader({ onFileSelect, accept = 'image/*', maxSize = 50 * 1024 * 1024, className = '' }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setError(null)

    const file = e.dataTransfer.files[0]
    if (file) validateAndSelectFile(file)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSelectFile(file)
  }, [])

  const validateAndSelectFile = (file: File) => {
    if (file.size > maxSize) {
      setError('文件大小超过限制 (最大 50MB)')
      return
    }

    if (accept && !file.type.match(accept)) {
      setError('不支持的文件类型')
      return
    }

    setError(null)
    onFileSelect(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
        isDragging
          ? 'border-primary-500 bg-primary-50/50 scale-[1.02]'
          : 'border-slate-300 bg-white hover:border-primary-400 hover:bg-slate-50'
      } ${className}`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className={`mb-4 rounded-full p-4 transition-all duration-300 ${
          isDragging ? 'bg-primary-100 scale-110' : 'bg-slate-100'
        }`}>
          {isDragging ? (
            <CloudArrowUpIcon className="h-8 w-8 text-primary-600" />
          ) : (
            <PhotoIcon className="h-8 w-8 text-slate-400" />
          )}
        </div>

        <p className="mb-2 text-lg font-semibold text-slate-900">
          {isDragging ? '释放文件' : '拖拽图片到此处'}
        </p>

        <p className="mb-4 text-sm text-slate-500">或者点击选择文件</p>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-slate-100 font-medium">JPG</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 font-medium">PNG</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 font-medium">WEBP</span>
        </div>

        <p className="mt-4 text-xs text-slate-400">最大文件大小: 50MB</p>
      </div>

      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-50 border-t border-red-200 px-4 py-3">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}
    </div>
  )
}
