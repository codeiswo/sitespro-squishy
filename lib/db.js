import { getRequestContext } from '@cloudflare/next-on-pages';

function getDB() {
  try {
    const { env } = getRequestContext();
    return env.DB;
  } catch {
    return null;
  }
}

// ============================================
// Products
// ============================================

export async function getProducts({ page = 1, limit = 12, category, brand, search, sort = 'sort_order', featured } = {}) {
  const db = getDB();
  if (!db) return { products: [], total: 0, page, limit };

  let where = ['is_active = 1'];
  const params = [];

  if (category) {
    where.push('category = ?');
    params.push(category);
  }
  if (brand) {
    where.push('brand = ?');
    params.push(brand);
  }
  if (search) {
    where.push('(title LIKE ? OR description LIKE ? OR brand LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (featured) {
    where.push('is_featured = 1');
  }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  let orderClause = 'ORDER BY sort_order ASC';
  if (sort === 'price_asc') orderClause = 'ORDER BY price ASC';
  else if (sort === 'price_desc') orderClause = 'ORDER BY price DESC';
  else if (sort === 'newest') orderClause = 'ORDER BY created_at DESC';
  else if (sort === 'title') orderClause = 'ORDER BY title ASC';

  const offset = (page - 1) * limit;

  const countResult = await db.prepare(`SELECT COUNT(*) as total FROM products ${whereClause}`).bind(...params).first();
  const total = countResult?.total || 0;

  const products = await db.prepare(
    `SELECT * FROM products ${whereClause} ${orderClause} LIMIT ? OFFSET ?`
  ).bind(...params, limit, offset).all();

  return { products: products.results || [], total, page, limit };
}

export async function getProductBySlug(slug) {
  const db = getDB();
  if (!db) return null;
  return await db.prepare('SELECT * FROM products WHERE slug = ? AND is_active = 1').bind(slug).first();
}

export async function getProductById(id) {
  const db = getDB();
  if (!db) return null;
  return await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
}

export async function getAllProducts({ includeInactive = false } = {}) {
  const db = getDB();
  if (!db) return [];
  const where = includeInactive ? '' : 'WHERE is_active = 1';
  const result = await db.prepare(`SELECT * FROM products ${where} ORDER BY sort_order ASC`).all();
  return result.results || [];
}

export async function createProduct(data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  const result = await db.prepare(
    `INSERT INTO products (title, slug, description, content, price, compare_price, category, brand, sku, image_url, gallery, compatible_models, features, meta_title, meta_description, is_featured, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    data.title, data.slug, data.description || '', data.content || '',
    data.price || 0, data.compare_price || null,
    data.category || 'Refrigerator Water Filters', data.brand || '',
    data.sku || '', data.image_url || '',
    JSON.stringify(data.gallery || []),
    JSON.stringify(data.compatible_models || []),
    JSON.stringify(data.features || []),
    data.meta_title || data.title, data.meta_description || data.description || '',
    data.is_featured ? 1 : 0, data.is_active !== false ? 1 : 0,
    data.sort_order || 0
  ).run();

  return result;
}

export async function updateProduct(id, data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  const fields = [];
  const values = [];

  const allowedFields = ['title', 'slug', 'description', 'content', 'price', 'compare_price', 'category', 'brand', 'sku', 'image_url', 'meta_title', 'meta_description', 'is_featured', 'is_active', 'sort_order'];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(data[field]);
    }
  }

  // Handle JSON fields
  if (data.gallery !== undefined) {
    fields.push('gallery = ?');
    values.push(JSON.stringify(data.gallery));
  }
  if (data.compatible_models !== undefined) {
    fields.push('compatible_models = ?');
    values.push(JSON.stringify(data.compatible_models));
  }
  if (data.features !== undefined) {
    fields.push('features = ?');
    values.push(JSON.stringify(data.features));
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  return await db.prepare(
    `UPDATE products SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
}

export async function deleteProduct(id) {
  const db = getDB();
  if (!db) throw new Error('Database not available');
  return await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
}

export async function batchUpdateProducts(ids, data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');
  if (!Array.isArray(ids) || ids.length === 0) return null;

  let field = '';
  let value = null;
  if (data.is_active !== undefined) {
    field = 'is_active';
    value = data.is_active ? 1 : 0;
  } else if (data.is_featured !== undefined) {
    field = 'is_featured';
    value = data.is_featured ? 1 : 0;
  } else {
    throw new Error('Unsupported batch update field');
  }

  const placeholders = ids.map(() => '?').join(', ');
  const sql = `UPDATE products SET ${field} = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`;
  return await db.prepare(sql).bind(value, ...ids).run();
}

export async function batchDeleteProducts(ids) {
  const db = getDB();
  if (!db) throw new Error('Database not available');
  if (!Array.isArray(ids) || ids.length === 0) return null;

  const placeholders = ids.map(() => '?').join(', ');
  const sql = `DELETE FROM products WHERE id IN (${placeholders})`;
  return await db.prepare(sql).bind(...ids).run();
}

// ============================================
// Pages
// ============================================

export async function getPages({ published = true } = {}) {
  const db = getDB();
  if (!db) return [];
  const where = published ? 'WHERE is_published = 1' : '';
  const result = await db.prepare(`SELECT * FROM pages ${where} ORDER BY sort_order ASC`).all();
  return result.results || [];
}

export async function getPageBySlug(slug) {
  const db = getDB();
  if (!db) return null;
  return await db.prepare('SELECT * FROM pages WHERE slug = ? AND is_published = 1').bind(slug).first();
}

export async function getPageById(id) {
  const db = getDB();
  if (!db) return null;
  return await db.prepare('SELECT * FROM pages WHERE id = ?').bind(id).first();
}

export async function createPage(data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  return await db.prepare(
    `INSERT INTO pages (title, slug, content, meta_title, meta_description, template, is_published, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    data.title, data.slug, data.content || '',
    data.meta_title || data.title, data.meta_description || '',
    data.template || 'default', data.is_published ? 1 : 0,
    data.sort_order || 0
  ).run();
}

export async function updatePage(id, data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  const fields = [];
  const values = [];

  const allowedFields = ['title', 'slug', 'content', 'meta_title', 'meta_description', 'template', 'is_published', 'sort_order'];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(data[field]);
    }
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  return await db.prepare(
    `UPDATE pages SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
}

export async function deletePage(id) {
  const db = getDB();
  if (!db) throw new Error('Database not available');
  return await db.prepare('DELETE FROM pages WHERE id = ?').bind(id).run();
}

// ============================================
// Redirects
// ============================================

export async function getRedirects({ activeOnly = false } = {}) {
  const db = getDB();
  if (!db) return [];
  const where = activeOnly ? 'WHERE is_active = 1' : '';
  const result = await db.prepare(`SELECT * FROM redirects ${where} ORDER BY created_at DESC`).all();
  return result.results || [];
}

export async function getRedirectBySource(sourcePath) {
  const db = getDB();
  if (!db) return null;
  return await db.prepare('SELECT * FROM redirects WHERE source_path = ? AND is_active = 1').bind(sourcePath).first();
}

export async function createRedirect(data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  return await db.prepare(
    'INSERT INTO redirects (source_path, target_url, status_code, is_active) VALUES (?, ?, ?, ?)'
  ).bind(data.source_path, data.target_url, data.status_code || 301, data.is_active !== false ? 1 : 0).run();
}

export async function updateRedirect(id, data) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  const fields = [];
  const values = [];

  if (data.source_path !== undefined) { fields.push('source_path = ?'); values.push(data.source_path); }
  if (data.target_url !== undefined) { fields.push('target_url = ?'); values.push(data.target_url); }
  if (data.status_code !== undefined) { fields.push('status_code = ?'); values.push(data.status_code); }
  if (data.is_active !== undefined) { fields.push('is_active = ?'); values.push(data.is_active ? 1 : 0); }

  values.push(id);

  return await db.prepare(
    `UPDATE redirects SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
}

export async function deleteRedirect(id) {
  const db = getDB();
  if (!db) throw new Error('Database not available');
  return await db.prepare('DELETE FROM redirects WHERE id = ?').bind(id).run();
}

// ============================================
// Settings
// ============================================

export async function getSetting(key) {
  const db = getDB();
  if (!db) return null;
  const result = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first();
  return result?.value || null;
}

export async function getSettings() {
  const db = getDB();
  if (!db) return {};
  const result = await db.prepare('SELECT * FROM settings').all();
  const settings = {};
  for (const row of (result.results || [])) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function setSetting(key, value) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  return await db.prepare(
    'INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)'
  ).bind(key, value).run();
}

// ============================================
// Stats (for admin dashboard)
// ============================================

export async function getStats() {
  const db = getDB();
  if (!db) return { products: 0, pages: 0, redirects: 0 };

  const [products, pages, redirects] = await Promise.all([
    db.prepare('SELECT COUNT(*) as count FROM products').first(),
    db.prepare('SELECT COUNT(*) as count FROM pages WHERE is_published = 1').first(),
    db.prepare('SELECT COUNT(*) as count FROM redirects WHERE is_active = 1').first(),
  ]);

  return {
    products: products?.count || 0,
    pages: pages?.count || 0,
    redirects: redirects?.count || 0,
  };
}

// ============================================
// Orders
// ============================================

export async function createOrder(orderData) {
  const db = getDB();
  if (!db) throw new Error('Database not available');

  // Verify / Auto-create orders table
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE,
      customer_name TEXT,
      customer_email TEXT,
      shipping_address TEXT,
      total_amount REAL,
      currency TEXT DEFAULT 'USD',
      payment_status TEXT,
      payment_method TEXT,
      items TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  return await db.prepare(`
    INSERT INTO orders (order_id, customer_name, customer_email, shipping_address, total_amount, currency, payment_status, payment_method, items)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    orderData.order_id,
    orderData.customer_name,
    orderData.customer_email,
    JSON.stringify(orderData.shipping_address),
    orderData.total_amount,
    orderData.currency || 'USD',
    orderData.payment_status || 'paid',
    orderData.payment_method || 'paypal',
    JSON.stringify(orderData.items)
  ).run();
}

export async function getOrders({ page = 1, limit = 20 } = {}) {
  const db = getDB();
  if (!db) return [];

  // Verify / Auto-create orders table
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE,
      customer_name TEXT,
      customer_email TEXT,
      shipping_address TEXT,
      total_amount REAL,
      currency TEXT DEFAULT 'USD',
      payment_status TEXT,
      payment_method TEXT,
      items TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const offset = (page - 1) * limit;
  const result = await db.prepare(
    'SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).bind(limit, offset).all();

  return result.results || [];
}
