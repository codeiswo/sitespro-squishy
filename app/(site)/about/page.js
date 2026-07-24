import { Award, Users, Globe, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getPageBySlug, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let page;
  try { page = await getPageBySlug('about'); } catch { page = null; }

  return {
    title: page?.meta_title || page?.title || 'About Us',
    description: page?.meta_description || 'Learn about our trusted source for premium refrigerator water filter replacements. NSF certified, affordable, and reliable.',
  };
}

export default async function AboutPage() {
  let page;
  try { page = await getPageBySlug('about'); } catch { page = null; }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}

  // If dynamic page content was created/edited in the Admin Page Manager, render it with the active Theme
  if (page && page.content && page.content.trim().length > 0) {
    const theme = settings.site_theme || 'default';
    const archetype = getThemeArchetype(theme);

    let SelectedSinglePage;
    if (archetype === 'minimalist') SelectedSinglePage = MinimalistTheme.SinglePage;
    else if (archetype === 'futuristic') SelectedSinglePage = FuturisticTheme.SinglePage;
    else if (archetype === 'luxury') SelectedSinglePage = LuxuryTheme.SinglePage;
    else SelectedSinglePage = ClassicTheme.SinglePage;

    return <SelectedSinglePage page={page} />;
  }

  // Fallback to default rich About page layout
  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface dark:bg-surface-dark">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark opacity-5" />
        <div className="container-custom relative z-10 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">About Us</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            Clean Water, <span className="text-gradient">Made Simple</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dedicated to providing affordable, high-quality refrigerator water filter replacements 
            that deliver crystal-clear, great-tasting water for every family.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '50K+', label: 'Happy Customers', icon: Users },
            { value: '100+', label: 'Filter Models', icon: Shield },
            { value: '99%', label: 'Satisfaction Rate', icon: Award },
            { value: '48', label: 'States Shipped', icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="card-premium p-6 rounded-2xl text-center">
              <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-heading font-bold text-primary dark:text-accent">{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Premium Quality at Honest Prices
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We believe every family deserves access to clean, safe drinking water without paying inflated prices 
                for OEM filters. Our filters use the same premium materials and meet the same NSF certifications as 
                name-brand filters — at up to 60% less.
              </p>
              <div className="space-y-3">
                {[
                  'NSF 42 & 53 certified by independent labs',
                  'Premium coconut shell activated carbon',
                  'Tested to remove 99% of lead, chlorine, and more',
                  '6-month filter life, same as OEM',
                  '30-day satisfaction guarantee',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-hero-gradient p-12 flex items-center justify-center aspect-square max-w-md mx-auto w-full">
              <div className="text-center text-white">
                <Shield className="w-20 h-20 mx-auto mb-6 opacity-80" />
                <p className="text-2xl font-heading font-bold mb-2">NSF Certified</p>
                <p className="text-white/70">Every filter tested & verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom pb-16">
        <div className="p-12 rounded-3xl bg-white dark:bg-gray-800 shadow-premium text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Find the perfect water filter replacement for your refrigerator. All filters come with free shipping and a 30-day guarantee.
          </p>
          <Link href="/products" className="group inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Browse Filters
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
