"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import content from "@/config/content";
import "./globals.css";

// Import page content components (only for accordion sections)
import { HomeContent } from "./page";
import { CollectionContent } from "./collection/page";
import { ServicesContent } from "./services/page";
import { GalleryContent } from "./gallery/page";
import { AtelierContent } from "./atelier/page";

// Accordion layout with clean content architecture
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // For now, hardcode locale to 'vi'. This can be made dynamic later.
  const currentLocale = "vi";
  const navItems = content[currentLocale].navigation as any[];

  // Find current nav item based on pathname
  const currentNav =
    navItems.find((item) => item.path === pathname) || navItems[0];

  const handleSectionClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // Map sections to their components (only accordion sections)
  const sectionComponents: Record<string, React.ReactNode> = {
    "/": <HomeContent />,
    "/collection": <CollectionContent />,
    "/services": <ServicesContent />,
    "/gallery": <GalleryContent />,
    "/atelier": <AtelierContent />,
  };

  // Check if current path is an accordion section
  const isAccordionPath = navItems.some((item) => item.path === pathname);

  // If not an accordion path (e.g., /products), render as a regular page
  if (!isAccordionPath) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-50">
        {children}
      </div>
    );
  }

  // Render accordion layout for main sections
  return (
    <div className="h-screen overflow-hidden bg-neutral-50 font-sans">
      {/* Fixed Logo */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className="bg-neutral-50 border border-neutral-300 px-6 py-3 hover:border-accent-500 transition-colors cursor-pointer flex items-center gap-3"
          onClick={() => handleSectionClick("/")}
        >
          <Image
            src="/logo.png"
            alt="Sơn Hồng Logo"
            width={40}
            height={40}
            className="object-contain scale-125"
          />
          <h1 className="font-serif text-xl font-light text-neutral-900">
            SƠN HỒNG
          </h1>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleSectionClick("/")}
          >
            <Image
              src="/logo.png"
              alt="Sơn Hồng Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <h1 className="font-serif text-lg font-light">TRẦM HƯƠNG</h1>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 right-0 z-30 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200"
          >
            <div className="p-6 space-y-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSectionClick(item.path)}
                  className={`block w-full text-left font-serif text-lg font-light transition-colors ${
                    pathname === item.path
                      ? "text-accent-600"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {item.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Accordion Layout */}
      <div className="hidden md:flex h-full">
        {navItems.map((section) => (
          <motion.div
            key={section.id}
            className={`relative ${
              pathname !== section.path ? "cursor-pointer" : ""
            } ${section.color} ${
              section.textColor
            } overflow-hidden border-r border-neutral-200 last:border-r-0`}
            initial={false}
            animate={{
              width: pathname === section.path ? "84%" : "4%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={
              pathname !== section.path
                ? () => handleSectionClick(section.path)
                : undefined
            }
          >
            {/* Collapsed State - Vertical Title */}
            <AnimatePresence>
              {pathname !== section.path && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="transform -rotate-90 whitespace-nowrap">
                    <h2 className="font-serif text-2xl font-light tracking-widest">
                      {section.title}
                    </h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded State - Page Content */}
            <AnimatePresence>
              {pathname === section.path && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 overflow-y-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <div className="p-16 pb-32 pt-24">
                    {sectionComponents[section.path]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover Effect for Collapsed Sections */}
            {pathname !== section.path && (
              <motion.div
                className="absolute inset-0 bg-neutral-900/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Content */}
      <div className="md:hidden pt-16">
        <AnimatePresence mode="wait">
          {currentNav && (
            <motion.div
              key={currentNav.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="h-screen overflow-y-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className={`${currentNav.color} ${currentNav.textColor} p-6 pb-32 min-h-full`}
              >
                {sectionComponents[currentNav.path]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
