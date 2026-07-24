'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';
import Hero from '@/components/common/hero';
import BrandWall from '@/components/common/brand-wall';
import ProductCard from '@/components/common/product-card';
import { formatPrice } from '@/lib/utils';

// Helper to render minimal product cards since standard ProductCard has shadows
function MinimalProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  return (
    <div className="group bg-white border border-gray-200 dark:border-gray-800 p-6 rounded-lg transition-all duration-300 hover:border-gray-900 dark:hover:border-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-50 dark:bg-gray-950 rounded mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider">
              -{discount}%
            </div>
          )}
          <img
            src={product.image_url || 'https://placehold.co/600x600/EEE/999?text=No+Image'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{product.brand}</span>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}

// ============================================
// 1. HOMEPAGE
// ============================================
export function Homepage({ settings, featuredProducts }) {
  const siteTitle = settings.site_name || 'edr1rxd1filter';
  const siteDesc = settings.site_tagline || 'Premium Refrigerator Water Filter Replacements';

  return (
    <div className="bg-[#FAF9F6] text-gray-900 dark:bg-[#121212] dark:text-gray-100 min-h-screen">
      {/* Minimal Hero */}
      <section className="pt-32 pb-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4 block">
              Pure. Simple. Clean.
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal text-gray-900 dark:text-white leading-tight mb-6">
              {siteDesc}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
              High-performance replacement filters designed to give your family crisp, certified drinking water. No gimmicks, just purity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                Browse Collection
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Our Store</span>
              <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
                Featured Replacements
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mt-4 md:mt-0"
            >
              Shop All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <MinimalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-surface dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Standards</span>
            <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
              Why {siteTitle}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Certified Safety',
                desc: 'Tested and verified under NSF 42 & 53 standards. Guaranteed to filter harmful contaminants.',
              },
              {
                icon: RefreshCw,
                title: 'Twist & Lock Easy Install',
                desc: 'Designed for a seamless fit. Replace your refrigerator filter in seconds without any tools.',
              },
              {
                icon: HeartHandshake,
                title: 'Satisfaction Guaranteed',
                desc: 'Try our filters risk-free. 30-day money back guarantee if you are not fully satisfied.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-left border-l-2 border-gray-200 dark:border-gray-800 pl-6">
                <Icon className="w-6 h-6 text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Reviews</span>
            <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
              Tested & Approved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                location: 'Texas',
                text: 'Clean taste, half the price. Fits my Samsung perfectly with zero leaks. Shipping was incredibly fast.',
              },
              {
                name: 'James K.',
                location: 'California',
                text: 'Extremely simple to swap. NSF validation gives me peace of mind for my children\'s water.',
              },
              {
                name: 'Linda W.',
                location: 'Florida',
                text: 'Excellent support. They helped me find the exact match for my refrigerator. Will purchase again.',
              },
            ].map(({ name, location, text }) => (
              <div key={name} className="border border-gray-200 dark:border-gray-800 p-8 rounded-lg flex flex-col justify-between">
                <p className="text-sm italic text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  &ldquo;{text}&rdquo;
                </p>
                <div>
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">{name}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// 2. PRODUCT LIST
// ============================================
export function ProductList({ category, brand, sort, products, total, page, totalPages, categories, brands, handleSortChange }) {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold">
            {category || brand ? (category || `${brand} Filters`) : 'Catalog'}
          </span>
        </nav>

        {/* Page header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
              {category || (brand ? `${brand} Water Filters` : 'Browse Collection')}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Showing {products.length} of {total} items
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sort}
              className="px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:border-black dark:focus:border-white outline-none transition-all uppercase tracking-wider font-semibold"
              onChange={handleSortChange}
            >
              <option value="sort_order" className="dark:bg-black">Featured</option>
              <option value="price_asc" className="dark:bg-black">Price: Low to High</option>
              <option value="price_desc" className="dark:bg-black">Price: High to Low</option>
              <option value="newest" className="dark:bg-black">Newest</option>
              <option value="title" className="dark:bg-black">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <div className="space-y-1.5 border-l border-gray-200 dark:border-gray-800 pl-4">
                  <Link
                    href="/products"
                    className={`block text-sm transition-colors ${
                      !category ? 'text-black dark:text-white font-bold' : 'text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block text-sm transition-colors ${
                        category === cat ? 'text-black dark:text-white font-bold' : 'text-gray-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Brands
                </h3>
                <div className="space-y-1.5 border-l border-gray-200 dark:border-gray-800 pl-4">
                  <Link
                    href={category ? `/products?category=${encodeURIComponent(category)}` : '/products'}
                    className={`block text-sm transition-colors ${
                      !brand ? 'text-black dark:text-white font-bold' : 'text-gray-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    All Brands
                  </Link>
                  {brands.map(b => (
                    <Link
                      key={b}
                      href={`/products?brand=${encodeURIComponent(b)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
                      className={`block text-sm transition-colors ${
                        brand === b ? 'text-black dark:text-white font-bold' : 'text-gray-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <MinimalProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800">
                <Grid3X3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <Link href="/products" className="px-6 py-2.5 border border-black dark:border-white text-sm uppercase tracking-wider font-bold">Clear Filters</Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-1.5 mt-16">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}${brand ? `&brand=${brand}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}${sort ? `&sort=${sort}` : ''}`}
                    className={`w-9 h-9 border flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-all ${
                      page === i + 1
                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                        : 'bg-transparent text-gray-500 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. PRODUCT DETAIL
// ============================================
export function ProductDetail({ product, allImages, discount, features, compatibleModels, relatedProducts }) {
  const [activeImage, setActiveImage] = useState(product.image_url || allImages[0] || '');
  const [qty, setQty] = useState(1);
  const { addToCart, setCheckoutStep, setIsCartOpen } = useCart();

  const handleBuyNow = () => {
    addToCart(product, qty);
    setCheckoutStep('checkout');
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold line-clamp-1">{product.title}</span>
        </nav>

        {/* Product detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 flex items-center justify-center p-12 relative">
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider">
                  Save {discount}%
                </div>
              )}
              <img
                src={activeImage || 'https://placehold.co/600x600/EEE/999?text=No+Image'}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square bg-white dark:bg-gray-950 border transition-all overflow-hidden cursor-pointer flex items-center justify-center p-3 ${
                      activeImage === img ? 'border-black dark:border-white' : 'border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{product.brand}</span>
            <h1 className="text-3xl font-heading font-normal text-gray-900 dark:text-white mt-1 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-900 pb-4">
              <span className="text-sm font-bold">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gray-900 dark:fill-white text-gray-900 dark:text-white" />
                ))}
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">127 reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-900">
              <span className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
                  <span className="px-2 py-0.5 border border-red-500 text-red-500 text-xs font-semibold uppercase tracking-wider">
                    Save {formatPrice(product.compare_price - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Features</h3>
                <div className="space-y-2.5">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-b border-gray-200 dark:border-gray-800 py-6">
              {[
                { icon: Shield, label: 'NSF Certified' },
                { icon: Truck, label: 'Free Shipping' },
                { icon: Package, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Actions block */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center border border-gray-200 dark:border-gray-800 p-1 bg-white dark:bg-black">
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-950 dark:text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(prev => prev + 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, qty)}
                  className="flex items-center justify-center gap-2 w-full py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black text-center font-bold text-xs uppercase tracking-widest py-4 border-2 border-gray-900 dark:border-white hover:bg-transparent hover:text-gray-900 dark:hover:text-white transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-block text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors"
                >
                  Need help? Contact support
                </Link>
              </div>
            </div>

            {product.sku && (
              <p className="text-xs text-gray-400 mt-4 font-mono">SKU: {product.sku}</p>
            )}
          </div>
        </div>

        {/* Compatible Models */}
        {compatibleModels.length > 0 && (
          <div className="mt-16 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <h2 className="text-xl font-heading font-normal text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
              Compatible Models
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {compatibleModels.map((model, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 text-xs font-semibold border border-gray-200 dark:border-gray-800"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product content */}
        {product.content && (
          <div className="mt-16 p-8 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
            <div
              className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-normal prose-a:underline"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-heading font-normal text-gray-900 dark:text-white mb-8 uppercase tracking-wider">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <MinimalProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// 4. SINGLE PAGE (CMS)
// ============================================
export function SinglePage({ page }) {
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold">{page.title}</span>
        </nav>

        {/* Content */}
        <div className="p-8 md:p-12 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
          <div
            className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-normal prose-a:underline"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
}
