# Database Import Guide

This guide explains how to import Haravan product data into your database.

## Overview

We have successfully parsed the Haravan product export and generated SQL migrations to import:

- **193 products**
- **329 product variants**
- **702 product images**

## Database Schema

The database schema is based on the Entity-Relationship Diagram in `database-erd.md` and includes:

### Tables

1. **categories** - Product categories with bilingual support
2. **products** - Main product information
3. **product_variants** - Product variations (size, color, etc.)
4. **product_images** - Product images with positioning
5. **product_attributes** - Flexible key-value product attributes
6. **product_certificates** - Product certifications and authenticity

### Key Features

- ✅ Bilingual support (Vietnamese & English)
- ✅ SEO fields (meta titles, descriptions)
- ✅ Inventory management
- ✅ Multi-variant support
- ✅ Image management with positioning
- ✅ Flexible attributes system
- ✅ UUID primary keys
- ✅ Automatic timestamp management
- ✅ Proper indexing for performance

## Files Generated

### 1. Schema Migration

**Location:** `supabase/migrations/001_create_products_schema.sql`

Creates all necessary tables, indexes, and triggers.

### 2. Data Import Migration

**Location:** `supabase/migrations/002_import_haravan_products.sql`

Contains INSERT statements for all 193 products with their variants and images.

### 3. Parsed JSON

**Location:** `docs/products_parsed.json`

JSON representation of all parsed products for review.

## Haravan CSV Structure

The Haravan export includes these key fields:

| Vietnamese Column | Purpose               |
| ----------------- | --------------------- |
| Mã sản phẩm       | Product ID            |
| Mã biến thể       | Variant ID            |
| Tên               | Product Name          |
| Mô tả             | Full HTML Description |
| Giá               | Price                 |
| Số lượng tồn kho  | Inventory Quantity    |
| Link hình         | Image URL             |
| Tag               | Product Tags          |

## Import Steps

### Option 1: Using Supabase CLI (Recommended)

```bash
# Initialize Supabase (if not done)
npx supabase init

# Link to your project
npx supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
npx supabase db push
```

### Option 2: Manual SQL Execution

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy content from `001_create_products_schema.sql`
4. Execute
5. Copy content from `002_import_haravan_products.sql`
6. Execute

### Option 3: Using psql

```bash
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/001_create_products_schema.sql
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/002_import_haravan_products.sql
```

## Re-running the Import Script

If you need to re-generate the migration files:

```bash
pnpm import:haravan
```

This will:

1. Parse `docs/products_list.csv`
2. Generate SQL migration files
3. Create JSON output for review

## Data Mapping

### Product

- Haravan ID preserved for reference
- Vietnamese content stored in `*_vi` fields
- English fields (`*_en`) ready for translation
- SEO fields populated from Haravan
- Tags stored as PostgreSQL array

### Variants

- Each product size/color becomes a variant
- Price and inventory tracked per variant
- SKU and barcode supported
- Unit conversion fields included

### Images

- Multiple images per product
- Primary image flagged
- Position ordering maintained
- Alt text for accessibility

## Sample Product Structure

```json
{
  "haravan_product_id": "1042760692",
  "name_vi": "NHANG NỤ TRẦM HƯƠNG KHÓI NGƯỢC CAO CẤP",
  "brand": "SƠN HỒNG",
  "product_type": "NHANG",
  "tags": ["Bestseller", "nhang"],
  "variants": [
    {
      "price": 390000,
      "inventory_quantity": 989,
      "sku": "NN50G0001"
    }
  ],
  "images": [
    {
      "url": "https://product.hstatic.net/...",
      "position": 1,
      "is_primary": true
    }
  ]
}
```

## Next Steps

After importing:

1. **Add English Translations**

   - Update `name_en`, `description_en` fields
   - Translate product attributes

2. **Create Categories**

   - Insert categories based on `product_type`
   - Link products to categories

3. **Add Certificates**

   - Extract certificate images from descriptions
   - Create certificate records

4. **Optimize SEO**

   - Review and enhance SEO titles/descriptions
   - Add meta keywords

5. **Set Featured Products**
   - Mark bestsellers as featured
   - Order homepage display

## Troubleshooting

### Duplicate Key Errors

If you see "duplicate key" errors, the products already exist. The script uses `ON CONFLICT DO NOTHING` to handle this gracefully.

### Missing Categories

Products import without category assignment. Create categories separately and update products afterward.

### Image Loading Issues

All images use Haravan's CDN. Ensure URLs are accessible. Consider migrating to your own storage (Supabase Storage or Cloudinary).

## Database Maintenance

### Reindex

```sql
REINDEX DATABASE postgres;
```

### Update Statistics

```sql
ANALYZE products;
ANALYZE product_variants;
ANALYZE product_images;
```

### Check Data Quality

```sql
-- Products without variants
SELECT * FROM products p
LEFT JOIN product_variants pv ON p.id = pv.product_id
WHERE pv.id IS NULL;

-- Products without images
SELECT * FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE pi.id IS NULL;
```

## Support

For issues or questions:

1. Review the generated `products_parsed.json`
2. Check SQL migration files for errors
3. Verify CSV format matches expected structure
4. Consult `database-erd.md` for schema details

