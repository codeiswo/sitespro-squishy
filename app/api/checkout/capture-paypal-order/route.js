import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { createOrder } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const { orderId, items } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items list is required to log order' }, { status: 400 });
    }

    // Call PayPal capture service
    const captureResult = await capturePayPalOrder(orderId);

    if (captureResult.status !== 'COMPLETED') {
      return NextResponse.json({ 
        error: `Payment capture unsuccessful. Status: ${captureResult.status}` 
      }, { status: 400 });
    }

    // Extract customer and shipping info from PayPal response
    const payer = captureResult.payer || {};
    const shipping = captureResult.purchase_units?.[0]?.shipping || {};
    const shippingAddress = shipping.address || {};

    const orderData = {
      order_id: captureResult.id,
      customer_name: shipping.name?.full_name || `${payer.name?.given_name || ''} ${payer.name?.surname || ''}`.trim() || 'Guest Customer',
      customer_email: payer.email_address || 'unknown@paypal.com',
      shipping_address: {
        recipient_name: shipping.name?.full_name || '',
        line1: shippingAddress.address_line_1 || '',
        line2: shippingAddress.address_line_2 || '',
        city: shippingAddress.admin_area_2 || '',
        state: shippingAddress.admin_area_1 || '',
        postal_code: shippingAddress.postal_code || '',
        country_code: shippingAddress.country_code || ''
      },
      total_amount: parseFloat(captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || '0'),
      currency: captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code || 'USD',
      payment_status: 'paid',
      payment_method: 'paypal',
      items: items // Log validated item details
    };

    // Save order details to SQLite/D1 database
    await createOrder(orderData);

    return NextResponse.json({
      success: true,
      order: {
        id: orderData.order_id,
        customerName: orderData.customer_name,
        totalAmount: orderData.total_amount
      }
    });
  } catch (error) {
    console.error('Capture PayPal order error:', error);
    return NextResponse.json({ error: error.message || 'Failed to capture PayPal order' }, { status: 500 });
  }
}
