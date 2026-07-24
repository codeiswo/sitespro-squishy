'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, FileText, ArrowLeftRight, TrendingUp, Plus, Eye } from 'lucide-react';

const dashboardTranslations = {
  zh: {
    welcome: '欢迎回来',
    subtitle: '这是您的网站最新运营动态',
    addProduct: '添加商品',
    products: '商品',
    pages: '页面',
    redirects: '重定向',
    recentProducts: '最近商品',
    viewAll: '查看全部',
    loading: '加载中...',
    noProducts: '暂无商品',
    active: '已上架',
    inactive: '已下架',
    addPage: '新建页面',
    addRedirect: '新建重定向',
  },
  en: {
    welcome: 'Welcome Back',
    subtitle: "Here's what's happening with your store",
    addProduct: 'Add Product',
    products: 'Products',
    pages: 'Pages',
    redirects: 'Redirects',
    recentProducts: 'Recent Products',
    viewAll: 'View All',
    loading: 'Loading...',
    noProducts: 'No products yet',
    active: 'Active',
    inactive: 'Inactive',
    addPage: 'Add Page',
    addRedirect: 'Add Redirect',
  }
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, pages: 0, redirects: 0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    // Read language
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);

    async function fetchData() {
      try {
        const [productsRes, pagesRes, redirectsRes] = await Promise.all([
          fetch('/api/products?all=1'),
          fetch('/api/pages?all=1'),
          fetch('/api/redirects'),
        ]);

        const productsData = await productsRes.json();
        const pagesData = await pagesRes.json();
        const redirectsData = await redirectsRes.json();

        setStats({
          products: productsData.products?.length || 0,
          pages: pagesData.pages?.length || 0,
          redirects: redirectsData.redirects?.length || 0,
        });

        setRecentProducts((productsData.products || []).slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = dashboardTranslations[lang] || dashboardTranslations.zh;

  const statCards = [
    { label: t.products, value: stats.products, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', href: '/admin/products' },
    { label: t.pages, value: stats.pages, icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10', href: '/admin/pages' },
    { label: t.redirects, value: stats.redirects, icon: ArrowLeftRight, color: 'text-purple-500', bg: 'bg-purple-500/10', href: '/admin/redirects' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{t.welcome}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.subtitle}</p>
        </div>
        <Link
          href="/admin/products?new=1"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.addProduct}
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
              {loading ? '...' : value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Products */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.recentProducts}</h2>
          <Link href="/admin/products" className="text-sm text-accent hover:text-accent-dark transition-colors">
            {t.viewAll} →
          </Link>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {loading ? (
            <div className="p-6 text-center text-gray-400">{t.loading}</div>
          ) : recentProducts.length === 0 ? (
            <div className="p-6 text-center text-gray-400">{t.noProducts}</div>
          ) : (
            recentProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.title}</p>
                  <p className="text-xs text-gray-400">{product.brand} · ${product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${product.is_active ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                    {product.is_active ? t.active : t.inactive}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/10 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t.addProduct, href: '/admin/products?new=1', icon: Package },
          { label: t.addPage, href: '/admin/pages?new=1', icon: FileText },
          { label: t.addRedirect, href: '/admin/redirects?new=1', icon: ArrowLeftRight },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent text-gray-400 hover:text-accent transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">{label}</span>
            <Plus className="w-4 h-4 ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
}
