'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { ImageAdjustments } from '../types';

interface AdjustmentsPanelProps {
  adjustments: ImageAdjustments;
  onAdjustmentChange: (key: keyof ImageAdjustments, value: number) => void;
  disabled?: boolean;
}

export const AdjustmentsPanel = ({ adjustments, onAdjustmentChange, disabled = false }: AdjustmentsPanelProps) => {
  // 所有调整参数
  const allAdjustments = [
    { key: 'brightness' as const, label: '💡 亮度', min: 0, max: 100 },
    { key: 'contrast' as const, label: '🎨 对比度', min: 0, max: 100 },
    { key: 'saturation' as const, label: '🌈 饱和度', min: 0, max: 100 },
    { key: 'temperature' as const, label: '🌡️ 色温', min: 0, max: 100 },
    { key: 'hue' as const, label: '🎭 色调', min: 0, max: 100 },
    { key: 'whiteBalance' as const, label: '⚖️ 白平衡', min: 0, max: 100 },
    { key: 'shadows' as const, label: '🌑 阴影', min: 0, max: 100 },
    { key: 'highlights' as const, label: '☀️ 高光', min: 0, max: 100 },
  ];

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          🎨 参数设置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {allAdjustments.map(({ key, label, min, max }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
              </Label>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {adjustments[key]}
              </span>
            </div>
            <Slider
              value={[adjustments[key]]}
              min={min}
              max={max}
              step={1}
              onValueChange={(value) => onAdjustmentChange(key, value[0])}
              disabled={disabled}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
