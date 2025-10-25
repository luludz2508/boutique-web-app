-- Drop All Product Tables (Clean Slate)
-- Run this ONLY if you want to completely reset and start over
-- WARNING: This will delete ALL product data!

-- Drop tables in reverse order (children first, then parents)
-- This avoids foreign key constraint issues

-- Drop product-related tables
DROP TABLE IF EXISTS product_certificates CASCADE;
DROP TABLE IF EXISTS product_attributes CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Drop category table
DROP TABLE IF EXISTS categories CASCADE;

-- Drop custom types (enums)
DROP TYPE IF EXISTS product_status CASCADE;
DROP TYPE IF EXISTS inventory_policy CASCADE;

-- Drop the update timestamp function if it exists
DROP FUNCTION IF EXISTS update_timestamp() CASCADE;

-- Verify all tables are dropped
SELECT 
    'All product tables dropped successfully!' AS status,
    COUNT(*) AS remaining_product_tables
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'products', 
    'product_variants', 
    'product_images', 
    'product_attributes',
    'product_certificates',
    'categories'
);

