import Link from 'next/link'
import Header from '@/components/Header'
import {
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

const tools = [
  {
    name: '图片压缩',
    description: '高质量压缩图片，保持清晰度同时大幅减小文件大小',
    icon: CpuChipIcon,
    gradient: 'from-primary-500 to-primary-600',
    link: '/tools/image/compress',
    tags: ['JPG', 'PNG', 'WEBP']
  },
  {
    name: '格式转换',
    description: '快速转换图片格式，支持JPG、PNG、WEBP互转',
    icon: DocumentDuplicateIcon,
    gradient: 'from-secondary-500 to-secondary-600',
    link: '/tools/image/convert',
    tags: ['JPG→PNG', 'PNG→WEBP', 'WEBP→JPG']
  }
]

const features = [
  {
    icon: ShieldCheckIcon,
    title: '隐私保护',
    description: '所有处理在浏览器完成，不上传任何数据到服务器',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: BoltIcon,
    title: '极速处理',
    description: '充分利用浏览器性能，提供流畅的实时处理体验',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: AdjustmentsHorizontalIcon,
    title: '简单易用',
    description: '直观的界面设计，无需学习即可快速上手',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }
]

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="mb-20 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              100% 浏览器端处理
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-primary-700 to-secondary-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-6xl">
              在线图片处理工具
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 sm:text-xl">
              完全在浏览器中运行，不上传任何数据到服务器，保护您的隐私，提供快速、安全的图片处理体验
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools/image/compress"
                className="btn-primary"
              >
                开始使用
              </Link>
              <Link
                href="#tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-700 shadow-lg transition-all duration-300 hover:bg-slate-50 hover:shadow-xl"
              >
                了解更多
              </Link>
            </div>
          </section>

          <section id="tools" className="mb-20">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">热门工具</h2>
              <p className="text-slate-600">选择您需要的工具，立即开始处理</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.name}
                    href={tool.link}
                    className="tool-card group cursor-pointer p-6"
                  >
                    <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${tool.gradient} p-4 shadow-lg transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {tool.name}
                    </h3>

                    <p className="mb-4 text-slate-600">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:gap-3 transition-all">
                      立即使用
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">为什么选择我们</h2>
              <p className="text-slate-600">专注用户体验，保护您的数据隐私</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="section-card group hover:shadow-2xl transition-all duration-300">
                    <div className={`mb-4 inline-flex rounded-2xl ${feature.bgColor} p-3 transition-all duration-300 group-hover:scale-110`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="section-card">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                更多工具，敬请期待
              </h2>
              <p className="mb-8 text-slate-600">
                我们正在持续开发更多实用工具，包括文本处理、文件工具、开发者工具等
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {['图片缩放', '图片裁剪', '文本格式化', 'JSON格式化', 'Base64转换'].map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 text-sm font-medium text-slate-700 border border-slate-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
