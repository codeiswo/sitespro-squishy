import { Shield, Heart, Sparkles, RefreshCw, CheckCircle2, ArrowRight, Smile, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { getSettings } from '@/lib/db';
import siteSettings from '../../../config/site-settings.json';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getBaseUrl(settings) {
  let domain = settings.site_url || siteSettings.domain || 'squishyworld.pages.dev';
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = `https://${domain}`;
  }
  return domain.replace(/\/$/, '');
}

export async function generateMetadata() {
  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/about`;

  const title = `About Us | ${siteName}`;
  const description = `Learn about ${siteName} - your destination for authentic NeeDoh Squishies, Nice Cubes, Ice Cubes & Cheese Squishies.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': pageUrl,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AboutPage() {
  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'Squishy World';
  const pageUrl = `${baseUrl}/about`;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": pageUrl,
    "name": `About Us - ${siteName}`,
    "description": "Learn about our mission to bring soft, ultra-satisfying sensory and stress relief squishies to everyone.",
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="pt-28 pb-24 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
        {/* Hero Section */}
        <section className="py-16 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF2E7E]/10 text-[#FF2E7E] text-xs font-extrabold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> About Our Brand
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Bringing Joy, Focus & Stress Relief to Every Squish
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We curate the world&apos;s softest, most dough-y sensory toys — from iconic NeeDoh Groovy Globs and Nice Cubes to stretchy Cheese Squishies!
            </p>
          </div>
        </section>

        {/* Brand Mission & Story */}
        <section className="py-20 border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <span className="text-xs font-extrabold text-[#8B5CF6] uppercase tracking-wider block">Our Journey</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  Crafted for Tactile Happiness & Calming Relaxation
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  At <strong className="text-gray-900 dark:text-white">{siteName}</strong>, we believe everyone deserves a moment of calm and tactile joy in their day. Whether you are dealing with desk fatigue, study stress, or sensory processing needs, our premium squishy toys provide immediate pressure feedback and soothing relaxation.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  Each product is carefully selected and tested for durability, slow-rise memory recovery, and 100% non-toxic safety.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Ultra Dough Fill', desc: 'Satisfying dough core that slow-rises back to original shape.' },
                  { title: '100% Non-Toxic', desc: 'BPA-free, phthalate-free & safe for ages 3+.' },
                  { title: 'Easy to Clean', desc: 'Rinse under warm soap & water to restore softness.' },
                  { title: 'Stress Relief', desc: 'Proven tactile feedback for desk focus & calmness.' }
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm hover:border-[#FF2E7E]/40 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-[#FF2E7E] mb-2" />
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="py-20 border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-14">
              <span className="text-xs font-extrabold text-[#FF2E7E] uppercase tracking-widest block mb-2">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">What Makes Our Squishies Special</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Certified Safe', desc: 'Strictly tested for non-toxic safety, BPA-free and child-friendly play.' },
                { icon: Sparkles, title: 'Slow-Rise Gel', desc: 'Premium memory gel core that offers deep, ultra-satisfying tactile feedback.' },
                { icon: RefreshCw, title: 'Washable Surface', desc: 'Easily clean with warm water and soap for unlimited squishy fun.' },
                { icon: Heart, title: 'Loved Worldwide', desc: 'Trusted by over 50,000+ fidget and sensory toy enthusiasts globally.' }
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-7 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-center shadow-sm hover:scale-[1.02] transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF2E7E]/10 flex items-center justify-center text-[#FF2E7E] mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="py-16 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#FF2E7E] mb-1">50,000+</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Happy Customers</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#8B5CF6] mb-1">100%</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Non-Toxic & Safe</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#FF2E7E] mb-1">30 Days</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Money-Back Guarantee</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#8B5CF6] mb-1">24/7</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <section className="pt-20 text-center">
          <div className="container-custom max-w-3xl">
            <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#FF2E7E] via-[#A855F7] to-[#8B5CF6] text-white shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Find Your Favorite Squishy?</h2>
              <p className="text-white/90 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Explore our full collection of NeeDoh Globs, Nice Cubes, and Cheese Squishies today!
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-900 font-extrabold text-sm hover:scale-105 transition-all shadow-lg">
                Shop Collection <ArrowRight className="w-4 h-4 text-[#FF2E7E]" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
