'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';
import Hero from '@/components/common/hero';
import BrandWall from '@/components/common/brand-wall';
import ProductCard from '@/components/common/product-card';
import { formatPrice } from '@/lib/utils';

// ============================================
// 1. HOMEPAGE
// ============================================
export function Homepage({ settings, featuredProducts }) {
  return (
    <>
      <Hero settings={settings} />
      <BrandWall />

      {/* Featured Products */}
      <section className="section-padding bg-surface dark:bg-surface-dark">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Best Sellers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Featured Water Filters
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Our most popular refrigerator water filter replacements, trusted by thousands of families
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 btn-primary text-base px-8 py-4"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Why FiltersPro
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Smart Choice for Your Family
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'NSF Certified',
                desc: 'All our filters are NSF 42 & 53 certified, tested and verified by independent labs for safety and performance.',
                color: 'text-primary dark:text-accent',
                bg: 'bg-primary-50 dark:bg-primary/10',
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                desc: 'Free standard shipping on all orders over $35. Express options available for urgent replacements.',
                color: 'text-accent-600 dark:text-accent-400',
                bg: 'bg-accent-50 dark:bg-accent/10',
              },
              {
                icon: RefreshCw,
                title: 'Easy Installation',
                desc: 'Simple twist-and-lock or push-in design. Replace your filter in under 60 seconds, no tools required.',
                color: 'text-green-600 dark:text-green-400',
                bg: 'bg-green-50 dark:bg-green-500/10',
              },
              {
                icon: HeartHandshake,
                title: '30-Day Guarantee',
                desc: "Not satisfied? Return any filter within 30 days for a full refund. Your satisfaction is our priority.",
                color: 'text-gold dark:text-gold-light',
                bg: 'bg-gold-light dark:bg-gold/10',
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-card transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-surface dark:bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              3 Easy Steps to Clean Water
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Find Your Filter',
                desc: 'Search by your refrigerator brand and model number to find the perfect compatible filter.',
              },
              {
                step: '02',
                title: 'Quick Delivery',
                desc: 'Order online and get free shipping. Your filter arrives in 5-7 business days.',
              },
              {
                step: '03',
                title: 'Easy Install',
                desc: 'Simple twist or push installation. No tools needed. Fresh, clean water in 60 seconds.',
              },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-hero-gradient text-white mb-6 group-hover:shadow-glow-lg transition-shadow duration-500">
                  <span className="text-2xl font-heading font-bold">{step}</span>
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-[calc(50%+2rem)] top-1/2 w-16 border-t-2 border-dashed border-accent/30" />
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              Customer Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Trusted by 50,000+ Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                location: 'Texas',
                text: 'Perfect replacement for my Samsung fridge. Water tastes so much better and the price is half of what I was paying at the store!',
                rating: 5,
              },
              {
                name: 'James K.',
                location: 'California',
                text: 'Easy to install, great quality. I\'ve been buying from FiltersPro for over a year now. Best water filter replacement service.',
                rating: 5,
              },
              {
                name: 'Linda W.',
                location: 'Florida',
                text: 'NSF certified and affordable. The customer service team helped me find the right filter for my GE fridge. Highly recommend!',
                rating: 5,
              },
            ].map(({ name, location, text, rating }) => (
              <div key={name} className="card-premium p-8 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark" />
        <div className="absolute inset-0 py-20 md:py-28 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 max-w-3xl mx-auto">
            Ready for Crystal-Clear Water?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
            Join 50,000+ families who trust FiltersPro for their refrigerator water filter replacements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-bold text-lg shadow-premium hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Find Your Filter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================
// 2. PRODUCT LIST
// ============================================
export function ProductList({ category, brand, sort, products, total, page, totalPages, categories, brands, handleSortChange }) {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface dark:bg-surface-dark">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">
            {category || brand ? (category || `${brand} Filters`) : 'All Products'}
          </span>
        </nav>

        {/* Page header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white">
              {category || (brand ? `${brand} Water Filters` : 'All Products')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {total} products found
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sort}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-card">
                <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category ? 'bg-primary-50 dark:bg-accent/10 text-primary dark:text-accent font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat ? 'bg-primary-50 dark:bg-accent/10 text-primary dark:text-accent font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-card">
                <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  Brands
                </h3>
                <div className="space-y-1">
                  <Link
                    href={category ? `/products?category=${encodeURIComponent(category)}` : '/products'}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      !brand ? 'bg-primary-50 dark:bg-accent/10 text-primary dark:text-accent font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Brands
                  </Link>
                  {brands.map(b => (
                    <Link
                      key={b}
                      href={`/products?brand=${encodeURIComponent(b)}${category ? `&category=${encodeURIComponent(category)}` : ''}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        brand === b ? 'bg-primary-50 dark:bg-accent/10 text-primary dark:text-accent font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
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
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <div className="text-center py-20">
                <Grid3X3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <Link href="/products" className="btn-primary">View All Products</Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}${brand ? `&brand=${brand}` : ''}${category ? `&category=${encodeURIComponent(category)}` : ''}${sort ? `&sort=${sort}` : ''}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                      page === i + 1
                        ? 'bg-primary text-white shadow-glow'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-accent/10'
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
    <div className="pt-24 pb-16 min-h-screen bg-surface dark:bg-surface-dark">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary dark:hover:text-accent transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          {product.brand && (
            <>
              <Link href={`/products?brand=${product.brand}`} className="hover:text-primary dark:hover:text-accent transition-colors">{product.brand}</Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-gray-900 dark:text-white font-medium line-clamp-1">{product.title}</span>
        </nav>

        {/* Product detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden mb-4 flex items-center justify-center p-12 relative">
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-bold shadow-lg">
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
                    className={`aspect-square rounded-xl bg-white dark:bg-gray-800 border-2 transition-colors overflow-hidden cursor-pointer flex items-center justify-center p-4 ${
                      activeImage === img ? 'border-primary dark:border-accent' : 'border-gray-100 dark:border-gray-700 hover:border-accent'
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
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">4.8 (127 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-4xl font-heading font-bold text-primary dark:text-accent">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
                  <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold">
                    Save {formatPrice(product.compare_price - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
              {[
                { icon: Shield, label: 'NSF Certified' },
                { icon: Truck, label: 'Free Shipping' },
                { icon: Package, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            {/* Quantity and Actions block */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-750 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl p-1 bg-white dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    className="p-1 hover:bg-gray-150 dark:hover:bg-gray-750 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-900 dark:text-white">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(prev => prev + 1)}
                    className="p-1 hover:bg-gray-150 dark:hover:bg-gray-750 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, qty)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-primary text-primary dark:border-accent dark:text-accent font-bold text-base hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-black transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full btn-primary text-center font-bold text-base py-4 shadow-lg shadow-primary/10 active:scale-[0.98] cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-block text-xs text-gray-400 hover:text-primary dark:hover:text-accent transition-colors"
                >
                  Have questions? Inquire about this product
                </Link>
              </div>
            </div>

            {product.sku && (
              <p className="text-xs text-gray-400 mt-4">SKU: {product.sku}</p>
            )}
          </div>
        </div>

        {/* Compatible Models */}
        {compatibleModels.length > 0 && (
          <div className="mt-16 p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-card">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Compatible Refrigerator Models
            </h2>
            <div className="flex flex-wrap gap-2">
              {compatibleModels.map((model, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary/10 text-primary dark:text-accent-400 text-sm font-medium border border-primary-100 dark:border-primary/20"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product content */}
        {product.content && (
          <div className="mt-16 p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-card">
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
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
    <div className="pt-24 pb-16 min-h-screen bg-surface dark:bg-surface-dark">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white font-medium">{page.title}</span>
        </nav>

        {/* Content */}
        <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-800 shadow-card">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-accent prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </div>
  );
}
