import { Award, Users, Globe, Shield, Heart, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getPageBySlug, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from '../../../config/site-settings.json';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';
import * as GummyTheme from '@/components/themes/gummy';

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
  let page;
  try { page = await getPageBySlug('about'); } catch { page = null; }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'Squishy World';
  const pageUrl = `${baseUrl}/about`;

  const title = page?.meta_title || `About Us | ${siteName}`;
  const description = page?.meta_description || `Learn about ${siteName} - your destination for authentic NeeDoh Squishies, Nice Cubes, Ice Cubes & Cheese Squishies.`;

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
  let page;
  try { page = await getPageBySlug('about'); } catch { page = null; }

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

  if (page && page.content && page.content.trim().length > 100) {
    const theme = settings.site_theme || 'gummy';
    const archetype = getThemeArchetype(theme);

    let SelectedSinglePage;
    if (archetype === 'gummy') SelectedSinglePage = GummyTheme.SinglePage;
    else if (archetype === 'minimalist') SelectedSinglePage = MinimalistTheme.SinglePage;
    else if (archetype === 'futuristic') SelectedSinglePage = FuturisticTheme.SinglePage;
    else if (archetype === 'luxury') SelectedSinglePage = LuxuryTheme.SinglePage;
    else SelectedSinglePage = ClassicTheme.SinglePage;

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
        <SelectedSinglePage page={page} settings={settings} />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="pt-28 pb-20 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
        {/* Hero Section */}
        <section className="py-16 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-4xl">
            <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-3">About Our Brand</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Bringing Joy, Focus & Stress Relief to Every Squish
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We curate the world&apos;s softest, most dough-y sensory toys — from iconic NeeDoh Groovy Globs and Nice Cubes to stretchy Cheese Squishies!
            </p>
          </div>
        </section>

        {/* Brand Mission & Story */}
        <section className="py-16 border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider block">Our Journey</span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  Crafted for Tactile Happiness
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  At {siteName}, we believe everyone deserves a moment of calm and tactile joy in their day. Whether you are dealing with desk fatigue, study stress, or sensory processing needs, our premium squishy toys provide immediate pressure feedback and soothing relaxation.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  Each product is carefully selected and tested for durability, slow-rise memory recovery, and 100% non-toxic safety.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Ultra Dough Fill', desc: 'Satisfying dough core that returns to original shape.' },
                  { title: '100% Non-Toxic', desc: 'BPA-free & safe for ages 3+.' },
                  { title: 'Easy to Clean', desc: 'Wash with warm soap & water to renew softness.' },
                  { title: 'Stress Relief', desc: 'Proven tactile feedback for focus & calmness.' }
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-[#FF2E7E] mb-2" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars Grid */}
        <section className="py-16 border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-2">Why Choose Us</span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">What Makes Our Squishies Special</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Certified Safe', desc: 'Strictly tested for non-toxic safety and child-friendly play.' },
                { icon: Sparkles, title: 'Slow-Rise Gel', desc: 'Premium memory gel texture that offers deep tactile satisfaction.' },
                { icon: RefreshCw, title: 'Washable Skin', desc: 'Easily clean with soap and water for unlimited squishy fun.' },
                { icon: Heart, title: 'Loved Worldwide', desc: 'Trusted by over 50,000+ fidget and sensory toy fans.' }
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF2E7E]/10 flex items-center justify-center text-[#FF2E7E] mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <section className="pt-16 text-center">
          <div className="container-custom max-w-3xl">
            <div className="p-10 rounded-3xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white shadow-xl">
              <h2 className="text-3xl font-extrabold mb-3">Ready to Find Your Favorite Squishy?</h2>
              <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Explore our full collection of NeeDoh Globs, Nice Cubes, and Cheese Squishies today!</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-gray-900 font-extrabold text-sm hover:scale-105 transition-all shadow-md">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
