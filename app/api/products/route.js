import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getProducts, getAllProducts, createProduct, batchUpdateProducts, batchDeleteProducts } from '@/lib/db';
import { slugify } from '@/lib/utils';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const brand = searchParams.get('brand') || '';
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'sort_order';
    const all = searchParams.get('all');

    if (all) {
      const products = await getAllProducts({ includeInactive: true });
      return NextResponse.json({ products });
    }

    const result = await getProducts({ page, limit, brand, category, search, sort });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
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
    const result = await createProduct(data);
    return NextResponse.json({ success: true, id: result.meta?.last_row_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { ids, is_active, is_featured } = data;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'IDs array is required' }, { status: 400 });
    }

    if (is_active === undefined && is_featured === undefined) {
      return NextResponse.json({ error: 'At least one field is required' }, { status: 400 });
    }

    const payload = {};
    if (is_active !== undefined) payload.is_active = is_active;
    if (is_featured !== undefined) payload.is_featured = is_featured;

    await batchUpdateProducts(ids, payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to update products' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const auth = await requireAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { ids } = data;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'IDs array is required' }, { status: 400 });
    }

    await batchDeleteProducts(ids);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Failed to delete products' }, { status: 500 });
  }
}
