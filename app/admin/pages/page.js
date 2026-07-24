'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Trash2, Edit, FileText, Sparkles, Eye, Code, Check, ExternalLink } from 'lucide-react';

const presetTemplates = {
  about: {
    title: 'About Us',
    slug: 'about',
    meta_title: 'About Us | Clean Water & Reliable Filtration Solutions',
    meta_description: 'Learn about our mission to provide high-quality, NSF-certified refrigerator water filter replacements at honest prices.',
    content: `<h2>About Our Mission</h2>
<p>We are dedicated to providing high-performance, NSF-certified refrigerator water filter replacements that deliver crystal-clear, great-tasting water for every family.</p>
<h3>Why Choose Us?</h3>
<ul>
  <li><strong>NSF Certified:</strong> Tested and certified under NSF 42 & 53 standards for harmful contaminant removal.</li>
  <li><strong>Premium Materials:</strong> High-density coconut shell activated carbon for superior filtration efficiency.</li>
  <li><strong>Affordable Excellence:</strong> Save up to 60% compared to OEM manufacturer prices.</li>
  <li><strong>Satisfaction Guarantee:</strong> 30-day risk-free money-back guarantee on all orders.</li>
</ul>`
  },
  contact: {
    title: 'Contact Us',
    slug: 'contact',
    meta_title: 'Contact Us | Customer Support & Help Center',
    meta_description: 'Have questions about refrigerator filter compatibility or your order? Get in touch with our customer care team.',
    content: `<h2>Customer Support & Enquiries</h2>
<p>Need help identifying the exact replacement filter model for your refrigerator? Our technical support team is ready to assist you!</p>
<h3>Get in Touch</h3>
<p><strong>Email Support:</strong> support@filterspro.com</p>
<p><strong>Business Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM EST</p>
<p><strong>Response Time:</strong> We strive to answer all emails within 24 hours during business days.</p>`
  },
  privacy: {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    meta_title: 'Privacy Policy | Data Protection & Security',
    meta_description: 'Read our privacy policy to understand how we collect, store, and protect your personal information.',
    content: `<h1>Privacy Policy</h1>
<p><em>Last Updated: January 2026</em></p>
<h2>1. Information We Collect</h2>
<p>We collect personal information that you provide directly to us when making a purchase, creating an account, or subscribing to customer support, including your name, shipping address, email address, and order details.</p>
<h2>2. Payment & Data Security</h2>
<p>All credit card transactions and checkout information are encrypted using industry-standard SSL security technology. We do not store sensitive payment card credentials on our servers.</p>
<h2>3. Cookies & Analytics</h2>
<p>We use essential cookies to maintain your cart state and basic web analytics to improve page load speeds and user browsing experience.</p>`
  },
  terms: {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    meta_title: 'Terms of Service | User Agreement',
    meta_description: 'Review our terms of service governing website usage, product orders, and customer agreements.',
    content: `<h1>Terms of Service</h1>
<p><em>Last Updated: January 2026</em></p>
<h2>1. Agreement to Terms</h2>
<p>By browsing or purchasing from our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
<h2>2. Orders & Pricing</h2>
<p>All product prices are subject to change without prior notice. We reserve the right to cancel or refuse any order in the event of stock unavailability or pricing errors.</p>
<h2>3. Warranty & Liability</h2>
<p>Our replacement filters are guaranteed to fit compatible specified refrigerator models. Liability is limited to the purchase price of the product.</p>`
  },
  shipping: {
    title: 'Shipping Policy',
    slug: 'shipping-policy',
    meta_title: 'Shipping & Delivery Policy | Free Shipping Available',
    meta_description: 'Learn about our shipping options, processing times, and free shipping thresholds.',
    content: `<h1>Shipping Policy</h1>
<h2>Free Shipping Threshold</h2>
<p>We offer <strong>Free Standard Shipping</strong> on all orders over $35 within the continental United States.</p>
<h2>Processing & Transit Times</h2>
<ul>
  <li><strong>Order Processing:</strong> Orders are processed and dispatched within 1–2 business days.</li>
  <li><strong>Standard Transit Time:</strong> 3–5 business days via USPS / FedEx.</li>
  <li><strong>Tracking Information:</strong> A shipping confirmation email with tracking details will be sent once your package ships.</li>
</ul>`
  },
  refund: {
    title: 'Return & Refund Policy',
    slug: 'refund-policy',
    meta_title: 'Return & Refund Policy | 30-Day Money-Back Guarantee',
    meta_description: 'Read about our 30-day hassle-free return policy and refund process.',
    content: `<h1>Return & Refund Policy</h1>
<h2>30-Day Satisfaction Guarantee</h2>
<p>If you are not 100% satisfied with your replacement filter, you may return unopened and unused filters within 30 days of receipt for a full refund.</p>
<h2>How to Request a Return</h2>
<ol>
  <li>Contact our customer support team with your order number.</li>
  <li>Receive your Return Authorization code and shipping instructions.</li>
  <li>Ship the item back to our fulfillment center. Refunds are processed within 3 business days of package inspection.</li>
</ol>`
  }
};

