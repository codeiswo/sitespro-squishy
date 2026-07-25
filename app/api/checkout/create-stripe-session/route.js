import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';
import siteSettings from '../../../../config/site-settings.json';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const settings = await getSettings();

    // Verify payment enable toggle
    const enablePayment = settings.enable_payment !== 0 && settings.enable_payment !== '0';
    if (!enablePayment) {
      return NextResponse.json({ error: 'Online payment is currently disabled on this store.' }, { status: 400 });
    }

    const stripeSecretKey = settings.stripe_secret_key;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe Secret Key is not configured in Site Settings.' }, { status: 400 });
    }

    const { items } = await request.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let domain = settings.site_url || siteSettings.domain || 'squishyworld.pages.dev';
    if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
      domain = `https://${domain}`;
    }
    const baseUrl = domain.replace(/\/$/, '');

    const params = new URLSearchParams();
    params.append('payment_method_types[0]', 'card');
    params.append('mode', 'payment');
    params.append('success_url', `${baseUrl}/?checkout=success`);
    params.append('cancel_url', `${baseUrl}/?checkout=cancel`);

    items.forEach((item, index) => {
      params.append(`line_items[${index}][price_data][currency]`, 'usd');
      params.append(`line_items[${index}][price_data][product_data][name]`, item.title || 'Product');
      if (item.image_url && item.image_url.startsWith('http')) {
        params.append(`line_items[${index}][price_data][product_data][images][0]`, item.image_url);
      }
      const unitAmount = Math.round((Number(item.price) || 0) * 100);
      params.append(`line_items[${index}][price_data][unit_amount]`, unitAmount.toString());
      params.append(`line_items[${index}][quantity]`, (item.quantity || 1).toString());
    });

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey.trim()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const sessionData = await res.json();
    if (!res.ok || sessionData.error) {
      throw new Error(sessionData.error?.message || 'Failed to create Stripe Checkout session');
    }

    return NextResponse.json({ url: sessionData.url, sessionId: sessionData.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize Stripe payment' }, { status: 500 });
  }
}
