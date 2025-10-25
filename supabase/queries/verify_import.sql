    -- Verify Product Data Import
    -- Run this in Supabase SQL Editor to check your data

    -- Count all records
    SELECT 
    'products' as table_name,
    COUNT(*) as record_count
    FROM products
    UNION ALL
    SELECT 
    'product_variants',
    COUNT(*)
    FROM product_variants
    UNION ALL
    SELECT 
    'product_images',
    COUNT(*)
    FROM product_images
    UNION ALL
    SELECT 
    'categories',
    COUNT(*)
    FROM categories;

    -- Sample product with variants and images
    SELECT 
    p.name_vi as product_name,
    p.brand,
    p.product_type,
    p.status,
    COUNT(DISTINCT pv.id) as variant_count,
    COUNT(DISTINCT pi.id) as image_count
    FROM products p
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE p.status = 'published'
    GROUP BY p.id, p.name_vi, p.brand, p.product_type, p.status
    ORDER BY p.created_at DESC
    LIMIT 10;

    -- Check brands
    SELECT 
    brand,
    COUNT(*) as product_count
    FROM products
    WHERE brand IS NOT NULL
    GROUP BY brand
    ORDER BY product_count DESC;

    -- Check product types
    SELECT 
    product_type,
    COUNT(*) as product_count
    FROM products
    WHERE product_type IS NOT NULL
    GROUP BY product_type
    ORDER BY product_count DESC;


