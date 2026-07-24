import { getAllProducts, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from '../../config/site-settings.json';
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

// Custom Squishy & Sensory Toy fallback dataset
const fallbackProducts = [
  { id: 1, title: 'NeeDoh Groovy Glob Squishy Stress Ball', slug: 'needoh-groovy-glob-squishy', price: 12.99, compare_price: 18.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/FF2E7E/FFFFFF?text=NeeDoh+Squishy', features: '["Super Dough-y","ASMR Approved"]', is_featured: 1 },
  { id: 2, title: 'NeeDoh Nice Cube Clear Gel Stress Toy', slug: 'needoh-nice-cube-sensory-gel', price: 14.99, compare_price: 21.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=NeeDoh+Nice+Cube', features: '["Translucent Gel","Nice Cube Texture"]', is_featured: 1 },
  { id: 3, title: 'NeeDoh Ice Cube Cool Touch Squishy', slug: 'needoh-ice-cube-cool-touch', price: 15.99, compare_price: 22.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/06B4D8/FFFFFF?text=NeeDoh+Ice+Cube', features: '["Cool Touch","Crystal Ice Feel"]', is_featured: 1 },
  { id: 4, title: 'Realistic Stretchy Cheese Squishy Toy', slug: 'stretchy-cheese-squishy-toy', price: 11.99, compare_price: 16.99, brand: 'Sensory Fun', image_url: 'https://placehold.co/600x600/FACC15/FFFFFF?text=Cheese+Squishy', features: '["Slow Rise","Stretchy Foam"]', is_featured: 1 },
  { id: 5, title: 'NeeDoh Gumdrop Tactile Stress Reliever', slug: 'needoh-gumdrop-tactile-reliever', price: 13.49, compare_price: 19.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/10B981/FFFFFF?text=NeeDoh+Gumdrop', features: '["Gummy Feel","Non-Toxic"]', is_featured: 1 },
  { id: 6, title: 'Sensory Gel Cube Fidget 4-Pack Combo', slug: 'sensory-gel-cube-fidget-pack', price: 29.99, compare_price: 45.99, brand: 'SquishyLab', image_url: 'https://placehold.co/600x600/EC4899/FFFFFF?text=Sensory+Combo', features: '["Multi-Color","Washable"]', is_featured: 1 },
];

export async function generateMetadata() {
  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const title = settings.meta_title || siteSettings.seoTitle || 'NeeDoh Squishy World | Premium Squishy & Sensory Relief Toys';
  const description = settings.meta_description || siteSettings.seoDescription || 'Shop authentic NeeDoh Squishies, Nice Cubes, Ice Cubes, and Cheese Squishy sensory stress toys. Super dough-y feel, ASMR approved, non-toxic, and washable.';

  return {
    title,
    description,
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': baseUrl,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
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

export default async function HomePage() {
  let products;
  let settings = {};
  try {
    products = await getAllProducts();
    if (!products || products.length === 0) products = fallbackProducts;
  } catch {
    products = fallbackProducts;
  }

  try {
    settings = await getSettings();
  } catch (_) {}

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedHomepage;
  if (archetype === 'gummy') SelectedHomepage = GummyTheme.Homepage;
  else if (archetype === 'minimalist') SelectedHomepage = MinimalistTheme.Homepage;
  else if (archetype === 'futuristic') SelectedHomepage = FuturisticTheme.Homepage;
  else if (archetype === 'luxury') SelectedHomepage = LuxuryTheme.Homepage;
  else SelectedHomepage = ClassicTheme.Homepage;

  return <SelectedHomepage settings={settings} featuredProducts={featuredProducts} />;
}
