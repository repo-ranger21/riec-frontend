/**
 * next.config.ts
 * Next.js 14 configuration for riec-frontend.
 *
 * Covers:
 *  - Strict Content Security Policy (CSP)
 *  - Full security header suite (HSTS, X-Frame-Options, etc.)
 *  - Permissions Policy (camera, mic, geolocation — all denied)
 *  - Trusted image domains (no wildcard remote patterns)
 *  - Bundle analyzer (ANALYZE=true npm run build)
 *  - TypeScript + ESLint enforced on build
 *  - Logging and compression settings
 *
 * Security philosophy:
 *  Cloudflare Transform Rules handle some headers at the edge,
 *  but we define them here too so dev/preview environments are
 *  equally hardened. Defense in depth — never rely on a single layer.
 *
 * IMPORTANT — CSP nonce:
 *  The 'unsafe-inline' fallback is included for script-src ONLY as a
 *  compatibility shim for @next/third-parties (GA4). Once a nonce-based
 *  middleware is added (see commented section below), remove 'unsafe-inline'.
 */

import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

/* ─── CONTENT SECURITY POLICY ────────────────────────────────────────────────
 * Build the CSP as a structured object so each directive is auditable.
 *
 * Directive reasoning:
 *  default-src 'self'            — deny everything not explicitly allowed
 *  script-src                    — Next.js chunks + GA4 + Formspree
 *  style-src                     — self + 'unsafe-inline' required by Next.js
 *                                  inline critical CSS injection
 *  font-src 'self'               — fonts are self-hosted via next/font, no CDN
 *  img-src                       — self + data URIs (base64 favicons) + HTTPS
 *  connect-src                   — fetch() targets: Formspree + GA4 + analytics
 *  frame-src                     — Donorbox embed iframe
 *  frame-ancestors 'none'        — prevents clickjacking (replaces X-Frame-Options)
 *  base-uri 'self'               — prevents base tag injection attacks
 *  form-action 'self' formspree  — restricts where forms can POST
 *  upgrade-insecure-requests     — force HTTP → HTTPS on all sub-resources
 * ─────────────────────────────────────────────────────────────────────────── */
const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src":              ["'self'"],
  "script-src":               [
    "'self'",
    "'unsafe-inline'",                          // Required by Next.js inline scripts
    "https://www.googletagmanager.com",          // GA4
    "https://www.google-analytics.com",          // GA4
    "https://formspree.io",                      // Formspree
    "https://donorbox.org",                      // Donorbox widget
    "https://js.stripe.com",                     // Stripe (via Donorbox)
  ],
  "script-src-elem":          [
    "'self'",
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://formspree.io",
    "https://donorbox.org",
  ],
  "style-src":                ["'self'", "'unsafe-inline'"],  // Required by Next.js
  "font-src":                 ["'self'"],                      // Self-hosted via next/font
  "img-src":                  [
    "'self'",
    "data:",                                     // Base64 inline images / favicons
    "https:",                                    // Any HTTPS image (for OG images, partner logos)
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ],
  "connect-src":              [
    "'self'",
    "https://formspree.io",                      // Form submissions
    "https://www.google-analytics.com",          // GA4 beacon
    "https://analytics.google.com",
    "https://www.googletagmanager.com",
    "https://region1.google-analytics.com",      // GA4 regional endpoint
    "https://vitals.vercel-insights.com",        // Optional: Vercel analytics
  ],
  "frame-src":                [
    "https://donorbox.org",                      // Donorbox donation widget iframe
    "https://www.youtube-nocookie.com",          // Future: YouTube embeds (privacy-enhanced)
  ],
  "frame-ancestors":          ["'none'"],        // Prevent this site from being iframed
  "base-uri":                 ["'self'"],        // Prevent base tag injection
  "form-action":              [
    "'self'",
    "https://formspree.io",                      // Formspree POST endpoint
  ],
  "object-src":               ["'none'"],        // Deny Flash, plugins
  "media-src":                ["'self'"],
  "worker-src":               ["'self'", "blob:"], // Service workers
  "manifest-src":             ["'self'"],
  "upgrade-insecure-requests": [],               // Force HTTP → HTTPS
};

/** Serialize the CSP object into a single header string */
function buildCSP(directives: Record<string, string[]>): string {
  return Object.entries(directives)
    .map(([key, values]) =>
      values.length > 0 ? `${key} ${values.join(" ")}` : key
    )
    .join("; ");
}

/* ─── SECURITY HEADERS ───────────────────────────────────────────────────────
 * Applied to ALL routes via the headers() config.
 * Cloudflare adds another layer at the edge — belt and suspenders.
 * ─────────────────────────────────────────────────────────────────────────── */
