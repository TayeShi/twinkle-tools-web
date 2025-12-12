import { PDFDocument } from 'pdf-lib';

/**
 * 合并多个PDF或图片文件为一个PDF
 * @param files 文件数组 (File对象，支持 .pdf, .png, .jpg, .jpeg)
 * @param onProgress 进度回调
 * @returns 合并后的PDF文件 Blob
 */
export const mergePdfs = async (
  files: File[],
  onProgress?: (current: number, total: number, status: string) => void
): Promise<Blob> => {
  // 检查是否在客户端环境
  if (typeof window === 'undefined') {
    throw new Error('PDF合并操作只能在客户端环境中执行');
  }

  if (!files || files.length === 0) {
    throw new Error('请至少选择一个文件');
  }

  try {
    // 创建一个新的空PDF文档
    const mergedPdf = await PDFDocument.create();
    const totalFiles = files.length;

    // 遍历所有上传的文件
    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const fileType = file.type;
      
      if (onProgress) {
        onProgress(i + 1, totalFiles, `正在处理第 ${i + 1} 个文件: ${file.name}`);
      }

      // 读取文件内容为 ArrayBuffer
      const fileBuffer = await file.arrayBuffer();

      if (fileType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        // 处理 PDF 文件
        try {
          const pdf = await PDFDocument.load(fileBuffer);
          const pageIndices = pdf.getPageIndices();
          const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } catch (e) {
          console.error(`无法解析PDF文件: ${file.name}`, e);
          throw new Error(`文件 ${file.name} 解析失败，可能是加密的PDF或已损坏`);
        }
      } else if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg' || 
                 file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg') || file.name.toLowerCase().endsWith('.png')) {
        // 处理图片文件
        try {
          let image;
          if (fileType === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
            image = await mergedPdf.embedPng(fileBuffer);
          } else {
            image = await mergedPdf.embedJpg(fileBuffer);
          }
          
          const page = mergedPdf.addPage([image.width, image.height]);
          page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
          });
        } catch (e) {
          console.error(`无法解析图片文件: ${file.name}`, e);
          throw new Error(`图片 ${file.name} 解析失败`);
        }
      } else {
        // 跳过不支持的文件类型
        console.warn(`跳过不支持的文件类型: ${file.name} (${fileType})`);
      }
    }

    if (onProgress) {
      onProgress(totalFiles, totalFiles, '正在生成最终PDF...');
    }

    // 保存合并后的PDF为字节数组
    const mergedPdfBytes = await mergedPdf.save();
    
    // 返回 Blob 对象，指定类型为 application/pdf
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
  } catch (error) {
    console.error('PDF合并失败:', error);
    throw error;
  }
};
