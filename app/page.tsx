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
    title: "计算器",
    description: "支持基础运算和科学计算的在线计算器",
    icon: Calculator,
    href: "/calculator",
    badge: "数学工具",
    color: "bg-blue-500"
  },
  {
    title: "颜色选择器",
    description: "专业的颜色选择和转换工具，支持多种格式",
    icon: Palette,
    href: "/color-picker",
    badge: "设计工具",
    color: "bg-purple-500"
  },
  {
    title: "文本格式化",
    description: "文本转换、格式化和处理工具集合",
    icon: FileText,
    href: "/text-formatter",
    badge: "文本工具",
    color: "bg-green-500"
  },
  {
    title: "倒计时器",
    description: "精确的倒计时和计时工具",
    icon: Clock,
    href: "/timer",
    badge: "时间工具",
    color: "bg-orange-500"
  },
  {
    title: "图片压缩",
    description: "在线图片压缩和格式转换工具",
    icon: ImageIcon,
    href: "/image-compressor",
    badge: "图片工具",
    color: "bg-pink-500"
  },
  {
    title: "哈希生成器",
    description: "MD5、SHA256等哈希值生成工具",
    icon: Hash,
    href: "/hash-generator",
    badge: "加密工具",
    color: "bg-gray-500"
  },
  {
    title: "二维码生成器",
    description: "快速生成各种内容的二维码",
    icon: Zap,
    href: "/qr-code",
    badge: "生成工具",
    color: "bg-indigo-500"
  },
  {
    title: "密码生成器",
    description: "安全的随机密码生成工具",
    icon: Shield,
    href: "/password-generator",
    badge: "安全工具",
    color: "bg-red-500"
  },
  {
    title: "JSON格式化",
    description: "JSON数据的格式化和验证工具",
    icon: Code,
    href: "/json-formatter",
    badge: "开发工具",
    color: "bg-cyan-500"
  },
  {
    title: "Base64编解码",
    description: "Base64编码和解码工具",
    icon: Globe,
    href: "/base64",
    badge: "编码工具",
    color: "bg-teal-500"
  },
  {
    title: "SQL格式化",
    description: "SQL代码格式化和美化工具",
    icon: Database,
    href: "/sql-formatter",
    badge: "数据库工具",
    color: "bg-amber-500"
  },
  {
    title: "URL编解码",
    description: "URL编码和解码处理工具",
    icon: Settings,
    href: "/url-encoder",
    badge: "网络工具",
    color: "bg-lime-500"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Twinkle Tools</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                首页
              </Link>
              <Link href="#tools" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                工具集
              </Link>
              <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                关于
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            实用<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">工具</span>集合
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            为开发者和设计师精心打造的在线工具集，提供便捷、高效的日常工具服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link href="#tools">开始使用</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              精选工具
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              涵盖开发、设计、文本处理等多个领域的实用工具
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <Link href={tool.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                          <IconComponent className={`h-5 w-5 ${tool.color.replace('bg-', 'text-')}`} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {tool.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              为什么选择 Twinkle Tools
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">快速便捷</h4>
              <p className="text-slate-600 dark:text-slate-300">
                无需安装，即开即用，提供流畅的使用体验
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">安全可靠</h4>
              <p className="text-slate-600 dark:text-slate-300">
                本地处理数据，保护您的隐私安全
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">持续更新</h4>
              <p className="text-slate-600 dark:text-slate-300">
                不断添加新工具，满足更多需求
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t bg-white dark:bg-slate-900 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">
            © 2024 Twinkle Tools. 致力于提供优质的在线工具服务
          </p>
        </div>
      </footer>
    </div>
  );
}
