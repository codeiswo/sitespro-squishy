import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Zap, ShieldCheck, ArrowRight, Star, ShoppingBag, Flame } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';

export function Homepage({ settings, featuredProducts = [] }) {
  const { addItem } = useCart();
  const tagline = settings.site_tagline || 'Super Dough-y, Ultra-Satisfying Sensory & Stress Relief Squishies';

  return (
    <div className="min-h-screen bg-[#FDF8FA] dark:bg-[#161024] text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
      {/* Gummy Animated Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Soft Gummy Gradient Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF2E7E]/20 via-[#8B5CF6]/20 to-[#10B981]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FACC15]/30 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="container-custom relative z-10 text-center">
          {/* ASMR & Squish Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border-2 border-[#FF2E7E]/30 text-[#FF2E7E] dark:text-[#FF4D8D] text-xs md:text-sm font-bold shadow-[0_4px_20px_rgba(255,46,126,0.15)] mb-6 hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 fill-[#FF2E7E]" />
            <span>100% Super Dough-y & ASMR Approved</span>
            <span className="bg-[#FF2E7E] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Original</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
            The Ultimate <span className="bg-gradient-to-r from-[#FF2E7E] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">Squishy & Sensory</span> Experience
          </h1>

          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white font-bold text-lg shadow-[0_10px_30px_rgba(255,46,126,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Squishies Now
            </Link>
            <a
              href="#squish-guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-bold text-lg hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Explore Squish Gauge
            </a>
          </div>

          {/* Quick Feature Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            {[
              { title: 'Nice Cube Ice Feel', icon: Flame, color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30' },
              { title: 'Slow-Rise Resiliency', icon: Zap, color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
              { title: 'Non-Toxic & Washable', icon: ShieldCheck, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
              { title: 'Stress Relief Certified', icon: Heart, color: 'bg-rose-500/10 text-rose-500 border-rose-500/30' },
            ].map(({ title, icon: Icon, color }) => (
              <div key={title} className={`flex items-center justify-center gap-2 p-3 rounded-2xl border ${color} font-semibold text-xs md:text-sm shadow-xs backdrop-blur-xs`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Squishy Products */}
      <section className="py-16 container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#FF2E7E] font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Most Popular Squish Toys
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Trending Squishies & Sensory Cubes
            </h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#8B5CF6] hover:text-[#FF2E7E] transition-colors">
            View All Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800/90 rounded-3xl p-5 border-2 border-gray-100 dark:border-gray-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(255,46,126,0.15)] hover:border-[#FF2E7E]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F5FB] dark:bg-gray-900 mb-4 flex items-center justify-center p-4">
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    Squish Favorite
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9 / 5.0 (ASMR Verified)</span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#FF2E7E] transition-colors line-clamp-2 mb-2">
                  <Link href={`/product/${product.slug}`}>{product.title}</Link>
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {product.brand} Sensory & Stress Relief Squishy. High-density gel dough core for maximum tactile satisfaction.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-extrabold text-[#FF2E7E]">${product.price}</span>
                  {product.compare_price && (
                    <span className="text-xs text-gray-400 line-through">${product.compare_price}</span>
                  )}
                </div>

                <button
                  onClick={() => addItem(product)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Texture & Squish Factor Guide */}
      <section id="squish-guide" className="py-16 bg-white dark:bg-gray-900/60 border-y border-gray-100 dark:border-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest mb-2 block">Sensory & Texture Guide</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Find Your Preferred Texture
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Whether you prefer crystal gel, slow-rising dough, or crunchy squish, explore our tactile squish index.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Nice Cube / Ice Cube Gel',
                desc: 'Translucent ice-cube feel with dense gel filling. Returns to shape instantly with cool tactile feedback.',
                softness: '85%',
                riseTime: 'Instant Return',
                idealFor: 'Anxiety & Desk Focus',
                tag: 'NeeDoh Ice Cube',
                bg: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30'
              },
              {
                title: 'Super Dough-y Crust',
                desc: 'Thick gummy skin packed with micro-dough filling. Ultra slow-rise squeeze for deep muscle relaxation.',
                softness: '98%',
                riseTime: 'Slow-Rise Dough',
                idealFor: 'Deep Muscle Squeeze',
                tag: 'NeeDoh Squishy',
                bg: 'from-pink-500/10 to-purple-500/10 border-pink-500/30'
              },
              {
                title: 'Cheese Foam Melt',
                desc: 'Soft air-injected memory foam texture that mimics real cheese stretch. Ultra light and bouncy.',
                softness: '92%',
                riseTime: 'Bouncy Rise',
                idealFor: 'Fun Tactile Stretch',
                tag: 'Cheese Squishy',
                bg: 'from-amber-500/10 to-yellow-500/10 border-amber-500/30'
              }
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-3xl border bg-gradient-to-br ${item.bg} space-y-4 shadow-sm`}>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 shadow-xs inline-block">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-500">Softness Factor</span>
                    <span className="text-[#FF2E7E]">{item.softness}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] h-full" style={{ width: item.softness }} />
                  </div>
                  <div className="flex justify-between font-semibold pt-1">
                    <span className="text-gray-500">Recovery Style</span>
                    <span className="text-[#8B5CF6]">{item.riseTime}</span>
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

export function ProductList({ products = [], title = 'Squishy Collection' }) {
  const { addItem } = useCart();
  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
      <div className="container-custom">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-1">Catalog & Storefront</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">{title}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl border-2 border-gray-100 dark:border-gray-700/80 shadow-sm hover:border-[#FF2E7E]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F5FB] dark:bg-gray-900 mb-4 p-4">
                  <Image src={product.image_url} alt={product.title} fill className="object-contain p-4 hover:scale-105 transition-transform" unoptimized />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-2 mb-2">
                  <Link href={`/product/${product.slug}`}>{product.title}</Link>
                </h3>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#FF2E7E] mb-3">${product.price}</div>
                <button onClick={() => addItem(product)} className="w-full py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs transition-colors cursor-pointer">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ProductCatalog = ProductList;

export function ProductDetail({ product }) {
  const { addItem } = useCart();
  if (!product) return null;

  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
      <div className="container-custom max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 p-8 rounded-3xl border-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="relative aspect-square bg-[#F8F5FB] dark:bg-gray-900 rounded-2xl p-6">
            <Image src={product.image_url} alt={product.title} fill className="object-contain p-6" unoptimized />
          </div>

          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#FF2E7E]/10 text-[#FF2E7E] text-xs font-bold inline-block mb-2">
                {product.brand || 'Sensory Toy'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{product.title}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#FF2E7E]">${product.price}</span>
              {product.compare_price && <span className="text-sm text-gray-400 line-through">${product.compare_price}</span>}
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5FB] dark:bg-gray-900 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-gray-700 dark:text-gray-300">
                <span>Tactile Softness</span>
                <span className="text-[#FF2E7E]">96% Super Dough-y</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] h-full w-[96%]" />
              </div>
              <p className="text-[11px] text-gray-500 pt-1">Tested for non-toxic safety, washable with warm soap & water.</p>
            </div>

            <button onClick={() => addItem(product)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white font-extrabold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SinglePage({ page }) {
  if (!page) return null;
  return (
    <div className="pt-28 pb-16 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
      <div className="container-custom max-w-3xl">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border-2 border-gray-100 dark:border-gray-700 shadow-sm prose dark:prose-invert max-w-none">
          <h1>{page.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </div>
    </div>
  );
}