const pagesTranslations = {
  zh: {
    title: '自定义页面管理',
    subtitle: '管理网站单页面内容 (关于我们、联系我们、隐私政策及各类协议文件)',
    close: '关闭窗口',
    addPage: '新建页面',
    editPage: '编辑页面内容',
    newPage: '新建单页面',
    titleLabel: '页面标题 *',
    slugLabel: '页面 URL 路径 (Slug)',
    slugPlaceholder: '例如: privacy-policy (留空自动生成)',
    contentLabel: '详细内容 (支持 HTML 结构)',
    metaTitleLabel: 'SEO 标题 (Meta Title)',
    metaDescLabel: 'SEO 描述 (Meta Description)',
    publishedLabel: '公开发布并在前台展示',
    updatePage: '保存修改',
    createPage: '立即创建',
    cancel: '取消',
    thPage: '页面标题',
    thSlug: 'URL 路径',
    thStatus: '发布状态',
    thActions: '操作项',
    loading: '正在加载页面列表中...',
    noPages: '暂无自定义单页面，点击右上角新建或快捷导入常用页面',
    published: '已发布',
    draft: '草稿',
    confirmDelete: '确认要删除此单页面吗？该操作不可撤销！',
    deleteFailed: '删除失败',
    saveFailed: '保存失败',
    tabEdit: '编辑 HTML 代码',
    tabPreview: '实时效果预览',
    presetsLabel: '一键插入常用单页模板：',
    btnAbout: '关于我们 (About)',
    btnContact: '联系我们 (Contact)',
    btnPrivacy: '隐私政策 (Privacy)',
    btnTerms: '服务条款 (Terms)',
    btnShipping: '发货政策 (Shipping)',
    btnRefund: '退换货规则 (Refund)',
    viewPage: '查看前台页面'
  },
  en: {
    title: 'Single Pages',
    subtitle: 'Manage CMS single pages (About Us, Contact Us, Privacy Policy, Terms & Policies)',
    close: 'Close',
    addPage: 'Add New Page',
    editPage: 'Edit Page',
    newPage: 'New Page',
    titleLabel: 'Title *',
    slugLabel: 'URL Slug',
    slugPlaceholder: 'e.g. privacy-policy',
    contentLabel: 'Content (HTML)',
    metaTitleLabel: 'Meta Title',
    metaDescLabel: 'Meta Description',
    publishedLabel: 'Publish on Storefront',
    updatePage: 'Update Page',
    createPage: 'Create Page',
    cancel: 'Cancel',
    thPage: 'Page Title',
    thSlug: 'URL Slug',
    thStatus: 'Status',
    thActions: 'Actions',
    loading: 'Loading pages...',
    noPages: 'No custom pages yet. Click Add New Page or insert a preset template.',
    published: 'Published',
    draft: 'Draft',
    confirmDelete: 'Are you sure you want to delete this page?',
    deleteFailed: 'Failed to delete page',
    saveFailed: 'Failed to save page',
    tabEdit: 'Edit HTML',
    tabPreview: 'Live Preview',
    presetsLabel: 'Insert Preset Templates:',
    btnAbout: 'About Us',
    btnContact: 'Contact Us',
    btnPrivacy: 'Privacy Policy',
    btnTerms: 'Terms of Service',
    btnShipping: 'Shipping Policy',
    btnRefund: 'Return Policy',
    viewPage: 'View Live Page'
  }
};

