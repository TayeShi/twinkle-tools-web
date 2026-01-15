import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center py-20 lg:py-28">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 text-balance">
              在线图片处理工具
            </h1>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-8 text-balance leading-relaxed">
              完全在浏览器中运行，不上传数据到服务器，<br className="hidden sm:block" />
              <span className="text-primary font-semibold">100%保护您的隐私</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tools/image/compress"
                className="w-full sm:w-auto px-8 py-4 bg-cta hover:bg-cta-hover text-white rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                开始压缩图片
              </Link>
              <Link
                href="/tools/image/convert"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-secondary border-2 border-gray-200 rounded-2xl font-semibold text-lg transition-all duration-200 cursor-pointer"
              >
                格式转换
              </Link>
            </div>
          </section>

          <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-light hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-200">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-secondary mb-3">
                完全隐私保护
              </h3>
              <p className="text-text-muted leading-relaxed">
                所有处理都在您的浏览器中完成，图片永远不会离开您的设备，无需担心隐私泄露。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-light hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-200">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-secondary mb-3">
                极速处理
              </h3>
              <p className="text-text-muted leading-relaxed">
                无需上传下载，即传即用。利用浏览器原生能力，处理速度比传统在线工具更快。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-light hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-200">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-secondary mb-3">
                完全免费
              </h3>
              <p className="text-text-muted leading-relaxed">
                所有功能完全免费使用，无次数限制，无隐藏收费，无需注册登录，即开即用。
              </p>
            </div>
          </section>

          <section className="py-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary text-center mb-12">
              可用工具
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                href="/tools/image/compress"
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                      图片压缩
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      支持 JPG、PNG、WEBP 格式，自定义压缩质量，实时预览效果，一键下载。
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/tools/image/convert"
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                      格式转换
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      JPG、PNG、WEBP 之间互转，支持自定义质量参数，转换后即时下载。
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          <section className="py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                为什么选择我们？
              </h2>
              <p className="text-xl text-text-muted leading-relaxed mb-8">
                在这个数据隐私至关重要的时代，我们相信工具应该在保护隐私的前提下提供服务。
                我们不收集您的任何数据，不使用第三方追踪，您完全可以放心使用。
              </p>
              <Link
                href="/tools/image/compress"
                className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                立即体验
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Twinkle Tools",
            url: "https://twinkle-tools.com",
            description: "在线图片处理工具，支持图片压缩和格式转换，完全在浏览器中运行，保护用户隐私",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://twinkle-tools.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
