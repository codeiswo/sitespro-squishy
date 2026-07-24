'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';
import { formatPrice } from '@/lib/utils';

// Luxury Gold-Bordered Product Card
function LuxuryProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  return (
    <div className="group bg-[#0f0f11] border border-gold/10 hover:border-gold/50 p-6 rounded-none transition-all duration-700 hover:shadow-[0_10px_30px_rgba(212,168,75,0.08)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-black border border-gold/5 rounded-none mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#d4a84b] text-black text-xs font-heading font-bold uppercase tracking-wider">
              {discount}% OFF
            </div>
          )}
          <img
            src={product.image_url || 'https://placehold.co/600x600/EEE/999?text=No+Image'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#d4a84b]/80 font-heading block mb-1">{product.brand}</span>
        <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#d4a84b] transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-heading text-[#d4a84b]">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through font-heading">{formatPrice(product.compare_price)}</span>
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
    <div className="bg-[#070708] text-[#e5e5e7] min-h-screen">
      {/* Luxury Hero */}
      <section className="relative pt-36 pb-28 border-b border-gold/10 text-center flex items-center justify-center overflow-hidden">
        {/* Subtle dark gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,75,0.04)_0%,transparent_70%)]" />
        
        <div className="container-custom relative z-10 max-w-4xl mx-auto">
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gold/30" />
            <Star className="w-4 h-4 text-[#d4a84b] fill-gold" />
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6 tracking-wide">
            {siteDesc}
          </h1>
          
          <div className="w-24 h-[1px] bg-gold/50 mx-auto mb-8" />

          <p className="text-base sm:text-lg text-[#a1a1a5] max-w-2xl mx-auto mb-10 leading-relaxed font-heading italic">
            Experience the standard of pure hydration. Our elite replacement filters are designed to preserve original water freshness with certified precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/products"
              className="px-8 py-3.5 border border-[#d4a84b] text-black bg-[#d4a84b] hover:bg-transparent hover:text-[#d4a84b] font-heading font-bold tracking-widest text-xs uppercase transition-all duration-500 rounded-none shadow-[0_4px_20px_rgba(212,168,75,0.15)]"
            >
              DISCOVER COLLECTIONS
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-gold/30 hover:border-gold text-white font-heading font-bold tracking-widest text-xs uppercase transition-all duration-500 rounded-none"
            >
              OUR PROMISE
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-black border-b border-gold/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
              - Curation -
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Signature Water Filters
            </h2>
            <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <LuxuryProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#d4a84b] text-[#d4a84b] hover:bg-[#d4a84b] hover:text-black transition-all duration-500 uppercase tracking-widest font-heading text-xs font-bold"
            >
              VIEW FULL ARCHIVE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-[#070708] border-b border-gold/10">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Certified Authority',
                desc: 'Independently tested to satisfy NSF 42 & 53 protocols. Assured defense for clean water standards.',
              },
              {
                icon: RefreshCw,
                title: 'Seamless Adaptability',
                desc: 'Tailored fit guarantees leak-free integration with zero-point deviations. Fast lock-in, complete stability.',
              },
              {
                icon: HeartHandshake,
                title: 'Customer Guarantee',
                desc: 'Our customer care represents the gold standard. 30-day return cycle with immediate resolutions.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 border border-gold/5 bg-black/40">
                <div className="w-12 h-12 rounded-full border border-[#d4a84b] flex items-center justify-center mb-6 mx-auto bg-[#d4a84b]/5">
                  <Icon className="w-5 h-5 text-[#d4a84b]" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">{title}</h3>
                <p className="text-sm text-[#a1a1a5] font-heading leading-relaxed italic">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-black">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
              - Reviews -
            </p>
            <h2 className="text-3xl font-heading font-bold text-white">
              Endorsed by Families
            </h2>
            <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', location: 'Texas', text: 'Stunning quality and perfect fitment. The clean taste is outstanding. Incredibly elegant replacement choice.' },
              { name: 'James K.', location: 'California', text: 'Zero leaks. NSF certified blocks provide excellent filtration. Unrivaled water filter replacement service.' },
              { name: 'Linda W.', location: 'Florida', text: 'Elite support team assisted in choosing the precise compatibility match. Exceptionally professional.' },
            ].map(({ name, location, text }) => (
              <div key={name} className="p-8 border border-gold/10 bg-[#0f0f11] text-center">
                <div className="flex justify-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-[#d4a84b]" />
                  ))}
                </div>
                <p className="text-[#a1a1a5] font-heading text-sm leading-relaxed mb-6 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div>
                  <span className="block text-sm font-bold text-white">{name}</span>
                  <span className="text-xs text-[#d4a84b] uppercase tracking-widest">{location}</span>
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
    <div className="pt-28 pb-16 min-h-screen bg-[#070708] text-[#e5e5e7]">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-gold/60 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold/30" />
          <span className="text-white">
            {category || brand ? (category || `${brand} Filters`) : 'Collections'}
          </span>
        </nav>

        {/* Page header */}
        <div className="border-b border-gold/10 pb-6 mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white tracking-wider">
              {category || (brand ? `${brand} Filters` : 'Curated Collections')}
            </h1>
            <p className="text-sm text-gold/50 font-heading italic mt-1">
              Active lines: {total} items
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gold/50" />
            <select
              value={sort}
              className="px-3 py-2 bg-[#0f0f11] border border-gold/20 text-xs text-[#d4a84b] font-heading focus:border-[#d4a84b] outline-none"
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
                <h3 className="text-xs font-heading font-bold text-[#d4a84b] uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <div className="space-y-1.5 border-l border-gold/10 pl-4 font-heading text-sm">
                  <Link
                    href="/products"
                    className={`block transition-colors ${
                      !category ? 'text-[#d4a84b] font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ALL CATEGORIES
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block transition-colors ${
                        category === cat ? 'text-[#d4a84b] font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-xs font-heading font-bold text-[#d4a84b] uppercase tracking-widest mb-4">
                  Brands
                </h3>
                <div className="space-y-1.5 border-l border-gold/10 pl-4 font-heading text-sm">
                  <Link
                    href={category ? `/products?category=${encodeURIComponent(category)}` : '/products'}
                    className={`block transition-colors ${
                      !brand ? 'text-[#d4a84b] font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    ALL BRANDS
                  </Link>
                  {brands.map(b => (
                    <Link
                      key={b}
                      href={`/products?brand=${encodeURIComponent(b)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
                      className={`block transition-colors ${
                        brand === b ? 'text-[#d4a84b] font-bold' : 'text-gray-400 hover:text-white'
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
                <LuxuryProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <div className="text-center py-20 border border-gold/15 bg-black/30 rounded-none">
                <Grid3X3 className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-white mb-2">COLLECTION_EMPTY</h3>
                <p className="text-sm text-gold/50 mb-6 font-heading italic">Your filters returned 0 records.</p>
                <Link href="/products" className="px-6 py-2.5 border border-[#d4a84b] text-[#d4a84b] font-heading font-bold text-xs uppercase">RESET FILTERS</Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16 font-heading">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}${brand ? `&brand=${brand}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}${sort ? `&sort=${sort}` : ''}`}
                    className={`w-9 h-9 border flex items-center justify-center text-xs font-bold transition-all rounded-none ${
                      page === i + 1
                        ? 'bg-[#d4a84b] text-black border-[#d4a84b]'
                        : 'bg-[#0f0f11] text-gray-400 border-gold/10 hover:border-gold hover:text-white'
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
    <div className="pt-28 pb-16 min-h-screen bg-[#070708] text-[#e5e5e7]">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-gold/60 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold/30" />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold/30" />
          <span className="text-white line-clamp-1">{product.title.toUpperCase()}</span>
        </nav>

        {/* Product detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-black border border-gold/10 rounded-none overflow-hidden mb-4 flex items-center justify-center p-12 relative">
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4a84b] text-black text-xs font-heading font-bold uppercase tracking-wider">
                  {discount}% OFF
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
                    className={`aspect-square bg-[#0f0f11] border transition-colors rounded-none overflow-hidden cursor-pointer flex items-center justify-center p-3 ${
                      activeImage === img ? 'border-gold' : 'border-gold/10 hover:border-gold'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="font-heading">
            <span className="text-xs uppercase tracking-widest font-bold text-[#d4a84b]">- {product.brand} -</span>
            <h1 className="text-3xl font-heading font-bold text-white mt-2 mb-4 tracking-wide">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6 border-b border-gold/10 pb-4">
              <span className="text-sm font-bold text-[#d4a84b]">4.8</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-[#d4a84b]" />
                ))}
              </div>
              <span className="text-xs text-gold/50 uppercase tracking-widest">(127 REVIEWS)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gold/10">
              <span className="text-3xl text-[#d4a84b]">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.compare_price)}</span>
                  <span className="px-2.5 py-0.5 border border-[#d4a84b] text-[#d4a84b] text-xs">
                    PREMIUM VALUE
                  </span>
                </>
              )}
            </div>

            <p className="text-[#a1a1a5] leading-relaxed mb-8 text-sm italic">
              {product.description}
            </p>

            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs text-[#d4a84b] uppercase tracking-widest mb-4">Product Characteristics</h3>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#e5e5e7]">
                      <CheckCircle2 className="w-4 h-4 text-[#d4a84b] mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-b border-gold/10 py-6">
              {[
                { icon: Shield, label: 'NSF Certified' },
                { icon: Truck, label: 'Free Logistics' },
                { icon: Package, label: 'Secure Guarantee' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-gold/60" />
                  <span className="text-xs font-semibold text-gold/80 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Actions block */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gold/80 uppercase tracking-widest">Select Quantity:</span>
                <div className="flex items-center border border-gold/20 p-1 bg-black">
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="p-1 hover:bg-[#1a1a1f] text-gold/60 hover:text-gold transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(prev => prev + 1)}
                    className="p-1 hover:bg-[#1a1a1f] text-gold/60 hover:text-gold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-heading">
                <button
                  type="button"
                  onClick={() => addToCart(product, qty)}
                  className="flex items-center justify-center gap-2 w-full py-4 border border-[#d4a84b] text-[#d4a84b] font-bold text-xs tracking-widest uppercase hover:bg-[#d4a84b]/10 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#d4a84b] text-black text-center font-bold text-xs tracking-widest uppercase py-4 border border-[#d4a84b] hover:bg-[#d4a84b]/90 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(212,168,75,0.15)]"
                >
                  ACQUIRE NOW
                </button>
              </div>

              <div className="text-center font-heading">
                <Link
                  href="/contact"
                  className="inline-block text-[10px] text-gold/40 hover:text-gold uppercase tracking-widest transition-colors underline underline-offset-4"
                >
                  REQUEST PRE-PURCHASE ASSISTANCE
                </Link>
              </div>
            </div>

            {product.sku && (
              <p className="text-xs text-gold/40 mt-4">PRODUCT CODE: {product.sku}</p>
            )}
          </div>
        </div>

        {/* Compatible Models */}
        {compatibleModels.length > 0 && (
          <div className="mt-16 p-8 border border-gold/10 bg-[#0f0f11] font-heading rounded-none">
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Compatibility Registry
            </h2>
            <div className="flex flex-wrap gap-2">
              {compatibleModels.map((model, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-black text-[#a1a1a5] text-xs border border-gold/10"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product content */}
        {product.content && (
          <div className="mt-16 p-8 border border-gold/10 bg-[#0f0f11] rounded-none">
            <div
              className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-[#d4a84b] font-heading italic"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 animate-fade-in">
            <h2 className="text-xl font-heading font-bold text-white mb-8 uppercase tracking-widest">
              - Elite Recommendations -
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <LuxuryProductCard key={p.id} product={p} />
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
    <div className="pt-28 pb-16 min-h-screen bg-[#070708] text-[#e5e5e7]">
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-gold/60 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold/30" />
          <span className="text-white">{page.title.toUpperCase()}</span>
        </nav>

        {/* Content */}
        <div className="p-8 md:p-12 border border-gold/10 bg-[#0f0f11] rounded-none">
          <div
            className="prose prose-sm prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-[#d4a84b] font-heading"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
}
