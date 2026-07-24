import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getRedirects, createRedirect } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const redirects = await getRedirects();
    return NextResponse.json({ redirects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch redirects' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.source_path || !data.target_url) {
      return NextResponse.json({ error: 'Source path and target URL are required' }, { status: 400 });
    }
    const result = await createRedirect(data);
    return NextResponse.json({ success: true, id: result.meta?.last_row_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create redirect' }, { status: 500 });
  }
}
