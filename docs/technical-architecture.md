# Technical Architecture Overview

- Frontend: Next.js (App Router) + Tailwind CSS.
- Backend: Supabase (PostgreSQL) or Firebase alternative.
- Storage: Supabase Storage or Cloudinary for images.
- Hosting: Vercel.
- i18n: `next-intl` or JSON locale files.
- Notes: Prefer SSG/ISR for listings; keep product details cache-friendly.

