/**
 * tailwind.config.ts
 * Tailwind CSS v3 configuration for riec-frontend.
 *
 * Extends (does not replace) Tailwind's default theme.
 * Every RIEC brand token is defined here so components use
 * semantic class names (bg-navy, text-gold) instead of raw hex values.
 *
 * If a color needs to change, change it here — it propagates everywhere.
 *
 * Fonts use CSS variables injected by next/font in layout.tsx:
 *   --font-playfair  →  font-playfair
 *   --font-dm-sans   →  font-sans (overrides Tailwind default)
 */

import type { Config } from "tailwindcss";

const config: Config = {
  /* ── Content Paths ──────────────────────────────────────────────────────
   * Tailwind scans these files and purges unused classes at build time.
   * Result: ~8–12KB CSS in production instead of 3MB full stylesheet.
   * Never use string interpolation in class names (e.g. `bg-${color}`) —
   * dynamic class names are invisible to the purge scanner.
   * ─────────────────────────────────────────────────────────────────────── */
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      /* ── Colors ────────────────────────────────────────────────────────
       * Full RIEC color token system.
       * Each color has a scale so variants can be used consistently:
       *   bg-navy        → primary brand navy #0C1B4D
       *   bg-navy-deep   → darkest navy for headers/footers
       *   bg-navy-light  → lighter navy for hover states
       *   text-gold      → primary gold accent
       *   etc.
       * ────────────────────────────────────────────────────────────────── */
      colors: {
        navy: {
          DEFAULT: "#0C1B4D",
          light:   "#162260",
          deep:    "#08122E",
          mist:    "#1A2E7A",     // Used in gradient midpoints
          "50":    "#EEF0F8",
          "100":   "#D5D9EF",
          "200":   "#AAB2DF",
          "300":   "#7F8BCF",
          "400":   "#5464BF",
          "500":   "#293DAF",
          "600":   "#0C1B4D",     // = DEFAULT
          "700":   "#0A1640",
          "800":   "#081133",
          "900":   "#08122E",     // = deep
        },
        gold: {
          DEFAULT: "#C8A136",
          light:   "#DEB840",
          pale:    "#F5E9C0",
          dark:    "#9E7D25",
          "50":    "#FEF9ED",
          "100":   "#FBF0CC",
          "200":   "#F5E9C0",     // = pale
          "300":   "#EDCF7A",
          "400":   "#E4B84A",
          "500":   "#C8A136",     // = DEFAULT
          "600":   "#A8852A",
          "700":   "#9E7D25",     // = dark
          "800":   "#7A5E1A",
          "900":   "#5C460F",
        },
        teal: {
          DEFAULT: "#1B7A8C",
          light:   "#22A5BD",
          pale:    "#D4EFF4",
          dark:    "#135A68",
          "50":    "#EBF7FA",
          "100":   "#C9EBF2",
          "200":   "#96D6E6",
          "300":   "#5EBFD6",
          "400":   "#22A5BD",     // = light
          "500":   "#1B7A8C",     // = DEFAULT
          "600":   "#135A68",     // = dark
          "700":   "#0D4250",
          "800":   "#082D38",
          "900":   "#041820",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          dark:    "#F0EBE1",
          darker:  "#E6DDD0",
        },
        /* Semantic aliases — use these in components for intent clarity */
        error:   "#C0392B",
        success: "#1B7A5A",
        warning: "#E67E22",
        info:    "#2980B9",
      },

      /* ── Typography ────────────────────────────────────────────────────
       * font-playfair → Playfair Display (loaded via next/font → CSS var)
       * font-sans     → DM Sans (overrides Tailwind's default sans stack)
       * ────────────────────────────────────────────────────────────────── */
      fontFamily: {
        playfair: [
          "var(--font-playfair)",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
        sans: [
          "var(--font-dm-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },

      /* ── Font Sizes ──────────────────────────────────────────────────── */
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],      // 10px
        xs:    ["0.6875rem", { lineHeight: "1rem" }],     // 11px
        sm:    ["0.8125rem", { lineHeight: "1.25rem" }],  // 13px
        base:  ["0.9375rem", { lineHeight: "1.6rem" }],   // 15px
        lg:    ["1.0625rem", { lineHeight: "1.75rem" }],  // 17px
        xl:    ["1.1875rem", { lineHeight: "1.75rem" }],  // 19px
        "2xl": ["1.375rem",  { lineHeight: "2rem" }],     // 22px
        "3xl": ["1.625rem",  { lineHeight: "2.25rem" }],  // 26px
        "4xl": ["2rem",      { lineHeight: "2.5rem" }],   // 32px
        "5xl": ["2.5rem",    { lineHeight: "1.1" }],      // 40px
        "6xl": ["3.25rem",   { lineHeight: "1.08" }],     // 52px
        "7xl": ["4rem",      { lineHeight: "1.05" }],     // 64px
        "8xl": ["5rem",      { lineHeight: "1.02" }],     // 80px
      },

      /* ── Spacing ─────────────────────────────────────────────────────── */
      spacing: {
        "18":  "4.5rem",   // 72px
        "22":  "5.5rem",   // 88px
        "26":  "6.5rem",   // 104px
        "30":  "7.5rem",   // 120px
        "34":  "8.5rem",   // 136px
        "36":  "9rem",     // 144px
        "72":  "18rem",    // 288px
        "84":  "21rem",    // 336px
        "96":  "24rem",    // 384px
        "128": "32rem",    // 512px
      },

      /* ── Max Width ───────────────────────────────────────────────────── */
      maxWidth: {
        "8xl":  "88rem",   // 1408px — wide layout cap
        "site": "75rem",   // 1200px — standard content width
        "form": "45rem",   // 720px — form / content column
        "copy": "44ch",    // Optimal reading width for body text
      },

      /* ── Border Radius ───────────────────────────────────────────────── */
      borderRadius: {
        none: "0",
        sm:   "2px",
        DEFAULT: "4px",
        md:   "6px",
        lg:   "8px",
        xl:   "12px",
        "2xl": "16px",
        full: "9999px",
      },

      /* ── Box Shadows ─────────────────────────────────────────────────── */
      boxShadow: {
        sm:     "0 2px 8px rgba(12, 27, 77, 0.07)",
        DEFAULT: "0 4px 16px rgba(12, 27, 77, 0.10)",
        md:     "0 8px 24px rgba(12, 27, 77, 0.12)",
        lg:     "0 16px 40px rgba(12, 27, 77, 0.14)",
        xl:     "0 24px 56px rgba(12, 27, 77, 0.16)",
        "2xl":  "0 32px 64px rgba(12, 27, 77, 0.20)",
        gold:   "0 8px 24px rgba(200, 161, 54, 0.30)",
        "gold-lg": "0 16px 40px rgba(200, 161, 54, 0.35)",
        teal:   "0 8px 24px rgba(27, 122, 140, 0.25)",
        inner:  "inset 0 2px 4px rgba(12, 27, 77, 0.08)",
        none:   "none",
      },

      /* ── Animations ──────────────────────────────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "star-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%":      { transform: "translateY(-16px) rotate(12deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200, 161, 54, 0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(200, 161, 54, 0)" },
        },
        "scroll-pulse": {
          "0%, 100%": { opacity: "0.2" },
          "50%":      { opacity: "1" },
        },
        "underline-grow": {
          "0%":   { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },

      animation: {
        "fade-up":         "fade-up 0.6s ease both",
        "fade-up-slow":    "fade-up 0.9s ease both",
        "fade-in":         "fade-in 0.5s ease both",
        "fade-down":       "fade-down 0.5s ease both",
        "slide-in-right":  "slide-in-right 0.5s ease both",
        "scale-in":        "scale-in 0.4s ease both",
        "star-float":      "star-float 5s ease-in-out infinite",
        "pulse-gold":      "pulse-gold 2s ease-in-out infinite",
        "scroll-pulse":    "scroll-pulse 2s ease-in-out infinite",
        "underline-grow":  "underline-grow 0.3s ease both",
      },

      /* ── Transitions ─────────────────────────────────────────────────── */
      transitionDuration: {
        "0":   "0ms",
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
      },

      transitionTimingFunction: {
        "bounce-in":  "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      /* ── Z-Index ─────────────────────────────────────────────────────── */
      zIndex: {
        "1":    "1",
        "2":    "2",
        "nav":  "1000",
        "modal": "1100",
        "toast": "1200",
      },

      /* ── Letter Spacing ──────────────────────────────────────────────── */
      letterSpacing: {
        tightest: "-0.03em",
        tighter:  "-0.015em",
        tight:    "-0.01em",
        normal:   "0em",
        wide:     "0.04em",
        wider:    "0.08em",
        widest:   "0.15em",
        "ultra":  "0.2em",
      },

      /* ── Line Height ─────────────────────────────────────────────────── */
      lineHeight: {
        "tighter": "1.05",
        "tight":   "1.15",
        "snug":    "1.3",
        "normal":  "1.5",
        "relaxed": "1.7",
        "loose":   "1.9",
      },

      /* ── Background Gradients (used via bg-gradient-*) ──────────────── */
      backgroundImage: {
        "gradient-navy":
          "linear-gradient(145deg, #08122E 0%, #0C1B4D 55%, #162260 100%)",
        "gradient-navy-hero":
          "linear-gradient(160deg, #08122E 0%, #0C1B4D 50%, #1A2E7A 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C8A136 0%, #DEB840 100%)",
        "gradient-teal":
          "linear-gradient(135deg, #1B7A8C 0%, #22A5BD 100%)",
        "gradient-cream":
          "linear-gradient(180deg, #FAF7F2 0%, #F0EBE1 100%)",
        "gradient-cta":
          "linear-gradient(135deg, #08122E 0%, #0C1B4D 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top left, rgba(27,122,140,0.12) 0%, transparent 50%), " +
          "radial-gradient(ellipse at bottom right, rgba(200,161,54,0.08) 0%, transparent 50%)",
      },

      /* ── Screens (breakpoints) ───────────────────────────────────────── */
      screens: {
        xs:   "480px",
        sm:   "640px",
        md:   "768px",
        lg:   "1024px",
        xl:   "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
      },

      /* ── Aspect Ratios ───────────────────────────────────────────────── */
      aspectRatio: {
        "og":      "1200 / 630", // OG image ratio
        "card":    "16 / 9",
        "square":  "1 / 1",
        "portrait": "3 / 4",
      },
    },
  },

  /* ── Plugins ──────────────────────────────────────────────────────────────
   * No third-party plugins required — the custom token system above covers
   * all design needs. Add @tailwindcss/typography if a blog/rich text
   * section is added later (for styling Notion CMS content).
   * ─────────────────────────────────────────────────────────────────────── */
  plugins: [],

  /* ── Dark Mode ────────────────────────────────────────────────────────────
   * 'class' strategy — dark mode triggered by adding 'dark' class to <html>.
   * RIEC site is light-mode only for now. This is set to 'media' so the
   * browser's system preference is respected if dark variants are added later.
   * ─────────────────────────────────────────────────────────────────────── */
  darkMode: "media",
};

export default config;