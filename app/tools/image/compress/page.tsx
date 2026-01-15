"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ImageCompressPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      alert("请选择 JPG、PNG 或 WEBP 格式的图片");
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    setCompressedSize(0);
    setCompressedBlob(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedBlob(blob);
              setCompressedSize(blob.size);
            }
            setIsProcessing(false);
          },
          selectedFile.type,
          quality / 100
        );
      };

      img.src = previewUrl;
    } catch (error) {
      console.error("压缩失败:", error);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;

    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed_${selectedFile?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getCompressionRatio = (): string => {
    if (originalSize === 0 || compressedSize === 0) return "0%";
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    return ratio.toFixed(1) + "%";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-text-muted hover:text-primary transition-colors duration-200">
          首页
        </Link>
        <span className="mx-2 text-text-muted">/</span>
        <span className="text-text-muted">工具</span>
        <span className="mx-2 text-text-muted">/</span>
        <span className="text-text-muted">图片</span>
        <span className="mx-2 text-text-muted">/</span>
        <span className="text-secondary font-medium">图片压缩</span>
      </nav>

      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
          图片压缩
        </h1>
        <p className="text-xl text-text-muted">
          在浏览器中压缩图片，保护隐私，快速高效
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        {!previewUrl ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition-colors duration-200 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-secondary mb-2">
              拖拽图片到这里
            </h3>
            <p className="text-text-muted mb-4">
              支持 JPG、PNG、WEBP 格式，最大 50MB
            </p>
            <button
              type="button"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200"
            >
              选择文件
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-heading font-semibold text-secondary mb-4">原图</h3>
                <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-3 text-sm text-text-muted">
                  大小: {formatFileSize(originalSize)}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-secondary mb-4">
                  压缩后预览
                </h3>
                <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video">
                  {compressedBlob ? (
                    <img
                      src={URL.createObjectURL(compressedBlob)}
                      alt="Compressed"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      {isProcessing ? "处理中..." : "点击压缩查看预览"}
                    </div>
                  )}
                </div>
                {compressedSize > 0 && (
                  <div className="mt-3 text-sm text-text-muted">
                    大小: {formatFileSize(compressedSize)}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="font-heading font-semibold text-secondary mb-4 block">
                压缩质量: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-sm text-text-muted mt-2">
                <span>1% (最小文件)</span>
                <span>100% (最高质量)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={compressImage}
                disabled={isProcessing}
                className="flex-1 px-6 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "处理中..." : "压缩图片"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl("");
                  setCompressedBlob(null);
                  setCompressedSize(0);
                  setOriginalSize(0);
                }}
                className="px-6 py-4 bg-white hover:bg-gray-50 text-secondary border-2 border-gray-200 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                重新选择
              </button>
            </div>

            {compressedSize > 0 && (
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-semibold text-green-800 mb-2">
                      压缩完成!
                    </h4>
                    <p className="text-green-700 text-sm">
                      文件大小减少了 <span className="font-semibold">{getCompressionRatio()}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200"
                  >
                    下载
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <h3 className="font-heading text-2xl font-semibold text-secondary mb-4">
          需要其他功能?
        </h3>
        <p className="text-text-muted mb-6">
          我们还提供图片格式转换功能
        </p>
        <Link
          href="/tools/image/convert"
          className="inline-block px-6 py-3 bg-white hover:bg-gray-50 text-secondary border-2 border-gray-200 rounded-xl font-medium transition-all duration-200"
        >
          格式转换
        </Link>
      </div>
    </div>
  );
}
