import { useState, useCallback, useRef } from 'react';
import { 
  ImageCompressionConfig, 
  ImageFile, 
  CompressionState, 
  CompressionProgress,
  ImageCompressorUseCase,
  PRESET_CONFIGS
} from '../types';
import { BrowserCompressionEngine } from '../domain/CompressionEngine';

export function useImageCompressor(): ImageCompressorUseCase {
  const [state, setState] = useState<CompressionState>({
    files: [],
    isCompressing: false,
    config: PRESET_CONFIGS.WEB_OPTIMIZED,
  });

  const compressionEngineRef = useRef(new BrowserCompressionEngine());

  const updateState = useCallback((updater: (prev: CompressionState) => CompressionState) => {
    setState(updater);
  }, []);

  const addFiles = useCallback(async (files: File[]): Promise<ImageFile[]> => {
    const validImageFiles: ImageFile[] = [];
    const engine = compressionEngineRef.current;

    for (const file of files) {
      const validation = engine.validateFile(file);
      
      if (!validation.valid) {
        updateState(prev => ({
          ...prev,
          error: validation.error
        }));
        continue;
      }

      try {
        // 生成预览 URL
        const preview = URL.createObjectURL(file);
        
        // 获取图片尺寸
        const dimensions = await engine.getImageDimensions(file);

        const imageFile: ImageFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview,
          dimensions
        };

        validImageFiles.push(imageFile);
      } catch (error) {
        updateState(prev => ({
          ...prev,
          error: `文件 ${file.name} 处理失败: ${error instanceof Error ? error.message : '未知错误'}`
        }));
      }
    }

    if (validImageFiles.length > 0) {
      updateState(prev => ({
        ...prev,
        files: [...prev.files, ...validImageFiles],
        error: prev.error ? undefined : prev.error
      }));
    }

    return validImageFiles;
  }, [updateState]);

  const removeFile = useCallback((id: string) => {
    updateState(prev => {
      const fileToRemove = prev.files.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
        if (fileToRemove.compressedResult?.preview) {
          URL.revokeObjectURL(fileToRemove.compressedResult.preview);
        }
      }
      
      return {
        ...prev,
        files: prev.files.filter(file => file.id !== id)
      };
    });
  }, [updateState]);

  const clearFiles = useCallback(() => {
    updateState(prev => {
      prev.files.forEach(file => {
        URL.revokeObjectURL(file.preview);
        if (file.compressedResult?.preview) {
          URL.revokeObjectURL(file.compressedResult.preview);
        }
      });
      
      return {
        ...prev,
        files: [],
        error: undefined
      };
    });
  }, [updateState]);

  const updateConfig = useCallback((configUpdates: Partial<ImageCompressionConfig>) => {
    updateState(prev => ({
      ...prev,
      config: { ...prev.config, ...configUpdates }
    }));
  }, [updateState]);

  const compressAll = useCallback(async (
    onProgress?: (progress: CompressionProgress) => void
  ) => {
    const engine = compressionEngineRef.current;
    
    updateState(prev => ({
      ...prev,
      isCompressing: true,
      error: undefined
    }));

    try {
      const updatedFiles = [...state.files];
      const totalFiles = updatedFiles.length;
      
      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        
        // 跳过已经压缩过的文件
        if (file.compressedResult) {
          continue;
        }

        const currentProgress = {
          current: i + 1,
          total: totalFiles,
          percentage: Math.round(((i + 1) / totalFiles) * 100),
          currentFile: file.name
        };
        
        onProgress?.(currentProgress);
        
        try {
          const result = await engine.compress(
            file.file, 
            state.config,
            (fileProgress) => {
              const overallProgress = Math.round(
                (i / totalFiles) * 100 + (fileProgress / 100) * (1 / totalFiles) * 100
              );
              onProgress?.({
                ...currentProgress,
                percentage: overallProgress
              });
            }
          );

          updatedFiles[i] = {
            ...file,
            compressedResult: result
          };
        } catch (error) {
          updateState(prev => ({
            ...prev,
            error: `压缩 ${file.name} 失败: ${error instanceof Error ? error.message : '未知错误'}`
          }));
        }
      }

      updateState(prev => ({
        ...prev,
        files: updatedFiles,
        isCompressing: false
      }));

    } catch (error) {
      updateState(prev => ({
        ...prev,
        isCompressing: false,
        error: error instanceof Error ? error.message : '压缩过程中发生未知错误'
      }));
    }
  }, [state.files, state.config, updateState]);

  const downloadSingle = useCallback((file: ImageFile) => {
    const fileToDownload = file.compressedResult?.file || file.file;
    const url = URL.createObjectURL(fileToDownload);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = file.compressedResult 
      ? `${file.name.replace(/\.[^/.]+$/, '')}_compressed.${fileToDownload.type.split('/')[1]}`
      : file.name;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }, []);

  const downloadAll = useCallback(() => {
    const filesWithResults = state.files.filter(file => file.compressedResult);
    
    if (filesWithResults.length === 0) {
      return;
    }

    // 如果只有一个文件，直接下载
    if (filesWithResults.length === 1) {
      downloadSingle(filesWithResults[0]);
      return;
    }

    // 多个文件时，创建ZIP（这里简化处理，逐个下载）
    filesWithResults.forEach((file, index) => {
      setTimeout(() => {
        downloadSingle(file);
      }, index * 100); // 间隔100ms下载，避免浏览器阻止多个下载
    });
  }, [state.files, downloadSingle]);

  const getState = useCallback(() => state, [state]);

  return {
    addFiles,
    removeFile,
    clearFiles,
    updateConfig,
    compressAll,
    downloadSingle,
    downloadAll,
    getState
  };
}