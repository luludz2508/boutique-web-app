# Environment Setup Guide

## Quick Setup (3 Steps)

### 1. Create Your Environment File

```bash
# Copy the template
cp env.template .env.local

# Or create manually
# On Windows: copy env.template .env.local
```

### 2. Get Your Supabase Credentials

Go to your Supabase Dashboard:

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Project Settings** (⚙️ gear icon)
4. Click **API** in the sidebar

You'll need these 3 values:

#### A. Project URL

- Location: `Configuration` section → `Project URL`
- Example: `https://abcdefghijklmnop.supabase.co`
- Copy to: `NEXT_PUBLIC_SUPABASE_URL`

#### B. Anonymous Key (anon public)

- Location: `Project API keys` section → `anon` `public` key
- Starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Copy to: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ Safe to expose in browser

#### C. Service Role Key

- Location: `Project API keys` section → `service_role` `secret` key
- Starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Copy to: `SUPABASE_SERVICE_ROLE_KEY`
- ⚠️ **KEEP SECRET** - Only for server-side use

### 3. Fill In Your .env.local File

```bash
# Open .env.local in your editor
code .env.local

# Or use any text editor
notepad .env.local
```

**Example filled-in file:**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xyzabcdef123456.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZjEyMzQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjg1MDAwMDAwLCJleHAiOjE4NDI2ODAwMDB9.example-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZjEyMzQ1NiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2ODUwMDAwMDAsImV4cCI6MTg0MjY4MDAwMH0.example-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Environment Variables Explained

| Variable                        | Purpose                        | Required    | Exposed to Browser |
| ------------------------------- | ------------------------------ | ----------- | ------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL      | ✅ Yes      | ✅ Yes             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key for client-side | ✅ Yes      | ✅ Yes             |
| `SUPABASE_SERVICE_ROLE_KEY`     | Admin key for server-side      | ⚠️ Optional | ❌ No              |
| `NEXT_PUBLIC_SITE_URL`          | Your website URL               | ✅ Yes      | ✅ Yes             |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`  | Toggle analytics               | ❌ No       | ✅ Yes             |

### Key Naming Convention

- `NEXT_PUBLIC_*` → Exposed to browser (client-side)
- No prefix → Server-side only (API routes, server components)

## Security Best Practices

### ✅ DO

- ✅ Keep `.env.local` in `.gitignore`
- ✅ Use `NEXT_PUBLIC_*` prefix for client-side variables
- ✅ Use service role key only in API routes/server components
- ✅ Commit `env.template` to git as documentation
- ✅ Different credentials for development/production

### ❌ DON'T

- ❌ Commit `.env.local` to git
- ❌ Share service role key in client-side code
- ❌ Use production keys in development
- ❌ Expose database passwords in environment variables

## Using Environment Variables

### Client-Side (Browser)

```typescript
// components/ProductList.tsx
"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductList() {
  // Use supabase client...
}
```

### Server-Side (API Routes / Server Components)

```typescript
// app/api/products/route.ts
import { createClient } from "@supabase/supabase-js";

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only!
);

export async function GET() {
  // Can bypass RLS with service role
  const { data } = await supabaseAdmin.from("products").select("*");

  return Response.json(data);
}
```

## Verification

Test your setup:

```bash
# Start development server
pnpm dev

# Check if env vars are loaded
# You should see no errors about missing SUPABASE_URL or SUPABASE_ANON_KEY
```

**Test in browser console:**

```javascript
// Open DevTools Console (F12)
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// Should show: https://your-project.supabase.co

console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
// Should show: undefined (not exposed to browser)
```

## Production Setup

For deployment (Vercel, Netlify, etc.):

1. Go to your hosting provider's dashboard
2. Find **Environment Variables** settings
3. Add the same variables from your `.env.local`
4. Use **production** Supabase credentials (different project)

### Vercel Example

```bash
# Deploy with Vercel
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

## Common Issues

### "Cannot read properties of undefined"

**Problem:** Environment variables not loaded

**Solution:**

```bash
# Restart dev server after creating .env.local
# Next.js only loads env files on startup
pnpm dev
```

### "Invalid API key"

**Problem:** Wrong key format or project URL

**Solution:**

- Double-check you copied the full key (they're long!)
- Verify URL matches your project (no trailing slash)
- Ensure you're using the correct Supabase project

### "Access denied" or "RLS policy violation"

**Problem:** Using anon key for admin operations

**Solution:**

- Use `SUPABASE_SERVICE_ROLE_KEY` for admin operations
- Set up proper Row Level Security (RLS) policies
- Or temporarily disable RLS for testing

## Multiple Environments

Create separate files for different environments:

```
.env.local          # Development (git-ignored)
.env.production     # Production (git-ignored)
.env.staging        # Staging (git-ignored)
env.template        # Template (committed to git)
```

## Need Help?

- **Supabase Docs:** https://supabase.com/docs/guides/getting-started
- **Next.js Env Docs:** https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Check:** `env.template` for the latest template

## Quick Reference

```bash
# Create environment file
cp env.template .env.local

# Edit with your credentials
code .env.local

# Restart dev server to load changes
pnpm dev

# Verify it works
curl http://localhost:3000
```

✅ **You're all set!** Your environment is configured and ready to use Supabase.

