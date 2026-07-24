import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPages, createPage } from '@/lib/db';
import { slugify } from '@/lib/utils';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const pages = await getPages({ published: !all });
    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    data.slug = data.slug || slugify(data.title);
    const result = await createPage(data);
    return NextResponse.json({ success: true, id: result.meta?.last_row_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
