# Database & ERD

- Entities:
  - Category: Product grouping.
  - Product: VN/EN names, price, origin, scent profile.
  - Image: Multiple photos per product.
  - ProductAttribute: Flexible fields (scent, weight, material, etc.).
  - Certificate: Authenticity proofs per product.
  - Inquiry: Customer contact or order intent; may link to product.
- Relationships:
  - Category 1—N Product
  - Product 1—N Image
  - Product 1—N ProductAttribute
  - Product 1—N Certificate
  - Product 1—N Inquiry (optional)
- Bilingual columns: Inline per field (e.g., `name_vi`, `name_en`, `description_vi`, `description_en`).
- Notes: Prefer enums for consistent attributes where possible; use UUID PKs.

