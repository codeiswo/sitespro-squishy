import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { updateRedirect, deleteRedirect } from '@/lib/db';

export const runtime = 'edge';

export async function PUT(request, { params }) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const { id } = await params;
    const data = await request.json();
    await updateRedirect(parseInt(id), data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update redirect' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) return NextResponse.json({ error: auth.error }, { status: 401 });

  try {
    const { id } = await params;
    await deleteRedirect(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete redirect' }, { status: 500 });
  }
}
