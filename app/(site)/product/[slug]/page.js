import { getProductBySlug, getSettings } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';
import * as GummyTheme from '@/components/themes/gummy';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = {
  'needoh-groovy-glob-squishy': { id: 1, title: 'NeeDoh Groovy Glob Squishy Stress Ball', slug: 'needoh-groovy-glob-squishy', price: 12.99, compare_price: 18.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/FF2E7E/FFFFFF?text=NeeDoh+Squishy', features: '["Super Dough-y","ASMR Approved"]' },
  'needoh-nice-cube-sensory-gel': { id: 2, title: 'NeeDoh Nice Cube Clear Gel Stress Toy', slug: 'needoh-nice-cube-sensory-gel', price: 14.99, compare_price: 21.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=NeeDoh+Nice+Cube', features: '["Translucent Gel","Nice Cube Texture"]' },
  'needoh-ice-cube-cool-touch': { id: 3, title: 'NeeDoh Ice Cube Cool Touch Squishy', slug: 'needoh-ice-cube-cool-touch', price: 15.99, compare_price: 22.99, brand: 'NeeDoh', image_url: 'https://placehold.co/600x600/06B4D8/FFFFFF?text=NeeDoh+Ice+Cube', features: '["Cool Touch","Crystal Ice Feel"]' },
  'stretchy-cheese-squishy-toy': { id: 4, title: 'Realistic Stretchy Cheese Squishy Toy', slug: 'stretchy-cheese-squishy-toy', price: 11.99, compare_price: 16.99, brand: 'Sensory Fun', image_url: 'https://placehold.co/600x600/FACC15/FFFFFF?text=Cheese+Squishy', features: '["Slow Rise","Stretchy Foam"]' },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { product = null; }
  if (!product && fallbackProducts[slug]) product = fallbackProducts[slug];
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} | Sensory Squishy Toy`,
    description: `Buy ${product.title}. Super dough-y, non-toxic, and ASMR approved sensory relief toy.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { product = null; }
  if (!product && fallbackProducts[slug]) product = fallbackProducts[slug];
  if (!product) notFound();

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedDetail;
  if (archetype === 'gummy') SelectedDetail = GummyTheme.ProductDetail;
  else if (archetype === 'minimalist') SelectedDetail = MinimalistTheme.ProductDetail;
  else if (archetype === 'futuristic') SelectedDetail = FuturisticTheme.ProductDetail;
  else if (archetype === 'luxury') SelectedDetail = LuxuryTheme.ProductDetail;
  else SelectedDetail = ClassicTheme.ProductDetail;

  return <SelectedDetail product={product} />;
}
