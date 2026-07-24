import Link from 'next/link';
import { Droplets, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import siteSettings from "@/config/site-settings.json";

export default function Footer({ settings = {} }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Refrigerator Water Filters', href: '/products?category=Refrigerator+Water+Filters' },
      { name: 'Refrigerator Air Filters', href: '/products?category=Refrigerator+Air+Filters' },
      { name: 'Ice Maker', href: '/products?category=Ice+Maker' },
      { name: 'All Products', href: '/products' },
    ],
    brands: [
      { name: 'Samsung Filters', href: '/products?brand=Samsung' },
      { name: 'GE Filters', href: '/products?brand=GE' },
      { name: 'LG Filters', href: '/products?brand=LG' },
      { name: 'Whirlpool Filters', href: '/products?brand=Whirlpool' },
      { name: 'Maytag Filters', href: '/products?brand=Maytag' },
      { name: 'Frigidaire Filters', href: '/products?brand=Frigidaire' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/page/privacy-policy' },
      { name: 'Terms of Service', href: '/page/terms-of-service' },
      { name: 'Shipping Policy', href: '/page/shipping-policy' },
    ],
  };

  const contactEmail = settings.site_email || `info@${siteSettings.domain || 'filterspro.com'}`;

  return (
    <footer id="site-footer" className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              {settings.site_logo ? (
                <img
                  src={settings.site_logo}
                  alt={settings.site_name || 'Logo'}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold font-heading text-white tracking-tight">
                    {settings.site_name || 'FiltersPro'}
                  </span>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium refrigerator water filter replacements for all major brands. 
              NSF certified, easy installation, pure clean water for your family.
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

          {/* Brands */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Brands</h3>
            <ul className="space-y-2.5">
              {footerLinks.brands.map((link) => (
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
                <Mail className="w-4 h-4" />
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} {settings.site_name || 'FiltersPro'}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Premium Refrigerator Water Filter Replacements
          </p>
        </div>
      </div>
    </footer>
  );
}
