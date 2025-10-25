# 🚀 Supabase Database Import Guide

**Total**: 1 schema file + 18 data chunks = **192 products**

Each chunk contains **complete product records** (no broken relationships!)

---

## 🔄 Starting Fresh? (Optional)

If you had errors before or want to completely restart:

### Drop All Tables First

1. Open **Supabase SQL Editor**
2. Copy/paste this file:

```
📄 supabase/migrations/000_drop_all_tables.sql
```

3. Click **RUN** ✅

**This will delete ALL product data!** Use this to start completely fresh.

---

## ⚡ Quick Start

### Step 1: Create Database Schema

1. Open: **https://app.supabase.com/**
2. Select project
3. Go to **SQL Editor** → **+ New query**
4. Copy/paste:

```
📄 supabase/migrations/001_create_products_schema.sql
```

5. Click **RUN** ✅

**Expected**: "Success. No rows returned"

---

### Step 2: Import Product Data (18 Parts)

Each part contains **6-14 complete products** with all their variants and images.

**No foreign key errors!** Each chunk is self-contained.

---

## 📂 All 18 Parts

Run these in order (or any order - they're independent!):

### ✅ Part 1/18 — 12 products (92 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_001_of_018.sql
```

### ✅ Part 2/18 — 7 products (99 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_002_of_018.sql
```

### ✅ Part 3/18 — 8 products (89 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_003_of_018.sql
```

### ✅ Part 4/18 — 8 products (93 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_004_of_018.sql
```

### ✅ Part 5/18 — 10 products (95 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_005_of_018.sql
```

### ✅ Part 6/18 — 11 products (95 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_006_of_018.sql
```

### ✅ Part 7/18 — 12 products (96 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_007_of_018.sql
```

### ✅ Part 8/18 — 14 products (99 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_008_of_018.sql
```

### ✅ Part 9/18 — 12 products (92 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_009_of_018.sql
```

### ✅ Part 10/18 — 12 products (99 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_010_of_018.sql
```

### ✅ Part 11/18 — 11 products (92 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_011_of_018.sql
```

### ✅ Part 12/18 — 12 products (96 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_012_of_018.sql
```

### ✅ Part 13/18 — 11 products (98 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_013_of_018.sql
```

### ✅ Part 14/18 — 12 products (95 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_014_of_018.sql
```

### ✅ Part 15/18 — 12 products (91 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_015_of_018.sql
```

### ✅ Part 16/18 — 11 products (91 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_016_of_018.sql
```

### ✅ Part 17/18 — 11 products (97 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_017_of_018.sql
```

### ✅ Part 18/18 (FINAL) — 6 products (38 KB)

```
supabase/migrations/chunks/002_import_haravan_products/
  002_import_haravan_products_part_018_of_018.sql
```

🎉 **Done!** All 192 products imported!

---

## ✅ Verify Import

After running all parts:

1. Go to **Table Editor** in Supabase
2. Check tables:
   - **`products`** → Should have **192 rows**
   - **`product_variants`** → Should have variant data
   - **`product_images`** → Should have image URLs

---

## 🎯 Progress Tracker

```
[ ] (Optional) Drop all tables (000_drop_all_tables.sql)
[ ] Schema Created (001_create_products_schema.sql)
[ ] Part 01/18 (12 products) ✅
[ ] Part 02/18 (7 products) ✅
[ ] Part 03/18 (8 products) ✅
[ ] Part 04/18 (8 products) ✅
[ ] Part 05/18 (10 products) ✅
[ ] Part 06/18 (11 products) ✅
[ ] Part 07/18 (12 products) ✅
[ ] Part 08/18 (14 products) ✅
[ ] Part 09/18 (12 products) ✅
[ ] Part 10/18 (12 products) ✅
[ ] Part 11/18 (11 products) ✅
[ ] Part 12/18 (12 products) ✅
[ ] Part 13/18 (11 products) ✅
[ ] Part 14/18 (12 products) ✅
[ ] Part 15/18 (12 products) ✅
[ ] Part 16/18 (11 products) ✅
[ ] Part 17/18 (11 products) ✅
[ ] Part 18/18 (6 products - FINAL) ✅
[ ] Data Verified ✅
```

---

## 💡 Pro Tips

### Fast Import Method

1. Open file in VS Code
2. `Ctrl+A` → `Ctrl+C`
3. Paste in Supabase SQL Editor
4. Click **RUN**
5. Wait for "Success" ✅

### Time Estimate

- **Schema**: ~5 seconds
- **Each part**: ~10-30 seconds
- **Total**: ~10-12 minutes

### Success Messages

- "Success. No rows returned" ✅
- "Success. X rows affected" ✅

---

## ✨ Why This Works

### Complete Product Records

Each chunk contains:

1. **Product INSERT**
2. **All its variant INSERTs**
3. **All its image INSERTs**

**No split relationships!** No foreign key errors!

### Safe to Run Multiple Times

All INSERTs use:

```sql
ON CONFLICT (haravan_product_id) DO NOTHING
```

**You can re-run any chunk** without creating duplicates.

### Independent Chunks

Technically, you could run chunks in **any order** (though sequential is recommended for tracking).

---

## 🚨 Troubleshooting

### ❌ "null value in column product_id violates not-null constraint"

**This won't happen anymore!** The new splitter keeps products + variants + images together.

### ❌ "Already exists" Error

Schema ran twice. **Safe to ignore**. Continue with data parts.

### ❌ "Duplicate key" Error

Part ran twice. **Safe to ignore**. `ON CONFLICT DO NOTHING` prevents duplicates.

### ❌ "Foreign key violation" Error

Run schema file **FIRST** before any data parts.

---

## 🎉 After Import

```bash
# Start development server
pnpm dev

# Visit http://localhost:3000
```

Your database has **192 products** ready to use! 🚀

---

## 📚 Resources

- **Re-generate chunks**: `pnpm db:split`
- **View this guide**: `pnpm db:guide`
- **Documentation**: `docs/DATABASE_IMPORT.md`
- **Quick start**: `docs/QUICK_START.md`

---

## ✅ What Makes This Better

### Before (Broken) ❌

- Split by line count or statement boundaries
- **Broke product relationships**
- Foreign key errors
- Required specific order

### After (Fixed) ✅

- Split by **complete product blocks**
- **All relationships intact**
- No foreign key errors
- Can run in any order (with schema first)

---

**Confidence: 10/10** - These product-aware chunks will import perfectly! 🎯
