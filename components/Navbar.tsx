'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import content, { type NavItem } from '@/config/content';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const currentLocale = 'vi';
  const navItems = content[currentLocale]?.navigation || [];

  // Filter out products from sections (it's a separate page)
  const sectionItems = navItems.filter((item) => item.path !== '/products');
  const isProductsPage = pathname?.startsWith('/products');

  // Handle scroll effect, active section, and header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header on products page
      if (isProductsPage) {
        setIsVisible(true);
        setIsScrolled(currentScrollY > 20);
        return;
      }

      setIsScrolled(currentScrollY > 20);

      // Determine active section based on scroll position
      const sections = sectionItems.map((item) => ({
        id: item.path.slice(1),
        element: document.getElementById(item.path.slice(1)),
      }));

      const scrollPosition = currentScrollY + 70; // Offset for navbar (h-14 = 56px)

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // If at the top, set home as active (empty string)
      if (currentScrollY < 100) {
        setActiveSection('');
      }

      // Handle header visibility based on scroll direction
      if (currentScrollY < 100) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProductsPage, sectionItems, lastScrollY]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    // Handle home/Trang chủ - scroll to top
    if (sectionId === '' || sectionId === 'home') {
      if (pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsMenuOpen(false);
      return;
    }

    if (pathname !== '/') {
      // If not on homepage, navigate first
      window.location.href = `/#${sectionId}`;
      return;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 56; // Navbar height (h-14 = 56px)
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);

    setIsMenuOpen(false);
  };

  // Handle hash navigation on mount or when pathname changes
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 56; // Navbar height (h-14 = 56px)
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    }
  }, [pathname]);

  // Handle navigation for products (separate page)
  const handleProductsClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-neutral-50/95 backdrop-blur-md shadow-md border-b border-neutral-200`}
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation - All items evenly distributed */}
          <div className="hidden lg:flex items-center justify-between w-full gap-4">
            {/* Left side items */}
            <div className="flex justify-evenly gap-6 flex-1">
              {sectionItems.map((item) => {
                const sectionId = item.path === '/' ? '' : item.path.slice(1);
                const isActive =
                  item.path === '/'
                    ? pathname === '/' && activeSection === ''
                    : pathname === '/' && activeSection === sectionId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(sectionId)}
                    className={`font-serif text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-accent-600 border-b-2 border-accent-600 pb-1'
                        : 'text-neutral-900 hover:text-accent-600'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Logo - Centered */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.location.href = '/';
                  }
                  setIsMenuOpen(false);
                }}
              >
                <Image
                  src="/logo_2.png"
                  alt="Son Hong Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right side items (Products) */}
            <div className="flex justify-evenly gap-6 flex-1">
              <Link
                href="/products"
                className={`font-serif text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                  isProductsPage
                    ? 'text-accent-600 border-b-2 border-accent-600 pb-1'
                    : 'text-neutral-900 hover:text-accent-600'
                }`}
                onClick={handleProductsClick}
              >
                Sản Phẩm
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-neutral-900"
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
            className="lg:hidden bg-neutral-50 border-t border-neutral-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col divide-y divide-neutral-200">
              {sectionItems.map((item) => {
                const sectionId = item.path === '/' ? '' : item.path.slice(1);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(sectionId)}
                      className="w-full text-left px-6 py-3 hover:bg-neutral-100 transition-colors"
                    >
                      <span className="font-serif text-sm tracking-wide uppercase text-neutral-900">
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/products"
                  className={`block w-full text-left px-6 py-3 transition-colors ${
                    isProductsPage ? 'bg-neutral-100 text-accent-600' : 'hover:bg-neutral-100'
                  }`}
                  onClick={handleProductsClick}
                >
                  <span className="font-serif text-sm tracking-wide uppercase text-neutral-900">
                    Sản Phẩm
                  </span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
