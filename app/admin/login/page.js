'use client';

import { useState, useEffect } from 'react';
import { Droplets, Eye, EyeOff, Globe } from 'lucide-react';

const loginTranslations = {
  zh: {
    title: '管理后台登录',
    desc: '请输入管理员密码以继续',
    label: '管理员密码',
    placeholder: '请输入密码',
    submit: '登录',
    submitting: '正在登录...',
    defaultPass: '默认密码：dl0101',
    errorFailed: '密码错误，登录失败',
    errorNetwork: '网络错误',
  },
  en: {
    title: 'Admin Login',
    desc: 'Enter your password to continue',
    label: 'Admin Password',
    placeholder: 'Enter admin password',
    submit: 'Sign In',
    submitting: 'Signing in...',
    defaultPass: 'Default password: dl0101',
    errorFailed: 'Incorrect password, login failed',
    errorNetwork: 'Network error',
  }
};

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    const stored = localStorage.getItem('admin_lang') || 'zh';
    setLang(stored);
  }, []);

  const toggleLang = () => {
    const nextLang = lang === 'zh' ? 'en' : 'zh';
    setLang(nextLang);
    localStorage.setItem('admin_lang', nextLang);
  };

  const t = loginTranslations[lang] || loginTranslations.zh;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = '/admin';
      } else {
        setError(data.error ? (lang === 'zh' ? '密码验证错误' : data.error) : t.errorFailed);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Language Switcher in top corner */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-accent" />
          <span>{lang === 'zh' ? 'English' : '简体中文'}</span>
        </button>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-4 shadow-glow-lg">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">{lang === 'zh' ? '站点管理器后台' : 'SitesPro Admin'}</h1>
          <p className="text-gray-400 text-sm mt-1">{t.desc}</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5" id="admin-login-form">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-1.5">
              {t.label}
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            id="admin-login-submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-xl bg-hero-gradient text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? t.submitting : t.submit}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          {t.defaultPass}
        </p>
      </div>
    </div>
  );
}
