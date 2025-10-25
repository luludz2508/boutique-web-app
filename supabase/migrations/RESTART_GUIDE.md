# 🔄 Complete Database Reset Guide

Use this guide if you want to completely drop everything and start fresh.

---

## ⚠️ WARNING

**This will delete ALL product data permanently!**

Only use this if:

- You had import errors and want to start over
- You want to re-import from scratch
- You're testing the import process

---

## 🚀 Quick Reset (3 Steps)

### Step 1: Drop All Tables

1. Open **https://app.supabase.com/**
2. Select your project
3. Go to **SQL Editor** → **+ New query**
4. Copy/paste this entire file:

```
📄 supabase/migrations/000_drop_all_tables.sql
```

5. Click **RUN** ✅

**Expected Result:**

```
status: All product tables dropped successfully!
remaining_product_tables: 0
```

---

### Step 2: Create Fresh Schema

Now create the tables again:

1. In **SQL Editor**, create another new query
2. Copy/paste:

```
📄 supabase/migrations/001_create_products_schema.sql
```

3. Click **RUN** ✅

**Expected**: "Success. No rows returned"

---

### Step 3: Import Product Data

Follow the main import guide:

```
📖 supabase/migrations/IMPORT_ORDER.md
```

Run parts 1-18 in order.

---

## 🎯 Complete Checklist

```
Step 1: Clean Slate
[ ] Drop all tables (000_drop_all_tables.sql) ✅
[ ] Verify 0 remaining tables ✅

Step 2: Schema
[ ] Create schema (001_create_products_schema.sql) ✅
[ ] Verify tables created ✅

Step 3: Data Import
[ ] Part 01/18 ✅
[ ] Part 02/18 ✅
[ ] Part 03/18 ✅
[ ] Part 04/18 ✅
[ ] Part 05/18 ✅
[ ] Part 06/18 ✅
[ ] Part 07/18 ✅
[ ] Part 08/18 ✅
[ ] Part 09/18 ✅
[ ] Part 10/18 ✅
[ ] Part 11/18 ✅
[ ] Part 12/18 ✅
[ ] Part 13/18 ✅
[ ] Part 14/18 ✅
[ ] Part 15/18 ✅
[ ] Part 16/18 ✅
[ ] Part 17/18 ✅
[ ] Part 18/18 (FINAL) ✅

Step 4: Verify
[ ] Check products table (should have 192 rows) ✅
[ ] Check product_variants table ✅
[ ] Check product_images table ✅
```

---

## 💡 Pro Tips

### Verify Tables Were Dropped

After running `000_drop_all_tables.sql`, check in **Table Editor**:

- No `products` table
- No `product_variants` table
- No `product_images` table

If you still see them, run the drop script again.

### Fresh Import Benefits

- No duplicate key errors
- No partial data from failed imports
- Clean slate for testing
- Proper foreign key relationships

### Quick Command Reference

```bash
# Schema only (no data)
# Run: 001_create_products_schema.sql

# Full reset + import
# 1. Run: 000_drop_all_tables.sql
# 2. Run: 001_create_products_schema.sql
# 3. Run: parts 001-018
```

---

## 🚨 Troubleshooting

### "Table does not exist" error

**Good!** This means tables are already dropped. Skip to Step 2 (create schema).

### "Cannot drop table because other objects depend on it"

The script uses `CASCADE` which should handle this. If it still fails:

1. Drop tables manually in Table Editor
2. Or run the drop script multiple times

### Still seeing old data

Make sure you're looking at the correct Supabase project. Check the project URL matches your `.env.local`.

---

## 🎉 After Reset

Once complete, you'll have:

- ✅ Clean database schema
- ✅ 192 products imported
- ✅ All variants and images
- ✅ No errors or duplicates

Ready to build your frontend! 🚀

---

## 📚 Related Guides

- **Main import guide**: `IMPORT_ORDER.md`
- **Database schema**: `001_create_products_schema.sql`
- **Drop script**: `000_drop_all_tables.sql`
- **Project docs**: `docs/DATABASE_IMPORT.md`

