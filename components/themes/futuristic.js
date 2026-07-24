'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Terminal, Cpu, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';
import { formatPrice } from '@/lib/utils';

// Futuristic Dynamic Product Card
function TechProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  return (
    <div className="group relative bg-[#090b11]/80 backdrop-blur-md border border-[#1b2234] hover:border-accent p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <Link href={`/product/${product.slug}`} className="block relative z-10">
        <div className="aspect-square bg-black/50 border border-[#141b2b] rounded-xl mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-accent text-black text-xs font-mono font-bold tracking-widest animate-pulse">
              -{discount}%
            </div>
          )}
          <img
            src={product.image_url || 'https://placehold.co/600x600/EEE/999?text=No+Image'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 flex items-center gap-1.5 mb-1.5">
          <Cpu className="w-3.5 h-3.5" />
          {product.brand}
        </span>
        <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-mono font-bold text-white">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through font-mono">{formatPrice(product.compare_price)}</span>
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
    <div className="bg-[#030712] text-white min-h-screen relative overflow-hidden">
      {/* Dynamic tech nodes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber Hero */}
      <section className="relative pt-36 pb-24 border-b border-[#111827]">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent uppercase tracking-widest mb-6">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              SYSTEM.READY: PURITY_MODULE_v1.0
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-accent leading-tight mb-6">
              {siteDesc}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
              Advanced molecular carbon filtration matrix engineered to eliminate 99.9% of pollutants. Clean, crisp, tech-grade hydration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                DEPLOY FILTERS
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1f2937] hover:border-accent text-white font-mono hover:bg-white/5 transition-all duration-300 text-center"
              >
                CONTACT ENG
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-[#070b13] border-b border-[#111827]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">// PRODUCT_CATALOG</p>
              <h2 className="text-3xl font-heading font-extrabold text-white">Active Grid Items</h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-mono text-accent hover:underline mt-4 md:mt-0"
            >
              ACCESS ALL ARCHIVES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <TechProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specifications / Choose Us */}
      <section className="section-padding bg-[#030712] border-b border-[#111827]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">// TECHNICAL_ADVANTAGES</span>
            <h2 className="text-3xl font-heading font-extrabold text-white">Engineering Purity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'NSF Core Protocols',
                desc: 'Validated protocols confirm robust reduction of organic compounds, chemical additions, and microplastics.',
              },
              {
                title: 'Carbon Block Tech',
                desc: 'Ultra-compressed coconut carbon core provides deep absorption surface area for long filter life cycle.',
              },
              {
                title: 'Fast Lock-In',
                desc: 'Precision connection nodes provide leak-free alignment. Zero-point leakage guaranteed.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="p-8 rounded-2xl bg-[#080d1a] border border-[#18233a] hover:border-accent transition-all duration-300">
                <h3 className="text-xl font-mono font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-accent rounded" />
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-mono">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Terminal */}
      <section className="section-padding bg-[#070b13]">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">// USER_TRANSACTIONS</span>
            <h2 className="text-3xl font-heading font-extrabold text-white">Client Feedbacks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', text: 'Seamless compatibility with Samsung fridge. Solid build quality, water is perfectly crisp. Pricing is exceptionally low.' },
              { name: 'James K.', text: 'Easy twist install done in 30 seconds. Clean test results. Purity levels are premium.' },
              { name: 'Linda W.', text: 'Helpful technicians assisted in locating the exact match for my GE model. Reliable filter matrix.' },
            ].map(({ name, text }) => (
              <div key={name} className="p-6 rounded-xl bg-black/60 border border-[#1b2234] font-mono">
                <span className="text-accent text-xs block mb-3">&gt; FEEDBACK_RECEIVED</span>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">{name}</span>
                    <span className="text-[10px] text-gray-500 uppercase">VERIFIED</span>
                  </div>
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
    <div className="pt-28 pb-16 min-h-screen bg-[#030712] text-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase mb-8">
          <Link href="/" className="hover:text-accent transition-colors">ROOT</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-accent">
            {category || brand ? (category || `${brand}_filters`).toUpperCase() : 'ALL_PRODUCTS'}
          </span>
        </nav>

        {/* Page header */}
        <div className="border-b border-[#111827] pb-6 mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-extrabold text-white">
              {category || (brand ? `${brand} Filters` : 'Product Archives')}
            </h1>
            <p className="text-sm text-gray-400 font-mono mt-1">
              Active records: {total} items
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <select
              value={sort}
              className="px-3 py-2 bg-[#090b11] border border-[#1b2234] text-xs text-gray-300 font-mono focus:border-accent outline-none rounded-lg"
              onChange={handleSortChange}
            >
              <option value="sort_order">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="title">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest mb-4">
                  // CATEGORIES
                </h3>
                <div className="space-y-1.5 border-l border-[#1b2234] pl-4 font-mono">
                  <Link
                    href="/products"
                    className={`block text-sm transition-colors ${
                      !category ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ALL_CATEGORIES
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block text-sm transition-colors ${
                        category === cat ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat.toUpperCase().replace(/\s+/g, '_')}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-widest mb-4">
                  // BRANDS
                </h3>
                <div className="space-y-1.5 border-l border-[#1b2234] pl-4 font-mono">
                  <Link
                    href={category ? `/products?category=${encodeURIComponent(category)}` : '/products'}
                    className={`block text-sm transition-colors ${
                      !brand ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ALL_BRANDS
                  </Link>
                  {brands.map(b => (
                    <Link
                      key={b}
                      href={`/products?brand=${encodeURIComponent(b)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
                      className={`block text-sm transition-colors ${
                        brand === b ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {b.toUpperCase()}
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
                <TechProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <div className="text-center py-20 border border-[#1b2234] bg-black/20 rounded-2xl">
                <Grid3X3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-mono font-bold text-white mb-2">ARCHIVE_EMPTY</h3>
                <p className="text-sm text-gray-500 mb-6 font-mono">Filter arguments returned 0 values.</p>
                <Link href="/products" className="px-6 py-2.5 bg-accent text-black font-mono font-bold rounded-lg text-xs uppercase">RESTORE SEARCH</Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16 font-mono">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}${brand ? `&brand=${brand}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}${sort ? `&sort=${sort}` : ''}`}
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      page === i + 1
                        ? 'bg-accent text-black border-accent'
                        : 'bg-[#090b11] text-gray-400 border-[#1b2234] hover:border-accent hover:text-white'
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
    <div className="pt-28 pb-16 min-h-screen bg-[#030712] text-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase mb-8">
          <Link href="/" className="hover:text-accent transition-colors">ROOT</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/products" className="hover:text-accent transition-colors">PRODUCTS</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-accent line-clamp-1">{product.title.toUpperCase().replace(/\s+/g, '_')}</span>
        </nav>

        {/* Product detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-black/50 border border-[#1b2234] rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-12 relative">
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-accent text-black text-xs font-mono font-bold tracking-widest animate-pulse">
                  -{discount}% OFF
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
                    className={`aspect-square bg-black/40 border rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3 transition-colors ${
                      activeImage === img ? 'border-accent' : 'border-[#1b2234] hover:border-accent'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="font-mono">
            <span className="text-xs uppercase tracking-widest font-bold text-accent">// {product.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6 border-b border-[#111827] pb-4">
              <span className="text-sm font-bold text-accent">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 uppercase">SYS_RATING_INDEX</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#111827]">
              <span className="text-3xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.compare_price)}</span>
                  <span className="px-2 py-0.5 bg-accent/20 border border-accent text-accent text-xs rounded">
                    SYS_SAVE: {formatPrice(product.compare_price - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 text-sm">
              {product.description}
            </p>

            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs text-accent uppercase tracking-widest mb-4">// NODE_FEATURES</h3>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-b border-[#111827] py-6">
              {[
                { icon: Shield, label: 'NSF Protocol' },
                { icon: Truck, label: 'Free Delivery' },
                { icon: Package, label: '30D Guarantee' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Actions block */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Select Quantity:</span>
                <div className="flex items-center border border-[#1b2234] rounded-xl p-1 bg-[#090b11]">
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="p-1 hover:bg-[#111827] rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(prev => prev + 1)}
                    className="p-1 hover:bg-[#111827] rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, qty)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-accent/30 text-accent font-bold text-xs uppercase tracking-widest hover:bg-accent/10 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-accent text-black text-center font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  SECURE BUY NOW
                </button>
              </div>

              <div className="text-center font-mono">
                <Link
                  href="/contact"
                  className="inline-block text-[10px] text-gray-500 hover:text-accent uppercase tracking-wider transition-colors"
                >
                  // REQUEST_PRE_PURCHASE_SUPPORT
                </Link>
              </div>
            </div>

            {product.sku && (
              <p className="text-xs text-gray-500 mt-4">MATRIX_SKU: {product.sku}</p>
            )}
          </div>
        </div>

        {/* Compatible Models */}
        {compatibleModels.length > 0 && (
          <div className="mt-16 p-8 border border-[#1b2234] bg-[#070b13] rounded-2xl font-mono">
            <h2 className="text-lg font-heading font-extrabold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3 bg-accent rounded" />
              COMPATIBILITY_TABLE
            </h2>
            <div className="flex flex-wrap gap-2">
              {compatibleModels.map((model, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-black/40 text-gray-400 text-xs border border-[#1b2234] rounded"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product content */}
        {product.content && (
          <div className="mt-16 p-8 border border-[#1b2234] bg-[#070b13] rounded-2xl">
            <div
              className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-a:text-accent font-mono"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-heading font-extrabold text-white mb-8 uppercase tracking-wider font-mono">
              // RELATED_ARRAYS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <TechProductCard key={p.id} product={p} />
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
    <div className="pt-28 pb-16 min-h-screen bg-[#030712] text-white">
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase mb-8">
          <Link href="/" className="hover:text-accent transition-colors">ROOT</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-accent">{page.title.toUpperCase().replace(/\s+/g, '_')}</span>
        </nav>

        {/* Content */}
        <div className="p-8 md:p-12 border border-[#1b2234] bg-[#070b13] rounded-2xl">
          <div
            className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-a:text-accent font-mono"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
}
