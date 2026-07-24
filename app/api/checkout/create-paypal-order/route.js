import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/db';
import { createPayPalOrder } from '@/lib/paypal';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Recalculate price and fetch items description from database
    const validatedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await getProductById(item.id);
      if (!product || product.is_active === 0) {
        return NextResponse.json({ error: `Product not found or inactive: ${item.title || item.id}` }, { status: 400 });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        sku: product.sku,
        quantity: item.quantity
      });
    }

    // Call PayPal service
    const paypalOrder = await createPayPalOrder(validatedItems, totalAmount);

    return NextResponse.json({
      orderId: paypalOrder.id,
      totalAmount
    });
  } catch (error) {
    console.error('Create PayPal order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create PayPal order' }, { status: 500 });
  }
}
