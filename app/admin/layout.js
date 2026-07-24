'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, FileText, ArrowLeftRight, Settings,
  Menu, X, Droplets, LogOut, ChevronRight, Globe, ShoppingBag
} from 'lucide-react';

const sidebarNav = [
  { key: 'dashboard', href: '/admin', icon: LayoutDashboard },
  { key: 'products', href: '/admin/products', icon: Package },
  { key: 'orders', href: '/admin/orders', icon: ShoppingBag },
  { key: 'pages', href: '/admin/pages', icon: FileText },
  { key: 'redirects', href: '/admin/redirects', icon: ArrowLeftRight },
  { key: 'settings', href: '/admin/settings', icon: Settings },
];

const layoutTranslations = {
  zh: {
    dashboard: '仪表盘',
    products: '商品管理',
    orders: '订单管理',
    pages: '自定义页面',
    redirects: '路由重定向',
    settings: '系统设置',
    viewSite: '预览网站',
    logout: '退出登录',
    adminPanel: '管理后台',
  },
  en: {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    pages: 'Pages',
    redirects: 'Redirects',
    settings: 'Settings',
    viewSite: 'View Site',
    logout: 'Logout',
    adminPanel: 'Admin Panel',
  }
};

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [siteName, setSiteName] = useState('FiltersPro');
  const [siteLogo, setSiteLogo] = useState('');
  const [lang, setLang] = useState('zh');
  const pathname = usePathname();

  useEffect(() => {
    // Sync language selection
    const storedLang = localStorage.getItem('admin_lang') || 'zh';
    setLang(storedLang);

    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);

    // Fetch dynamic site config
    if (pathname !== '/admin/login') {
      async function fetchBranding() {
        try {
          const res = await fetch('/api/settings');
          const data = await res.json();
          if (data.settings) {
            if (data.settings.site_name) setSiteName(data.settings.site_name);
            if (data.settings.site_logo) setSiteLogo(data.settings.site_logo);
          }
        } catch (_) {}
      }
      fetchBranding();
    }

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const toggleLang = () => {
    const nextLang = lang === 'zh' ? 'en' : 'zh';
    setLang(nextLang);
    localStorage.setItem('admin_lang', nextLang);
    window.dispatchEvent(new Event('admin_lang_changed'));
  };

  const t = layoutTranslations[lang] || layoutTranslations.zh;

  // Don't show admin layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            {siteLogo ? (
              <img src={siteLogo} alt={siteName} className="h-8 max-w-[120px] object-contain" />
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="truncate">
                  <span className="font-heading font-bold text-base block truncate max-w-[130px]">{siteName}</span>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-none mt-0.5">{t.adminPanel}</p>
                </div>
              </>
            )}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto admin-scroll">
            {sidebarNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/20 text-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {t[item.key]}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-3 py-4 border-t border-white/10 space-y-1">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full text-left cursor-pointer"
            >
              <Globe className="w-5 h-5 text-accent" />
              <span>{lang === 'zh' ? 'English' : '简体中文'}</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all w-full"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              {t.viewSite}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              {t.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white capitalize">
                {pathname === '/admin' ? t.dashboard : pathname.split('/').pop()?.replace(/-/g, ' ')}
              </h2>
            </div>
            <div className="flex items-center gap-3">
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
