'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, FileText, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PdfUploaderProps {
  // 已选择的PDF文件
  selectedFile: File | null;
  // PDF页数
  pageCount?: number;
  // 文件选择回调
  onFileSelected: (file: File) => Promise<void>;
  // 开始转换回调
  onStartConversion?: () => void;
  // 重置回调
  onReset?: () => void;
  // 是否禁用
  disabled?: boolean;
  // 转换状态
  isConverting?: boolean;
}

export function PdfUploader({ selectedFile, pageCount, onFileSelected, onStartConversion, onReset, disabled = false, isConverting = false }: PdfUploaderProps) {
  // 处理文件接受
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && !disabled) {
      await onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected, disabled]);

  // 配置dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled,
  });

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-500">
      <CardContent className="p-8">
        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`
              border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
              ${isDragActive
                ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/50 scale-105'
                : 'border-blue-300 dark:border-blue-700 hover:border-blue-500 hover:bg-blue-100/50 dark:hover:bg-blue-900/30'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="p-6 rounded-full bg-purple-600 text-white shadow-lg hover:scale-110 transition-transform duration-300">
                <FileUp className="h-12 w-12" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  📁 上传PDF文件
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  {isDragActive ? (
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      🎯 释放鼠标上传文件
                    </span>
                  ) : (
                    <>
                      🖱️ 点击或拖拽PDF文件到此处上传
                      <br />
                      <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                        📄 支持PDF格式，单个文件最大200MB
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="w-full max-w-sm">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                  disabled={disabled}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  📂 选择PDF文件
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="p-4 rounded-full bg-green-600 text-white shadow-lg">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                    ✅ 文件已选择
                  </h3>
                  <div className="space-y-1">
                    <p className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none">
                      📄 {selectedFile.name}
                    </p>
                    <div className="flex flex-wrap items-center space-x-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        📦 大小: {formatFileSize(selectedFile.size)} • 📄 PDF格式
                      </p>
                      {pageCount !== undefined && (
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm">
                          {pageCount} 页
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
                  onClick={() => onReset?.()}
                  disabled={disabled}
                >
                  <X className="mr-2 h-5 w-5" />
                  🔄 重新选择
                </Button>
                {onStartConversion && (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                    onClick={() => onStartConversion()}
                    disabled={disabled || isConverting}
                  >
                    {isConverting ? (
                      <>⏳ 转换中...</>
                    ) : (
                      <>🎯 开始转换</>
                    )}
                  </Button>
                )}
              </div>
            </div>
            
            <Alert className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <AlertDescription className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <span className="text-2xl">💡</span>
                <div>
                  <span className="font-semibold">📝 提示：</span>
                  已选择文件 <span className="font-bold">{selectedFile.name}</span>，请在右侧设置转换参数，然后点击开始转换按钮。
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
