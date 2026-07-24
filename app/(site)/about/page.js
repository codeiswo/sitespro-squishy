import { Award, Users, Globe, Shield, Heart, Sparkles } from 'lucide-react';
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
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
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
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
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

  if (page && page.content && page.content.trim().length > 0) {
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
        <SelectedSinglePage page={page} />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="pt-28 pb-16 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
        <section className="py-16 text-center">
          <div className="container-custom">
            <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-2">About Our Brand</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Bringing Fun & Stress Relief to Every Squish
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We curate the world&apos;s softest, most dough-y sensory toys — from original NeeDoh Groovy Globs and Nice Cubes to stretchy Cheese Squishies!
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
