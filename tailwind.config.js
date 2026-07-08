const theme = require("./config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
// Strip the Google Fonts CSS2 axis spec (everything from the first ":"
// onward — opsz, wght, ital, etc.) so the remaining string is just the
// font family name suitable for use in `font-family: ...`.
const stripFontAxis = (s) => (s || "").replace(/\+/g, " ").replace(/:.*$/, "");
if (theme.fonts.font_family.primary) {
  fontPrimary = stripFontAxis(theme.fonts.font_family.primary);
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = stripFontAxis(theme.fonts.font_family.secondary);
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        accent: theme.colors.default.theme_color.accent,
        body: theme.colors.default.theme_color.body,
        surface: theme.colors.default.theme_color.surface,
        border: theme.colors.default.theme_color.border,
        "theme-light": theme.colors.default.theme_color.theme_light,
        ink: theme.colors.default.theme_color.ink,
        muted: theme.colors.default.theme_color.muted,
      },
      fontSize: {
        base: font_base + "px",
        // editorial display sizes (fluid via clamp)
        display: "clamp(2.5rem, 5.5vw + 0.5rem, 5.5rem)",
        "display-sm": "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
      letterSpacing: {
        display: "-0.025em",
      },
      maxWidth: {
        editorial: "1440px",
      },
      transitionTimingFunction: {
        // Emil's curated easings — stronger than CSS defaults
        "luxe-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        "luxe-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        "luxe-drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        180: "180ms",
      },
      boxShadow: {
        soft: "0 10px 30px -18px rgba(14, 26, 17, 0.22), 0 2px 6px -2px rgba(14, 26, 17, 0.06)",
        leaf: "0 28px 60px -28px rgba(14, 26, 17, 0.28), 0 6px 12px -6px rgba(14, 26, 17, 0.08)",
        editorial: "0 40px 90px -40px rgba(14, 26, 17, 0.35)",
      },
      backgroundImage: {
        "bamboo-gradient":
          "linear-gradient(135deg, #F6F1E6 0%, #EAE4D2 60%, #F6F1E6 100%)",
        "bamboo-radial":
          "radial-gradient(60% 80% at 20% 0%, rgba(143,167,107,0.10) 0%, transparent 60%), radial-gradient(50% 70% at 90% 30%, rgba(184,137,61,0.08) 0%, transparent 60%)",
        "ink-fade":
          "linear-gradient(180deg, rgba(14,26,17,0) 0%, rgba(14,26,17,0.55) 70%, rgba(14,26,17,0.85) 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 600ms cubic-bezier(0.23, 1, 0.32, 1) both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
};
