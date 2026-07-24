import { Mail, Clock, Send, MessageCircle } from 'lucide-react';
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
  try { page = await getPageBySlug('contact'); } catch { page = null; }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/contact`;

  const title = page?.meta_title || `Contact Us | ${siteName}`;
  const description = page?.meta_description || `Contact ${siteName} customer care for questions about NeeDoh squishy orders, shipping, or sensory product details.`;

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

export default async function ContactPage() {
  let page;
  try { page = await getPageBySlug('contact'); } catch { page = null; }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || 'NeeDoh Squishy World';
  const pageUrl = `${baseUrl}/contact`;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": pageUrl,
    "name": `Contact Us - ${siteName}`,
    "description": "Contact customer support for NeeDoh Squishy World.",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />
        <SelectedSinglePage page={page} />
      </>
    );
  }

  const contactEmail = settings.site_email || 'support@needohsquishy.com';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="pt-28 pb-16 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
        <section className="py-16 text-center">
          <div className="container-custom">
            <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-2">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              We&apos;re Here to Help!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Have questions about your order or our squishy sensory toys? Send us a message below.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#FF2E7E]/10 flex items-center justify-center text-[#FF2E7E] flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Support</h3>
                      <p className="text-xs text-gray-500 mb-2">Our squishy customer care team responds within 24 hours.</p>
                      <a href={`mailto:${contactEmail}`} className="text-[#FF2E7E] font-bold text-sm hover:underline">{contactEmail}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Your Name</label>
                    <input type="text" placeholder="John Doe" required className="w-full px-4 py-3 rounded-2xl bg-[#F8F5FB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:border-[#FF2E7E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" required className="w-full px-4 py-3 rounded-2xl bg-[#F8F5FB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:border-[#FF2E7E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Message</label>
                    <textarea rows="4" placeholder="How can we help you?" required className="w-full px-4 py-3 rounded-2xl bg-[#F8F5FB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:border-[#FF2E7E]"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
