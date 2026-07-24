import { getAllProducts } from '@/lib/db';
import { getPages } from '@/lib/db';

export const runtime = 'edge';

const BASE_URL = 'https://www.filterspro.com';

export default async function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  let productPages = [];
  try {
    const products = await getAllProducts();
    productPages = products.map(product => ({
      url: `${BASE_URL}/product/${product.slug}`,
      lastModified: new Date(product.updated_at || product.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch { /* ignore */ }

  let cmsPages = [];
  try {
    const pages = await getPages({ published: true });
    cmsPages = pages.map(page => ({
      url: `${BASE_URL}/page/${page.slug}`,
      lastModified: new Date(page.updated_at || page.created_at),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
  } catch { /* ignore */ }

  return [...staticPages, ...productPages, ...cmsPages];
}
