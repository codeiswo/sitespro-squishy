'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plus, Search, Trash2, Edit, Eye, EyeOff, Package, CheckSquare } from 'lucide-react';

const productsTranslations = {
  zh: {
    title: '商品管理',
    close: '关闭',
    addProduct: '添加商品',
    editProduct: '编辑商品',
    newProduct: '新建商品',
    titleLabel: '商品名称 *',
    slugLabel: '自定义路径 (Slug)',
    slugPlaceholder: '不填则根据名称自动生成',
    brandLabel: '品牌',
    categoryLabel: '分类',
    priceLabel: '销售价格 ($)',
    comparePriceLabel: '对比价格/原价 ($)',
    skuLabel: '商品货号 (SKU)',
    imageUrlLabel: '图片 URL',
    descLabel: '商品简述 (一句话介绍)',
    contentLabel: '详细介绍 (支持 HTML 内容)',
    featuresLabel: '核心卖点 (英文逗号分隔)',
    featuresPlaceholder: '如 NSF Certified, 6-Month Life',
    modelsLabel: '兼容型号 (英文逗号分隔)',
    metaTitleLabel: 'SEO 标题 (Meta Title)',
    metaDescLabel: 'SEO 描述 (Meta Description)',
    featuredLabel: '推荐商品 (首页展示)',
    activeLabel: '立即上架销售',
    updateProduct: '更新商品',
    createProduct: '创建商品',
    cancel: '取消',
    searchPlaceholder: '搜索商品名称或品牌...',
    thProduct: '商品',
    thBrand: '品牌',
    thPrice: '价格',
    thStatus: '状态',
    thActions: '操作',
    loading: '正在加载商品列表...',
    noProducts: '暂无商品数据',
    active: '已上架',
    inactive: '已下架',
    confirmDelete: '确定要删除此商品吗？该操作不可撤销！',
    deleteFailed: '删除失败',
    saveFailed: '保存失败，请检查数据完整性',
    confirmBatchDelete: '确定要批量删除所选商品吗？该操作不可撤销！',
    batchPublish: '批量上架',
    batchUnpublish: '批量下架',
    batchSetFeatured: '设为首页推荐',
    batchRemoveFeatured: '取消首页推荐',
    selectedCount: '已选择 {count} 个商品',
    batchDelete: '批量删除',
  },
  en: {
    title: 'Products',
    close: 'Close',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    newProduct: 'New Product',
    titleLabel: 'Title *',
    slugLabel: 'Slug',
    slugPlaceholder: 'auto-generated',
    brandLabel: 'Brand',
    categoryLabel: 'Category',
    priceLabel: 'Price ($)',
    comparePriceLabel: 'Compare Price ($)',
    skuLabel: 'SKU',
    imageUrlLabel: 'Image URL',
    descLabel: 'Description',
    contentLabel: 'Content (HTML)',
    featuresLabel: 'Features (comma separated)',
    featuresPlaceholder: 'NSF Certified, 6-Month Life, Easy Install',
    modelsLabel: 'Compatible Models (comma separated)',
    metaTitleLabel: 'Meta Title',
    metaDescLabel: 'Meta Description',
    featuredLabel: 'Featured',
    activeLabel: 'Active',
    updateProduct: 'Update Product',
    createProduct: 'Create Product',
    cancel: 'Cancel',
    searchPlaceholder: 'Search products...',
    thProduct: 'Product',
    thBrand: 'Brand',
    thPrice: 'Price',
    thStatus: 'Status',
    thActions: 'Actions',
    loading: 'Loading products...',
    noProducts: 'No products found',
    active: 'Active',
    inactive: 'Inactive',
    confirmDelete: 'Delete this product?',
    deleteFailed: 'Failed to delete',
    saveFailed: 'Failed to save',
    confirmBatchDelete: 'Are you sure you want to delete selected products?',
    batchPublish: 'Batch Publish',
    batchUnpublish: 'Batch Unpublish',
    batchSetFeatured: 'Set Featured',
    batchRemoveFeatured: 'Remove Featured',
    selectedCount: 'Selected {count} products',
    batchDelete: 'Delete',
  }
};

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(searchParams.get('new') === '1');
  const [editingProduct, setEditingProduct] = useState(null);
  const [lang, setLang] = useState('zh');
  const [form, setForm] = useState({
    title: '', slug: '', description: '', content: '', price: '', compare_price: '',
    category: 'Refrigerator Water Filters', brand: '', sku: '', image_url: '',
    features: '', compatible_models: '', meta_title: '', meta_description: '',
    is_featured: false, is_active: true,
  });

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?all=1');
      const data = await res.json();
      setProducts(data.products || []);
      setSelectedProductIds([]);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleSelectProduct = (id) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllProducts = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const handleBatchStatusProducts = async (isActive, isFeatured) => {
    if (selectedProductIds.length === 0) return;
    setLoading(true);
    try {
      const bodyPayload = { ids: selectedProductIds };
      if (isActive !== undefined) bodyPayload.is_active = isActive;
      if (isFeatured !== undefined) bodyPayload.is_featured = isFeatured;

      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      if (!res.ok) throw new Error('Failed to update products status');
      setSelectedProductIds([]);
      await fetchProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchDeleteProducts = async () => {
    if (selectedProductIds.length === 0) return;
    if (!confirm(t.confirmBatchDelete)) return;
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedProductIds })
      });
      if (!res.ok) throw new Error('Failed to delete products');
      setSelectedProductIds([]);
      await fetchProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);
    
    fetchProducts();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = productsTranslations[lang] || productsTranslations.zh;

  const resetForm = () => {
    setForm({
      title: '', slug: '', description: '', content: '', price: '', compare_price: '',
      category: 'Refrigerator Water Filters', brand: '', sku: '', image_url: '',
      features: '', compatible_models: '', meta_title: '', meta_description: '',
      is_featured: false, is_active: true,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setForm({
      title: product.title || '',
      slug: product.slug || '',
      description: product.description || '',
      content: product.content || '',
      price: product.price?.toString() || '',
      compare_price: product.compare_price?.toString() || '',
      category: product.category || 'Refrigerator Water Filters',
      brand: product.brand || '',
      sku: product.sku || '',
      image_url: product.image_url || '',
      features: (typeof product.features === 'string' ? JSON.parse(product.features || '[]') : product.features || []).join(', '),
      compatible_models: (typeof product.compatible_models === 'string' ? JSON.parse(product.compatible_models || '[]') : product.compatible_models || []).join(', '),
      meta_title: product.meta_title || '',
      meta_description: product.meta_description || '',
      is_featured: !!product.is_featured,
      is_active: product.is_active !== 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price) || 0,
      compare_price: parseFloat(form.compare_price) || null,
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      compatible_models: form.compatible_models.split(',').map(s => s.trim()).filter(Boolean),
      is_featured: form.is_featured ? 1 : 0,
      is_active: form.is_active ? 1 : 0,
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (res.ok) {
        resetForm();
        setShowForm(false);
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.error || t.saveFailed);
      }
    } catch { alert('Network error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch { alert(t.deleteFailed); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{t.title}</h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {showForm ? t.close : t.addProduct}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-5" id="product-form">
          <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white">
            {editingProduct ? t.editProduct : t.newProduct}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.titleLabel}</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.slugLabel}</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder={t.slugPlaceholder}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.brandLabel}</label>
              <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.categoryLabel}</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50">
                <option>Refrigerator Water Filters</option>
                <option>Refrigerator Air Filters</option>
                <option>Ice Maker</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.priceLabel}</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.comparePriceLabel}</label>
              <input type="number" step="0.01" value={form.compare_price} onChange={e => setForm({ ...form, compare_price: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.skuLabel}</label>
              <input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.imageUrlLabel}</label>
              <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.descLabel}</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.contentLabel}</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50 resize-none font-mono text-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.featuresLabel}</label>
              <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={t.featuresPlaceholder}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.modelsLabel}</label>
              <input value={form.compatible_models} onChange={e => setForm({ ...form, compatible_models: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaTitleLabel}</label>
              <input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.metaDescLabel}</label>
              <input value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{t.featuredLabel}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{t.activeLabel}</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer">
              {editingProduct ? t.updateProduct : t.createProduct}
            </button>
            <button type="button" onClick={() => { resetForm(); setShowForm(false); }}
              className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              {t.cancel}
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent/50"
        />
      </div>
      {/* Batch Actions Bar */}
      {selectedProductIds.length > 0 && (
        <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-2xl px-4 py-3 text-xs text-gray-900 dark:text-white animate-fade-in">
          <span className="font-semibold text-primary flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            {t.selectedCount.replace('{count}', selectedProductIds.length)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleBatchStatusProducts(true, undefined)}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {t.batchPublish}
            </button>
            <button
              type="button"
              onClick={() => handleBatchStatusProducts(false, undefined)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {t.batchUnpublish}
            </button>
            <button
              type="button"
              onClick={() => handleBatchStatusProducts(undefined, true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {t.batchSetFeatured}
            </button>
            <button
              type="button"
              onClick={() => handleBatchStatusProducts(undefined, false)}
              className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {t.batchRemoveFeatured}
            </button>
            <button
              type="button"
              onClick={handleBatchDeleteProducts}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.batchDelete}</span>
            </button>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" id="products-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850/50">
                <th className="text-center w-[45px] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={filteredProducts.length > 0 && selectedProductIds.length === filteredProducts.length}
                    onChange={handleSelectAllProducts}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                  />
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thProduct}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thBrand}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thPrice}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thStatus}</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t.loading}</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t.noProducts}</td></tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="text-center px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.image_url ? (
                            <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{product.title}</span>
                          {product.is_featured === 1 && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[9px] font-bold shrink-0 uppercase tracking-wide">
                              {lang === 'zh' ? '推荐' : 'Featured'}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{product.brand}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">${product.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${product.is_active ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {product.is_active ? t.active : t.inactive}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleEdit(product)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer">
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