export default function AdminPagesPage() {
  const searchParams = useSearchParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(searchParams.get('new') === '1');
  const [editingPage, setEditingPage] = useState(null);
  const [lang, setLang] = useState('zh');
  const [formMode, setFormMode] = useState('edit'); // 'edit' or 'preview'
  const [form, setForm] = useState({
    title: '', slug: '', content: '', meta_title: '', meta_description: '',
    template: 'default', is_published: true,
  });

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages?all=1');
      const data = await res.json();
      setPages(data.pages || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);

    fetchPages();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = pagesTranslations[lang] || pagesTranslations.zh;

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', meta_title: '', meta_description: '', template: 'default', is_published: true });
    setEditingPage(null);
    setFormMode('edit');
  };

  const handleEdit = (page) => {
    setEditingPage(page.id);
    setForm({
      title: page.title || '', slug: page.slug || '', content: page.content || '',
      meta_title: page.meta_title || '', meta_description: page.meta_description || '',
      template: page.template || 'default', is_published: !!page.is_published,
    });
    setFormMode('edit');
    setShowForm(true);
  };

  const handleInsertPreset = (presetKey) => {
    const preset = presetTemplates[presetKey];
    if (!preset) return;

    setForm(prev => ({
      ...prev,
      title: prev.title || preset.title,
      slug: prev.slug || preset.slug,
      meta_title: prev.meta_title || preset.meta_title,
      meta_description: prev.meta_description || preset.meta_description,
      content: preset.content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, is_published: form.is_published ? 1 : 0 };
    try {
      const url = editingPage ? `/api/pages/${editingPage}` : '/api/pages';
      const method = editingPage ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { resetForm(); setShowForm(false); fetchPages(); }
      else { const d = await res.json(); alert(d.error || t.saveFailed); }
    } catch { alert('Network error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try { await fetch(`/api/pages/${id}`, { method: 'DELETE' }); fetchPages(); }
    catch { alert(t.deleteFailed); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.subtitle}</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />{showForm ? t.close : t.addPage}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-6 shadow-sm" id="page-form">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
            <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
              {editingPage ? t.editPage : t.newPage}
            </h2>

            {/* Presets Toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-gray-400 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {t.presetsLabel}
              </span>
              <button type="button" onClick={() => handleInsertPreset('about')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnAbout}
              </button>
              <button type="button" onClick={() => handleInsertPreset('contact')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnContact}
              </button>
              <button type="button" onClick={() => handleInsertPreset('privacy')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnPrivacy}
              </button>
              <button type="button" onClick={() => handleInsertPreset('terms')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnTerms}
              </button>
              <button type="button" onClick={() => handleInsertPreset('shipping')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnShipping}
              </button>
              <button type="button" onClick={() => handleInsertPreset('refund')} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                {t.btnRefund}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.titleLabel}</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.slugLabel}</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder={t.slugPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 font-mono" />
            </div>
          </div>

          {/* Content Field with Edit / Live Preview Tabs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-500">{t.contentLabel}</label>
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-900 p-0.5 border border-gray-200 dark:border-gray-800">
                <button type="button" onClick={() => setFormMode('edit')}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${formMode === 'edit' ? 'bg-white dark:bg-gray-800 text-primary shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Code className="w-3.5 h-3.5" />{t.tabEdit}
                </button>
                <button type="button" onClick={() => setFormMode('preview')}
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors ${formMode === 'preview' ? 'bg-white dark:bg-gray-800 text-primary shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Eye className="w-3.5 h-3.5" />{t.tabPreview}
                </button>
              </div>
            </div>

            {formMode === 'edit' ? (
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={10}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-y font-mono text-xs leading-relaxed" />
            ) : (
              <div className="w-full p-5 rounded-xl bg-surface dark:bg-surface-dark border border-gray-200 dark:border-gray-700 min-h-[240px] max-h-[400px] overflow-y-auto prose dark:prose-invert prose-sm max-w-none">
                {form.content ? (
                  <div dangerouslySetInnerHTML={{ __html: form.content }} />
                ) : (
                  <p className="text-gray-400 italic text-xs">暂无内容，请在左侧编辑器中输入 HTML 或使用常用模板填入。</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaTitleLabel}</label>
              <input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaDescLabel}</label>
              <input value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.publishedLabel}</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
              {editingPage ? t.updatePage : t.createPage}
            </button>
            <button type="button" onClick={() => { resetForm(); setShowForm(false); }}
              className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" id="pages-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">{t.thPage}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">{t.thSlug}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">{t.thStatus}</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3.5">{t.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">{t.loading}</td></tr>
              ) : pages.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">{t.noPages}</td></tr>
              ) : (
                pages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white block">{page.title}</span>
                          {page.meta_description && (
                            <span className="text-xs text-gray-400 line-clamp-1 mt-0.5">{page.meta_description}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-mono text-gray-500">/{page.slug}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${page.is_published ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'}`}>
                        {page.is_published ? t.published : t.draft}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer" title={t.viewPage}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleEdit(page)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(page.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
