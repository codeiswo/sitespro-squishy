'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Settings, Globe, Mail, Key, Shield, Image as ImageIcon, Layout, Menu as MenuIcon, Plus, Trash2, ArrowUp, ArrowDown, Code } from 'lucide-react';

const defaultMenu = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const settingsTranslations = {
  zh: {
    title: '系统设置',
    subtitle: '管理并配置您的独立网站参数',
    saveBtn: '保存修改',
    savingBtn: '保存中...',
    savedBtn: '已保存 ✓',
    
    // Logo block
    logoTitle: '网站 Logo 与图标',
    logoLabel: '站点 Logo 图标 (推荐高度 40px)',
    uploadLogo: '上传 Logo',
    removeLogo: '清除 Logo',
    logoTip: '支持 PNG, JPG, WebP, SVG。最大文件大小限制为 500KB。',
    logoEmpty: '未上传 Logo。系统将默认展示模板名称。',
    faviconLabel: '站点 Favicon 浏览器图标 (推荐 32x32 平方比例)',
    uploadFavicon: '上传 Favicon',
    removeFavicon: '清除 Favicon',
    faviconTip: '支持 PNG, ICO, WebP 格式。建议尺寸 32x32 或 48x48，最大 100KB。',
    faviconEmpty: '未上传 Favicon。系统将默认使用默认网页图标。',
    
    // Site Info block
    infoTitle: '网站基础信息',
    siteName: '网站名称 (Site Name)',
    tagline: '网站标语 (Tagline)',
    siteUrl: '网站链接 (Site URL)',
    contactEmail: '客服/联系邮箱 (Contact Email)',
    themeLabel: '网站主题/布局皮肤 (Website Theme)',
    
    // Hero block
    heroTitle: '首页 Banner 自定义 (Hero Area)',
    heroTitleLabel: '大标题 (Hero Title)',
    heroTitlePlaceholder: '如 Premium [accent]Water Filter[/accent] Replacements',
    heroDescLabel: '副标题/产品简述 (Hero Description)',
    heroDescPlaceholder: '如 Crystal-clear, great-tasting water for your family...',
    heroBtnTextLabel: 'CTA 按钮文字 (Button Text)',
    heroBtnTextPlaceholder: '如 Shop All Filters',
    heroBtnUrlLabel: 'CTA 按钮链接 (Button URL Link)',
    heroBtnUrlPlaceholder: '如 /products',
    
    // Menu block
    menuTitle: '顶部导航菜单管理 (Menu Builder)',
    addMenuLink: '新增菜单链接',
    menuLinkName: '链接显示名称 (例如: Products)',
    menuLinkUrl: '指向路径 (例如: /products)',
    menuEmpty: '暂无导航菜单配置，点击上方按钮新增菜单。',
    moveUp: '上移',
    moveDown: '下移',
    deleteLink: '删除链接',
    
    // SEO block
    seoTitle: '网站 SEO 搜索设置',
    metaTitle: '搜索引擎标题 (Meta Title)',
    metaDesc: '搜索引擎描述 (Meta Description)',
    
    // Security block
    securityTitle: '后台安全配置',
    adminPass: '独立后台密码',
    adminPassTip: '修改后需使用新密码登录此子站后台',

    // Payment block
    paymentTitle: '支付接口配置 (PayPal)',
    paypalClientIdLabel: 'PayPal Client ID (客户端ID)',
    paypalClientSecretLabel: 'PayPal Client Secret (API密钥)',
    paypalModeLabel: '运行模式 (PayPal Mode)',
    paypalModeSandbox: '沙盒测试环境 (Sandbox)',
    paypalModeLive: '正式生产环境 (Live)',
    paypalTip: '若要接入在线支付，请在此配置 PayPal API 凭证。配置并保存后，前台商品详情页将自动开启购物车和 PayPal 结算功能。',
  },
  en: {
    title: 'Settings',
    subtitle: 'Manage your site configuration',
    saveBtn: 'Save Changes',
    savingBtn: 'Saving...',
    savedBtn: 'Saved ✓',
    
    logoTitle: 'Custom Logo & Icon',
    logoLabel: 'Site Logo (Recommended: max height 40px)',
    uploadLogo: 'Upload Logo',
    removeLogo: 'Remove Logo',
    logoTip: 'Support PNG, JPG, WebP, SVG. Maximum file size: 500KB.',
    logoEmpty: 'No logo uploaded. Default template logo will be shown.',
    faviconLabel: 'Site Favicon (Recommended: 32x32 or square proportion)',
    uploadFavicon: 'Upload Favicon',
    removeFavicon: 'Remove Favicon',
    faviconTip: 'Support PNG, ICO, WebP. Recommended size: 32x32 or 48x48, max 100KB.',
    faviconEmpty: 'No favicon uploaded. Default favicon will be shown.',
    
    infoTitle: 'Site Information',
    siteName: 'Site Name',
    tagline: 'Tagline',
    siteUrl: 'Site URL',
    contactEmail: 'Contact Email',
    themeLabel: 'Website Theme / Layout Skin',
    
    heroTitle: 'Homepage Hero Customization',
    heroTitleLabel: 'Hero Title',
    heroTitlePlaceholder: 'Premium Water Filter Replacements',
    heroDescLabel: 'Hero Description',
    heroDescPlaceholder: 'Crystal-clear, great-tasting water for your family...',
    heroBtnTextLabel: 'Hero Button Text',
    heroBtnTextPlaceholder: 'Shop All Filters',
    heroBtnUrlLabel: 'Hero Button Link URL',
    heroBtnUrlPlaceholder: '/products',
    
    menuTitle: 'Navigation Menu Builder',
    addMenuLink: 'Add Menu Link',
    menuLinkName: 'Link Name (e.g. Products)',
    menuLinkUrl: 'URL Path (e.g. /products)',
    menuEmpty: 'No navigation menu links configured. Add one to customize your navigation.',
    moveUp: 'Move Up',
    moveDown: 'Move Down',
    deleteLink: 'Delete Link',
    
    seoTitle: 'SEO Settings',
    metaTitle: 'Meta Title',
    metaDesc: 'Meta Description',
    
    securityTitle: 'Security',
    adminPass: 'Admin Password',
    adminPassTip: 'Change your admin login password',

    // Payment block
    paymentTitle: 'Payment Gateway (PayPal)',
    paypalClientIdLabel: 'PayPal Client ID',
    paypalClientSecretLabel: 'PayPal Client Secret',
    paypalModeLabel: 'PayPal Mode',
    paypalModeSandbox: 'Sandbox (Testing)',
    paypalModeLive: 'Live (Production)',
    paypalTip: 'Configure your PayPal API credentials to enable online payments. Once configured, customers can purchase products directly.',
  }
};

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menu, setMenu] = useState([]);
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);

    async function fetch_settings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        const fetchedSettings = data.settings || {};
        setSettings(fetchedSettings);
        
        // Load menu
        if (fetchedSettings.navigation_menu) {
          try {
            setMenu(JSON.parse(fetchedSettings.navigation_menu));
          } catch {
            setMenu(defaultMenu);
          }
        } else {
          setMenu(defaultMenu);
        }
      } catch { 
        setMenu(defaultMenu);
      }
      setLoading(false);
    }
    fetch_settings();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = settingsTranslations[lang] || settingsTranslations.zh;

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        navigation_menu: JSON.stringify(menu)
      };
      
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch {
      alert('Network error');
    }
    setSaving(false);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      alert('Logo image should be less than 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSetting('site_logo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024) {
      alert('Favicon image should be less than 100KB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSetting('site_favicon', reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Menu editor helpers
  const addMenuItem = () => {
    setMenu([...menu, { name: 'New Link', href: '/products' }]);
  };

  const removeMenuItem = (index) => {
    setMenu(menu.filter((_, i) => i !== index));
  };

  const updateMenuItem = (index, field, value) => {
    setMenu(menu.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const moveMenuItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= menu.length) return;
    const updated = [...menu];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setMenu(updated);
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saving ? t.savingBtn : saved ? t.savedBtn : t.saveBtn}
        </button>
      </div>

      {/* Dynamic Branding & Logo Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.logoTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">{t.logoLabel}</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-file-input"
              />
              <label
                htmlFor="logo-file-input"
                className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors cursor-pointer"
              >
                {t.uploadLogo}
              </label>
              {settings.site_logo && (
                <button
                  onClick={() => updateSetting('site_logo', '')}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {t.removeLogo}
                </button>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">{t.logoTip}</p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[80px]">
            {settings.site_logo ? (
              <img src={settings.site_logo} alt="Site Logo Preview" className="max-h-12 object-contain" />
            ) : (
              <span className="text-xs text-gray-400">{t.logoEmpty}</span>
            )}
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700/50 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">{t.faviconLabel}</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/png, image/x-icon, image/vnd.microsoft.icon, image/webp"
                onChange={handleFaviconUpload}
                className="hidden"
                id="favicon-file-input"
              />
              <label
                htmlFor="favicon-file-input"
                className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors cursor-pointer"
              >
                {t.uploadFavicon}
              </label>
              {settings.site_favicon && (
                <button
                  onClick={() => updateSetting('site_favicon', '')}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {t.removeFavicon}
                </button>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">{t.faviconTip}</p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[80px]">
            {settings.site_favicon ? (
              <img src={settings.site_favicon} alt="Site Favicon Preview" className="w-8 h-8 object-contain animate-pulse" />
            ) : (
              <span className="text-xs text-gray-400">{t.faviconEmpty}</span>
            )}
          </div>
        </div>
      </div>

      {/* Site Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.infoTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.siteName}</label>
            <input value={settings.site_name || ''} onChange={e => updateSetting('site_name', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.tagline}</label>
            <input value={settings.site_tagline || ''} onChange={e => updateSetting('site_tagline', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.siteUrl}</label>
            <input value={settings.site_url || ''} onChange={e => updateSetting('site_url', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.contactEmail}</label>
            <input value={settings.site_email || ''} onChange={e => updateSetting('site_email', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.themeLabel}</label>
            <select
              value={settings.site_theme || 'default'}
              onChange={e => updateSetting('site_theme', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="default">{lang === 'zh' ? '水之律动 (Classic Blue)' : 'Classic Blue (Water)'}</option>
              <option value="nordic">{lang === 'zh' ? '极简北欧 (Nordic Minimalist)' : 'Nordic Minimalist (White)'}</option>
              <option value="cyberpunk">{lang === 'zh' ? '暗黑赛博 (Cyberpunk Neon)' : 'Cyberpunk Neon (Dark)'}</option>
              <option value="luxury">{lang === 'zh' ? '奢华黑金 (Luxury Gold & Black)' : 'Luxury Gold & Black'}</option>
              <option value="organic">{lang === 'zh' ? '自然环保 (Organic Earth)' : 'Organic Earth (Green/Cream)'}</option>
              <option value="editorial">{lang === 'zh' ? '报纸杂志 (Editorial Review)' : 'Editorial Review (Serif)'}</option>
              <option value="vibrant">{lang === 'zh' ? '活力暖橙 (Vibrant Orange)' : 'Vibrant Orange (Eco)'}</option>
              <option value="futuristic">{lang === 'zh' ? '未来科技 (Futuristic Neon Edge)' : 'Futuristic Glassmorphism'}</option>
              <option value="bold">{lang === 'zh' ? '极简红黑 (Bold High-Contrast Red)' : 'Bold High-Contrast Red'}</option>
              <option value="trust">{lang === 'zh' ? '专业信赖 (Corporate Slate Blue)' : 'Corporate Slate Blue (Trust)'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* HTML Header Tags / Site Verification */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Code className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">
            {lang === 'zh' ? '自定义 HTML Header 标签与验证码' : 'Custom HTML Header Tags & Verification'}
          </h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            {lang === 'zh'
              ? '自定义 Header 代码 / Meta 验证标签 (如 Google Search Console, Bing 验证代码, Google Analytics 等)'
              : 'Custom Header HTML Code / Meta Verification Tags (e.g., Google, Bing verification tags, Analytics)'}
          </label>
          <textarea
            placeholder='<meta name="google-site-verification" content="xxx" />&#10;<meta name="msvalidate.01" content="yyy" />'
            value={settings.custom_html_tags || ''}
            onChange={e => updateSetting('custom_html_tags', e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-y"
          />
          <p className="mt-1 text-[11px] text-gray-400">
            {lang === 'zh'
              ? '填入的代码将自动嵌入到独立站所有前台页面的 <head> 区域中，适用于 Google/Bing 站长验证与统计分析代码。'
              : 'Content entered here will be injected into the <head> section of all frontend pages.'}
          </p>
        </div>
      </div>

      {/* Hero Content Customization */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Layout className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.heroTitle}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.heroTitleLabel}</label>
            <input
              placeholder={t.heroTitlePlaceholder}
              value={settings.hero_title || ''}
              onChange={e => updateSetting('hero_title', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.heroDescLabel}</label>
            <textarea
              placeholder={t.heroDescPlaceholder}
              value={settings.hero_description || ''}
              onChange={e => updateSetting('hero_description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.heroBtnTextLabel}</label>
              <input
                placeholder={t.heroBtnTextPlaceholder}
                value={settings.hero_button_text || ''}
                onChange={e => updateSetting('hero_button_text', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.heroBtnUrlLabel}</label>
              <input
                placeholder={t.heroBtnUrlPlaceholder}
                value={settings.hero_button_url || ''}
                onChange={e => updateSetting('hero_button_url', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Builder */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MenuIcon className="w-5 h-5 text-accent" />
            <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.menuTitle}</h2>
          </div>
          <button
            type="button"
            onClick={addMenuItem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.addMenuLink}
          </button>
        </div>

        <div className="space-y-3">
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={t.menuLinkName}
                  value={item.name}
                  onChange={e => updateMenuItem(index, 'name', e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-850 text-xs text-gray-900 dark:text-white outline-none"
                />
                <input
                  type="text"
                  placeholder={t.menuLinkUrl}
                  value={item.href}
                  onChange={e => updateMenuItem(index, 'href', e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-750 bg-white dark:bg-gray-850 text-xs text-gray-900 dark:text-white outline-none"
                />
              </div>

              {/* Sorting & Action buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveMenuItem(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 disabled:opacity-30 cursor-pointer"
                  title={t.moveUp}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveMenuItem(index, 1)}
                  disabled={index === menu.length - 1}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 disabled:opacity-30 cursor-pointer"
                  title={t.moveDown}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors cursor-pointer"
                  title={t.deleteLink}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {menu.length === 0 && (
            <p className="text-center py-6 text-xs text-gray-400">{t.menuEmpty}</p>
          )}
        </div>
      </div>

      {/* SEO */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.seoTitle}</h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaTitle}</label>
          <input value={settings.meta_title || ''} onChange={e => updateSetting('meta_title', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaDesc}</label>
          <textarea value={settings.meta_description || ''} onChange={e => updateSetting('meta_description', e.target.value)} rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
        </div>
      </div>

      {/* Payment Configurations */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.paymentTitle}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.paypalClientIdLabel}</label>
            <input value={settings.paypal_client_id || ''} onChange={e => updateSetting('paypal_client_id', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.paypalClientSecretLabel}</label>
            <input type="password" value={settings.paypal_client_secret || ''} onChange={e => updateSetting('paypal_client_secret', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.paypalModeLabel}</label>
            <select
              value={settings.paypal_mode || 'sandbox'}
              onChange={e => updateSetting('paypal_mode', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="sandbox">{t.paypalModeSandbox}</option>
              <option value="live">{t.paypalModeLive}</option>
            </select>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">{t.paypalTip}</p>
        </div>
      </div>

      {/* Security */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-accent" />
          <h2 className="font-heading font-semibold text-gray-900 dark:text-white">{t.securityTitle}</h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">{t.adminPass}</label>
          <input type="password" value={settings.admin_password || ''} onChange={e => updateSetting('admin_password', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
          <p className="text-xs text-gray-400 mt-1">{t.adminPassTip}</p>
        </div>
      </div>
    </div>
  );
}
