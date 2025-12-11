'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { convertPdfToImages, formatFileSize } from '@/utils/pdfToImage';
import { PdfConversionParams, ConvertedImage } from '@/utils/types';
import './PdfToImage.scss';

// PDF转图片工具的主组件
const PdfToImage = () => {
  // 状态管理
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfInfo, setPdfInfo] = useState<{ name: string; size: number; pages: number } | null>(null);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [previewImage, setPreviewImage] = useState<ConvertedImage | null>(null);
  
  // 压缩参数
  const [conversionParams, setConversionParams] = useState<PdfConversionParams>({
    format: 'image/jpeg',
    maxSize: 0,
    isBlackWhite: false
  });
  
  // 文件输入ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 预设的压缩大小选项（MB）
  const sizeOptions = [0, 0.256, 0.512, 1, 2, 5];
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        processPdfFile(file);
      } else {
        alert('请选择PDF文件');
      }
    }
  };
  
  // 处理拖拽上传
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        processPdfFile(file);
      } else {
        alert('请选择PDF文件');
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  // 处理PDF文件
  const processPdfFile = async (file: File) => {
    setPdfFile(file);
    setPdfInfo({
      name: file.name,
      size: file.size,
      pages: 0 // 初始化为0，后续解析后更新
    });
    
    // 转换PDF到图片
    await convertPdfToImages(file, conversionParams, {
      onProgress: (currentPage, totalPages) => {
        setProcessing(true);
        const progressValue = Math.round((currentPage / totalPages) * 100);
        setProgress(progressValue);
        setProgressText(`正在处理第 ${currentPage}/${totalPages} 页...`);
      },
      onComplete: (images, totalPages) => {
        setConvertedImages(images);
        setPdfInfo(prev => prev ? { ...prev, pages: totalPages } : null);
        setProcessing(false);
      },
      onError: (error) => {
        console.error('PDF转换失败:', error);
        setProcessing(false);
        alert(`PDF转换失败: ${error.message}`);
      }
    });
  };
  
  // 重新选择PDF
  const handleReselect = () => {
    // 清除所有相关状态
    setPdfFile(null);
    setPdfInfo(null);
    setConvertedImages([]);
    setPreviewImage(null);
    
    // 重置文件输入框
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // 应用转换参数
  const handleApplyParams = async () => {
    if (!pdfFile) return;
    
    await convertPdfToImages(pdfFile, conversionParams, {
      onProgress: (currentPage, totalPages) => {
        setProcessing(true);
        const progressValue = Math.round((currentPage / totalPages) * 100);
        setProgress(progressValue);
        setProgressText(`正在处理第 ${currentPage}/${totalPages} 页...`);
      },
      onComplete: (images) => {
        setConvertedImages(images);
        setProcessing(false);
      },
      onError: (error) => {
        console.error('PDF转换失败:', error);
        setProcessing(false);
        alert(`PDF转换失败: ${error.message}`);
      }
    });
  };
  
  // 单张图片下载
  const handleDownloadImage = (image: ConvertedImage) => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `${pdfInfo?.name.replace('.pdf', '')}_page_${image.pageNumber}.${image.format.split('/')[1]}`;
    link.click();
  };
  
  // 批量下载图片
  const handleBatchDownload = async () => {
    if (convertedImages.length === 0) return;
    
    const zip = new JSZip();
    
    for (let i = 0; i < convertedImages.length; i++) {
      const image = convertedImages[i];
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      zip.file(`${pdfInfo?.name.replace('.pdf', '')}_page_${image.pageNumber}.${image.format.split('/')[1]}`, blob);
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `${pdfInfo?.name.replace('.pdf', '')}_images_${new Date().getTime()}.zip`;
    link.click();
    
    URL.revokeObjectURL(link.href);
  };
  
  // 打开预览
  const handlePreview = (image: ConvertedImage) => {
    setPreviewImage(image);
  };
  
  // 关闭预览
  const handleClosePreview = () => {
    setPreviewImage(null);
  };
  
  return (
    <div className="pdf-to-image">
      {/* 主容器 */}
      <div className="converter-container">
        {/* 上侧区域：PDF选择或信息显示 */}
        <div className="pdf-area">
          {!pdfFile ? (
            <div 
              className="upload-area" 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-content">
                <div className="upload-icon">📄</div>
                <div className="upload-text">点击选择或拖拽PDF文件到此处</div>
                <div className="upload-hint">支持 PDF 格式，最大50MB</div>
              </div>
            </div>
          ) : (
            <div className="pdf-info">
              <div className="pdf-info-header">
                <h3>已选择PDF文件</h3>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    handleReselect();
                    // 延迟打开文件选择框，确保状态已清除
                    setTimeout(() => fileInputRef.current?.click(), 100);
                  }}
                >
                  重新选择
                </button>
              </div>
              <div className="pdf-info-content">
                <div className="pdf-info-item">
                  <span className="pdf-info-label">文件名：</span>
                  <span className="pdf-info-value">{pdfInfo?.name}</span>
                </div>
                <div className="pdf-info-item">
                  <span className="pdf-info-label">文件大小：</span>
                  <span className="pdf-info-value">{formatFileSize(pdfInfo?.size || 0)}</span>
                </div>
                <div className="pdf-info-item">
                  <span className="pdf-info-label">页数：</span>
                  <span className="pdf-info-value">{pdfInfo?.pages} 页</span>
                </div>
              </div>
            </div>
          )}
          
          {/* 隐藏的文件输入框 */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept=".pdf"
            className="file-input"
            style={{ 
              display: 'none', 
              visibility: 'hidden', 
              opacity: 0, 
              position: 'absolute', 
              left: '-9999px' 
            }}
          />
        </div>
        
        {/* 下侧区域：预览和参数设置 */}
        <div className="main-content">
          {/* 左侧：图片预览区域 */}
          <div className="preview-area">
            <h3>图片预览</h3>
            {convertedImages.length > 0 ? (
              <div className="image-grid">
                {convertedImages.map((image, index) => (
                  <div key={index} className="image-item">
                    <div 
                      className="image-preview" 
                      onClick={() => handlePreview(image)}
                    >
                      <img src={image.imageUrl} alt={`PDF第${image.pageNumber}页`} />
                    </div>
                    <div className="image-info">
                      <div className="image-name">第{image.pageNumber}页</div>
                      <div className="image-meta">
                        <div>格式: {image.format.split('/')[1].toUpperCase()}</div>
                        <div>大小: {formatFileSize(image.size)}</div>
                        <div>尺寸: {image.width}×{image.height}</div>
                      </div>
                      <div className="image-actions">
                        <button onClick={() => handleDownloadImage(image)} className="btn btn-small btn-primary">下载</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-preview">
                <p>选择PDF文件后，将在此处显示转换后的图片预览</p>
              </div>
            )}
          </div>
          
          {/* 右侧：参数设置区域 */}
          <div className="params-area">
            <h3>转换参数设置</h3>
            <div className="params-container">
              {/* 图片格式 */}
              <div className="param-item">
                <label htmlFor="format">图片格式</label>
                <select 
                  id="format" 
                  value={conversionParams.format} 
                  onChange={(e) => setConversionParams(prev => ({ ...prev, format: e.target.value as PdfConversionParams['format'] }))}
                >
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              
              {/* 最大文件大小 */}
              <div className="param-item">
                <label htmlFor="maxSize">最大文件大小</label>
                <div className="segmented-control">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      className={`segmented-item ${conversionParams.maxSize === size ? 'active' : ''}`}
                      onClick={() => setConversionParams(prev => ({ ...prev, maxSize: size }))}
                    >
                      {size === 0 ? '最优' : size === 0.256 ? '256KB' : size === 0.512 ? '512KB' : `${size}MB`}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 黑白转换 */}
              <div className="param-item">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={conversionParams.isBlackWhite} 
                    onChange={(e) => setConversionParams(prev => ({ ...prev, isBlackWhite: e.target.checked }))}
                  />
                  转换为黑白图片
                </label>
              </div>
            </div>
            
            {/* 应用参数按钮 */}
            <button 
              className="btn btn-primary btn-large"
              onClick={handleApplyParams}
              disabled={!pdfFile || processing}
            >
              应用转换参数
            </button>
            
            {/* 批量下载按钮 */}
            {convertedImages.length > 0 && (
              <button 
                className="btn btn-secondary btn-large batch-download-btn"
                onClick={handleBatchDownload}
                disabled={processing}
              >
                批量下载图片
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* 处理进度蒙层 */}
      {processing && (
        <div className="processing-overlay">
          <div className="processing-content">
            <div className="processing-text">{progressText}</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-percentage">{progress}%</div>
          </div>
        </div>
      )}
      
      {/* 预览模态框 */}
      {previewImage && (
        <div className="preview-modal" onClick={handleClosePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePreview}>×</button>
            <h3>图片预览</h3>
            <div className="preview-image-container">
              <img src={previewImage.imageUrl} alt={`PDF第${previewImage.pageNumber}页`} />
            </div>
            <div className="preview-info">
              <div>文件名: {pdfInfo?.name}</div>
              <div>页数: 第{previewImage.pageNumber}/{pdfInfo?.pages}页</div>
              <div>图片格式: {previewImage.format.split('/')[1].toUpperCase()}</div>
              <div>文件大小: {formatFileSize(previewImage.size)}</div>
              <div>分辨率: {previewImage.width}×{previewImage.height}</div>
            </div>
            <div className="preview-actions">
              <button onClick={() => handleDownloadImage(previewImage)} className="btn btn-primary">下载图片</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfToImage;
