'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, Trash2, Edit, ArrowLeftRight, ToggleLeft, ToggleRight } from 'lucide-react';

const redirectTranslations = {
  zh: {
    title: '路由重定向',
    desc: '管理您网站域名的 URL 转发与重定向规则',
    close: '关闭',
    addRedirect: '新建重定向',
    editRedirect: '编辑重定向',
    newRedirect: '新建重定向规则',
    sourceLabel: '原始路径 (Source Path) *',
    sourcePlaceholder: '例如 /old-page',
    targetLabel: '目标链接 (Target URL) *',
    targetPlaceholder: '支持内部相对路径 /new-page 或完整网址 https://example.com',
    codeLabel: '重定向状态码 (Status Code)',
    code301: '301 - 永久重定向 (有利于 SEO)',
    code302: '302 - 临时重定向',
    activeLabel: '立即激活并启用规则',
    update: '保存修改',
    create: '创建规则',
    cancel: '取消',
    thSource: '原始路径',
    thTarget: '目标链接',
    thCode: '状态码',
    thStatus: '状态',
    thActions: '操作',
    loading: '正在加载重定向列表...',
    noRedirects: '暂无重定向规则数据',
    confirmDelete: '确定要删除此条重定向规则吗？',
    deleteFailed: '删除失败',
    saveFailed: '保存失败',
  },
  en: {
    title: 'URL Redirects',
    desc: 'Manage URL forwarding rules for your domain',
    close: 'Close',
    addRedirect: 'Add Redirect',
    editRedirect: 'Edit Redirect',
    newRedirect: 'New Redirect',
    sourceLabel: 'Source Path *',
    sourcePlaceholder: '/old-page',
    targetLabel: 'Target URL *',
    targetPlaceholder: '/new-page or https://example.com',
    codeLabel: 'Status Code',
    code301: '301 - Permanent Redirect',
    code302: '302 - Temporary Redirect',
    activeLabel: 'Active',
    update: 'Update',
    create: 'Create',
    cancel: 'Cancel',
    thSource: 'Source',
    thTarget: 'Target',
    thCode: 'Code',
    thStatus: 'Status',
    thActions: 'Actions',
    loading: 'Loading...',
    noRedirects: 'No redirects yet',
    confirmDelete: 'Delete this redirect?',
    deleteFailed: 'Failed',
    saveFailed: 'Failed',
  }
};

export default function AdminRedirectsPage() {
  const searchParams = useSearchParams();
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(searchParams.get('new') === '1');
  const [editingId, setEditingId] = useState(null);
  const [lang, setLang] = useState('zh');
  const [form, setForm] = useState({ source_path: '', target_url: '', status_code: 301, is_active: true });

  const fetchRedirects = async () => {
    try {
      const res = await fetch('/api/redirects');
      const data = await res.json();
      setRedirects(data.redirects || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);

    fetchRedirects();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = redirectTranslations[lang] || redirectTranslations.zh;

  const resetForm = () => {
    setForm({ source_path: '', target_url: '', status_code: 301, is_active: true });
    setEditingId(null);
  };

  const handleEdit = (r) => {
    setEditingId(r.id);
    setForm({ source_path: r.source_path, target_url: r.target_url, status_code: r.status_code, is_active: !!r.is_active });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, is_active: form.is_active ? 1 : 0 };
    try {
      const url = editingId ? `/api/redirects/${editingId}` : '/api/redirects';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { resetForm(); setShowForm(false); fetchRedirects(); }
      else { const d = await res.json(); alert(d.error || t.saveFailed); }
    } catch { alert('Network error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try { await fetch(`/api/redirects/${id}`, { method: 'DELETE' }); fetchRedirects(); }
    catch { alert(t.deleteFailed); }
  };

  const toggleActive = async (r) => {
    try {
      await fetch(`/api/redirects/${r.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: r.is_active ? 0 : 1 }),
      });
      fetchRedirects();
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />{showForm ? t.close : t.addRedirect}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5" id="redirect-form">
          <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
            {editingId ? t.editRedirect : t.newRedirect}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.sourceLabel}</label>
              <input value={form.source_path} onChange={e => setForm({ ...form, source_path: e.target.value })} required
                placeholder={t.sourcePlaceholder}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.targetLabel}</label>
              <input value={form.target_url} onChange={e => setForm({ ...form, target_url: e.target.value })} required
                placeholder={t.targetPlaceholder}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.codeLabel}</label>
              <select value={form.status_code} onChange={e => setForm({ ...form, status_code: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50">
                <option value={301}>{t.code301}</option>
                <option value={302}>{t.code302}</option>
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{t.activeLabel}</span>
          </label>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
              {editingId ? t.update : t.create}
            </button>
            <button type="button" onClick={() => { resetForm(); setShowForm(false); }}
              className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" id="redirects-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thSource}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thTarget}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thCode}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thStatus}</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">{t.loading}</td></tr>
              ) : redirects.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">{t.noRedirects}</td></tr>
              ) : (
                redirects.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ArrowLeftRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <code className="text-sm text-primary dark:text-accent font-mono">{r.source_path}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono truncate max-w-[200px]">{r.target_url}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300">
                        {r.status_code}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActive(r)} className="text-gray-400 hover:text-accent transition-colors cursor-pointer">
                        {r.is_active ? <ToggleRight className="w-6 h-6 text-green-500" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleEdit(r)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer">
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
