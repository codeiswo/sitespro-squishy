import { getPageBySlug, getSettings } from '@/lib/db';
import { notFound } from 'next/navigation';
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let page;
  try { page = await getPageBySlug(slug); } catch { page = null; }

  if (!page) return { title: 'Page Not Found' };

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/${slug}`;

  const title = page.meta_title || `${page.title} | ${siteName}`;
  const description = page.meta_description || `${page.title} page for ${siteName}.`;

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

export default async function TopLevelCMSPage({ params }) {
  const { slug } = await params;
  let page;
  try { page = await getPageBySlug(slug); } catch { page = null; }

  if (!page) notFound();

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/${slug}`;

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedSinglePage;
  if (archetype === 'gummy') SelectedSinglePage = GummyTheme.SinglePage;
  else if (archetype === 'minimalist') SelectedSinglePage = MinimalistTheme.SinglePage;
  else if (archetype === 'futuristic') SelectedSinglePage = FuturisticTheme.SinglePage;
  else if (archetype === 'luxury') SelectedSinglePage = LuxuryTheme.SinglePage;
  else SelectedSinglePage = ClassicTheme.SinglePage;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "name": page.title,
    "description": page.meta_description || page.title,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <SelectedSinglePage page={page} />
    </>
  );
}
