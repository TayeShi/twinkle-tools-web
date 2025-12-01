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
        'group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-cyan-600 bg-slate-900/50 backdrop-blur-sm',
        !implemented && 'opacity-90'
      )}
    >
      <Link href={href}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${color} group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25`}>
                <IconComponent className={`h-6 w-6 text-white`} />
              </div>
              <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                {title.replace(/^[\u{1F000}-\u{1FFFF}]/u, '')}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-slate-800 text-cyan-400 border-slate-600">
                {badge}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-slate-300 leading-relaxed">
            {description}
          </CardDescription>
          {!implemented && (
            <div className="mt-3 p-2 rounded-lg bg-slate-800/50 border border-slate-600">
              <p className="text-xs text-lime-400 font-medium">
                🔄 Coming Soon
              </p>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}