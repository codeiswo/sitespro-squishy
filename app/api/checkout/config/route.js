import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const settings = await getSettings();
    const enablePayment = settings.enable_payment !== 0 && settings.enable_payment !== '0';
    return NextResponse.json({
      enablePayment,
      paypalClientId: settings.paypal_client_id || '',
      paypalMode: settings.paypal_mode || 'sandbox',
      stripePublishableKey: settings.stripe_publishable_key || '',
      stripeMode: settings.stripe_mode || 'test',
      hasStripeSecret: Boolean(settings.stripe_secret_key),
      siteName: settings.site_name || 'NeeDoh Squishy World',
      siteEmail: settings.site_email || ''
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load checkout config' }, { status: 500 });
  }
}
