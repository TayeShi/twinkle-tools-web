'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewPanelProps {
  previewUrl?: string;
}

export const PreviewPanel = ({ previewUrl }: PreviewPanelProps) => {
  return (
    <Card className="w-full h-full bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          👁️ 实时预览
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="预览" 
              className="max-w-full max-h-full object-contain p-4"
            />
          ) : (
            <div className="text-center p-8">
              <div className="text-4xl mb-4">👁️‍🗨️</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                上传图片后将显示实时预览
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
