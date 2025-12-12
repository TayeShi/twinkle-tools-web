'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { mergePdfs } from '@/utils/pdfMerge';
import './PdfMerge.scss';

type MergeProgress = {
  current: number;
  total: number;
  status: string;
};

const PdfMerge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<MergeProgress | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLocked, setPreviewLocked] = useState(false);
  const [previewImages, setPreviewImages] = useState<Array<{ pageNumber: number; url: string; width: number; height: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSize = useMemo(
    () => files.reduce((sum, f) => sum + f.size, 0),
    [files]
  );

  const onAddFiles = useCallback((newFiles: File[]) => {
    const valid = newFiles.filter((f) => {
      const t = f.type.toLowerCase();
      const name = f.name.toLowerCase();
      return (
        t === 'application/pdf' ||
        t === 'image/png' ||
        t === 'image/jpeg' ||
        name.endsWith('.pdf') ||
        name.endsWith('.png') ||
        name.endsWith('.jpg') ||
        name.endsWith('.jpeg')
      );
    });
    if (valid.length === 0) return;
    setFiles((prev) => [...prev, ...valid]);
    setPreviewUrl(null);
    setPreviewLocked(false);
    setPreviewImages([]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onAddFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const list = e.dataTransfer.files;
    if (!list || list.length === 0) return;
    onAddFiles(Array.from(list));
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
    setPreviewLocked(false);
    setPreviewUrl(null);
    setPreviewImages([]);
  };

  const moveDown = (index: number) => {
    if (index >= files.length - 1) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
    setPreviewLocked(false);
    setPreviewUrl(null);
    setPreviewImages([]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewLocked(false);
    setPreviewUrl(null);
    setPreviewImages([]);
  };

  const clearFiles = () => {
    setFiles([]);
    setPreviewLocked(false);
    setPreviewUrl(null);
    setPreviewImages([]);
  };

  const startMerge = async (): Promise<Blob | null> => {
    if (files.length === 0) return null;
    setProcessing(true);
    setProgress({ current: 0, total: files.length, status: '准备中...' });
    try {
      const blob = await mergePdfs(files, (current, total, status) => {
        setProgress({ current, total, status });
      });
      return blob;
    } finally {
      setProcessing(false);
    }
  };

  const handleParsePreview = async () => {
    const blob = await startMerge();
    if (!blob) return;
    // 生成Blob URL用于下载备用
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setPreviewLocked(true);
    // 使用pdfjs-dist渲染预览图片
    await renderPreviewFromBlob(blob);
  };

  const handleDownload = async () => {
    const blob = await startMerge();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `merged_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onKeyUpload = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const renderPreviewFromBlob = async (blob: Blob) => {
    setProcessing(true);
    setProgress({ current: 0, total: 0, status: '正在生成预览...' });
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // 配置 worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
      const arrayBuffer = await blob.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
      const totalPages = pdfDoc.numPages;
      setPreviewImages([]);
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        setProgress({ current: pageNumber, total: totalPages, status: `预览渲染 ${pageNumber}/${totalPages}` });
        const page = await pdfDoc.getPage(pageNumber);
        const scale = 1.25;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('无法创建Canvas上下文');
        }
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderContext = { canvas, viewport };
        await page.render(renderContext).promise;
        const url = canvas.toDataURL('image/png');
        setPreviewImages((prev) => [...prev, { pageNumber, url, width: canvas.width, height: canvas.height }]);
      }
    } catch (e) {
      console.error('预览渲染失败', e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="pdf-merge">
      <div className="container">
      <div className="top-row">
        <div
          className={`left upload-area ${files.length === 0 ? 'empty-state' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          tabIndex={0}
          role="button"
          aria-label="上传文件，支持拖拽或点击选择"
          onKeyDown={onKeyUpload}
        >
          {files.length === 0 ? (
            <div className="upload-hint">
              <div className="icon">📄</div>
              <div className="text">拖拽或点击选择文件（支持 PDF/PNG/JPG）</div>
            </div>
          ) : null}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            multiple
            className="hidden-input"
            onChange={handleFileSelect}
          />

          {files.length > 0 && (
          <div className="file-list">
            <div className="list-header">
              <div className="title">已选择文件（{files.length}）</div>
              <div className="actions">
                <button
                  className="btn btn-secondary"
                  aria-label="添加文件"
                  title="添加文件"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  添加
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFiles();
                  }}
                >
                  清空
                </button>
              </div>
            </div>

              <ul>
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="file-item">
                    <div className="meta">
                      <div className="name">
                        {i + 1}. {f.name}
                      </div>
                      <div className="info">
                        {(f.size / 1024 / 1024).toFixed(2)} MB · {f.type || '未知'}
                      </div>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn btn-small"
                        aria-label="上移文件"
                        title="上移文件"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveUp(i);
                        }}
                        disabled={i === 0}
                      >
                        上移
                      </button>
                      <button
                        className="btn btn-small"
                        aria-label="下移文件"
                        title="下移文件"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveDown(i);
                        }}
                        disabled={i === files.length - 1}
                      >
                        下移
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        aria-label="删除文件"
                        title="删除文件"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

            <div className="list-summary">
              总大小 {(totalSize / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
          )}
        </div>

        <div className="right actions-area">
          <button
            className="btn btn-primary btn-large"
            onClick={handleParsePreview}
            disabled={processing || previewLocked || files.length === 0}
            aria-label="解析预览"
            title="解析预览"
          >
            解析预览
          </button>
          <button
            className="btn btn-secondary btn-large"
            onClick={handleDownload}
            disabled={processing || files.length === 0}
            aria-label="下载合并PDF"
            title="下载合并PDF"
          >
            下载合并PDF
          </button>
        </div>
      </div>

      <div className="bottom preview-area">
        <div className="preview-header">预览</div>
        {previewImages.length === 0 ? (
          <div className="preview-empty">点击“解析预览”后在此显示合并结果</div>
        ) : (
          <div className="pdf-preview">
            <div className="preview-pages" aria-label="PDF页面预览">
              {previewImages
                .slice()
                .sort((a, b) => a.pageNumber - b.pageNumber)
                .map((img) => (
                <div key={img.pageNumber} className="preview-page">
                  <div className="page-header">第 {img.pageNumber} 页</div>
                  <img
                    src={img.url}
                    alt={`第 ${img.pageNumber} 页预览`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {processing && (
        <div className="processing-overlay" role="dialog" aria-modal="true" aria-label="处理中，请稍候">
          <div className="processing-content">
            <div className="processing-text">
              {progress?.status || '处理中...'}
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width:
                    progress && progress.total > 0
                      ? `${Math.round((progress.current / progress.total) * 100)}%`
                      : '0%',
                }}
              />
            </div>
            <div className="progress-percentage">
              {progress && progress.total > 0
                ? `${Math.round((progress.current / progress.total) * 100)}%`
                : '0%'}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PdfMerge;
