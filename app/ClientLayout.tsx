"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import appConfig from "@/config/app-config" // Import the new config file
import "./globals.css"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // For now, hardcode locale to 'en'. This can be made dynamic later.
  const currentLocale = "en"
  const sections = appConfig[currentLocale].sections

  // Find current section based on pathname
  const currentSection = sections.find((section) => section.path === pathname) || sections[0]

  const handleSectionClick = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

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
          className="bg-neutral-50 border border-neutral-300 px-6 py-3 hover:border-accent-500 transition-colors cursor-pointer"
          onClick={() => handleSectionClick("/")}
        >
          <h1 className="font-serif text-xl font-light text-neutral-900">ATELIER</h1>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-lg font-light cursor-pointer" onClick={() => handleSectionClick("/")}>
            ATELIER
          </h1>
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
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSectionClick(section.path)}
                  className={`block w-full text-left font-serif text-lg font-light transition-colors ${
                    pathname === section.path ? "text-accent-600" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {section.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className={`relative cursor-pointer ${section.color} ${section.textColor} overflow-hidden border-r border-neutral-200 last:border-r-0`}
            initial={false}
            animate={{
              width: pathname === section.path ? "80%" : "4%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={() => handleSectionClick(section.path)}
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
                    <h2 className="font-serif text-2xl font-light tracking-widest">{section.title}</h2>
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
                  <div className="p-16 pb-32 pt-24">{section.component}</div> {/* Render component from config */}
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
          {currentSection && (
            <motion.div
              key={currentSection.id}
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
              <div className={`${currentSection.color} ${currentSection.textColor} p-6 pb-32 min-h-full`}>
                {currentSection.component} {/* Render component from config */}
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
  )
}
