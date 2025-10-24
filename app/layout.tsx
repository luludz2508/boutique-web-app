import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css"; // Import globals.css at the top of the file

// Define font subsets and weights
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Trầm Hương - Tinh Túy Của Đất Trời",
  description:
    "Tinh túy của đất trời trong từng thớ gỗ trầm. Nghệ thuật trầm hương cao cấp với truyền thống và tâm huyết nghệ nhân.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
