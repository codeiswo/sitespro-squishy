import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSettings, setSetting } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const data = await request.json();
    for (const [key, value] of Object.entries(data)) {
      await setSetting(key, value);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
