import { useState, useCallback, useEffect } from 'react';
import type { 
  ImageEditorState, 
  ImageAdjustments, 
  EditMode, 
  FilterType, 
  CropParams, 
  ScaleParams, 
  FlipParams, 
  ExportOptions,
  EditorOperation
} from '../types';
import { defaultAdjustments, defaultExportOptions } from '../types';
import { ImageProcessor } from '../domain/ImageProcessor';

// 创建唯一ID的辅助函数
const createId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 初始状态
const initialState: ImageEditorState = {
  originalImage: null,
  currentImage: null,
  adjustments: { ...defaultAdjustments },
  editMode: 'basic',
  filter: 'none',
  crop: null,
  scale: { scaleX: 1, scaleY: 1 },
  flip: { horizontal: false, vertical: false },
  history: [],
  historyIndex: -1,
  isProcessing: false,
  isExporting: false,
  exportOptions: { ...defaultExportOptions }
};

export const useImageEditor = () => {
  const [state, setState] = useState<ImageEditorState>(initialState);
  const [processor, setProcessor] = useState<ImageProcessor | null>(null);

  // 初始化处理器（客户端）
  useEffect(() => {
    if (typeof window !== 'undefined' && !processor) {
      setProcessor(new ImageProcessor());
    }
  }, [processor]);

  // 保存操作到历史记录
  const saveToHistory = useCallback((operation: EditorOperation) => {
    setState(prev => {
      // 移除当前索引之后的历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 设置原始图片
  const setOriginalImage = useCallback((image: HTMLImageElement) => {
    setState(prev => ({
      ...prev,
      originalImage: image,
      currentImage: null,
      history: [],
      historyIndex: -1
    }));
  }, []);

  // 切换编辑模式
  const setEditMode = useCallback((mode: EditMode) => {
    setState(prev => ({
      ...prev,
      editMode: mode
    }));
  }, []);

  // 更新单个调整参数
  const updateAdjustment = useCallback((key: keyof ImageAdjustments, value: number) => {
    setState(prev => {
      const previousValue = prev.adjustments[key];
      
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'adjust',
        params: {
          key,
          value,
          previousValue
        },
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        adjustments: {
          ...prev.adjustments,
          [key]: value
        },
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 重置调整参数
  const resetAdjustments = useCallback(() => {
    setState(prev => {
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'reset',
        params: {
          previousAdjustments: prev.adjustments
        },
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        adjustments: { ...defaultAdjustments },
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 设置滤镜
  const setFilter = useCallback((filter: FilterType) => {
    setState(prev => {
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'filter',
        params: {
          filter,
          previousFilter: prev.filter
        },
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        filter,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 设置裁剪参数
  const setCrop = useCallback((crop: CropParams | null) => {
    setState(prev => {
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'crop',
        params: {},
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        crop,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 设置缩放参数
  const setScale = useCallback((scale: ScaleParams) => {
    setState(prev => {
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'scale',
        params: {},
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        scale,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 设置翻转参数
  const setFlip = useCallback((flip: FlipParams) => {
    setState(prev => {
      // 创建操作记录
      const operation: EditorOperation = {
        id: createId(),
        type: 'flip',
        params: {},
        timestamp: Date.now()
      };
      
      // 保存到历史记录
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(operation);
      
      return {
        ...prev,
        flip,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  }, []);

  // 更新导出选项
  const updateExportOptions = useCallback((options: Partial<ExportOptions>) => {
    setState(prev => ({
      ...prev,
      exportOptions: {
        ...prev.exportOptions,
        ...options
      }
    }));
  }, []);

  // 撤销操作
  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex < 0) return prev;
      
      const newIndex = prev.historyIndex - 1;
      const operation = prev.history[prev.historyIndex];
      
      let newState = { ...prev };
      
      // 根据操作类型恢复状态
      switch (operation.type) {
        case 'adjust':
          if (operation.params.key && operation.params.previousValue !== undefined) {
            newState.adjustments = {
              ...prev.adjustments,
              [operation.params.key]: operation.params.previousValue
            };
          }
          break;
          
        case 'filter':
          if (operation.params.previousFilter) {
            newState.filter = operation.params.previousFilter;
          }
          break;
          
        case 'reset':
          if (operation.params.previousAdjustments) {
            newState.adjustments = operation.params.previousAdjustments;
          }
          break;
          
        // 其他操作类型的撤销逻辑可以在这里添加
      }
      
      return {
        ...newState,
        historyIndex: newIndex
      };
    });
  }, []);

  // 重做操作
  const redo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      
      const newIndex = prev.historyIndex + 1;
      const operation = prev.history[newIndex];
      
      let newState = { ...prev };
      
      // 根据操作类型恢复状态
      switch (operation.type) {
        case 'adjust':
          if (operation.params.key && operation.params.value !== undefined) {
            newState.adjustments = {
              ...prev.adjustments,
              [operation.params.key]: operation.params.value
            };
          }
          break;
          
        case 'filter':
          if (operation.params.filter) {
            newState.filter = operation.params.filter;
          }
          break;
          
        // 其他操作类型的重做逻辑可以在这里添加
      }
      
      return {
        ...newState,
        historyIndex: newIndex
      };
    });
  }, []);

  // 重置所有状态
  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setOriginalImage,
    setEditMode,
    updateAdjustment,
    resetAdjustments,
    setFilter,
    setCrop,
    setScale,
    setFlip,
    updateExportOptions,
    undo,
    redo,
    resetAll
  };
};
