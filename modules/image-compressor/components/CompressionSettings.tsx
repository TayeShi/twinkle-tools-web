'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ImageCompressionConfig, PRESET_CONFIGS } from '../types';

interface CompressionSettingsProps {
  config: ImageCompressionConfig;
  onConfigChange: (config: Partial<ImageCompressionConfig>) => void;
}

export function CompressionSettings({ config, onConfigChange }: CompressionSettingsProps) {
  const formatFileSize = (kb: number): string => {
    if (kb < 1024) {
      return `${kb}KB`;
    }
    return `${(kb / 1024).toFixed(1)}MB`;
  };

  const applyPreset = (preset: keyof typeof PRESET_CONFIGS) => {
    onConfigChange(PRESET_CONFIGS[preset]);
  };

  return (
    <Card className="border-2 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <span className="text-2xl">⚙️</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">
            🎯 压缩设置
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={config.mode} onValueChange={(value) => onConfigChange({ mode: value as 'quick' | 'detailed' })}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-200 dark:bg-slate-700">
            <TabsTrigger value="quick" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              ⚡ 快速模式
            </TabsTrigger>
            <TabsTrigger value="detailed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              ⚙️ 详细模式
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-6 p-4 rounded-xl bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm">
            {/* 预设配置 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl text-cyan-600 dark:text-cyan-400">🎨</span>
                <Label className="text-lg font-medium text-cyan-700 dark:text-cyan-300">预设配置</Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center text-center border-cyan-200 dark:border-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[100px]"
                  onClick={() => applyPreset('WEB_OPTIMIZED')}
                >
                  <span className="text-cyan-600 dark:text-cyan-300 font-semibold mb-2 text-sm block w-full text-center leading-tight">🌐 网页优化</span>
                  <span className="text-xs text-cyan-700 dark:text-cyan-500 block w-full text-center leading-tight whitespace-normal">📏 最大200KB<br/>JPEG格式</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center text-center border-emerald-200 dark:border-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[100px]"
                  onClick={() => applyPreset('SOCIAL_MEDIA')}
                >
                  <span className="text-emerald-600 dark:text-emerald-300 font-semibold mb-2 text-sm block w-full text-center leading-tight">📱 社交媒体</span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-500 block w-full text-center leading-tight whitespace-normal">📏 最大100KB<br/>JPEG格式</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center text-center border-blue-200 dark:border-blue-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[100px]"
                  onClick={() => applyPreset('HIGH_QUALITY')}
                >
                  <span className="text-blue-600 dark:text-blue-300 font-semibold mb-2 text-sm block w-full text-center leading-tight">💎 高质量</span>
                  <span className="text-xs text-blue-700 dark:text-blue-500 block w-full text-center leading-tight whitespace-normal">📏 PNG格式<br/>高质量</span>
                </Button>
              </div>
            </div>

            {/* 快速模式设置 */}
            <div className="space-y-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-cyan-600 dark:text-cyan-400">🎨</span>
                  <Label htmlFor="outputFormat" className="text-base font-medium text-cyan-700 dark:text-cyan-300 whitespace-nowrap">输出格式</Label>
                </div>
                <Select
                  value={config.outputFormat}
                  onValueChange={(value: 'jpeg' | 'png' | 'webp') => 
                    onConfigChange({ outputFormat: value })
                  }
                >
                  <SelectTrigger className="border-slate-200 dark:border-slate-600 hover:border-cyan-400 bg-white dark:bg-slate-800 min-w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 dark:border-slate-600">
                    <SelectItem value="jpeg" className="text-cyan-600 dark:text-cyan-300 whitespace-nowrap">📸 JPEG - 适合照片</SelectItem>
                    <SelectItem value="png" className="text-emerald-600 dark:text-emerald-300 whitespace-nowrap">🖼️ PNG - 支持透明</SelectItem>
                    <SelectItem value="webp" className="text-blue-600 dark:text-blue-400 whitespace-nowrap">🌐 WebP - 现代格式</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.maxSize && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-cyan-600 dark:text-cyan-400">📏</span>
                    <Label htmlFor="maxSize" className="text-base font-medium text-cyan-700 dark:text-cyan-300 whitespace-nowrap">
                      最大大小: <span className="font-bold text-cyan-600 dark:text-cyan-400">{formatFileSize(config.maxSize)}</span>
                    </Label>
                  </div>
                  <Slider
                    value={[config.maxSize]}
                    onValueChange={([value]) => onConfigChange({ maxSize: value })}
                    max={5000}
                    min={10}
                    step={10}
                    className="w-full data-[orientation=horizontal]:bg-gradient-to-r data-[orientation=horizontal]:from-cyan-500 data-[orientation=horizontal]:to-blue-600"
                  />
                  <div className="flex justify-between text-xs text-cyan-600 dark:text-cyan-400">
                    <span className="whitespace-nowrap">📏 10KB</span>
                    <span className="whitespace-nowrap">📦 5MB</span>
                  </div>
                </div>
              )}

              {config.outputFormat !== 'png' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-cyan-600 dark:text-cyan-400">🎯</span>
                    <Label htmlFor="quality" className="text-base font-medium text-cyan-700 dark:text-cyan-300 whitespace-nowrap">
                      图片质量: <span className="font-bold text-cyan-600 dark:text-cyan-400">{config.quality || 80}%</span>
                    </Label>
                  </div>
                  <Slider
                    value={[config.quality || 80]}
                    onValueChange={([value]) => onConfigChange({ quality: value })}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full data-[orientation=horizontal]:bg-gradient-to-r data-[orientation=horizontal]:from-cyan-500 data-[orientation=horizontal]:to-blue-600"
                  />
                  <div className="flex justify-between text-xs text-cyan-600 dark:text-cyan-400">
                    <span className="whitespace-nowrap">📉 低质量</span>
                    <span className="whitespace-nowrap">🌟 高质量</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6 p-4 rounded-xl bg-white/95 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl text-blue-600 dark:text-blue-400">⚙️</span>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">🔧 详细模式设置</h3>
              </div>
            </div>
            
            {/* 详细模式设置 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-blue-600 dark:text-blue-400">🎨</span>
                    <Label htmlFor="outputFormat" className="text-base font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">输出格式</Label>
                  </div>
                  <Select
                    value={config.outputFormat}
                    onValueChange={(value: 'jpeg' | 'png' | 'webp') => 
                      onConfigChange({ outputFormat: value })
                    }
                  >
                    <SelectTrigger className="border-slate-200 dark:border-slate-600 hover:border-blue-400 bg-white dark:bg-slate-800 min-w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200 dark:border-slate-600">
                      <SelectItem value="jpeg" className="text-blue-600 dark:text-blue-300 whitespace-nowrap">📸 JPEG</SelectItem>
                      <SelectItem value="png" className="text-emerald-600 dark:text-emerald-300 whitespace-nowrap">🖼️ PNG</SelectItem>
                      <SelectItem value="webp" className="text-cyan-600 dark:text-cyan-400 whitespace-nowrap">🌐 WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-blue-600 dark:text-blue-400">🎯</span>
                    <Label htmlFor="quality" className="text-base font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">图片质量</Label>
                  </div>
                  <Input
                    type="number"
                    min="10"
                    max="100"
                    value={config.quality || 80}
                    onChange={(e) => onConfigChange({ quality: parseInt(e.target.value) })}
                    className="border-slate-200 dark:border-slate-600 focus:border-blue-400 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* 添加右侧内容 - 预览区域 */}
              <div className="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl text-blue-600 dark:text-blue-400">📋</span>
                    <Label className="text-base font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">配置预览</Label>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-slate-100 dark:bg-slate-900/50">
                      <span className="text-blue-700 dark:text-blue-400">📐 格式:</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">
                        {config.outputFormat === 'jpeg' ? '📸 JPEG' : 
                         config.outputFormat === 'png' ? '🖼️ PNG' : '🌐 WebP'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-100 dark:bg-slate-900/50">
                      <span className="text-blue-700 dark:text-blue-400">🎯 质量:</span>
                      <span className="font-bold text-blue-700 dark:text-blue-300">{config.quality || 80}%</span>
                    </div>
                    {config.width && (
                      <div className="flex justify-between items-center p-2 rounded bg-slate-100 dark:bg-slate-900/50">
                        <span className="text-blue-700 dark:text-blue-400">↔️ 宽度:</span>
                        <span className="font-bold text-blue-700 dark:text-blue-300">{config.width}px</span>
                      </div>
                    )}
                    {config.height && (
                      <div className="flex justify-between items-center p-2 rounded bg-slate-100 dark:bg-slate-900/50">
                        <span className="text-blue-700 dark:text-blue-400">↕️ 高度:</span>
                        <span className="font-bold text-blue-700 dark:text-blue-300">{config.height}px</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 尺寸设置 */}
            <div className="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-emerald-600 dark:text-emerald-400">📏</span>
                  <Label className="text-base font-medium text-emerald-700 dark:text-emerald-300 whitespace-nowrap">图片尺寸</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔄</span>
                  <Switch
                    checked={config.maintainAspectRatio}
                    onCheckedChange={(checked) => onConfigChange({ maintainAspectRatio: checked })}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                  <Label className="text-sm font-medium text-emerald-700 dark:text-emerald-300 whitespace-nowrap">保持宽高比</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">↔️</span>
                    <Label htmlFor="width" className="text-base font-medium text-emerald-700 dark:text-emerald-300 whitespace-nowrap">宽度 (px)</Label>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="原始宽度"
                    value={config.width || ''}
                    onChange={(e) => onConfigChange({ 
                      width: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    className="border-slate-200 dark:border-slate-600 focus:border-emerald-400 bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">↕️</span>
                    <Label htmlFor="height" className="text-base font-medium text-emerald-700 dark:text-emerald-300 whitespace-nowrap">高度 (px)</Label>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="原始高度"
                    value={config.height || ''}
                    onChange={(e) => onConfigChange({ 
                      height: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    className="border-slate-200 dark:border-slate-600 focus:border-emerald-400 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* 高级设置 */}
            <div className="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl text-lime-600 dark:text-lime-400">🔧</span>
                <Label className="text-lg font-semibold text-lime-700 dark:text-lime-300 whitespace-nowrap">🚀 高级设置</Label>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">🗑️</span>
                      <Label className="text-base font-medium text-lime-700 dark:text-lime-300 whitespace-nowrap">去除元数据</Label>
                    </div>
                    <p className="text-sm text-lime-800 dark:text-lime-400 break-words">
                      🔍 移除EXIF、GPS等元数据以减小文件大小
                    </p>
                  </div>
                  <Switch
                    checked={config.stripMetadata}
                    onCheckedChange={(checked) => onConfigChange({ stripMetadata: checked })}
                    className="data-[state=checked]:bg-lime-600 scale-110 flex-shrink-0 mt-1"
                  />
                </div>

                <div className="flex items-start justify-between p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xl">📷</span>
                      <Label className="text-base font-medium text-lime-700 dark:text-lime-300 whitespace-nowrap">保留EXIF信息</Label>
                    </div>
                    <p className="text-sm text-lime-800 dark:text-lime-400 break-words">
                      📷 保留相机的拍摄参数等信息
                    </p>
                  </div>
                  <Switch
                    checked={config.preserveExif}
                    onCheckedChange={(checked) => onConfigChange({ preserveExif: checked })}
                    className="data-[state=checked]:bg-lime-600 scale-110 flex-shrink-0 mt-1"
                  />
                </div>

                {config.outputFormat === 'jpeg' && (
                  <div className="flex items-start justify-between p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl">🌐</span>
                        <Label className="text-base font-medium text-lime-700 dark:text-lime-300 whitespace-nowrap">渐进式JPEG</Label>
                      </div>
                      <p className="text-sm text-lime-800 dark:text-lime-400 break-words">
                        ⚡ 渐进加载，适合网络传输
                      </p>
                    </div>
                    <Switch
                      checked={config.progressive || false}
                      onCheckedChange={(checked) => onConfigChange({ progressive: checked })}
                      className="data-[state=checked]:bg-lime-600 scale-110 flex-shrink-0 mt-1"
                    />
                  </div>
                )}

                {config.outputFormat === 'png' && (
                  <div className="space-y-3 p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl text-lime-600 dark:text-lime-400">📊</span>
                      <Label className="text-base font-medium text-lime-700 dark:text-lime-300 whitespace-nowrap">
                        压缩级别: <span className="font-bold text-lime-600 dark:text-lime-400">{config.compressionLevel || 6}</span>
                      </Label>
                    </div>
                    <Slider
                      value={[config.compressionLevel || 6]}
                      onValueChange={([value]) => onConfigChange({ compressionLevel: value })}
                      max={9}
                      min={0}
                      step={1}
                      className="w-full data-[orientation=horizontal]:bg-gradient-to-r data-[orientation=horizontal]:from-lime-500 data-[orientation=horizontal]:to-yellow-600"
                    />
                    <div className="flex justify-between text-xs text-lime-600 dark:text-lime-400">
                      <span className="whitespace-nowrap">⚡ 快速</span>
                      <span className="whitespace-nowrap">🗜️ 最高压缩</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}