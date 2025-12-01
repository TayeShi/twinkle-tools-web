'use client';

import { useState, useEffect } from 'react';
import { Image, Edit3, Palette, Settings, Save } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';

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
      {/* Header */}
      <Header
        icon={<Edit3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />}
        title="🖼️ 图片编辑器"
        description="🎨 专业的图片编辑工具，支持参数调整和滤镜效果"
        iconGradient="from-purple-500 to-pink-600"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 工具介绍 */}
        <div className="mb-8">
          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transition-transform duration-300">
                  <Edit3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-2xl font-bold">
                    🎨 专业图片编辑工具
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                    ✨ 提供丰富的图片调整参数和滤镜效果，让您轻松编辑图片 🚀
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 group hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-blue-300 font-bold text-lg block">⚙️ 参数调整</span>
                    <span className="text-blue-600 dark:text-blue-400 text-sm">亮度、对比度、饱和度等</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/50 group hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-bold text-lg block">🎨 滤镜效果</span>
                    <span className="text-green-600 dark:text-green-400 text-sm">复古、黑白、冷色调等</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 group hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <Save className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-purple-700 dark:text-purple-300 font-bold text-lg block">💾 导出设置</span>
                    <span className="text-purple-600 dark:text-purple-400 text-sm">多种格式和质量选项</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
