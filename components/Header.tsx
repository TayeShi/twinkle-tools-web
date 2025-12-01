'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  // 工具图标组件
  icon: React.ReactNode;
  // 工具标题
  title: string;
  // 工具描述
  description: string;
  // 工具图标背景渐变
  iconGradient?: string;
}

export function Header({ 
  icon, 
  title, 
  description, 
  iconGradient = 'bg-gradient-to-r from-cyan-400 to-blue-500' 
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* 返回按钮 */}
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 px-4 py-2 sm:px-6 sm:py-3"
              >
                <ArrowLeft className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">🏠 返回首页</span>
              </Button>
            </Link>
            
            {/* 工具信息 */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* 工具图标 */}
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 shadow-cyan-500/25`}>
                {icon}
              </div>
              
              {/* 工具标题和描述 */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                  {title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0 sm:mt-1 truncate max-w-[200px] sm:max-w-none">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
