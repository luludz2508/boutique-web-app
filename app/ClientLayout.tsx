'use client';

import React, { Fragment, cloneElement, isValidElement, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import content, { type NavItem } from '@/config/content';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = rawPathname ?? '/';

  // Locale can be made dynamic later.
  const currentLocale = 'vi';

  const navItems = useMemo<NavItem[]>(() => content[currentLocale].navigation, [currentLocale]);

  const isAccordionPath = navItems.some((item) => item.path === pathname);
  const currentNav = navItems.find((item) => item.path === pathname) ?? navItems[0];

  const renderChildren = (key: string) => {
    if (isValidElement(children)) {
      return cloneElement(children, { key });
    }

    return <Fragment key={key}>{children}</Fragment>;
  };

  const handleSectionClick = (path: string) => {
    if (pathname === path) {
      setIsMenuOpen(false);
      return;
    }

    router.push(path);
    setIsMenuOpen(false);
  };

  if (!isAccordionPath) {
    return <div className="min-h-screen bg-neutral-900 text-neutral-50 w-full">{children}</div>;
  }

  return (
    <div className="h-screen overflow-hidden bg-neutral-50 font-sans w-full max-w-screen">
      {/* Fixed Logo - Hidden on Mobile */}
      <motion.div
        className="hidden md:block fixed top-8 left-8 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className="bg-neutral-50 border border-neutral-300 px-6 py-3 hover:border-accent-500 transition-colors cursor-pointer flex items-center gap-3"
          onClick={() => handleSectionClick('/')}
        >
          <Image
            src="/logo.png"
            alt="Son Hong Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="font-serif text-xl font-light text-neutral-900">SON HONG</h1>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200 p-4 w-full max-w-screen">
        <div className="flex items-center justify-between">
          <button type="button" className="cursor-pointer" onClick={() => handleSectionClick('/')}>
            <Image
              src="/logo.png"
              alt="Son Hong Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 z-30 bg-neutral-50 border-b border-neutral-200 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col divide-y divide-neutral-200">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item.path)}
                    className={`w-full text-left px-6 py-4 ${item.color ?? ''} ${item.textColor ?? ''}`}
                  >
                    <span className="font-serif text-lg tracking-wide uppercase">{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Accordion Layout */}
      <div className="hidden md:flex h-full">
        {navItems.map((section) => {
          const isActive = pathname === section.path;

          return (
            <motion.div
              key={section.id}
              className={`relative ${!isActive ? 'cursor-pointer' : ''} ${section.color ?? ''} ${
                section.textColor ?? ''
              } overflow-hidden`}
              style={{
                backgroundColor: section.color?.includes('bg-neutral-50')
                  ? '#F7F5EF'
                  : section.color?.includes('bg-brown-600')
                    ? '#5E3B1E'
                    : section.color?.includes('bg-accent-400')
                      ? '#D9B45A'
                      : section.color?.includes('bg-brown-800')
                        ? '#3C2F26'
                        : section.color?.includes('bg-neutral-100')
                          ? '#F7F5EF'
                          : undefined,
                color: section.textColor?.includes('text-neutral-900')
                  ? '#1C1C1C'
                  : section.textColor?.includes('text-accent-400')
                    ? '#D9B45A'
                    : undefined,
              }}
              initial={false}
              animate={{
                width: isActive ? '84%' : '4%',
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={!isActive ? () => handleSectionClick(section.path) : undefined}
            >
              {/* Collapsed State - Vertical Title */}
              <AnimatePresence>
                {!isActive && (
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
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute inset-0 overflow-y-auto scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div className="p-16 pb-32 pt-24">
                      {renderChildren(`desktop-${section.path}`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Effect for Collapsed Sections */}
              <motion.div
                className="absolute inset-0 bg-neutral-900/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: !isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  pointerEvents: !isActive ? 'auto' : 'none',
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Content */}
      <div className="md:hidden pt-16 overflow-x-hidden w-full max-w-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNav.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div
              className={`${currentNav.color ?? ''} ${currentNav.textColor ?? ''} p-6 pb-32 min-h-full`}
            >
              {renderChildren(`mobile-${currentNav.path}`)}
            </div>
          </motion.div>
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
