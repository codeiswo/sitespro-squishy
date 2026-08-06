import { getProducts, getSettings, getCategories, getBrands } from '@/lib/db';
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

const fallbackProducts = [
  { id: 1, title: 'NeeDoh Groovy Glob Squishy Stress Ball', slug: 'needoh-groovy-glob-squishy', price: 12.99, compare_price: 18.99, brand: 'NeeDoh', category: 'Squishy Stress Toys', image_url: 'https://placehold.co/600x600/FF2E7E/FFFFFF?text=NeeDoh+Squishy', features: '["Super Dough-y","ASMR Approved"]', is_featured: 1 },
  { id: 2, title: 'NeeDoh Nice Cube Clear Gel Stress Toy', slug: 'needoh-nice-cube-sensory-gel', price: 14.99, compare_price: 21.99, brand: 'NeeDoh', category: 'Sensory Gel Cubes', image_url: 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=NeeDoh+Nice+Cube', features: '["Translucent Gel","Nice Cube Texture"]', is_featured: 1 },
];

const fallbackBrands = ['NeeDoh', 'Sensory Fun', 'SquishyLab'];
const fallbackCategories = ['Squishy Stress Toys', 'Sensory Gel Cubes', 'Food Squishies'];

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const brand = params?.brand || '';
  const category = params?.category || '';

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/products`;

  let title = `Squishy & Sensory Toys Collection | ${siteName}`;
  if (brand) title = `${brand} Squishies & Sensory Toys | ${siteName}`;
  else if (category) title = `${category} | ${siteName}`;

  const description = `Explore our complete collection of NeeDoh Squishies, Nice Cubes, Ice Cubes, and Cheese Squishy sensory toys. Super dough-y feel, ASMR approved.`;

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

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const brand = params?.brand || '';
  const category = params?.category || '';
  const sort = params?.sort || 'sort_order';
  const search = params?.search || '';
  const page = parseInt(params?.page || '1');

  let products, total, dbCategories = [], dbBrands = [];
  try {
    const [result, catList, brandList] = await Promise.all([
      getProducts({ page, limit: 12, brand, category, search, sort }),
      getCategories(),
      getBrands()
    ]);
    products = result.products;
    total = result.total;
    dbCategories = catList;
    dbBrands = brandList;
    if (!products || products.length === 0) {
      products = fallbackProducts;
      total = fallbackProducts.length;
    }
  } catch {
    products = fallbackProducts;
    total = fallbackProducts.length;
  }

  if (products === fallbackProducts) {
    if (brand) products = products.filter(p => p.brand === brand);
    if (category) products = products.filter(p => p.category === category);
    total = products.length;
  }

  const categories = dbCategories && dbCategories.length > 0 ? dbCategories : fallbackCategories;
  const brands = dbBrands && dbBrands.length > 0 ? dbBrands : fallbackBrands;

  const totalPages = Math.ceil(total / 12);

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedProductList;
  if (archetype === 'gummy') SelectedProductList = GummyTheme.ProductList;
  else if (archetype === 'minimalist') SelectedProductList = MinimalistTheme.ProductList;
  else if (archetype === 'futuristic') SelectedProductList = FuturisticTheme.ProductList;
  else if (archetype === 'luxury') SelectedProductList = LuxuryTheme.ProductList;
  else SelectedProductList = ClassicTheme.ProductList;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/products` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SelectedProductList
        category={category}
        brand={brand}
        sort={sort}
        products={products}
        total={total}
        page={page}
        totalPages={totalPages}
        categories={categories}
        brands={brands}
      />
    </>
  );
}
