import { getProductBySlug, getProducts, getSettings } from '@/lib/db';
import { notFound } from 'next/navigation';
import { parseJSON, stripHtml } from '@/lib/utils';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from '../../../../config/site-settings.json';
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

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/product/${product.slug}`;

  const title = product.meta_title || `${product.title} | ${siteName}`;
  const rawDesc = product.meta_description || product.description || product.content || `Buy ${product.title}. Super dough-y, non-toxic, and ASMR approved sensory relief toy.`;
  const description = stripHtml(rawDesc).substring(0, 160);

  const images = product.image_url
    ? [{ url: product.image_url, width: 800, height: 800, alt: product.title }]
    : [];

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
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image_url ? [product.image_url] : [],
    },
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
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/product/${product.slug}`;

  const gallery = parseJSON(product.gallery, []);
  const features = parseJSON(product.features, []);
  const compatibleModels = parseJSON(product.compatible_models, []);
  const allImages = Array.from(new Set([product.image_url, ...(Array.isArray(gallery) ? gallery : [])].filter(Boolean)));
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedDetail;
  if (archetype === 'gummy') SelectedDetail = GummyTheme.ProductDetail;
  else if (archetype === 'minimalist') SelectedDetail = MinimalistTheme.ProductDetail;
  else if (archetype === 'futuristic') SelectedDetail = FuturisticTheme.ProductDetail;
  else if (archetype === 'luxury') SelectedDetail = LuxuryTheme.ProductDetail;
  else SelectedDetail = ClassicTheme.ProductDetail;

  const rawDesc = product.description || product.meta_description || product.content || product.title;
  const cleanDescription = stripHtml(rawDesc).substring(0, 300);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": allImages.length > 0 ? allImages : [baseUrl + '/opengraph-image.png'],
    "description": cleanDescription,
    "sku": product.sku || product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.brand || 'NeeDoh'
    },
    "offers": {
      "@type": "Offer",
      "url": pageUrl,
      "priceCurrency": "USD",
      "price": Number(product.price) || 0,
      "priceValidUntil": new Date(Date.now() + 31536000000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteName
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "96"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` },
      { "@type": "ListItem", "position": 3, "name": product.title, "item": pageUrl }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SelectedDetail
        product={product}
        allImages={allImages}
        features={features}
        compatibleModels={compatibleModels}
        discount={discount}
      />
    </>
  );
}
