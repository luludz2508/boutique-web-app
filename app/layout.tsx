import type React from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import ClientLayout from './ClientLayout';
import './globals.css'; // Import globals.css at the top of the file
import ClientLayoutV2 from './ClientLayoutV2';

// Define font subsets and weights
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Trầm Hương Sơn Hồng',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${cormorantGaramond.variable} ${sourceSans3.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <ClientLayoutV2>{children}</ClientLayoutV2>
      </body>
    </html>
  );
}
