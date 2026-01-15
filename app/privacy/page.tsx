import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm">
            <Link href="/" className="text-text-muted hover:text-primary transition-colors duration-200">
              首页
            </Link>
            <span className="mx-2 text-text-muted">/</span>
            <span className="text-secondary font-medium">隐私政策</span>
          </nav>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <h1 className="font-heading text-4xl font-bold text-secondary mb-8">
              隐私政策
            </h1>

            <div className="prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  我们的隐私承诺
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Twinkle Tools 承诺保护您的隐私。我们的所有工具都完全在您的浏览器中运行，
                  您的图片数据永远不会离开您的设备。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  我们不收集什么
                </h2>
                <ul className="list-disc list-inside text-text-muted space-y-2">
                  <li>不收集任何个人信息</li>
                  <li>不上传您的图片到任何服务器</li>
                  <li>不使用第三方追踪工具</li>
                  <li>不存储您的使用记录</li>
                  <li>不向第三方出售或分享您的数据</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  我们如何保护您的数据
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  所有图片处理都在您的浏览器本地完成，使用的是现代浏览器的内置 API
                  (Canvas API、File API 等)。这意味着：
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2">
                  <li>您的图片永远不会离开您的设备</li>
                  <li>不需要网络连接即可处理图片</li>
                  <li>即使服务器被攻击，您的数据也不会泄露</li>
                  <li>处理完成后，您可以立即删除所有本地数据</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  Cookie 政策
                </h2>
                <p className="text-text-muted leading-relaxed">
                  本网站不使用任何 cookie 或其他追踪技术。我们不需要您注册或登录，
                  因此也不需要存储任何账户信息。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  第三方服务
                </h2>
                <p className="text-text-muted leading-relaxed">
                  我们不使用任何第三方分析、广告或追踪服务。我们的网站是完全独立的，
                  没有与任何可能收集您数据的外部服务集成。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  开源代码
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  我们的前端代码是开源的，您可以在 GitHub 上查看和审查我们的代码，
                  以验证我们的隐私承诺。
                </p>
                <a
                  href="https://github.com/TayeShi/twinkle-tools-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  查看 GitHub 仓库 →
                </a>
              </section>

              <section>
                <h2 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  联系我们
                </h2>
                <p className="text-text-muted leading-relaxed">
                  如果您对本隐私政策有任何疑问，或者发现任何隐私相关的安全问题，
                  请通过 GitHub Issues 联系我们。
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-text-muted text-sm">
                最后更新: {new Date().toLocaleDateString("zh-CN")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
