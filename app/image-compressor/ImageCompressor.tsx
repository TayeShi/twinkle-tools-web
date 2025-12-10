'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import { compressImage, formatFileSize } from '@/utils/imageCompression';
import { CompressionParams, CompressedImage } from '@/utils/types';
import './ImageCompressor.scss';

// 定义图片压缩工具的主组件
const ImageCompressor = () => {
  // 状态管理
  const [images, setImages] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [previewImage, setPreviewImage] = useState<CompressedImage | null>(null);
  
  // 预设的压缩大小选项（MB）
  const sizeOptions = [0, 0.256, 0.512, 1, 2, 5];
  
  // 压缩参数
  const [compressionParams, setCompressionParams] = useState<CompressionParams>({
    format: 'image/jpeg',
    maxSize: 0, // 默认值改为0
    isBlackWhite: false
  });
  
  // 文件输入ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 非线性映射：将滑块位置（0-100）映射到实际大小值
  const mapSliderToSize = (sliderValue: number): number => {
    // 计算滑块位置对应的索引
    const index = Math.round((sliderValue / 100) * (sizeOptions.length - 1));
    return sizeOptions[index];
  };
  
  // 非线性映射：将实际大小值映射到滑块位置（0-100）
  const mapSizeToSlider = (size: number): number => {
    // 找到最接近的大小选项
    const index = sizeOptions.findIndex(option => option >= size);
    const actualIndex = index === -1 ? sizeOptions.length - 1 : index;
    return (actualIndex / (sizeOptions.length - 1)) * 100;
  };
  
  // 处理滑块变化
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseFloat(e.target.value);
    const actualSize = mapSliderToSize(sliderValue);
    setCompressionParams(prev => ({ ...prev, maxSize: actualSize }));
  };
  
  // 处理刻度值点击
  const handleSizeOptionClick = (size: number) => {
    setCompressionParams(prev => ({ ...prev, maxSize: size }));
  };
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImages(prev => [...prev, ...files]);
      // 清空文件输入，允许重复选择同一文件
      e.target.value = '';
    }
  };
  
  // 处理拖拽上传
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 应用压缩参数后，禁止添加新图片
    if (compressedImages.length > 0) {
      return;
    }
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setImages(prev => [...prev, ...files]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // 应用压缩参数后，禁止拖拽
    if (compressedImages.length > 0) {
      return;
    }
    e.preventDefault();
  };
  
  // 清空图片列表
  const handleClearImages = () => {
    setImages([]);
    setCompressedImages([]);
  };
  
  // 继续添加图片
  const handleAddMore = () => {
    fileInputRef.current?.click();
  };
  
  // 应用压缩参数
  const handleApplyParams = async () => {
    if (images.length === 0) return;
    
    setProcessing(true);
    setProgress(0);
    setProgressText('准备处理图片...');
    
    try {
      const results: CompressedImage[] = [];
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        setProgressText(`正在处理第 ${i + 1}/${images.length} 张图片...`);
        
        const result = await compressImage(image, compressionParams);
        results.push(result);
        
        // 更新进度
        setProgress(Math.round(((i + 1) / images.length) * 100));
      }
      
      setCompressedImages(results);
      setProgressText('处理完成！');
      
      // 延迟关闭进度蒙层
      setTimeout(() => {
        setProcessing(false);
      }, 1000);
    } catch (error) {
      setProgressText('处理失败，请重试！');
      setTimeout(() => {
        setProcessing(false);
      }, 1500);
    }
  };
  
  // 下载单张图片
  const handleDownload = (image: CompressedImage) => {
    const link = document.createElement('a');
    link.href = image.compressedUrl;
    link.download = `compressed_${image.originalFile.name}`;
    link.click();
  };
  
  // 批量下载图片
  const handleBatchDownload = async () => {
    if (compressedImages.length === 0) return;
    
    const zip = new JSZip();
    
    // 遍历所有压缩图片，添加到zip中
    for (let i = 0; i < compressedImages.length; i++) {
      const image = compressedImages[i];
      const blob = image.compressedBlob;
      const fileName = `compressed_${i + 1}_${image.originalFile.name}`;
      
      // 将blob添加到zip中
      zip.file(fileName, blob);
    }
    
    // 生成zip文件
    const content = await zip.generateAsync({ type: 'blob' });
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `compressed_images_${new Date().getTime()}.zip`;
    link.click();
    
    // 释放URL对象
    URL.revokeObjectURL(link.href);
  };
  
  // 打开预览
  const handlePreview = (image: CompressedImage) => {
    setPreviewImage(image);
  };
  
  // 关闭预览
  const handleClosePreview = () => {
    setPreviewImage(null);
  };
  
  return (
    <div className="image-compressor">
      {/* 主容器 */}
      <div className="compressor-container">
        {/* 左侧区域 */}
        <div className="left-panel">
          <h2>图片压缩工具</h2>
          
          {/* 隐藏的文件输入框，始终存在于DOM中 */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            multiple 
            accept="image/*"
            className="file-input"
            style={{ 
              display: 'none', 
              visibility: 'hidden', 
              opacity: 0, 
              position: 'absolute', 
              left: '-9999px' 
            }}
          />
          
          {/* 图片上传区域 */}
          {images.length === 0 ? (
            <div 
              className="upload-area" 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-content">
                <div className="upload-icon">📁</div>
                <div className="upload-text">点击选择或拖拽图片到此处</div>
                <div className="upload-hint">支持 JPEG、PNG、WebP 格式</div>
              </div>
            </div>
          ) : (
            <div 
              className="image-list-container"
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
            >
              <div className="image-list-header">
                <h3>已选择图片 ({images.length})</h3>
                <div className="image-list-actions">
                  <button onClick={handleClearImages} className="btn btn-secondary">清空列表</button>
                  <button 
                    onClick={handleAddMore} 
                    className="btn btn-primary"
                    disabled={compressedImages.length > 0}
                  >
                    继续添加
                  </button>
                </div>
              </div>
              
              <div className="image-list">
                {compressedImages.length > 0 ? (
                  compressedImages.map((image, index) => (
                    <div key={index} className="image-item">
                      <div className="image-preview">
                        <img src={image.compressedUrl} alt={image.originalFile.name} />
                      </div>
                      <div className="image-info">
                        <div className="image-name">{image.originalFile.name}</div>
                        <div className="image-meta">
                          <div>原图: {formatFileSize(image.originalFile.size)}/{image.originalFile.type.split('/')[1].toUpperCase()} ({image.originalWidth}×{image.originalHeight})</div>
                          <div>压缩后: {formatFileSize(image.compressedSize)}/{image.compressedBlob.type.split('/')[1].toUpperCase()} ({image.compressedWidth}×{image.compressedHeight})</div>
                        </div>
                        <div className="image-actions">
                          <button onClick={() => handlePreview(image)} className="btn btn-small btn-secondary">预览</button>
                          <button onClick={() => handleDownload(image)} className="btn btn-small btn-primary">下载</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  images.map((image, index) => (
                    <div key={index} className="image-item">
                      <div className="image-preview">
                        <img src={URL.createObjectURL(image)} alt={image.name} />
                      </div>
                      <div className="image-info">
                        <div className="image-name">{image.name}</div>
                        <div className="image-meta">
                          <div>大小: {formatFileSize(Number(image.size))}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* 继续添加图片的拖拽提示，只有当没有压缩图片时才显示 */}
              {compressedImages.length === 0 && (
                <div className="drag-hint">
                  <span>💡 提示：可以拖拽更多图片到此处继续添加</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 右侧区域 */}
        <div className="right-panel">
          <h3>压缩参数设置</h3>
          
          <div className="params-container">
            {/* 图片格式 */}
            <div className="param-item">
              <label htmlFor="format">图片格式</label>
              <select 
                id="format" 
                value={compressionParams.format} 
                onChange={(e) => setCompressionParams(prev => ({ ...prev, format: e.target.value as CompressionParams['format'] }))}
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
                    className={`segmented-item ${compressionParams.maxSize === size ? 'active' : ''}`}
                    onClick={() => handleSizeOptionClick(size)}
                  >
                    {size === 0 ? '最优' : size === 0.256 ? '256KB' : size === 0.512 ? '512KB' : `${size}MB`}
                  </button>
                ))}
              </div>
              <div className="range-display">
                当前值: {compressionParams.maxSize === 0 ? '最优' : `${compressionParams.maxSize === 0.256 ? '256KB' : compressionParams.maxSize === 0.512 ? '512KB' : `${compressionParams.maxSize}MB`}`}
              </div>
            </div>
            
            {/* 黑白转换 */}
            <div className="param-item">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={compressionParams.isBlackWhite} 
                  onChange={(e) => setCompressionParams(prev => ({ ...prev, isBlackWhite: e.target.checked }))}
                />
                转换为黑白图片
              </label>
            </div>
          </div>
          
          {/* 应用按钮 */}
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleApplyParams}
            disabled={images.length === 0 || processing}
          >
            应用压缩参数
          </button>
          
          {/* 批量下载按钮 */}
          {compressedImages.length > 0 && (
            <button 
              className="btn btn-secondary btn-large batch-download-btn" 
              onClick={handleBatchDownload}
              disabled={compressedImages.length === 0}
            >
              {compressedImages.length > 1 ? '批量下载图片' : '下载图片'}
            </button>
          )}
        </div>
      </div>
      
      {/* 进度蒙层 */}
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
              <img src={previewImage.compressedUrl} alt="预览图片" />
            </div>
            <div className="preview-info">
              <div>文件名: {previewImage.originalFile.name}</div>
              <div>原图大小: {formatFileSize(previewImage.originalSize)}</div>
              <div>压缩后大小: {formatFileSize(previewImage.compressedSize)}</div>
              <div>分辨率: {previewImage.compressedWidth}×{previewImage.compressedHeight}</div>
            </div>
            <div className="preview-actions">
              <button onClick={() => handleDownload(previewImage)} className="btn btn-primary">下载图片</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
