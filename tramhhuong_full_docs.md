# 🌿 Trầm Hương Sơn Hồng – Complete Documentation Overview

## 🧭 Project Summary
Trầm Hương Sơn Hồng is a premium agarwood (trầm hương) brand that sells natural incense, bracelets, statues, necklaces, powder, and raw agarwood materials. The brand blends Vietnamese cultural heritage with a minimalist, luxury e-commerce experience.

The documentation system below consolidates all design, content, and technical resources required to build, maintain, and scale the website.

---

## 1️⃣ Brand Layer

### **1. Brand Guidelines**
- **Purpose:** Define the brand identity and ensure consistent visual and verbal communication.
- **Contents:**
  - Logo usage, spacing, and color versions (dark/light)
  - Brand colors (gold, brown, ivory)
  - Symbolism of agarwood in Vietnamese culture
  - Brand tagline: “Trầm Hương cho tâm an – Hương đời tĩnh lặng.”
  - Image direction: soft light, wood texture, smoke gradients

### **2. Copywriting Tone & Voice Guide**
- **Tone:** Calm, spiritual, elegant, and trustworthy.
- **Style:**
  - Vietnamese: poetic, respectful, and cultural.
  - English: minimalist, warm, authentic.
- **Examples:**
  - “Tinh túy của đất trời trong từng thớ gỗ trầm.” → “The soul of nature crafted through time.”

### **3. Cultural & Heritage Reference Sheet**
- Explains spiritual and traditional meanings of agarwood in Vietnamese culture.
- Mentions craft heritage, sustainable sourcing, and ethical production.

---

## 2️⃣ Design Layer

### **4. Design System Specification (v3)** ✅
- **Color Palette:**
  - Imperial Gold `#D9B45A`
  - Agarwood Brown `#5E3B1E`
  - Forest Umber `#3C2F26`
  - Ivory Mist `#F7F5EF`
  - Charcoal Ash `#1C1C1C`
- **Typography:**
  - Display: *Cormorant Garamond* (serif)
  - Body: *Inter* (sans-serif)
  - Numeric/Accent: *Space Mono*
- **Grid:** 12-column responsive system, 8px spacing scale.
- **Motion:** Slow fade and slide transitions (0.8s cubic-bezier).
- **Accessibility:** Bilingual text contrast AA+.

### **5. Layout & Interaction Blueprint** ✅
- **Core layout:** 5 collapsible columns (4% x 4 + 84% active).
- **Sticky logo** with monogram “SH” on scroll.
- **Mobile behavior:** Converts to stacked accordion format.

### **6. Component Library (UI Kit)**
- Cards: Product, Category, Certificate, Attribute.
- Buttons: Primary (Gold), Secondary (Dark), Accent (Red).
- Forms: Rounded input, gold focus, full-width CTA.
- Navigation: Sticky header, language toggle.

### **7. Animation & Motion Guidelines**
- Motion theme: “Stillness & Smoke Flow.”
- Entrance: fade-in-up (0.8s), staggered sequence.
- Hover: scale 1.05, soft shadow.
- Easing: `[0.25, 0.1, 0.25, 1]` for natural movement.

### **8. Accessibility Design Spec**
- Font scaling responsive to user preferences.
- VN/EN diacritics fully supported.
- Contrast: ≥ 4.5:1.

---

## 3️⃣ Content Layer

### **9. Website Content Map (Storyboard Format)** ✅
**Final Page Architecture:**
1. **Home (Trang chủ)** – brand overview, featured categories, trust badges.
2. **Products (Sản phẩm)** – product categories & filtering.
3. **Product Detail (Chi tiết sản phẩm)** – product information, attributes, certificates.
4. **About (Giới thiệu)** – brand story, origin, mission.
5. **Contact (Liên hệ)** – inquiry form, contact info.

### **10. Content Style Guide (Next)**
- Bilingual writing rules.
- Headline hierarchy (H1: Playfair Display, H2: serif subheading, body: Inter).
- Avoid over-translation; preserve poetic Vietnamese tone.
- Word count per section (60–100 for hero text, 200–300 for product story).

---

## 4️⃣ Technical Layer

### **11. Database & ERD Document** ✅
**Entities:**
- `Category` → Product grouping.
- `Product` → Item data (VN/EN name, price, origin, scent profile).
- `Image` → Multi-photo links per product.
- `ProductAttribute` → Flexible fields (scent, weight, material).
- `Certificate` → Authenticity proofs.
- `Inquiry` → Customer contact or order intent.

**Schema Summary:**
- One-to-many: Category → Products → Images → Attributes → Certificates.
- Inline bilingual columns (`name_vi`, `name_en`, etc.).
- Inquiry table linked by product_id.

### **12. Technical Architecture Overview**
- **Frontend:** Next.js (App Router) + Tailwind CSS.
- **Backend:** Supabase (PostgreSQL) or Firebase alternative.
- **Storage:** Supabase Storage / Cloudinary for images.
- **Hosting:** Vercel.
- **i18n:** `next-intl` or JSON locale files.

### **13. Localization (i18n) Specification**
- Folder structure: `/locales/vi.json`, `/locales/en.json`.
- Key convention: `section.page.element`.
- Sample:
  ```json
  {
    "home": {
      "headline": "Tinh túy của đất trời trong từng thớ gỗ trầm",
      "cta": "Khám phá sản phẩm"
    }
  }
  ```

### **14. Performance & Optimization Plan**
- Static site generation for product lists.
- Incremental revalidation for new products.
- Image compression via Cloudinary.
- Lazy loading for images & animations.
- Lighthouse goal: ≥90 performance score.

---

## 5️⃣ Operations Layer

### **15. Content Management Manual**
- How to add/edit product in Supabase.
- Naming conventions, bilingual entry rules.
- Folder structure for media assets.

### **16. Deployment & Version Control Guide**
- GitHub → Vercel workflow.
- Branches: `main` (live), `staging` (test).
- Auto-deploy on push.

### **17. Analytics & Monitoring Dashboard Spec**
- Tools: Google Analytics 4 + Supabase metrics.
- Track: Page views, inquiries submitted, locale usage.
- Dashboard summary embedded in Notion or Data Studio.

---

## 6️⃣ Proof of Concept (POC) Plan

### **Goal:**
Demonstrate a working version of the website with dynamic products, bilingual content, and responsive layout.

### **Scope:**
- 4 pages: Home, Products, About, Contact.
- 1 product detail template.
- Data from Supabase tables.
- Basic bilingual switch.
- Contact form saving inquiries.

### **Tech Stack:**
- **Frontend:** Next.js + Tailwind CSS.
- **Database:** Supabase (PostgreSQL schema defined above).
- **Hosting:** Vercel.
- **Localization:** JSON-based (vi/en).
- **Images:** Cloudinary / Supabase Storage.

### **Deliverables:**
1. Database schema migrated in Supabase.
2. Basic navigation and responsive layout.
3. Bilingual toggle (JSON locale).
4. Product data fetching from DB.
5. Inquiry form submission.

---

## ✅ Summary of Document Status
| Layer | Document Count | Status |
|--------|----------------|---------|
| Brand | 3 | Pending |
| Design | 5 | 2 done, 3 pending |
| Content | 2 | 1 done, 1 pending |
| Technical | 4 | 1 done, 3 pending |
| Operations | 3 | Pending |

**Total Documents:** 17  
**Current Readiness:** ~70% ready for POC development.

---

## 🪶 Next Step
Prepare **POC Starter Package**:
1. Create Next.js + Tailwind base project.
2. Add Supabase schema migration.
3. Populate with 5 sample trầm hương products.
4. Deploy to Vercel for first internal demo.

