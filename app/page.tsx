import Link from "next/link";
import "./page.scss";

// 工具数据
type Tool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
};

// 模拟工具数据
const tools: Tool[] = [
  {
    id: "image-compressor",
    name: "图片压缩工具",
    description: "在线压缩图片大小，保持质量",
    icon: "🖼️",
    category: "图片工具"
  },
  {
    id: "pdf-to-image",
    name: "PDF转图片工具",
    description: "在线将PDF文件转换为图片格式",
    icon: "📄",
    category: "转换工具"
  },
  {
    id: "pdf-merge",
    name: "PDF合并工具",
    description: "将多个PDF或图片按顺序合并成一个PDF",
    icon: "🧩",
    category: "PDF工具"
  },
  {
    id: "timestamp",
    name: "时间戳转换工具",
    description: "在线时间戳转换工具，支持时间戳与日期时间之间的双向转换",
    icon: "⏰",
    category: "开发工具"
  },
  // {
  //   id: "json-formatter",
  //   name: "JSON格式化工具",
  //   description: "在线JSON格式化、验证、压缩和转换工具",
  //   icon: "📋",
  //   category: "开发工具"
  // },
  // {
  //   id: "base64-encoder",
  //   name: "Base64编码解码",
  //   description: "在线Base64编码和解码工具",
  //   icon: "🔤",
  //   category: "开发工具"
  // },
  // {
  //   id: "md5-generator",
  //   name: "MD5加密工具",
  //   description: "在线生成MD5哈希值",
  //   icon: "🔒",
  //   category: "安全工具"
  // },
  // {
  //   id: "random-password",
  //   name: "随机密码生成器",
  //   description: "生成高强度随机密码",
  //   icon: "🔑",
  //   category: "安全工具"
  // },
  // {
  //   id: "url-shortener",
  //   name: "URL短链接生成器",
  //   description: "将长URL转换为短链接",
  //   icon: "🔗",
  //   category: "网络工具"
  // }
];

export default function Home() {
  return (
    <div className="home">
      <main className="container">
        {/* 英雄区域 */}
        <section className="hero">
          <h1>欢迎使用 Twinkle Tools</h1>
          <p>集合各种实用工具，为您的工作和生活提供便捷服务</p>
        </section>

        {/* 工具分类 */}
        <section className="tool-section">
          <h2>热门工具</h2>
          
          <div className="tool-grid">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${tool.id}`}
                  className="tool-card"
                >
                  <div className="icon">{tool.icon}</div>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span className="category">{tool.category}</span>
                </Link>
              ))}
            </div>
        </section>

        {/* 特性介绍 */}
        <section className="features">
          <h2>为什么选择 Twinkle Tools？</h2>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="icon">⚡</div>
              <h3>快速高效</h3>
              <p>所有工具都经过优化，提供快速的处理速度</p>
            </div>
            
            <div className="feature-item">
              <div className="icon">🔒</div>
              <h3>安全可靠</h3>
              <p>本地处理数据，保护您的隐私安全</p>
            </div>
            
            <div className="feature-item">
              <div className="icon">🎨</div>
              <h3>简洁易用</h3>
              <p>直观的用户界面，易于使用</p>
            </div>
          </div>
        </section>

        {/* 关于我们 */}
        <section className="about">
          <h2>关于 Twinkle Tools</h2>
          <p>
            Twinkle Tools 是一个免费的在线工具集合，致力于为用户提供便捷、高效的在线工具服务。
            我们不断添加新的工具，满足不同用户的需求。
          </p>
          <a
            href="/about"
            className="btn"
          >
            了解更多
          </a>
        </section>
      </main>
    </div>
  );
}
