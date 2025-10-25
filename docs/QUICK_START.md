# 🚀 Quick Start: Database Import

## ✅ What's Been Done

Successfully processed your Haravan product export and created:

- **Database Schema**: PostgreSQL/Supabase tables with bilingual support
- **Import SQL**: Ready-to-execute migration with all 193 products
- **TypeScript Script**: Automated import tool for future updates

## 📊 Import Summary

```
✓ 193 Products
✓ 329 Product Variants
✓ 702 Product Images
✓ Full Vietnamese descriptions
✓ SEO fields populated
✓ Inventory data preserved
```

## 🎯 Next Action: Import to Database

### Quick Import (3 steps)

```bash
# 1. Review the generated SQL
cat supabase/migrations/001_create_products_schema.sql
cat supabase/migrations/002_import_haravan_products.sql

# 2. Execute in your database (choose one method):

## Method A: Supabase CLI
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push

## Method B: Direct SQL (Supabase Dashboard)
# Copy content from migration files and paste into SQL Editor

## Method C: PostgreSQL CLI
psql postgresql://YOUR_CONNECTION_STRING -f supabase/migrations/001_create_products_schema.sql
psql postgresql://YOUR_CONNECTION_STRING -f supabase/migrations/002_import_haravan_products.sql
```

## 📁 Files Created

| File                                                  | Purpose                |
| ----------------------------------------------------- | ---------------------- |
| `supabase/migrations/001_create_products_schema.sql`  | Database schema        |
| `supabase/migrations/002_import_haravan_products.sql` | Product data import    |
| `scripts/import-haravan-products.ts`                  | Reusable import script |
| `docs/products_parsed.json`                           | Parsed data for review |
| `docs/DATABASE_IMPORT.md`                             | Full documentation     |

## 🔄 Re-import Products

When you update products in Haravan:

```bash
# 1. Export new CSV from Haravan
# 2. Save as docs/products_list.csv
# 3. Run import script
pnpm import:haravan
```

This regenerates the SQL migration files.

## 🎨 Frontend Integration

### Example: Fetch Products

```typescript
// Using Supabase client
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get all published products
const { data: products } = await supabase
  .from("products")
  .select(
    `
    *,
    variants:product_variants(*),
    images:product_images(*)
  `
  )
  .eq("status", "published")
  .order("created_at", { ascending: false });

// Get product by slug
const { data: product } = await supabase
  .from("products")
  .select(
    `
    *,
    category:categories(*),
    variants:product_variants(*),
    images:product_images(*),
    attributes:product_attributes(*)
  `
  )
  .eq("slug", "nhang-nu-tram-huong")
  .single();
```

## 📋 Post-Import Checklist

- [ ] Verify all products imported successfully
- [ ] Create product categories
- [ ] Link products to categories
- [ ] Add English translations
- [ ] Review and optimize SEO fields
- [ ] Set featured products
- [ ] Test frontend product display
- [ ] Set up image CDN/optimization

## 🐛 Common Issues

### "relation does not exist"

Run schema migration first (001_create_products_schema.sql)

### "duplicate key value"

Products already exist. Safe to ignore or clear database first.

### Images not loading

Images use Haravan CDN. Check URLs or migrate to your storage.

## 📞 Need Help?

- Full docs: `docs/DATABASE_IMPORT.md`
- Schema details: `docs/database-erd.md`
- Parsed data: `docs/products_parsed.json`

## 🎉 You're Ready!

Your Haravan products are ready to import. Choose your preferred method above and execute the migrations!

