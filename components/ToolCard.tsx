'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge: string;
  color: string;
  emoji: string;
  implemented: boolean;
}

export function ToolCard({ title, description, icon: IconComponent, href, badge, color, emoji, implemented }: ToolCardProps) {
  return (
    <Card 
      className={cn(
        'group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-200 dark:hover:border-purple-700',
        !implemented && 'opacity-90'
      )}
    >
      <Link href={href}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110`}>
                <IconComponent className={`h-6 w-6 text-white`} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400">
                {title.replace(/^[\u{1F000}-\u{1FFFF}]/u, '')}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300">
                {badge}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </CardDescription>
          {!implemented && (
            <div className="mt-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                🔄 Coming Soon
              </p>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}