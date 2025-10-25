# Boutique Web App - Trầm Hương Sơn Hồng

A modern e-commerce web application for Trầm Hương (Agarwood) products, built with Next.js 15, Supabase, and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment

**Option A: Interactive Setup (Recommended)**

```bash
pnpm setup:env
```

**Option B: Manual Setup**

```bash
# Copy the template
cp env.template .env.local

# Edit with your Supabase credentials
code .env.local
```

Get your Supabase credentials from: [Supabase Dashboard → Settings → API](https://app.supabase.com/project/_/settings/api)

### 3. Import Database

```bash
# Run the import script
pnpm import:haravan

# Then execute the migrations in Supabase
# See docs/DATABASE_IMPORT.md for details
```

### 4. Start Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[Environment Setup](docs/ENVIRONMENT_SETUP.md)** - Detailed environment configuration guide
- **[Database Import](docs/DATABASE_IMPORT.md)** - How to import Haravan products
- **[Quick Start Guide](docs/QUICK_START.md)** - Fast-track setup instructions
- **[Database Schema](docs/database-erd.md)** - Database structure and relationships
- **[Technical Architecture](docs/technical-architecture.md)** - System overview
- **[Brand Guidelines](docs/brand-guidelines.md)** - Design and branding rules

## 📊 Project Status

### ✅ Completed

- [x] Database schema design with bilingual support
- [x] Haravan product import system (193 products, 329 variants, 702 images)
- [x] Environment configuration
- [x] Supabase client setup
- [x] TypeScript type definitions

### 🚧 In Progress

- [ ] Frontend product pages
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Admin dashboard

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animation:** Framer Motion
- **Language:** TypeScript
- **Package Manager:** pnpm

## 📦 Key Features

- ✅ Bilingual support (Vietnamese & English)
- ✅ SEO optimized
- ✅ Product variants (size, color, etc.)
- ✅ Image gallery with positioning
- ✅ Inventory management
- ✅ Responsive design
- ✅ Server-side rendering (SSR)
- ✅ Type-safe database queries

## 🗂️ Project Structure

```
boutique-web-app/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Page routes
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── animations/       # Animation components
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── supabase/
│   └── migrations/       # Database migrations
├── scripts/
│   ├── import-haravan-products.ts  # Product import script
│   └── setup-env.js      # Environment setup helper
├── docs/                  # Documentation
├── public/               # Static assets
└── env.template          # Environment template
```

## 🎨 Design System

The project uses a custom design system based on Vietnamese cultural aesthetics:

- **Primary Colors:** Deep reds, golds, natural wood tones
- **Typography:** Geist font family
- **Components:** shadcn/ui with custom theming
- **Motion:** Subtle animations with Framer Motion

See [Brand Guidelines](docs/brand-guidelines.md) for details.

## 📝 Available Scripts

| Command               | Description                   |
| --------------------- | ----------------------------- |
| `pnpm dev`            | Start development server      |
| `pnpm build`          | Build for production          |
| `pnpm start`          | Start production server       |
| `pnpm lint`           | Run ESLint                    |
| `pnpm setup:env`      | Interactive environment setup |
| `pnpm import:haravan` | Import Haravan products       |

## 🔐 Environment Variables

Required variables (add to `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See [Environment Setup Guide](docs/ENVIRONMENT_SETUP.md) for detailed instructions.

## 🗄️ Database

The database includes:

- **193 products** from Haravan
- **329 product variants** (different sizes, colors)
- **702 product images** with CDN URLs
- **Bilingual content** (Vietnamese + English fields)

### Schema Tables

- `categories` - Product categories
- `products` - Main product information
- `product_variants` - Size, color, price variations
- `product_images` - Multiple images per product
- `product_attributes` - Flexible key-value attributes
- `product_certificates` - Authenticity certificates

## 🚀 Deployment

The app is optimized for deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **Self-hosted** (Docker)

See deployment guides in the docs folder.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- **Trầm Hương Sơn Hồng** - Product data and imagery
- **Haravan** - E-commerce platform integration
- **shadcn/ui** - Beautiful UI components
- **Supabase** - Backend infrastructure

## 📞 Support

For questions or issues:

1. Check the [documentation](docs/)
2. Review [Database Import Guide](docs/DATABASE_IMPORT.md)
3. See [Environment Setup](docs/ENVIRONMENT_SETUP.md)

---

Made with ❤️ for Trầm Hương Sơn Hồng
