'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Moon, Sun, Droplets, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from './cart-context';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from "@/config/site-settings.json";

const defaultNavigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Refrigerator Water Filters', href: '/products?category=Refrigerator+Water+Filters' },
      { name: 'Refrigerator Air Filters', href: '/products?category=Refrigerator+Air+Filters' },
      { name: 'Ice Maker', href: '/products?category=Ice+Maker' },
    ],
  },
  {
    name: 'Brands',
    href: '/products',
    children: [
      { name: 'Samsung', href: '/products?brand=Samsung' },
      { name: 'GE', href: '/products?brand=GE' },
      { name: 'LG', href: '/products?brand=LG' },
      { name: 'Whirlpool', href: '/products?brand=Whirlpool' },
      { name: 'Maytag', href: '/products?brand=Maytag' },
      { name: 'Frigidaire', href: '/products?brand=Frigidaire' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ settings = {} }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();

  const pathname = usePathname();
  const theme = settings.site_theme || settings.theme || 'default';
  const archetype = getThemeArchetype(theme);
  const isLightTheme = archetype === 'minimalist';
  const showScrolledStyle = isScrolled || pathname !== '/' || isLightTheme;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Check dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyle
          ? 'glass shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
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
                <span className={`text-xl font-bold font-heading tracking-tight transition-colors duration-300 ${
                  showScrolledStyle ? 'text-primary dark:text-accent-400' : 'text-white'
                }`}>
                  {settings.site_name || siteSettings.siteName || 'FiltersPro'}
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
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href || '#'}
                  id={`nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    showScrolledStyle
                      ? 'text-gray-700 hover:text-primary hover:bg-primary-50 dark:text-gray-300 dark:hover:text-accent dark:hover:bg-accent/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in-down">
                    <div className="glass rounded-xl shadow-premium p-2 border border-white/20 dark:border-white/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-accent/10 hover:text-primary dark:hover:text-accent transition-colors"
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
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              id="dark-mode-toggle"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${
                showScrolledStyle
                  ? 'text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:text-accent dark:hover:bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart Icon Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="navbar-cart-toggle"
              className={`w-10 h-10 rounded-full relative flex items-center justify-center transition-all duration-300 active:scale-95 ${
                showScrolledStyle
                  ? 'text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:text-accent dark:hover:bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
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
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                showScrolledStyle
                  ? 'text-gray-600 hover:text-primary dark:text-gray-400'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-fade-in-down">
          <div className="container-custom py-4 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-accent/10 font-medium"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent"
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
