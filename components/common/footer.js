'use client';

import Link from 'next/link';
import { Droplets, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import siteSettings from "@/config/site-settings.json";

export default function Footer({ settings = {} }) {
  const currentYear = new Date().getFullYear();

  const siteName = settings.site_name || siteSettings.siteName || 'Squishy World';
  const domain = settings.site_url ? settings.site_url.replace(/^https?:\/\//, '').replace(/\/$/, '') : (siteSettings.domain || 'squishyshop.com');
  const contactEmail = settings.site_email || `info@${domain}`;

  const footerLinks = {
    products: [
      { name: 'All Products', href: '/products' },
      { name: 'Featured Squishies', href: '/products?category=Squishy+Toys' },
      { name: 'Nice Cube & Gel', href: '/products?category=Gel+Squishy' },
      { name: 'Dough Squishies', href: '/products?category=Dough+Squishy' },
    ],
    categories: [
      { name: 'NeeDoh Squishy', href: '/products?category=Squishy+Toys' },
      { name: 'Nice Cube Gel', href: '/products?category=Gel+Squishy' },
      { name: 'Cheese Squishies', href: '/products?category=Cheese+Squishy' },
      { name: 'Sensory Fidgets', href: '/products' },
      { name: 'Stress Relief Balls', href: '/products' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/page/privacy-policy' },
      { name: 'Terms of Service', href: '/page/terms-of-service' },
      { name: 'Shipping Policy', href: '/page/shipping-policy' },
    ],
  };

  return (
    <footer id="site-footer" className="bg-slate-900 text-gray-300 border-t border-slate-800">
      {/* Main footer */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              {settings.site_logo ? (
                <img
                  src={settings.site_logo}
                  alt={siteName}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold font-heading text-white tracking-tight">
                    {siteName}
                  </span>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {settings.meta_description || settings.site_tagline || "Discover high-quality sensory squishies, stress relief fidget toys, and novelty items designed for fun, focus, and relaxation."}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-gray-400 hover:text-accent" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-slate-950/60">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {currentYear} {siteName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-medium">
            {settings.site_tagline || "Sensory & Stress Relief Squishy Toys"}
          </p>
        </div>
      </div>
    </footer>
  );
}
