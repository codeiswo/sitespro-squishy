import { getProducts, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';
import * as GummyTheme from '@/components/themes/gummy';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = [
  { id: 1, title: 'NeeDoh Groovy Glob Squishy Stress Ball', slug: 'needoh-groovy-glob-squishy', price: 12.99, compare_price: 18.99, brand: 'NeeDoh', category: 'Squishy Stress Toys', image_url: 'https://placehold.co/600x600/FF2E7E/FFFFFF?text=NeeDoh+Squishy', features: '["Super Dough-y","ASMR Approved"]', is_featured: 1 },
  { id: 2, title: 'NeeDoh Nice Cube Clear Gel Stress Toy', slug: 'needoh-nice-cube-sensory-gel', price: 14.99, compare_price: 21.99, brand: 'NeeDoh', category: 'Sensory Gel Cubes', image_url: 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=NeeDoh+Nice+Cube', features: '["Translucent Gel","Nice Cube Texture"]', is_featured: 1 },
  { id: 3, title: 'NeeDoh Ice Cube Cool Touch Squishy', slug: 'needoh-ice-cube-cool-touch', price: 15.99, compare_price: 22.99, brand: 'NeeDoh', category: 'Sensory Gel Cubes', image_url: 'https://placehold.co/600x600/06B4D8/FFFFFF?text=NeeDoh+Ice+Cube', features: '["Cool Touch","Crystal Ice Feel"]', is_featured: 1 },
  { id: 4, title: 'Realistic Stretchy Cheese Squishy Toy', slug: 'stretchy-cheese-squishy-toy', price: 11.99, compare_price: 16.99, brand: 'Sensory Fun', category: 'Food Squishies', image_url: 'https://placehold.co/600x600/FACC15/FFFFFF?text=Cheese+Squishy', features: '["Slow Rise","Stretchy Foam"]', is_featured: 1 },
];

const brands = ['NeeDoh', 'Sensory Fun', 'SquishyLab'];
const categories = ['Squishy Stress Toys', 'Sensory Gel Cubes', 'Food Squishies'];

export async function generateMetadata() {
  return {
    title: 'Squishy & Sensory Toys Collection | NeeDoh & Cheese Squishies',
    description: 'Explore our full collection of NeeDoh Squishies, Nice Cubes, Ice Cubes, and Cheese Squishy sensory toys.',
  };
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const brand = params?.brand || '';
  const category = params?.category || '';
  const sort = params?.sort || 'sort_order';
  const search = params?.search || '';
  const page = parseInt(params?.page || '1');

  let products, total;
  try {
    const result = await getProducts({ page, limit: 12, brand, category, search, sort });
    products = result.products;
    total = result.total;
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

  const totalPages = Math.ceil(total / 12);

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}

  const theme = settings.site_theme || 'gummy';
  const archetype = getThemeArchetype(theme);

  let SelectedProductList;
  if (archetype === 'gummy') SelectedProductList = GummyTheme.ProductList;
  else if (archetype === 'minimalist') SelectedProductList = MinimalistTheme.ProductList;
  else if (archetype === 'futuristic') SelectedProductList = FuturisticTheme.ProductList;
  else if (archetype === 'luxury') SelectedProductList = LuxuryTheme.ProductList;
  else SelectedProductList = ClassicTheme.ProductList;

  return (
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
  );
}
