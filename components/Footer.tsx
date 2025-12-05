import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <span>T</span>
            </div>
            <span className="footer-logo-text">Twinkle Tools</span>
          </div>
          
          <div className="footer-links">
            <a href="/about" className="footer-link">关于我们</a>
            <a href="/privacy" className="footer-link">隐私政策</a>
            <a href="/terms" className="footer-link">使用条款</a>
          </div>
          
          <div className="footer-copyright">
            © {new Date().getFullYear()} Twinkle Tools. 保留所有权利。
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;