-- SitesPro Squishy Database Schema & Seed Data
-- Cloudflare D1 (SQLite)

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  price REAL,
  compare_price REAL,
  category TEXT DEFAULT 'Sensory & Squishy Toys',
  brand TEXT,
  sku TEXT,
  image_url TEXT,
  gallery TEXT DEFAULT '[]',
  compatible_models TEXT DEFAULT '[]',
  features TEXT DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CMS 页面表
CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  template TEXT DEFAULT 'default',
  is_published INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- URL 转发规则表
CREATE TABLE IF NOT EXISTS redirects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_path TEXT NOT NULL,
  target_url TEXT NOT NULL,
  status_code INTEGER DEFAULT 301,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 网站设置表
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects(source_path);
CREATE INDEX IF NOT EXISTS idx_redirects_is_active ON redirects(is_active);

-- ============================================
-- 初始设置
-- ============================================
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_name', 'NeeDoh Squishy World');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_tagline', 'Super Dough-y, Ultra-Satisfying Sensory & Stress Relief Squishies');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_theme', 'gummy');
INSERT OR IGNORE INTO settings (key, value) VALUES ('site_email', 'support@needohsquishy.com');
INSERT OR IGNORE INTO settings (key, value) VALUES ('admin_password', 'dl0101');

-- ============================================
-- 示例产品数据 (Squishy & Sensory Toys)
-- ============================================

INSERT OR IGNORE INTO products (title, slug, description, content, price, compare_price, category, brand, sku, image_url, gallery, compatible_models, features, meta_title, meta_description, is_featured, is_active, sort_order) VALUES
('NeeDoh Groovy Glob Squishy Stress Ball', 'needoh-groovy-glob-squishy', 'The original Groovy Glob stress ball! Squeeze it, smush it, or pinch it - it always returns to its original shape.', '<h2>The Groovy Glob That Started It All</h2><p>NeeDoh Groovy Glob is the ultimate tactile sensory stress ball. Filled with a super dough-y compound, it provides irresistible tactile feedback that calms minds and promotes focus.</p>', 12.99, 18.99, 'Squishy Stress Toys', 'NeeDoh', 'ND-GLOB-01', 'https://placehold.co/600x600/FF2E7E/FFFFFF?text=NeeDoh+Squishy', '[]', '[]', '["Super Dough-y Core","ASMR Approved","Non-Toxic & Washable","Stress Relief Certified"]', 'NeeDoh Groovy Glob Squishy | Ultra Dough-y Stress Ball', 'Shop the original NeeDoh Groovy Glob squishy stress ball. Super dough-y feel, non-toxic, and washable.', 1, 1, 1),

('NeeDoh Nice Cube Clear Gel Stress Toy', 'needoh-nice-cube-sensory-gel', 'Translucent ice-cube feel with dense gel filling. Provides deep muscle resistance and crystal-clear tactile satisfaction.', '<h2>Translucent Nice Cube Gel Experience</h2><p>NeeDoh Nice Cube features a dense clear gel core housed in a flexible translucent cube skin. Squeeze it for a firm, satisfying resistance that helps relieve tension instantly.</p>', 14.99, 21.99, 'Sensory Gel Cubes', 'NeeDoh', 'ND-NC-02', 'https://placehold.co/600x600/8B5CF6/FFFFFF?text=NeeDoh+Nice+Cube', '[]', '[]', '["Clear Gel Core","Nice Cube Texture","Firm Resistance","Cool Touch"]', 'NeeDoh Nice Cube Gel Squishy | Translucent Sensory Toy', 'Shop NeeDoh Nice Cube clear gel stress toy. Translucent cube texture with firm gel resistance.', 1, 1, 2),

('NeeDoh Ice Cube Cool Touch Squishy', 'needoh-ice-cube-cool-touch', 'Cool touch crystal ice feel squishy cube. Instant shape return with ultra-refreshing tactile response.', '<h2>Refreshing Cool-Touch Ice Cube</h2><p>Feel the cool soothing sensation of the NeeDoh Ice Cube. Designed with temperature-sensitive flexible polymers that stay cool to the touch during use.</p>', 15.99, 22.99, 'Sensory Gel Cubes', 'NeeDoh', 'ND-IC-03', 'https://placehold.co/600x600/06B4D8/FFFFFF?text=NeeDoh+Ice+Cube', '[]', '[]', '["Cool Touch Polymer","Crystal Ice Feel","Instant Return","Desk Focus Tool"]', 'NeeDoh Ice Cube Squishy | Cool Touch Sensory Cube', 'Buy NeeDoh Ice Cube cool touch squishy. Features crystal ice feel and instant shape recovery.', 1, 1, 3),

('Realistic Stretchy Cheese Squishy Toy', 'stretchy-cheese-squishy-toy', 'Ultra-soft slow rise air-injected foam cheese squishy with realistic holes and stretchy dough texture.', '<h2>Stretchy & Slow-Rising Cheese Squishy</h2><p>Looks like real Swiss cheese, squishes like a dream! Made with air-injected memory foam that stretches up to 3x its size and slowly returns to shape.</p>', 11.99, 16.99, 'Food Squishies', 'Sensory Fun', 'SQ-CHEESE-04', 'https://placehold.co/600x600/FACC15/FFFFFF?text=Cheese+Squishy', '[]', '[]', '["Slow Rise Foam","Stretchy Swiss Texture","Ultra-Soft Melt","Super Lightweight"]', 'Realistic Stretchy Cheese Squishy Toy | Slow-Rise Fidget', 'Get the ultra-soft realistic Cheese Squishy toy. Features slow-rise memory foam and stretchy texture.', 1, 1, 4);

-- ============================================
-- 示例页面
-- ============================================

INSERT OR IGNORE INTO pages (title, slug, content, meta_title, meta_description, template, is_published, sort_order) VALUES
('Privacy Policy', 'privacy-policy', '<h1>Privacy Policy</h1><p>We respect your privacy and protect your customer information during checkout and browsing.</p>', 'Privacy Policy | NeeDoh Squishy World', 'Privacy Policy for NeeDoh Squishy World.', 'default', 1, 1),
('Terms of Service', 'terms-of-service', '<h1>Terms of Service</h1><p>Welcome to NeeDoh Squishy World. All products carry a 30-day money back guarantee.</p>', 'Terms of Service | NeeDoh Squishy World', 'Terms of Service for NeeDoh Squishy World.', 'default', 1, 2),
('Shipping Policy', 'shipping-policy', '<h1>Shipping Policy</h1><p>Free standard shipping on all orders over $35. Dispatched within 1 business day.</p>', 'Shipping Policy | NeeDoh Squishy World', 'Shipping Policy for NeeDoh Squishy World.', 'default', 1, 3),
('About Us', 'about', '<h2>About Our Squishy Mission</h2><p>We bring you the softest, most satisfying NeeDoh Squishies, Nice Cubes, Ice Cubes, and Cheese Squishies to relieve stress and brighten your day!</p>', 'About Us | NeeDoh Squishy World', 'Learn about NeeDoh Squishy World.', 'default', 1, 4),
('Contact Us', 'contact', '<h2>Get In Touch</h2><p>Email: support@needohsquishy.com</p><p>Hours: Mon - Fri, 9am - 6pm EST</p>', 'Contact Us | NeeDoh Squishy World', 'Contact customer support for NeeDoh Squishy World.', 'default', 1, 5);
