import { useState, useCallback, useRef, useEffect } from 'react';
import { PdfToImageEngine } from '../domain/PdfToImageEngine';
import { PdfToImageConfig, ConvertedImage, PdfToImageState, DEFAULT_CONFIG } from '../types';

// PDF转图片钩子
export function usePdfToImage() {
  // 状态管理
  const [state, setState] = useState<PdfToImageState>({
    config: DEFAULT_CONFIG,
    selectedFile: null,
    status: 'idle',
    progress: {
      currentPage: 0,
      totalPages: 0,
      overallProgress: 0,
    },
  });

  // 创建PDF转图片引擎实例
  const engineRef = useRef<PdfToImageEngine>(new PdfToImageEngine(state.config));

  // 初始化引擎配置
  useEffect(() => {
    engineRef.current.setConfig(state.config);
  }, [state.config]);

  // 初始化引擎回调
  useEffect(() => {
    // 设置进度回调
    engineRef.current.setOnProgress((progress) => {
      setState((prev) => ({
        ...prev,
        progress,
      }));
    });

    // 设置页面转换完成回调
    engineRef.current.setOnPageConverted((pageIndex, image) => {
      setState((prev) => {
        if (!prev.selectedFile) return prev;

        // 更新转换后的图片列表
        const updatedImages = [...prev.selectedFile.convertedImages];
        updatedImages[pageIndex] = image;

        // 计算进度
        const currentProgress = (pageIndex + 1) / prev.selectedFile.pageCount;

        return {
          ...prev,
          selectedFile: {
            ...prev.selectedFile,
            convertedImages: updatedImages,
            progress: currentProgress,
          },
        };
      });
    });
  }, []);

  // 获取当前状态
  const getState = useCallback(() => state, [state]);

  // 更新配置
  const updateConfig = useCallback((config: Partial<PdfToImageConfig>) => {
    setState((prev) => {
      const newConfig = { ...prev.config, ...config };
      engineRef.current.setConfig(newConfig);
      return {
        ...prev,
        config: newConfig,
      };
    });
  }, []);

  // 选择PDF文件
  const selectFile = useCallback(async (file: File) => {
    try {
      setState((prev) => ({
        ...prev,
        status: 'converting',
        error: undefined,
      }));

      // 解析PDF文件
      const pdfFile = await engineRef.current.parsePdfFile(file);

      setState((prev) => ({
        ...prev,
        selectedFile: pdfFile,
        status: 'idle',
        progress: {
          currentPage: 0,
          totalPages: pdfFile.pageCount,
          overallProgress: 0,
        },
      }));

      return pdfFile;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to parse PDF file',
      }));
      throw error;
    }
  }, []);

  // 开始转换
  const startConversion = useCallback(async () => {
    try {
      const currentState = state;
      const { selectedFile } = currentState;
      if (!selectedFile) {
        throw new Error('No PDF file selected');
      }

      // 使用当前selectedFile，避免prev.selectedFile可能为null的问题
      setState((prev) => ({
        ...prev,
        status: 'converting',
        selectedFile: {
          ...selectedFile,
          status: 'converting',
          convertedImages: [],
        },
        error: undefined,
      }));

      // 执行转换
      const convertedImages = await engineRef.current.convertPdfToImages(selectedFile);

      // 使用当前selectedFile，避免prev.selectedFile可能为null的问题
      setState((prev) => ({
        ...prev,
        status: 'completed',
        selectedFile: {
          ...selectedFile,
          status: 'completed',
          convertedImages,
          progress: 1,
        },
      }));

      return convertedImages;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        selectedFile: prev.selectedFile
          ? {
              ...prev.selectedFile,
              status: 'error',
              error: error instanceof Error ? error.message : 'Conversion failed',
            }
          : null,
        error: error instanceof Error ? error.message : 'Conversion failed',
      }));
      throw error;
    }
  }, [state]);

  // 取消转换
  const cancelConversion = useCallback(() => {
    engineRef.current.cancel();
    setState((prev) => ({
      ...prev,
      status: 'idle',
      selectedFile: prev.selectedFile
        ? {
            ...prev.selectedFile,
            status: 'pending',
          }
        : null,
    }));
  }, []);

  // 重置状态
  const reset = useCallback(() => {
    engineRef.current.resetCancel();
    setState({
      config: DEFAULT_CONFIG,
      selectedFile: null,
      status: 'idle',
      progress: {
        currentPage: 0,
        totalPages: 0,
        overallProgress: 0,
      },
    });
  }, []);

  // 下载单张图片
  const downloadSingle = useCallback((image: ConvertedImage) => {
    if (!state.selectedFile) {
      throw new Error('No PDF file selected');
    }

    // 提取文件名（不含扩展名）
    const fileName = state.selectedFile.name.replace(/\.[^/.]+$/, '');
    engineRef.current.downloadImage(image, fileName);
  }, [state.selectedFile]);

  // 下载所有图片
  const downloadAll = useCallback(async () => {
    if (!state.selectedFile || state.selectedFile.convertedImages.length === 0) {
      throw new Error('No converted images available');
    }

    // 提取文件名（不含扩展名）
    const fileName = state.selectedFile.name.replace(/\.[^/.]+$/, '');
    await engineRef.current.downloadAllImages(state.selectedFile.convertedImages, fileName);
  }, [state.selectedFile]);

  // 返回钩子API
  return {
    getState,
    updateConfig,
    selectFile,
    startConversion,
    cancelConversion,
    reset,
    downloadSingle,
    downloadAll,
  };
}
