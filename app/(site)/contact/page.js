import { Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { getPageBySlug, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let page;
  try { page = await getPageBySlug('contact'); } catch { page = null; }

  return {
    title: page?.meta_title || page?.title || 'Contact Us',
    description: page?.meta_description || 'Contact FiltersPro for questions about refrigerator water filter replacements, orders, or wholesale inquiries.',
  };
}

export default async function ContactPage() {
  let page;
  try { page = await getPageBySlug('contact'); } catch { page = null; }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}

  // If dynamic page content exists in the DB, render it with the active theme layout
  if (page && page.content && page.content.trim().length > 0) {
    const theme = settings.site_theme || 'default';
    const archetype = getThemeArchetype(theme);

    let SelectedSinglePage;
    if (archetype === 'minimalist') SelectedSinglePage = MinimalistTheme.SinglePage;
    else if (archetype === 'futuristic') SelectedSinglePage = FuturisticTheme.SinglePage;
    else if (archetype === 'luxury') SelectedSinglePage = LuxuryTheme.SinglePage;
    else SelectedSinglePage = ClassicTheme.SinglePage;

    return <SelectedSinglePage page={page} />;
  }

  // Fallback to default contact page with contact form
  const contactEmail = settings.site_email || 'info@filterspro.com';

  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface dark:bg-surface-dark">
      {/* Hero */}
      <section className="py-16 md:py-20 text-center">
        <div className="container-custom">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a question about water filters or need help finding the right replacement? We&apos;re here to help.
          </p>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, title: 'Email Us', detail: contactEmail, sub: 'We respond within 24 hours' },
              { icon: Clock, title: 'Business Hours', detail: 'Mon - Fri, 9AM - 6PM EST', sub: 'Weekend: Limited support' },
              { icon: MessageCircle, title: 'Live Support', detail: 'Available on business days', sub: 'Quick answers to your questions' },
            ].map(({ icon: Icon, title, detail, sub }) => (
              <div key={title} className="card-premium p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary dark:text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="card-premium p-8 rounded-2xl">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
              <form className="space-y-5" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                  <select
                    id="contact-subject"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  >
                    <option>Product Inquiry</option>
                    <option>Order Status</option>
                    <option>Wholesale Inquiry</option>
                    <option>Returns & Refunds</option>
                    <option>General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-fridge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Refrigerator Model (Optional)</label>
                  <input
                    id="contact-fridge"
                    type="text"
                    placeholder="e.g., Samsung RF28HMEDBSR"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className="btn-primary w-full text-center py-4 text-lg cursor-pointer"
                >
                  <Send className="w-5 h-5 inline mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
