import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-dark transition-colors duration-200">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-heading font-semibold text-lg text-secondary group-hover:text-primary transition-colors duration-200">
                  Twinkle Tools
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/tools/image/compress"
                  className="text-text-muted hover:text-primary transition-colors duration-200 font-medium"
                >
                  图片压缩
                </Link>
                <Link
                  href="/tools/image/convert"
                  className="text-text-muted hover:text-primary transition-colors duration-200 font-medium"
                >
                  格式转换
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/tools/image/compress"
                  className="hidden sm:block px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  开始使用
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
