'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { ExportOptions as ExportOptionsType } from '../types';

interface ExportOptionsProps {
  options: ExportOptionsType;
  onOptionsChange: (options: Partial<ExportOptionsType>) => void;
  onExport: () => void;
  isExporting: boolean;
  disabled?: boolean;
}

export const ExportOptions = ({ 
  options, 
  onOptionsChange, 
  onExport, 
  isExporting,
  disabled = false
}: ExportOptionsProps) => {
  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          💾 导出设置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 导出格式 */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            📄 导出格式
          </Label>
          <Select 
            value={options.format} 
            onValueChange={(value) => onOptionsChange({ format: value as 'png' | 'jpeg' | 'webp' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择格式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">🖼️ PNG (无损)</SelectItem>
              <SelectItem value="jpeg">📷 JPEG (有损)</SelectItem>
              <SelectItem value="webp">🌐 WebP (高效)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 导出质量 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              ⭐ 导出质量
            </Label>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {options.quality}%
            </span>
          </div>
          <Slider 
            value={[options.quality]} 
            min={1} 
            max={100} 
            step={1}
            onValueChange={(value) => onOptionsChange({ quality: value[0] })}
          />
        </div>

        {/* 最大宽度 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              📏 最大宽度
            </Label>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {options.maxWidth}px
            </span>
          </div>
          <Slider 
            value={[options.maxWidth]} 
            min={100} 
            max={4096} 
            step={100}
            onValueChange={(value) => onOptionsChange({ maxWidth: value[0] })}
          />
        </div>

        {/* 保持纵横比 */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            📐 保持纵横比
          </Label>
          <Switch 
            checked={options.keepAspectRatio} 
            onCheckedChange={(checked) => onOptionsChange({ keepAspectRatio: checked })}
          />
        </div>

        {/* 导出按钮 */}
        <div className="pt-2">
          <Button 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-6"
            onClick={onExport}
            disabled={isExporting || disabled}
          >
            {isExporting ? (
              <>⏳ 导出中...</>
            ) : (
              <>💾 导出图片</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
