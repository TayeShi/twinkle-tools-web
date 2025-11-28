'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Palette, 
  FileText, 
  Clock, 
  Image as ImageIcon, 
  Hash,
  Zap,
  Shield,
  Globe,
  Code,
  Database,
  Settings
} from "lucide-react";

const tools = [
  {
    title: "🖼️ 图片压缩",
    description: "🎯 高效的在线图片压缩和格式转换工具",
    icon: ImageIcon,
    href: "/image-compressor",
    badge: "图片工具",
    color: "from-pink-500 to-pink-600",
    emoji: "🖼️",
    implemented: true
  },
  {
    title: "🧮 计算器",
    description: "⚡️ 支持基础运算和科学计算的智能计算器",
    icon: Calculator,
    href: "/calculator",
    badge: "数学工具",
    color: "from-blue-500 to-blue-600",
    emoji: "🧮",
    implemented: false
  },
  {
    title: "🎨 颜色选择器",
    description: "🌈 专业的颜色选择和转换工具，支持多种格式",
    icon: Palette,
    href: "/color-picker",
    badge: "设计工具",
    color: "from-purple-500 to-purple-600",
    emoji: "🎨",
    implemented: false
  },
  {
    title: "📝 文本格式化",
    description: "✏️ 强大的文本转换、格式化和处理工具集合",
    icon: FileText,
    href: "/text-formatter",
    badge: "文本工具",
    color: "from-green-500 to-green-600",
    emoji: "📝",
    implemented: false
  },
  {
    title: "⏰ 倒计时器",
    description: "⚡️ 精确的倒计时和计时工具，支持多种模式",
    icon: Clock,
    href: "/timer",
    badge: "时间工具",
    color: "from-orange-500 to-orange-600",
    emoji: "⏰",
    implemented: false
  },
  {
    title: "#️⃣ 哈希生成器",
    description: "🔐 MD5、SHA256等哈希值生成工具，安全可靠",
    icon: Hash,
    href: "/hash-generator",
    badge: "加密工具",
    color: "from-gray-500 to-gray-600",
    emoji: "#️⃣",
    implemented: false
  },
  {
    title: "📱 二维码生成器",
    description: "🚀 快速生成各种内容的二维码，支持自定义样式",
    icon: Zap,
    href: "/qr-code",
    badge: "生成工具",
    color: "from-indigo-500 to-indigo-600",
    emoji: "📱",
    implemented: false
  },
  {
    title: "🔐 密码生成器",
    description: "🛡️ 安全的随机密码生成工具，多种可选规则",
    icon: Shield,
    href: "/password-generator",
    badge: "安全工具",
    color: "from-red-500 to-red-600",
    emoji: "🔐",
    implemented: false
  },
  {
    title: "💻 JSON格式化",
    description: "✨ JSON数据的格式化和验证工具，支持高亮显示",
    icon: Code,
    href: "/json-formatter",
    badge: "开发工具",
    color: "from-cyan-500 to-cyan-600",
    emoji: "💻",
    implemented: false
  },
  {
    title: "🔄 Base64编解码",
    description: "🔤 Base64编码和解码工具，支持文件和文本",
    icon: Globe,
    href: "/base64",
    badge: "编码工具",
    color: "from-teal-500 to-teal-600",
    emoji: "🔄",
    implemented: false
  },
  {
    title: "🗄️ SQL格式化",
    description: "📊 SQL代码格式化和美化工具，提升可读性",
    icon: Database,
    href: "/sql-formatter",
    badge: "数据库工具",
    color: "from-amber-500 to-amber-600",
    emoji: "🗄️",
    implemented: false
  },
  {
    title: "🔗 URL编解码",
    description: "🌐 URL编码和解码处理工具，支持各种编码格式",
    icon: Settings,
    href: "/url-encoder",
    badge: "网络工具",
    color: "from-lime-500 to-lime-600",
    emoji: "🔗",
    implemented: false
  }
];

export default function Home() {
  // 排序工具列表：已实现的工具排在前面
  const sortedTools = [...tools].sort((a, b) => {
    if (a.implemented && !b.implemented) return -1;
    if (!a.implemented && b.implemented) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Twinkle Tools
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                🏠 首页
              </Link>
              <Link href="#tools" className="text-sm font-medium text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors">
                🛠️ 工具集
              </Link>
              <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400 transition-colors">
                📖 关于
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl md:text-6xl">🌟</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
              ⚡ 实用工具集合 ✨
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            🎨 为开发者和设计师精心打造的在线工具集，提供便捷、高效的日常工具服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105" asChild>
              <Link href="#tools">
                <span className="mr-2">🚀</span>
                开始使用
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-950 transition-all duration-300 hover:scale-105" asChild>
              <Link href="#about">
                <span className="mr-2">📖</span>
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              ⭐ 精选工具集
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              🎨 涵盖开发、设计、文本处理等多个领域的实用工具，让工作更高效 ✨
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTools.map((tool, index) => {
              const IconComponent = tool.icon;
              
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-200 dark:hover:border-purple-700 ${!tool.implemented ? 'opacity-90' : ''}`}
                >
                  <Link href={tool.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110`}>
                            <IconComponent className={`h-6 w-6 text-white`} />
                          </div>
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400">
                            {tool.title.replace(/^[\u{1F000}-\u{1FFFF}]/u, '')}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300">
                            {tool.badge}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      {!tool.implemented && (
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
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-4">
              ⭐ 为什么选择 Twinkle Tools?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              🚀 为您提供卓越的开发体验和工具服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                ⚡ 快速便捷
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                🎯 无需安装，即开即用，提供毫秒级响应的流畅体验
              </p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                🛡️ 安全可靠
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                🔒 本地处理数据，保护您的隐私安全，绝不上传任何文件
              </p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-transparent group-hover:border-green-200 dark:group-hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                🌟 持续更新
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                📈 不断添加新工具，倾听用户反馈，满足更多开发需求
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-r from-slate-100 to-blue-100 dark:from-slate-900 dark:to-blue-950 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            🎉 © 2024 Twinkle Tools. 致力于提供优质的在线工具服务，让开发更轻松 🚀
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">⚡</span>
            <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">🎨</span>
            <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">🛠️</span>
            <span className="text-2xl hover:scale-110 transition-transform cursor-pointer">💡</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
