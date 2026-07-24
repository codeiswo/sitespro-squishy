import { getAllProducts, getPages, getSettings } from '@/lib/db';
import siteSettings from '../config/site-settings.json';

export const runtime = 'edge';

function getBaseUrl(settings) {
  let domain = settings.site_url || siteSettings.domain || 'squishyworld.pages.dev';
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = `https://${domain}`;
  }
  return domain.replace(/\/$/, '');
}

export default async function sitemap() {
  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  let productPages = [];
  try {
    const products = await getAllProducts();
    productPages = products.map(product => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updated_at || product.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch { /* ignore */ }

  let cmsPages = [];
  try {
    const pages = await getPages({ published: true });
    cmsPages = pages.map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page.updated_at || page.created_at),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
  } catch { /* ignore */ }

  return [...staticPages, ...productPages, ...cmsPages];
}
