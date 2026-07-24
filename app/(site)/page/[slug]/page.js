import { getPageBySlug, getSettings } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let page;
  try { page = await getPageBySlug(slug); } catch { page = null; }

  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || '',
  };
}

export default async function CMSPage({ params }) {
  const { slug } = await params;
  let page;
  try { page = await getPageBySlug(slug); } catch { page = null; }

  if (!page) notFound();

  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedSinglePage;
  if (archetype === 'minimalist') SelectedSinglePage = MinimalistTheme.SinglePage;
  else if (archetype === 'futuristic') SelectedSinglePage = FuturisticTheme.SinglePage;
  else if (archetype === 'luxury') SelectedSinglePage = LuxuryTheme.SinglePage;
  else SelectedSinglePage = ClassicTheme.SinglePage;

  return <SelectedSinglePage page={page} />;
}
