import type React from 'react';
import type { Metadata } from 'next';
import { Hahmlet, Source_Sans_3, JetBrains_Mono, Cormorant_Garamond, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css'; // Import globals.css at the top of the file
import '@/components/ink/ink.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InkDefs } from '@/components/ink';
import { getProductTypeList } from '@/lib/db/products';
import { toCategories } from '@/lib/display';

// Ink-wash theme fonts (headings / body)
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

// Legacy fonts, still used by the older pages (/atelier, /services, ...)
const hahmlet = Hahmlet({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-hahmlet',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-source-sans-3',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Trầm Hương - Tinh Túy Của Đất Trời',
  description:
    'Tinh túy của đất trời trong từng thớ gỗ trầm. Nghệ thuật trầm hương cao cấp với truyền thống và tâm huyết nghệ nhân.',
  generator: 'v0.dev',
  icons: {
    icon: '/seal-icon.png',
    shortcut: '/seal-icon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Trầm Hương Sơn Hồng',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // product categories for the navbar's Sản phẩm menu
  const categories = toCategories(await getProductTypeList());
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${hahmlet.variable} ${sourceSans3.variable} ${jetbrainsMono.variable} ${cormorant.variable} ${beVietnam.variable}`}
    >
      <head>
        {/* lets CSS hide scroll-reveal content only when JS will reveal it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body suppressHydrationWarning={true} className="overflow-x-hidden font-body text-ink">
        <InkDefs />
        <Navbar categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
