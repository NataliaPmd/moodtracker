// Design tokens for the Mood Tracker app

export const Colors = {
  // Brand palette
  primary: "#fbdcea",  // soft pink — backgrounds, cards
  accent: "#88566C",   // mauve — interactive elements, icons, tint
  white: "#ffffff",

  // Semantic colors per color scheme
  light: {
    background: "#ffffff",
    surface: "#fbdcea",
    text: "#88566C",
    textMuted: "#88566caa",
    tint: "#88566C",
    icon: "#88566C",
    tabIconDefault: "#88566caa",
    tabIconSelected: "#88566C",
    border: "#88566c33",
  },
  dark: {
    background: "#2a1520",
    surface: "#3d2030",
    text: "#fbdcea",
    textMuted: "#fbdceaaa",
    tint: "#fbdcea",
    icon: "#fbdcea",
    tabIconDefault: "#fbdceaaa",
    tabIconSelected: "#fbdcea",
    border: "#fbdcea33",
  },
} as const;

// Font family names — must match the keys passed to useFonts() in _layout.tsx
export const Fonts = {
  heading: "AmaticSC_700Bold",          // titles, screen headers
  headingRegular: "AmaticSC_400Regular",
  body: "PatrickHand_400Regular",        // body text, labels, inputs
} as const;

export type ColorScheme = "light" | "dark";
export type ThemeColors = typeof Colors.light;
