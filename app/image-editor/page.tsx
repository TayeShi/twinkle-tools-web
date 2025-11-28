'use client';

import { useState, useEffect } from 'react';
import { Toolbar } from '@/modules/image-editor/components/Toolbar';
import { ImageEditorCanvas } from '@/modules/image-editor/components/ImageEditorCanvas';
import { PreviewPanel } from '@/modules/image-editor/components/PreviewPanel';
import { ExportOptions } from '@/modules/image-editor/components/ExportOptions';
import { AdjustmentsPanel } from '@/modules/image-editor/components/AdjustmentsPanel';
import { FiltersPanel } from '@/modules/image-editor/components/FiltersPanel';
import { useImageEditor } from '@/modules/image-editor/hooks/useImageEditor';
import { ImageProcessor } from '@/modules/image-editor/domain/ImageProcessor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ImageEditorPage = () => {
  const { 
    state, 
    setOriginalImage, 
    setEditMode, 
    updateAdjustment, 
    setFilter,
    undo,
    redo,
    resetAll,
    updateExportOptions
  } = useImageEditor();
  
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [processor, setProcessor] = useState<ImageProcessor | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // 初始化处理器
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProcessor(new ImageProcessor());
    }
  }, []);

  // 处理图片并更新预览
  useEffect(() => {
    if (!processor || !state.originalImage) return;

    try {
      // 处理图片
      const resultCanvas = processor.processImage(
        state.originalImage,
        state.adjustments,
        state.crop,
        state.scale,
        state.flip,
        state.filter
      );

      // 更新预览
      const url = resultCanvas.toDataURL();
      setPreviewUrl(url);

      // 清理旧的URL
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error('图片处理失败:', error);
    }
  }, [processor, state.originalImage, state.adjustments, state.crop, state.scale, state.flip, state.filter]);

  // 处理图片导出
  const handleExport = async () => {
    if (!processor || !state.originalImage) return;

    setIsExporting(true);
    
    try {
      // 处理图片
      const resultCanvas = processor.processImage(
        state.originalImage,
        state.adjustments,
        state.crop,
        state.scale,
        state.flip,
        state.filter
      );

      // 导出图片
      const blob = await processor.exportImage(resultCanvas, state.exportOptions);
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-image.${state.exportOptions.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // 清理URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('图片导出失败:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* PC Layout: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left Column: Canvas or Preview */}
          <div className="col-span-2 space-y-6">
            {/* Canvas Area (Upload) */}
            {!state.originalImage && (
              <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4 h-[500px]">
                <ImageEditorCanvas onImageUpload={setOriginalImage} />
              </div>
            )}
            
            {/* Preview Area */}
            {state.originalImage && (
              <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4 h-[800px]">
                <PreviewPanel previewUrl={previewUrl} />
              </div>
            )}
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-6">
            {/* Edit Mode Tabs */}
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4">
              <Tabs 
                value={state.editMode} 
                onValueChange={(value) => setEditMode(value as 'basic' | 'filters')}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="basic" className="text-sm">
                    🎨 参数设置
                  </TabsTrigger>
                  <TabsTrigger value="filters" className="text-sm">
                    🎭 滤镜效果
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Adjustments or Filters */}
            <div className="space-y-4">
              {state.editMode === 'basic' ? (
                <AdjustmentsPanel 
                  adjustments={state.adjustments}
                  onAdjustmentChange={updateAdjustment}
                  disabled={!state.originalImage}
                />
              ) : state.editMode === 'filters' ? (
                <FiltersPanel 
                  currentFilter={state.filter}
                  onFilterChange={setFilter}
                  disabled={!state.originalImage}
                />
              ) : null}
            </div>

            {/* Action Buttons */}
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button variant="outline" size="sm" className="text-sm w-full" onClick={undo} disabled={!state.originalImage}>
                  ⏪ 撤销
                </Button>
                <Button variant="outline" size="sm" className="text-sm w-full" onClick={redo} disabled={!state.originalImage}>
                  ⏩ 重做
                </Button>
                <Button variant="outline" size="sm" className="text-sm w-full" onClick={resetAll} disabled={!state.originalImage}>
                  🔄 重置
                </Button>
              </div>
            </div>

            {/* Export Options */}
            <ExportOptions 
              options={state.exportOptions}
              onOptionsChange={updateExportOptions}
              onExport={handleExport}
              isExporting={isExporting}
              disabled={!state.originalImage}
            />
          </div>
        </div>

        {/* Mobile Layout: Stacked */}
        <div className="lg:hidden space-y-6">
          {/* Canvas or Preview Area */}
          {!state.originalImage ? (
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4 h-[400px]">
              <ImageEditorCanvas onImageUpload={setOriginalImage} />
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4 h-[600px]">
              <PreviewPanel previewUrl={previewUrl} />
            </div>
          )}

          {/* Edit Mode Tabs */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4">
            <Tabs 
              value={state.editMode} 
              onValueChange={(value) => setEditMode(value as 'basic' | 'filters')}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="basic" className="text-sm">
                  🎨 参数设置
                </TabsTrigger>
                <TabsTrigger value="filters" className="text-sm">
                  🎭 滤镜效果
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Adjustments or Filters */}
          <div className="space-y-4">
            {state.editMode === 'basic' ? (
              <AdjustmentsPanel 
                adjustments={state.adjustments}
                onAdjustmentChange={updateAdjustment}
                disabled={!state.originalImage}
              />
            ) : state.editMode === 'filters' ? (
              <FiltersPanel 
                currentFilter={state.filter}
                onFilterChange={setFilter}
                disabled={!state.originalImage}
              />
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Button variant="outline" size="sm" className="text-sm w-full" onClick={undo} disabled={!state.originalImage}>
                ⏪ 撤销
              </Button>
              <Button variant="outline" size="sm" className="text-sm w-full" onClick={redo} disabled={!state.originalImage}>
                ⏩ 重做
              </Button>
              <Button variant="outline" size="sm" className="text-sm w-full" onClick={resetAll} disabled={!state.originalImage}>
                🔄 重置
              </Button>
            </div>
          </div>

          {/* Export Options */}
          <ExportOptions 
            options={state.exportOptions}
            onOptionsChange={updateExportOptions}
            onExport={handleExport}
            isExporting={isExporting}
            disabled={!state.originalImage}
          />
        </div>
      </main>
    </div>
  );
};

export default ImageEditorPage;
