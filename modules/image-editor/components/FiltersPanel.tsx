'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FilterType } from '../types';

interface FiltersPanelProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  disabled?: boolean;
}

export const FiltersPanel = ({ currentFilter, onFilterChange, disabled = false }: FiltersPanelProps) => {
  const filters: { value: FilterType; label: string; emoji: string }[] = [
    { value: 'none', label: '原图', emoji: '🖼️' },
    { value: 'vintage', label: '复古', emoji: '📻' },
    { value: 'blackAndWhite', label: '黑白', emoji: '🎬' },
    { value: 'sepia', label: '褐色', emoji: '📜' },
    { value: 'cool', label: '冷色调', emoji: '❄️' },
    { value: 'warm', label: '暖色调', emoji: '☀️' },
    { value: 'vibrant', label: '鲜艳', emoji: '🌈' },
    { value: 'muted', label: '柔和', emoji: '🌫️' },
    { value: 'dreamy', label: '梦幻', emoji: '✨' },
    { value: 'dramatic', label: '戏剧化', emoji: '🎭' },
  ];

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          🎭 滤镜效果
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={currentFilter === filter.value ? 'default' : 'outline'}
              className={`flex flex-col items-center gap-1 py-4 text-sm ${currentFilter === filter.value 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-slate-800'}`}
              onClick={() => onFilterChange(filter.value)}
              disabled={disabled}
            >
              <span className="text-2xl">{filter.emoji}</span>
              <span>{filter.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
