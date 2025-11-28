// 处理模式类型
export type EditMode = 
  | 'basic'      // 参数设置
  | 'filters';   // 滤镜效果

// 图片处理参数类型
export interface ImageAdjustments {
  // 基础参数
  brightness: number;     // -100 到 100
  contrast: number;       // -100 到 100
  saturation: number;     // -100 到 100
  temperature: number;    // -100 到 100
  hue: number;            // -100 到 100
  
  // 专业参数
  whiteBalance: number;   // -100 到 100
  shadows: number;        // -100 到 100
  highlights: number;     // -100 到 100
}

// 裁剪参数
export interface CropParams {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 缩放参数
export interface ScaleParams {
  scaleX: number;
  scaleY: number;
}

// 翻转参数
export interface FlipParams {
  horizontal: boolean;
  vertical: boolean;
}

// 滤镜类型
export type FilterType = 
  | 'none'
  | 'vintage'
  | 'blackAndWhite'
  | 'sepia'
  | 'cool'
  | 'warm'
  | 'vibrant'
  | 'muted'
  | 'dreamy'
  | 'dramatic';

// 单个操作类型
export interface EditorOperation {
  id: string;
  type: 
    | 'adjust' 
    | 'crop' 
    | 'scale' 
    | 'flip' 
    | 'filter' 
    | 'reset';
  params: {
    key?: keyof ImageAdjustments;
    value?: number;
    previousValue?: number;
    filter?: FilterType;
    previousFilter?: FilterType;
    previousAdjustments?: ImageAdjustments;
  };
  timestamp: number;
}

// 导出选项类型
export interface ExportOptions {
  format: 'png' | 'jpeg' | 'webp';
  quality: number;        // 0 到 100
  maxWidth: number;
  maxHeight: number;
  keepAspectRatio: boolean;
}

// 图片编辑器状态类型
export interface ImageEditorState {
  originalImage: HTMLImageElement | null;
  currentImage: HTMLCanvasElement | null;
  adjustments: ImageAdjustments;
  editMode: EditMode;
  filter: FilterType;
  crop: CropParams | null;
  scale: ScaleParams;
  flip: FlipParams;
  history: EditorOperation[];
  historyIndex: number;
  isProcessing: boolean;
  isExporting: boolean;
  exportOptions: ExportOptions;
}

// 默认调整参数
export const defaultAdjustments: ImageAdjustments = {
  brightness: 50,
  contrast: 50,
  saturation: 50,
  temperature: 50,
  hue: 50,
  whiteBalance: 50,
  shadows: 50,
  highlights: 50
};

// 默认导出选项
export const defaultExportOptions: ExportOptions = {
  format: 'png',
  quality: 90,
  maxWidth: 1920,
  maxHeight: 1080,
  keepAspectRatio: true
};
