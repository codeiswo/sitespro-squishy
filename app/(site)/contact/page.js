import { Mail, Clock, Send, MessageCircle, HelpCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
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
  const domain = settings.site_url ? settings.site_url.replace(/^https?:\/\//, '').replace(/\/$/, '') : (siteSettings.domain || 'squishyshop.com');
  const contactEmail = settings.site_email || `info@${domain}`;
  const pageUrl = `${baseUrl}/contact`;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": pageUrl,
    "name": `Contact Us - ${siteName}`,
    "description": `Contact customer support for ${siteName}.`,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": baseUrl
    }
  };

  if (page && page.content && page.content.trim().length > 100) {
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
        <SelectedSinglePage page={page} settings={settings} />
      </>
    );
  }

  const faqs = [
    {
      q: "How do I clean and care for my squishy toy?",
      a: "Wash your squishy with warm water and mild soap, pat dry with a towel, and dust lightly with cornstarch or baby powder to restore its silky texture!"
    },
    {
      q: "Are your squishy toys safe for children?",
      a: "Yes! All of our squishies are made from 100% non-toxic, BPA-free, latex-free materials safe for ages 3+."
    },
    {
      q: "How long does shipping take?",
      a: "Orders are processed within 1-2 business days. Standard delivery usually arrives in 3-5 business days with full tracking provided."
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day money-back guarantee. If you are not 100% satisfied with your squishy, reach out to us for a quick replacement or refund."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="pt-28 pb-20 min-h-screen bg-[#FDF8FA] dark:bg-[#161024]">
        {/* Header */}
        <section className="py-16 text-center border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-4xl">
            <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-3">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              We&apos;re Here to Help!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Have questions about your order, shipping, or squishy care? Send us a message below or check our quick FAQs.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 border-b border-gray-100 dark:border-gray-800">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Support Cards */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF2E7E]/10 flex items-center justify-center text-[#FF2E7E] flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Email Customer Care</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Our squishy care team responds within 24 hours.</p>
                      <a href={`mailto:${contactEmail}`} className="text-[#FF2E7E] font-bold text-sm hover:underline block">{contactEmail}</a>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Support Hours</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monday &ndash; Sunday: 9:00 AM &ndash; 8:00 PM EST</p>
                      <p className="text-xs text-gray-400 mt-1">24/7 Order Processing & Tracking Updates</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Order & Shipping Inquiry</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Need help tracking a package or changing shipping details?</p>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">Hassle-Free 30-Day Guarantee</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
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
                    <textarea rows="4" placeholder="How can we help you with your squishy order?" required className="w-full px-4 py-3 rounded-2xl bg-[#F8F5FB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:border-[#FF2E7E]"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion Block */}
        <section className="pt-16">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#FF2E7E] uppercase tracking-widest block mb-2">Help Center</span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-3 mb-2">
                    <HelpCircle className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{faq.q}</h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
