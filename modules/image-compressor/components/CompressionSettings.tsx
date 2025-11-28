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
    <Card>
      <CardHeader>
        <CardTitle>压缩设置</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={config.mode} onValueChange={(value) => onConfigChange({ mode: value as 'quick' | 'detailed' })}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">快速模式</TabsTrigger>
            <TabsTrigger value="detailed">详细模式</TabsTrigger>
          </TabsList>

          <TabsContent value="quick" className="space-y-6">
            {/* 预设配置 */}
            <div className="space-y-3">
              <Label>预设配置</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => applyPreset('WEB_OPTIMIZED')}
                >
                  <span className="font-medium">网页优化</span>
                  <span className="text-xs text-muted-foreground">最大200KB, JPEG</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => applyPreset('SOCIAL_MEDIA')}
                >
                  <span className="font-medium">社交媒体</span>
                  <span className="text-xs text-muted-foreground">最大100KB, JPEG</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => applyPreset('HIGH_QUALITY')}
                >
                  <span className="font-medium">高质量</span>
                  <span className="text-xs text-muted-foreground">PNG格式, 高质量</span>
                </Button>
              </div>
            </div>

            {/* 快速模式设置 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="outputFormat">输出格式</Label>
                <Select
                  value={config.outputFormat}
                  onValueChange={(value: 'jpeg' | 'png' | 'webp') => 
                    onConfigChange({ outputFormat: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG - 适合照片</SelectItem>
                    <SelectItem value="png">PNG - 支持透明</SelectItem>
                    <SelectItem value="webp">WebP - 现代格式</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.maxSize && (
                <div className="space-y-2">
                  <Label htmlFor="maxSize">最大大小: {formatFileSize(config.maxSize)}</Label>
                  <Slider
                    value={[config.maxSize]}
                    onValueChange={([value]) => onConfigChange({ maxSize: value })}
                    max={5000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10KB</span>
                    <span>5MB</span>
                  </div>
                </div>
              )}

              {config.outputFormat !== 'png' && (
                <div className="space-y-2">
                  <Label htmlFor="quality">图片质量: {config.quality || 80}%</Label>
                  <Slider
                    value={[config.quality || 80]}
                    onValueChange={([value]) => onConfigChange({ quality: value })}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>低质量</span>
                    <span>高质量</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {/* 详细模式设置 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="outputFormat">输出格式</Label>
                <Select
                  value={config.outputFormat}
                  onValueChange={(value: 'jpeg' | 'png' | 'webp') => 
                    onConfigChange({ outputFormat: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quality">图片质量</Label>
                <Input
                  type="number"
                  min="10"
                  max="100"
                  value={config.quality || 80}
                  onChange={(e) => onConfigChange({ quality: parseInt(e.target.value) })}
                />
              </div>
            </div>

            {/* 尺寸设置 */}
            <div className="space-y-4">
              <Label>图片尺寸</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.maintainAspectRatio}
                  onCheckedChange={(checked) => onConfigChange({ maintainAspectRatio: checked })}
                />
                <Label>保持宽高比</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">宽度 (px)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="原始宽度"
                    value={config.width || ''}
                    onChange={(e) => onConfigChange({ 
                      width: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">高度 (px)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="原始高度"
                    value={config.height || ''}
                    onChange={(e) => onConfigChange({ 
                      height: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                  />
                </div>
              </div>
            </div>

            {/* 高级设置 */}
            <div className="space-y-4">
              <Label>高级设置</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>去除元数据</Label>
                    <p className="text-sm text-muted-foreground">
                      移除EXIF、GPS等元数据以减小文件大小
                    </p>
                  </div>
                  <Switch
                    checked={config.stripMetadata}
                    onCheckedChange={(checked) => onConfigChange({ stripMetadata: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>保留EXIF信息</Label>
                    <p className="text-sm text-muted-foreground">
                      保留相机的拍摄参数等信息
                    </p>
                  </div>
                  <Switch
                    checked={config.preserveExif}
                    onCheckedChange={(checked) => onConfigChange({ preserveExif: checked })}
                  />
                </div>

                {config.outputFormat === 'jpeg' && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>渐进式JPEG</Label>
                      <p className="text-sm text-muted-foreground">
                        渐进加载，适合网络传输
                      </p>
                    </div>
                    <Switch
                      checked={config.progressive || false}
                      onCheckedChange={(checked) => onConfigChange({ progressive: checked })}
                    />
                  </div>
                )}

                {config.outputFormat === 'png' && (
                  <div className="space-y-2">
                    <Label>压缩级别: {config.compressionLevel || 6}</Label>
                    <Slider
                      value={[config.compressionLevel || 6]}
                      onValueChange={([value]) => onConfigChange({ compressionLevel: value })}
                      max={9}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>快速</span>
                      <span>最高压缩</span>
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