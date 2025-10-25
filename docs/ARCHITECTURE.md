# 🏗️ Architecture - Separation of Concerns

## ✅ New Architecture (Clean)

We've separated **content** from **components** for better maintainability.

---

## 📁 File Structure

```
config/
  ├── content.ts          ✅ Pure data (strings, arrays, objects)
  └── app-config.tsx      ⚠️  Old file (contains JSX - being phased out)

app/
  ├── collection/
  │   └── page.tsx        ✅ Components/UI defined here
  ├── products/
  │   └── page.tsx        ✅ Components/UI defined here
  └── services/
      └── page.tsx        ✅ Components/UI defined here
```

---

## 🎯 Philosophy

### ❌ OLD WAY (Bad)

```tsx
// config/app-config.tsx
const config = {
  vi: {
    collection: {
      component: (
        <div>
          <h1>Collection</h1> {/* ❌ JSX in config! */}
        </div>
      ),
    },
  },
};
```

**Problems:**

- Mixing UI with data
- Hard to maintain
- Language conflicts
- Can't reuse content
- TypeScript types unclear

---

### ✅ NEW WAY (Good)

**1. Content Config (Data Only)**

```typescript
// config/content.ts
export const content = {
  vi: {
    collection: {
      title: "The",
      subtitle: "Collection",
      description: "Curated pieces...",
      items: [
        {
          name: "Ceremonial Incense Holder",
          price: "$2,800",
          // ... pure data
        },
      ],
    },
  },
};
```

**2. Page Components (UI Only)**

```tsx
// app/collection/page.tsx
import content from "@/config/content";

export default function CollectionPage() {
  const pageContent = content["vi"].collection;

  return (
    <div>
      <h1>{pageContent.title}</h1>
      <p>{pageContent.description}</p>
      {pageContent.items?.map((item) => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

**Benefits:**

- ✅ Clear separation
- ✅ Easy to maintain
- ✅ Reusable content
- ✅ Type-safe
- ✅ Easy i18n

---

## 📊 Content Structure

### PageContent Interface

```typescript
interface PageContent {
  // Header
  title: string;
  subtitle?: string;
  description: string;

  // Page-specific data
  items?: CollectionItem[];
  services?: ServiceItem[];
  packages?: PackageItem[];

  // Atelier specific
  locationTitle?: string;
  visitingHours?: string[];
  // ... etc
}
```

### Usage in Pages

```typescript
// 1. Import content
import content from "@/config/content";

// 2. Get content for current page
const pageContent = content[locale][pageId];

// 3. Use data in JSX
<h1>{pageContent.title}</h1>;
```

---

## 🌐 Internationalization (i18n)

### Adding a New Language

```typescript
// config/content.ts
const content = {
  vi: {
    collection: {
      /* Vietnamese content */
    },
  },
  en: {
    collection: {
      /* English content */
    },
  },
  fr: {
    collection: {
      /* French content */
    },
  },
};
```

### Using in Components

```tsx
export default function Page() {
  // Get locale from somewhere (URL, context, etc)
  const locale = "vi"; // or "en", "fr"
  const pageContent = content[locale].collection;

  return <h1>{pageContent.title}</h1>;
}
```

---

## 📝 Adding New Content

### Step 1: Define Type (if new)

```typescript
// config/content.ts
export interface NewItem {
  name: string;
  value: number;
  // ... other fields
}
```

### Step 2: Add to PageContent Interface

```typescript
export interface PageContent {
  // ... existing fields
  newItems?: NewItem[];
}
```

### Step 3: Add Content Data

```typescript
const content = {
  vi: {
    mypage: {
      title: "My Page",
      description: "Description",
      newItems: [
        { name: "Item 1", value: 100 },
        { name: "Item 2", value: 200 },
      ],
    },
  },
};
```

### Step 4: Use in Page

```tsx
// app/mypage/page.tsx
import content from "@/config/content";

export default function MyPage() {
  const pageContent = content.vi.mypage;

  return (
    <div>
      <h1>{pageContent.title}</h1>
      {pageContent.newItems?.map((item) => (
        <div key={item.name}>
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎨 Page Layout Consistency

All main pages now share the same elegant layout:

```tsx
<div className="space-y-20">
  {/* 1. Header Section */}
  <div className="pt-12 text-center">
    <TextReveal>
      <h1 className="font-serif text-8xl...">
        {pageContent.title}
        <br />
        <span className="text-primary-400">{pageContent.subtitle}</span>
      </h1>
    </TextReveal>
    <DrawLine />
    <FadeInUp>
      <p>{pageContent.description}</p>
    </FadeInUp>
  </div>

  {/* 2. Content Sections */}
  <div className="max-w-7xl mx-auto">{/* Page-specific content */}</div>
</div>
```

**Consistent across:**

- ✅ Collection page
- ✅ Products page
- ✅ Services page
- ✅ Atelier page

---

## 🔄 Migration Guide

### Old Config (app-config.tsx)

```tsx
// ⚠️ Don't use this pattern anymore
sections: [
  {
    id: "collection",
    component: <div>JSX here</div>, // ❌ Bad
  },
];
```

### New Config (content.ts)

```typescript
// ✅ Use this pattern
{
  collection: {
    title: "Collection",
    description: "...",
    items: [...]  // ✅ Good - pure data
  }
}
```

---

## 🎯 Best Practices

### DO ✅

- Keep config files as pure TypeScript objects
- Define UI/components in page files
- Use TypeScript interfaces for type safety
- Separate content by locale
- Use meaningful keys

### DON'T ❌

- Put JSX/components in config files
- Mix UI logic with content data
- Use magic strings without types
- Duplicate content across files
- Hardcode text in components

---

## 📦 Example: Products Page

```tsx
// app/products/page.tsx
import content from "@/config/content";
import { TextReveal, FadeIn } from "@/components/animations";

export default async function ProductsPage({ searchParams }) {
  // 1. Get content (data only)
  const pageContent = content.vi.products;

  // 2. Get dynamic data from DB
  const products = await getAllProducts();

  // 3. Render UI (components defined here)
  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1>{pageContent.title}</h1>
        </TextReveal>
        <FadeIn>
          <p>{pageContent.description}</p>
        </FadeIn>
      </div>

      <ProductsGrid products={products} />
    </div>
  );
}
```

**Clean separation:**

- Content → `config/content.ts`
- Components → `app/products/page.tsx`
- Data → Database (Supabase)

---

## 🚀 Benefits Summary

1. **Maintainability**: Easy to update content without touching UI
2. **Type Safety**: Full TypeScript support
3. **Reusability**: Same content can be used in multiple places
4. **i18n Ready**: Simple to add new languages
5. **Testability**: Can test content and UI separately
6. **Consistency**: Same layout patterns across pages

---

## 📚 Related Files

- `config/content.ts` - Pure content data
- `app/collection/page.tsx` - Example implementation
- `app/products/page.tsx` - Example implementation
- `components/animations/viewport-animations.tsx` - Reusable animations

---

**Remember:** Config = Data, Pages = UI! 🎨
