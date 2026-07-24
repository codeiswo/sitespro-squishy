import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPageById, updatePage, deletePage } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const page = await getPageById(parseInt(id));
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const { id } = await params;
    const data = await request.json();
    await updatePage(parseInt(id), data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const { id } = await params;
    await deletePage(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
