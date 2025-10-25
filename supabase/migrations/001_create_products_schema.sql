-- Create enums
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE inventory_policy AS ENUM ('deny', 'continue');

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_vi TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  description_vi TEXT,
  description_en TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Haravan IDs
  haravan_product_id TEXT UNIQUE,
  
  -- Basic info
  name_vi TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  -- Descriptions
  description_vi TEXT,
  description_en TEXT,
  excerpt_vi TEXT,
  excerpt_en TEXT,
  
  -- SEO
  seo_title_vi TEXT,
  seo_title_en TEXT,
  seo_description_vi TEXT,
  seo_description_en TEXT,
  
  -- Organization
  brand TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  product_type TEXT,
  tags TEXT[],
  
  -- Status
  status product_status DEFAULT 'published',
  featured BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  haravan_created_at TIMESTAMP WITH TIME ZONE,
  haravan_updated_at TIMESTAMP WITH TIME ZONE
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  -- Haravan ID
  haravan_variant_id TEXT UNIQUE,
  
  -- Variant attributes (e.g., Size: 10mm, Color: Red)
  option1_name TEXT,
  option1_value TEXT,
  option2_name TEXT,
  option2_value TEXT,
  option3_name TEXT,
  option3_value TEXT,
  
  -- Pricing
  price DECIMAL(12, 2) NOT NULL,
  compare_at_price DECIMAL(12, 2),
  cost DECIMAL(12, 2),
  
  -- Inventory
  sku TEXT,
  barcode TEXT,
  weight DECIMAL(10, 2),
  weight_unit TEXT DEFAULT 'g',
  inventory_quantity INTEGER DEFAULT 0,
  inventory_policy inventory_policy DEFAULT 'deny',
  track_inventory BOOLEAN DEFAULT TRUE,
  
  -- Fulfillment
  requires_shipping BOOLEAN DEFAULT TRUE,
  taxable BOOLEAN DEFAULT TRUE,
  
  -- Unit conversion
  unit TEXT,
  base_unit TEXT,
  conversion_rate DECIMAL(10, 4),
  sell_by_unit BOOLEAN DEFAULT FALSE,
  
  -- Display
  position INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  
  url TEXT NOT NULL,
  alt_text_vi TEXT,
  alt_text_en TEXT,
  position INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product attributes table (flexible key-value pairs)
CREATE TABLE IF NOT EXISTS product_attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  key_vi TEXT NOT NULL,
  key_en TEXT,
  value_vi TEXT NOT NULL,
  value_en TEXT,
  position INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS product_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  name_vi TEXT NOT NULL,
  name_en TEXT,
  description_vi TEXT,
  description_en TEXT,
  image_url TEXT,
  issued_by TEXT,
  issued_date DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_haravan_id ON products(haravan_product_id);

CREATE INDEX idx_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_variants_sku ON product_variants(sku);
CREATE INDEX idx_variants_haravan_id ON product_variants(haravan_variant_id);

CREATE INDEX idx_images_product_id ON product_images(product_id);
CREATE INDEX idx_images_variant_id ON product_images(variant_id);

CREATE INDEX idx_attributes_product_id ON product_attributes(product_id);
CREATE INDEX idx_certificates_product_id ON product_certificates(product_id);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON product_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attributes_updated_at BEFORE UPDATE ON product_attributes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON product_certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


