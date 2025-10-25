import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Exact matches from brand guidelines
        'imperial-gold': '#D9B45A',
        'agarwood-brown': '#5E3B1E',
        'forest-umber': '#3C2F26',
        'ivory-mist': '#F7F5EF',
        'charcoal-ash': '#1C1C1C',

        // System colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary (Imperial Gold based)
        primary: {
          DEFAULT: '#D9B45A', // Imperial Gold
          foreground: '#1C1C1C', // Charcoal Ash
          50: '#fefdf8',
          100: '#fef7e0',
          200: '#fdecc8',
          300: '#f9d71c',
          400: '#f5c842',
          500: '#D9B45A', // Imperial Gold
          600: '#c59342',
          700: '#a47638',
          800: '#855f33',
          900: '#6e4f2b',
        },

        // Neutral (Ivory Mist to Charcoal Ash)
        neutral: {
          50: '#F7F5EF', // Ivory Mist
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#1C1C1C', // Charcoal Ash
        },

        // Accent (Imperial Gold variations)
        accent: {
          DEFAULT: '#D9B45A', // Imperial Gold
          foreground: '#1C1C1C', // Charcoal Ash
          50: '#faf7ed',
          100: '#f4efd9',
          200: '#e9deb3',
          300: '#ddc983',
          400: '#D9B45A', // Imperial Gold
          500: '#d1a84e',
          600: '#c59342',
          700: '#a47638',
          800: '#855f33',
          900: '#6e4f2b',
        },

        // Brown (Agarwood Brown and Forest Umber based)
        brown: {
          50: '#f6f3f0',
          100: '#ede7e0',
          200: '#d9cdc0',
          300: '#c5b3a0',
          400: '#a18871',
          500: '#7d6551',
          600: '#5E3B1E', // Agarwood Brown
          700: '#4a2f18',
          800: '#3C2F26', // Forest Umber
          900: '#2d221c',
        },

        // System colors
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair-display)'],
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
