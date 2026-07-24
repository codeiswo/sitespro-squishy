'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ShoppingBag, Eye, DollarSign, Calendar, Mail, User, MapPin } from 'lucide-react';

const ordersTranslations = {
  zh: {
    title: '订单管理',
    subtitle: '查看并追踪买家通过 PayPal 和信用卡支付的订单',
    thOrderId: '订单编号 (PayPal ID)',
    thCustomer: '买家信息',
    thItems: '购买商品',
    thTotal: '实付总额',
    thDate: '下单时间',
    thActions: '详情',
    loading: '正在获取订单记录...',
    noOrders: '暂无订单数据',
    searchPlaceholder: '搜索买家姓名、邮箱或订单号...',
    detailTitle: '订单详情',
    close: '关闭',
    shippingInfo: '收件人及物流地址',
    recipient: '收件姓名',
    address: '详细地址',
    city: '城市/地区',
    state: '省份/州',
    postalCode: '邮政编码',
    country: '国家代码',
    itemsPurchased: '商品清单',
    unitPrice: '单价',
    qty: '数量',
    amount: '金额'
  },
  en: {
    title: 'Orders',
    subtitle: 'View and track orders paid via PayPal and credit cards',
    thOrderId: 'Order ID (PayPal ID)',
    thCustomer: 'Customer',
    thItems: 'Items Purchased',
    thTotal: 'Total Paid',
    thDate: 'Date Placed',
    thActions: 'View',
    loading: 'Loading order logs...',
    noOrders: 'No orders logged yet',
    searchPlaceholder: 'Search customer, email or order ID...',
    detailTitle: 'Order Details',
    close: 'Close',
    shippingInfo: 'Shipping Address',
    recipient: 'Recipient Name',
    address: 'Address Line',
    city: 'City',
    state: 'State/Region',
    postalCode: 'Postal Code',
    country: 'Country Code',
    itemsPurchased: 'Items Purchased',
    unitPrice: 'Unit Price',
    qty: 'Qty',
    amount: 'Amount'
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('zh');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLang(localStorage.getItem('admin_lang') || 'zh');
    const handleLangChange = () => {
      setLang(localStorage.getItem('admin_lang') || 'zh');
    };
    window.addEventListener('admin_lang_changed', handleLangChange);
    
    fetchOrders();

    return () => window.removeEventListener('admin_lang_changed', handleLangChange);
  }, []);

  const t = ordersTranslations[lang] || ordersTranslations.zh;

  // Filter orders by search terms
  const filteredOrders = orders.filter(order => {
    const term = search.toLowerCase();
    const addressStr = typeof order.shipping_address === 'string' ? order.shipping_address : JSON.stringify(order.shipping_address || {});
    return (
      order.order_id?.toLowerCase().includes(term) ||
      order.customer_name?.toLowerCase().includes(term) ||
      order.customer_email?.toLowerCase().includes(term) ||
      addressStr.toLowerCase().includes(term)
    );
  });

  const getParsedItems = (itemsJson) => {
    try {
      if (typeof itemsJson === 'string') {
        return JSON.parse(itemsJson);
      }
      return itemsJson || [];
    } catch (_) {
      return [];
    }
  };

  const getParsedAddress = (addressJson) => {
    try {
      if (typeof addressJson === 'string') {
        return JSON.parse(addressJson);
      }
      return addressJson || {};
    } catch (_) {
      return {};
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-accent" />
          <span>{t.title}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
      </div>

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

      {/* Orders list table */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" id="orders-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thOrderId}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thCustomer}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thItems}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thTotal}</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thDate}</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{t.thActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t.loading}</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t.noOrders}</td></tr>
              ) : (
                filteredOrders.map(order => {
                  const items = getParsedItems(order.items);
                  const displayItemSummary = items.map(item => `${item.title} (x${item.quantity})`).join(', ');

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-gray-900 dark:text-white max-w-[150px] truncate" title={order.order_id}>
                        {order.order_id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 dark:text-white">{order.customer_name}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {order.customer_email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate" title={displayItemSummary}>
                        {displayItemSummary}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-bold text-base">
                        ${order.total_amount?.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs font-mono">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.thActions}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer/Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          
          {/* Content */}
          <div className="relative w-full max-w-lg h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-150 dark:border-gray-800 flex flex-col z-10 animate-slide-in-right">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">{t.detailTitle}</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {selectedOrder.order_id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              >
                {t.close}
              </button>
            </div>

            {/* Detail Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Customer Profile */}
              <div className="bg-gray-50 dark:bg-gray-850 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>买家概览</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">姓名:</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{selectedOrder.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">邮箱:</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{selectedOrder.customer_email}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {(() => {
                const addr = getParsedAddress(selectedOrder.shipping_address);
                return (
                  <div className="bg-gray-50 dark:bg-gray-850 p-4 rounded-2xl space-y-3">
                    <h3 className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{t.shippingInfo}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="col-span-2">
                        <span className="text-gray-400 block">{t.recipient}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{addr.recipient_name || selectedOrder.customer_name}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400 block">{t.address}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {addr.line1} {addr.line2 && `, ${addr.line2}`}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">{t.city}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{addr.city}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">{t.state}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{addr.state}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">{t.postalCode}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white font-mono">{addr.postal_code}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">{t.country}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white font-bold">{addr.country_code}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Items Purchased List */}
              <div className="space-y-3">
                <h3 className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                  <span>{t.itemsPurchased}</span>
                </h3>
                <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                  {getParsedItems(selectedOrder.items).map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-900 dark:text-white block truncate">{item.title}</span>
                        {item.sku && <span className="text-[10px] text-gray-400 font-mono mt-0.5">SKU: {item.sku}</span>}
                      </div>
                      <div className="flex items-center gap-6 shrink-0 font-semibold">
                        <span className="text-gray-400">x{item.quantity}</span>
                        <span className="text-gray-900 dark:text-white">${item.price?.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail Footer Summary */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850/50 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">实付总金额:</span>
              <span className="text-xl font-black text-primary dark:text-accent font-heading">
                ${selectedOrder.total_amount?.toFixed(2)} {selectedOrder.currency}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
