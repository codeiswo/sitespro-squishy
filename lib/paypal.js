import { getSettings } from './db';

async function getPayPalCredentials() {
  const settings = await getSettings();
  const clientId = settings.paypal_client_id;
  const clientSecret = settings.paypal_client_secret;
  const mode = settings.paypal_mode || 'sandbox';

  if (!clientId || !clientSecret) {
    throw new Error('PayPal Client ID or Client Secret is not configured in settings.');
  }

  const baseUrl = mode === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';

  return { clientId, clientSecret, baseUrl };
}

async function getAccessToken(clientId, clientSecret, baseUrl) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to obtain PayPal access token: ${res.statusText} (${res.status}) - ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function createPayPalOrder(items, totalAmount) {
  const { clientId, clientSecret, baseUrl } = await getPayPalCredentials();
  const accessToken = await getAccessToken(clientId, clientSecret, baseUrl);

  const purchaseUnits = [{
    amount: {
      currency_code: 'USD',
      value: totalAmount.toFixed(2),
      breakdown: {
        item_total: {
          currency_code: 'USD',
          value: totalAmount.toFixed(2)
        }
      }
    },
    items: items.map(item => ({
      name: item.title.slice(0, 120),
      sku: item.sku || `SKU-${item.id}`,
      unit_amount: {
        currency_code: 'USD',
        value: item.price.toFixed(2)
      },
      quantity: item.quantity.toString()
    }))
  }];

  const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: purchaseUnits
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create PayPal order: ${res.statusText} (${res.status}) - ${errText}`);
  }

  const data = await res.json();
  return data;
}

export async function capturePayPalOrder(paypalOrderId) {
  const { clientId, clientSecret, baseUrl } = await getPayPalCredentials();
  const accessToken = await getAccessToken(clientId, clientSecret, baseUrl);

  const res = await fetch(`${baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to capture PayPal order ${paypalOrderId}: ${res.statusText} (${res.status}) - ${errText}`);
  }

  const data = await res.json();
  return data;
}
