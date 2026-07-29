'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Droplets, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from './cart-context';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from "@/config/site-settings.json";

const defaultNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ settings = {} }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse custom navigation menu from settings
  let navigationItems = defaultNavigation;
  if (settings.navigation_menu) {
    try {
      const parsed = JSON.parse(settings.navigation_menu);
      if (Array.isArray(parsed) && parsed.length > 0) {
        navigationItems = parsed;
      }
    } catch (_) {}
  }

  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 glass shadow-md shadow-slate-900/5 transition-all duration-300"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            {settings.site_logo ? (
              <img
                src={settings.site_logo}
                alt={settings.site_name || siteSettings.siteName || 'Logo'}
                className="h-10 md:h-12 w-auto object-contain"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-heading tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                  {settings.site_name || siteSettings.siteName || 'Squishy World'}
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.children && item.children.length > 0 && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href || '#'}
                  id={`nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold text-slate-800 dark:text-gray-100 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                >
                  {item.name}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown if admin added children */}
                {item.children && item.children.length > 0 && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in-down">
                    <div className="glass rounded-xl shadow-premium p-2 border border-white/20 dark:border-white/5 bg-white/95 dark:bg-gray-900/95">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 rounded-lg text-sm text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-accent/10 hover:text-accent dark:hover:text-accent font-medium transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Icon Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="navbar-cart-toggle"
              className="w-10 h-10 rounded-full relative flex items-center justify-center text-slate-800 hover:text-accent hover:bg-slate-100 dark:text-gray-200 dark:hover:text-accent dark:hover:bg-white/10 transition-all duration-200 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center leading-none shadow-md ring-2 ring-white dark:ring-gray-900 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/products"
              id="nav-shop-now"
              className="hidden sm:inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Shop Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-gray-900/95 animate-fade-in-down">
          <div className="container-custom py-4 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-accent/10 font-bold"
                >
                  {item.name}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm text-slate-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent font-medium"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 px-4">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full text-center text-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
