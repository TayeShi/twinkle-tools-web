'use client';

import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ConversionProgress as ConversionProgressType } from '../types';

interface ConversionProgressProps {
  // 进度信息
  progress: ConversionProgressType;
  // 转换状态
  status: 'idle' | 'converting' | 'completed' | 'error';
  // 错误信息
  error?: string;
}

export function ConversionProgress({ progress, status, error }: ConversionProgressProps) {
  // 格式化时间（毫秒转秒）
  const formatTime = (ms: number): string => {
    if (ms < 1000) return '< 1 s';
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds} s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} m ${remainingSeconds} s`;
  };

  // 获取状态文本和图标
  const getStatusInfo = () => {
    switch (status) {
      case 'converting':
        return {
          text: '⏳ 转换中...',
          icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
          color: 'text-blue-600 dark:text-blue-400',
        };
      case 'completed':
        return {
          text: '✅ 转换完成！',
          icon: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
          color: 'text-green-600 dark:text-green-400',
        };
      case 'error':
        return {
          text: '❌ 转换失败',
          icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
          color: 'text-red-600 dark:text-red-400',
        };
      default:
        return {
          text: '🟡 等待转换',
          icon: <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
          color: 'text-yellow-600 dark:text-yellow-400',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        {/* 状态标题 */}
        <div className="flex items-center space-x-3 mb-4">
          {statusInfo.icon}
          <h3 className={`text-xl font-bold ${statusInfo.color}`}>
            {statusInfo.text}
          </h3>
        </div>

        {/* 错误信息 */}
        {status === 'error' && error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* 进度条 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              📊 整体进度
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {Math.round(progress.overallProgress * 100)}%
            </span>
          </div>
          <Progress
            value={progress.overallProgress * 100}
            className="h-4 bg-blue-200 dark:bg-blue-800"
          />
        </div>

        {/* 页面进度 */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              📄 页面进度
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {progress.currentPage} / {progress.totalPages} 页
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(progress.currentPage / progress.totalPages) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 预计剩余时间 */}
        {status === 'converting' && progress.estimatedTimeRemaining !== undefined && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              ⏱️ 预计剩余时间
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              {formatTime(progress.estimatedTimeRemaining)}
            </span>
          </div>
        )}

        {/* 转换速度 */}
        {status === 'converting' && progress.currentPage > 0 && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              🚀 转换速度
            </span>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {progress.currentPage} 页 / 分钟
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
