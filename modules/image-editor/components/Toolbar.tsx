'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { EditMode } from '../types';

interface ToolbarProps {
  currentMode: EditMode;
  onModeChange: (mode: EditMode) => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

export const Toolbar = ({ 
  currentMode, 
  onModeChange, 
  onUndo, 
  onRedo, 
  onReset 
}: ToolbarProps) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border-b dark:border-slate-800 p-4">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            🖼️ 图片编辑器
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-sm" onClick={onUndo}>
              ⏪ 撤销
            </Button>
            <Button variant="outline" size="sm" className="text-sm" onClick={onRedo}>
              ⏩ 重做
            </Button>
            <Button variant="outline" size="sm" className="text-sm" onClick={onReset}>
              🔄 重置
            </Button>
          </div>
        </div>
        
        <Tabs 
          value={currentMode} 
          onValueChange={(value) => onModeChange(value as EditMode)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 md:w-auto">
            <TabsTrigger value="basic" className="text-sm">
              🎨 基础调整
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-sm">
              ⚙️ 专业调整
            </TabsTrigger>
            <TabsTrigger value="filters" className="text-sm">
              🎭 滤镜效果
            </TabsTrigger>
            <TabsTrigger value="transform" className="text-sm">
              🔄 变换操作
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
