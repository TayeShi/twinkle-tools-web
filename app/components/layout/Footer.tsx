import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-heading font-semibold text-lg text-secondary">
                Twinkle Tools
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              完全在浏览器中运行的图片处理工具，不上传任何数据到服务器，100%保护您的隐私。
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-secondary mb-4">工具</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/image/compress" className="text-text-muted hover:text-primary transition-colors duration-200 text-sm">
                  图片压缩
                </Link>
              </li>
              <li>
                <Link href="/tools/image/convert" className="text-text-muted hover:text-primary transition-colors duration-200 text-sm">
                  格式转换
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-secondary mb-4">关于</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/TayeShi/twinkle-tools-web" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors duration-200 text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-primary transition-colors duration-200 text-sm">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Twinkle Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