const SECURITY_HEADERS = [
  /* Prevents MIME-type sniffing — stops browser from guessing content type */
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  /* Referrer Policy — only send origin on cross-origin HTTPS requests */
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  /* Permissions Policy — deny all sensitive browser APIs
   * Nonprofit site has zero reason to access camera, mic, or location.
   * Explicit denial prevents malicious third-party scripts from accessing. */
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",   // Opt out of FLoC / Privacy Sandbox tracking
      "payment=()",           // Payment handled by Donorbox/Stripe iframes
      "usb=()",
      "bluetooth=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
    ].join(", "),
  },
  /* HTTP Strict Transport Security
   * max-age=63072000 = 2 years (recommended pre-load value)
   * includeSubDomains covers www. and any future subdomains
   * preload: submit to hstspreload.org ONLY after confirming all
   *          subdomains are HTTPS-only (do not enable until then) */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  /* X-Frame-Options — legacy fallback for browsers that don't support
   * CSP frame-ancestors. Both should be set. */
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  /* Cross-Origin-Opener-Policy — isolates browsing context
   * Prevents cross-origin windows from accessing window references */
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  /* Cross-Origin-Resource-Policy — prevents other origins from
   * embedding this site's resources */
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  /* Content Security Policy */
  {
    key: "Content-Security-Policy",
    value: buildCSP(CSP_DIRECTIVES),
  },
];

/* ─── NEXT.JS CONFIG ─────────────────────────────────────────────────────── */
const nextConfig: NextConfig = {

  /* ── TypeScript & ESLint ─────────────────────────────────────────────────
   * Both must pass for a successful production build.
   * Never disable these — they are the last line of defense before deploy.
   * ─────────────────────────────────────────────────────────────────────── */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "components", "lib"],
  },

  /* ── Image Optimization ──────────────────────────────────────────────────
   * remotePatterns replaces deprecated 'domains' config.
   * Only explicit origins are trusted — no wildcards.
   * ─────────────────────────────────────────────────────────────────────── */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rieducationcenter.org",
        pathname: "/**",
      },
      /* Candid/GuideStar seal image (trust badge) */
      {
        protocol: "https",
        hostname: "widgets.guidestar.org",
        pathname: "/**",
      },
    ],
    /* Modern formats — Next.js serves WebP/AVIF automatically */
    formats: ["image/avif", "image/webp"],
    /* Minimum cache TTL for optimized images (1 week) */
    minimumCacheTTL: 604800,
    /* Prevent SVG injection via <Image> — use <img> for trusted SVGs */
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* ── Security Headers ────────────────────────────────────────────────────
   * Applied to all routes. Specific paths can be added below if needed.
   * ─────────────────────────────────────────────────────────────────────── */
  async headers() {
    return [
      {
        /* Apply to all routes */
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        /* Additional cache control for static assets */
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Prevent indexing of API routes at the HTTP level */
        source: "/api/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },

  /* ── Redirects ───────────────────────────────────────────────────────────
   * Permanent 301 redirects for legacy URLs and common typos.
   * Add as the site grows — never leave broken inbound links.
   * ─────────────────────────────────────────────────────────────────────── */
  async redirects() {
    return [
      /* Normalize trailing slashes to canonical no-slash form */
      {
        source: "/programs/",
        destination: "/programs",
        permanent: true,
      },
      {
        source: "/apply/",
        destination: "/apply",
        permanent: true,
      },
      {
        source: "/donate/",
        destination: "/donate",
        permanent: true,
      },
      {
        source: "/about/",
        destination: "/about",
        permanent: true,
      },
    ];
  },

  /* ── Compression ─────────────────────────────────────────────────────────
   * Enabled by default in Next.js. Cloudflare also compresses at edge.
   * Keeping true here ensures dev server and non-CF previews also compress.
   * ─────────────────────────────────────────────────────────────────────── */
  compress: true,

  /* ── Power Headers ───────────────────────────────────────────────────────
   * Remove the X-Powered-By: Next.js header.
   * Reduces information leakage about the tech stack.
   * ─────────────────────────────────────────────────────────────────────── */
  poweredByHeader: false,

  /* ── React Strict Mode ───────────────────────────────────────────────────
   * Enables double-invocation of render functions in development.
   * Catches side effects and legacy API usage early.
   * ─────────────────────────────────────────────────────────────────────── */
  reactStrictMode: true,
  output: 'export',

  /* ── Trailing Slash ──────────────────────────────────────────────────────
   * false = canonical URLs without trailing slash (/programs not /programs/)
   * Matches the redirects defined above.
   * ─────────────────────────────────────────────────────────────────────── */
  trailingSlash: false,

  /* ── Logging ─────────────────────────────────────────────────────────────
   * Log fetches in development for debugging data-fetching issues.
   * ─────────────────────────────────────────────────────────────────────── */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  /* ── Experimental ────────────────────────────────────────────────────────
   * Only stable or near-stable features included.
   * ─────────────────────────────────────────────────────────────────────── */
  experimental: {
    /* Optimize package imports — reduces bundle size for icon libraries */
    optimizePackageImports: ["lucide-react"],
  },
};

/* ─── BUNDLE ANALYZER ────────────────────────────────────────────────────────
 * Run: ANALYZE=true npm run build
 * Opens a treemap of the JS bundle in your browser.
 * Use to identify heavy dependencies before they ship to production.
 * ─────────────────────────────────────────────────────────────────────────── */
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env["ANALYZE"] === "true",
  openAnalyzer: true,
});

export default withAnalyzer(nextConfig);