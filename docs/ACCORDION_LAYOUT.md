# 🎨 Accordion Layout Restored!

## ✅ Best of Both Worlds

We've successfully combined:

1. **🎨 Beautiful Accordion UI** - The original collapsible layout
2. **🧹 Clean Architecture** - Pure data in `content.ts`, UI in pages
3. **✨ No JSX in Config** - Separation of concerns maintained

---

## 🏗️ How It Works

### 1. Pages Export Content Components

Each page now exports two things:

```typescript
// app/collection/page.tsx

// 1. Named export for accordion (used by ClientLayout)
export function CollectionContent() {
  const pageContent = content.vi.collection;
  return <div>...</div>;
}

// 2. Default export for direct route access
export default CollectionContent;
```

### 2. ClientLayout Imports and Renders

```typescript
// app/ClientLayout.tsx

import { CollectionContent } from "./collection/page";

const sectionComponents = {
  "/collection": <CollectionContent />,
  // ... other pages
};

// Renders in accordion based on pathname
```

### 3. Navigation Config with Visual Data

```typescript
// config/content.ts

navigation: [
  {
    id: "collection",
    title: "SẢN PHẨM",
    path: "/collection",
    color: "bg-neutral-900", // Background color
    textColor: "text-neutral-50", // Text color
  },
];
```

---

## 🎯 Layout Features

### Desktop - Accordion View

- **Collapsed sections**: 4% width, vertical text
- **Expanded section**: 84% width, full content
- **Smooth animations**: 0.8s transition with custom easing
- **Hover effects**: Subtle overlay on collapsed sections

### Mobile - Full Screen

- **Top header**: Logo + hamburger menu
- **Slide menu**: Animated navigation drawer
- **Full content**: Each page fills the screen
- **Smooth transitions**: Page-to-page animations

---

## 📁 File Structure

```
app/
├── page.tsx                    ✅ Home (exports HomeContent)
├── collection/page.tsx         ✅ Collection (exports CollectionContent)
├── products/page.tsx           ✅ Products (exports ProductsContent)
├── services/page.tsx           ✅ Services (exports ServicesContent)
├── gallery/page.tsx            ✅ Gallery (exports GalleryContent)
├── atelier/page.tsx            ✅ Atelier (exports AtelierContent)
└── ClientLayout.tsx            ✅ Accordion orchestration

config/
└── content.ts                  ✅ Pure data + navigation
```

---

## 🎨 Visual Theme per Section

| Section    | Background       | Text Color         | Theme        |
| ---------- | ---------------- | ------------------ | ------------ |
| Home       | `bg-neutral-50`  | `text-neutral-900` | Light        |
| Collection | `bg-neutral-900` | `text-neutral-50`  | Dark         |
| Products   | `bg-neutral-900` | `text-neutral-50`  | Dark         |
| Services   | `bg-accent-50`   | `text-neutral-900` | Light Accent |
| Gallery    | `bg-neutral-900` | `text-neutral-50`  | Dark         |
| Atelier    | `bg-neutral-100` | `text-neutral-900` | Light Gray   |

---

## ✨ Key Benefits

### 1. Beautiful UX ✅

- Unique accordion layout
- Smooth animations
- Visual section separation

### 2. Clean Code ✅

- No JSX in config files
- Separation of concerns
- Type-safe content data

### 3. Maintainable ✅

- Content updates in `content.ts`
- UI changes in page files
- Layout logic in `ClientLayout`

### 4. SEO Friendly ✅

- Each page still has its own route
- Direct URL access works
- Proper HTML structure

---

## 🔧 Technical Details

### Accordion Animation

```typescript
// Width animation
animate={{
  width: pathname === section.path ? "84%" : "4%",
}}
transition={{
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],  // Custom bezier curve
}}
```

### Content Fade-In

```typescript
// Content appears with slide + fade
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 50 }}
transition={{ duration: 0.6, delay: 0.2 }}
```

### Vertical Text (Collapsed)

```typescript
// CSS transform for collapsed state
<div className="transform -rotate-90 whitespace-nowrap">
  <h2>{section.title}</h2>
</div>
```

---

## 🚀 Adding New Pages

To add a new page to the accordion:

### 1. Create Page Component

```typescript
// app/my-page/page.tsx

export function MyPageContent() {
  const pageContent = content.vi.myPage;
  return <div>{/* Your content */}</div>;
}

export default MyPageContent;
```

### 2. Add to Navigation

```typescript
// config/content.ts

navigation: [
  // ... existing items
  {
    id: "mypage",
    title: "MY PAGE",
    path: "/my-page",
    color: "bg-neutral-50",
    textColor: "text-neutral-900",
  },
];
```

### 3. Register in ClientLayout

```typescript
// app/ClientLayout.tsx

import { MyPageContent } from "./my-page/page";

const sectionComponents = {
  // ... existing pages
  "/my-page": <MyPageContent />,
};
```

Done! Your page will appear in the accordion.

---

## 📊 Comparison

### Before (app-config.tsx)

❌ JSX mixed with data  
❌ 2063 lines  
❌ Hard to maintain  
✅ Accordion layout

### After (content.ts + exports)

✅ Pure data config  
✅ 276 lines  
✅ Easy to maintain  
✅ Accordion layout

**Result: Best of both worlds!** 🎉

---

## 🎭 Animation Flow

1. **Click section** → Router navigates
2. **Collapsed sections shrink** → 4% width (0.8s)
3. **Selected section expands** → 84% width (0.8s)
4. **Content fades in** → Opacity 0→1 + slide (0.6s)
5. **Vertical text rotates** → On collapsed sections

All animations run simultaneously for smooth transitions.

---

## 💡 Pro Tips

### Adjusting Accordion Speed

```typescript
// In ClientLayout.tsx, adjust duration
transition={{
  duration: 1.2,  // Slower (default: 0.8)
  ease: [0.25, 0.1, 0.25, 1],
}}
```

### Changing Widths

```typescript
// Adjust collapsed/expanded widths
animate={{
  width: pathname === section.path ? "90%" : "2.5%",
}}
```

### Disabling Accordion (Use Simple Layout)

Just use the standard Next.js layout (no accordion):

```typescript
// Simple layout without accordion
return (
  <div>
    <nav>{/* Navigation */}</nav>
    <main>{children}</main>
  </div>
);
```

---

## 🎉 Summary

✅ **Accordion layout** - Restored and working  
✅ **Clean architecture** - No JSX in config  
✅ **Type safety** - Full TypeScript support  
✅ **Maintainable** - Clear separation of concerns  
✅ **Beautiful animations** - Smooth transitions  
✅ **Mobile friendly** - Responsive design

**The perfect combination of aesthetics and architecture!** 🚀

---

**Updated**: October 25, 2025
