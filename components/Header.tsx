'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './Header.scss';

const Header = () => {
  // 主题类型：light, dark, system
  type Theme = 'light' | 'dark' | 'system';

  // 初始化主题状态，确保在服务器端不访问localStorage
  const [theme, setTheme] = useState<Theme>('system');
  
  // 在客户端初始化时加载主题
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  // 下拉菜单显示状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 下拉菜单引用，用于检测点击外部
  const menuRef = useRef<HTMLDivElement>(null);

  // 主题选项配置，明确指定类型
  const themeOptions: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
    { value: 'light', label: '明亮', icon: (
      <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20" aria-label="明亮主题">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ) },
    { value: 'dark', label: '黑暗', icon: (
      <svg className="theme-icon" fill="currentColor" viewBox="0 0 20 20" aria-label="暗黑主题">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
      </svg>
    ) },
    { value: 'system', label: '跟随系统', icon: (
      <svg className="theme-icon" fill="currentColor" viewBox="0 0 24 24" aria-label="跟随系统">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13h-1v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ) },
  ];

  // 获取当前是否为暗黑模式
  const getIsDark = (): boolean => {
    if (theme === 'system') {
      return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === 'dark';
  };

  // 应用主题到文档
  const applyTheme = () => {
    const isDark = getIsDark();
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 从本地存储加载主题偏好并应用到文档
  useEffect(() => {
    applyTheme();
    // 确保只在浏览器环境中访问localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // 监听系统主题变化（当主题设置为system时）
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    // 添加监听器
    mediaQuery.addEventListener('change', handleChange);
    // 初始应用
    handleChange();

    // 清理监听器
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // 切换下拉菜单显示状态
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 选择主题
  const selectTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <span>T</span>
          </div>
          <h1 className="logo-text">Twinkle Tools</h1>
        </Link>
        
        <div className="header-right" ref={menuRef}>
          <nav className="nav">
            <Link 
              href="/" 
              className="nav-link"
            >
              首页
            </Link>
            <Link 
              href="/tools" 
              className="nav-link"
            >
              工具
            </Link>
            <Link 
              href="/about" 
              className="nav-link"
            >
              关于
            </Link>
          </nav>
          
          <div className="theme-toggle-container">
          <button
            onClick={toggleMenu}
            className="theme-toggle"
            aria-label={`当前主题：${theme === 'light' ? '明亮' : theme === 'dark' ? '暗黑' : '跟随系统'}`}
            title={`切换主题：${theme === 'light' ? '明亮' : theme === 'dark' ? '暗黑' : '跟随系统'}`}
          >
            {themeOptions.find(option => option.value === theme)?.icon}
          </button>
          
          {isMenuOpen && (
            <div className="theme-dropdown">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectTheme(option.value)}
                  className={`theme-option ${theme === option.value ? 'active' : ''}`}
                  aria-label={`切换到${option.label}主题`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {theme === option.value && (
                    <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;