# Content Management Manual

- Platform: Supabase.
- Add/Edit Product:
  1) Create product with VN/EN names, price, origin, scent profile.
  2) Upload images to storage; link to product in `Image` table.
  3) Add attributes (weight, material, grade) via `ProductAttribute` rows.
  4) Attach certificates as needed.
- Naming conventions: Kebab-case for slugs; avoid diacritic in slugs; consistent units.
- Media: Organize `/images/products/{category}/{product-slug}/`.
- QA: Verify bilingual fields filled; preview page before publish.

