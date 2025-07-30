export const theme = {
  colors: {
    primary: {
      50: "#fefdf8",
      100: "#fef7e0",
      200: "#fdecc8",
      300: "#f9d71c",
      400: "#f5c842",
      500: "#f0b90b",
      600: "#d4940a",
      700: "#b8750a",
      800: "#9c5608",
      900: "#7f4606",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    accent: {
      50: "#f8f6f0",
      100: "#f0ebe0",
      200: "#e8dcc6",
      300: "#d4c4a8",
      400: "#c4a882",
      500: "#b8956a",
      600: "#a67c52",
      700: "#8b6914",
      800: "#6d5411",
      900: "#5c470f",
    },
  },
  typography: {
    fontFamily: {
      serif: ["Playfair Display", "Georgia", "serif"],
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
  },
}

export type Theme = typeof theme
