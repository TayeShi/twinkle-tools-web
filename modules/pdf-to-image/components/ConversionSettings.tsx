'use client';

import React from 'react';
import { Settings, FileImage, Maximize2, Palette, ToggleLeft, ToggleRight, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { PdfToImageConfig } from '../types';

interface ConversionSettingsProps {
  // 转换配置
  config: PdfToImageConfig;
  // 配置变更回调
  onConfigChange: (config: Partial<PdfToImageConfig>) => void;
  // 是否禁用
  disabled?: boolean;
}

export function ConversionSettings({ config, onConfigChange, disabled = false }: ConversionSettingsProps) {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <Settings className="h-5 w-5" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            ⚙️ 转换设置
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 图片格式选择 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center space-x-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
              <FileImage className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              📄 图片格式
            </Label>
            <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              {config.format.toUpperCase()}
            </span>
          </div>
          <Select
            value={config.format}
            onValueChange={(value) => onConfigChange({ format: value as 'png' | 'jpg' | 'webp' })}
            disabled={disabled}
          >
            <SelectTrigger className="border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300">
              <SelectValue placeholder="选择图片格式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">🖼️ PNG - 无损压缩</SelectItem>
              <SelectItem value="jpg">📷 JPG - 有损压缩</SelectItem>
              <SelectItem value="webp">🌐 WebP - 现代格式</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-500 dark:text-slate-500 italic">
            💡 PNG适合需要透明背景的图片，JPG适合照片，WebP提供更好的压缩比
          </p>
        </div>



        {/* 黑白转换开关 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center space-x-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
              <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              🎨 黑白转换
            </Label>
            <div className="flex items-center space-x-3">
              {config.isBlackWhite ? (
                <>
                  <ToggleRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">开启</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">关闭</span>
                </>
              )}
              <Switch
                checked={config.isBlackWhite}
                onCheckedChange={(checked) => onConfigChange({ isBlackWhite: checked })}
                disabled={disabled}
                className="data-[state=checked]:bg-gray-600 dark:data-[state=checked]:bg-gray-400"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 italic">
            💡 将彩色PDF转换为黑白图片，减小文件大小
          </p>
        </div>



        {/* 最大文件大小设置 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center space-x-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              📦 最大文件大小
            </Label>
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-bold">
              {config.maxFileSize ? `${config.maxFileSize < 1024 * 1024 ? `${(config.maxFileSize / 1024).toFixed(0)} KB` : `${(config.maxFileSize / (1024 * 1024)).toFixed(1)} MB`}` : '无限制'}
            </span>
          </div>
          
          {/* 滑动条 */}
          <div className="space-y-2">
            <Slider
              value={[config.maxFileSize ? config.maxFileSize / (1024 * 1024) : 0]}
              min={0}
              max={10}
              step={0.5}
              onValueChange={(value) => {
                const mbValue = value[0];
                onConfigChange({ maxFileSize: mbValue === 0 ? undefined : mbValue * 1024 * 1024 });
              }}
              disabled={disabled}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500">
              <span>无限制</span>
              <span>10 MB</span>
            </div>
          </div>
          
          {/* 快速选择按钮 */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              📏 快速选择：
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: undefined });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === undefined ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📤 无限制
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: 128 * 1024 });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === 128 * 1024 ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📁 128 KB
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: 256 * 1024 });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === 256 * 1024 ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📁 256 KB
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: 512 * 1024 });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === 512 * 1024 ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📁 512 KB
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: 1 * 1024 * 1024 });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === 1 * 1024 * 1024 ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📁 1 MB
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onConfigChange({ maxFileSize: 2 * 1024 * 1024 });
                }}
                disabled={disabled}
                className={`border-2 ${config.maxFileSize === 2 * 1024 * 1024 ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-950' : 'border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500'}`}
              >
                📁 2 MB
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-purple-600 dark:text-purple-400 italic">
            💡 设置最大文件大小，系统将自动调整质量以满足要求
          </p>
        </div>

        {/* 提示信息 */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            💡 <span className="font-semibold">提示：</span>
            调整设置后，点击{'"'}开始转换{'"'}按钮应用新的配置。
            较高的分辨率和质量会生成更大的图片文件。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
