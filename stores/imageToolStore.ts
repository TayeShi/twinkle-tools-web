import { create } from 'zustand'

export type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'error'

interface ImageToolState {
  currentTool: string | null
  originalFile: File | null
  processedBlob: Blob | null
  previewUrl: string
  originalSize: number
  processedSize: number
  processingStatus: ProcessingStatus
  errorMessage: string | null
  compressionQuality: number
  outputFormat: string

  setOriginalFile: (file: File) => void
  setProcessedBlob: (blob: Blob) => void
  setPreviewUrl: (url: string) => void
  setOriginalSize: (size: number) => void
  setProcessedSize: (size: number) => void
  setProcessingStatus: (status: ProcessingStatus) => void
  setError: (error: string | null) => void
  setCompressionQuality: (quality: number) => void
  setOutputFormat: (format: string) => void
  setCurrentTool: (tool: string) => void
  reset: () => void
}

export const useImageToolStore = create<ImageToolState>((set) => ({
  currentTool: null,
  originalFile: null,
  processedBlob: null,
  previewUrl: '',
  originalSize: 0,
  processedSize: 0,
  processingStatus: 'idle',
  errorMessage: null,
  compressionQuality: 80,
  outputFormat: 'image/jpeg',

  setOriginalFile: (file) => {
    set({
      originalFile: file,
      originalSize: file.size,
      previewUrl: URL.createObjectURL(file),
      processedBlob: null,
      processedSize: 0,
      processingStatus: 'idle',
      errorMessage: null,
    })
  },

  setProcessedBlob: (blob) => {
    set({ processedBlob: blob, processedSize: blob.size })
  },

  setPreviewUrl: (url) => set({ previewUrl: url }),

  setOriginalSize: (size) => set({ originalSize: size }),

  setProcessedSize: (size) => set({ processedSize: size }),

  setProcessingStatus: (status) => set({ processingStatus: status }),

  setError: (error) => set({ errorMessage: error, processingStatus: 'error' }),

  setCompressionQuality: (quality) => set({ compressionQuality: quality }),

  setOutputFormat: (format) => set({ outputFormat: format }),

  setCurrentTool: (tool) => set({ currentTool: tool }),

  reset: () => set({
    originalFile: null,
    processedBlob: null,
    previewUrl: '',
    originalSize: 0,
    processedSize: 0,
    processingStatus: 'idle',
    errorMessage: null,
    compressionQuality: 80,
    outputFormat: 'image/jpeg',
  }),
}))
