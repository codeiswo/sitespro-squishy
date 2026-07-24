import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const settings = await getSettings();
    return NextResponse.json({
      paypalClientId: settings.paypal_client_id || '',
      paypalMode: settings.paypal_mode || 'sandbox',
      siteName: settings.site_name || 'FiltersPro',
      siteEmail: settings.site_email || ''
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load checkout config' }, { status: 500 });
  }
}
