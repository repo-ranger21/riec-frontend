/**
 * app/layout.tsx
 * Root layout — wraps every page in the RIEC site.
 *
 * Covers:
 *  - Next.js 14 Metadata API (title, description, OG, Twitter, canonical)
 *  - Fonts loaded at BUILD TIME via next/font (no runtime CDN call → CSP safe)
 *  - JSON-LD Organization + EducationalOrganization schema
 *  - Google Analytics 4 via @next/third-parties (no inline script → CSP safe)
 *  - Accessibility: skip-to-main link, lang attribute, viewport meta
 *  - Security: all external links use noopener noreferrer, no dangerouslySetInnerHTML
 *              with unvalidated input, Content-Security-Policy set in next.config.ts
 */

import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

/* ─── FONTS ──────────────────────────────────────────────────────────────────
 * Loaded at build time and self-hosted by Next.js.
 * No runtime request to fonts.googleapis.com → no CSP exception needed.
 * font-display: swap is set automatically by next/font.
 * ─────────────────────────────────────────────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─── SITE CONSTANTS ─────────────────────────────────────────────────────── */
const SITE_URL = "https://rieducationcenter.org";
const SITE_NAME = "Rhode Island Education Center for H.O.P.E.";
const SITE_DESCRIPTION =
  "RIEC offers 100% grant-funded CNA, Phlebotomy, EKG, EMT, and Patient Care Tech " +
  "training for eligible Rhode Islanders. Apply today to launch your healthcare career.";

/* ─── METADATA ───────────────────────────────────────────────────────────────
 * Used by Next.js to inject <head> tags.
 * Individual pages OVERRIDE title/description via their own metadata export.
 * ─────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Grant-Funded Healthcare Training Programs | RIEC",
    template: "%s | Rhode Island Education Center for H.O.P.E.",
  },
  description: SITE_DESCRIPTION,

  keywords: [
    "free CNA training Rhode Island",
    "grant-funded phlebotomy Providence",
    "EMT training RI",
    "healthcare workforce development Rhode Island",
    "RIEC",
    "certified nursing assistant Warwick RI",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /* Canonical + alternates */
  alternates: {
    canonical: SITE_URL,
  },

  /* Open Graph — controls how the link looks when shared on Facebook/LinkedIn */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Grant-Funded Healthcare Training Programs | RIEC",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`, // 1200×630 — see public/og-image.png
        width: 1200,
        height: 630,
        alt: "Rhode Island Education Center for H.O.P.E. — Free Healthcare Training",
      },
    ],
  },

  /* Twitter Card */
  twitter: {
    card: "summary_large_image",
    title: "Grant-Funded Healthcare Training | RIEC Rhode Island",
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },

  /* Robots */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* Favicon / icons — place files in /app or /public */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  /* PWA manifest (optional but good practice) */
  manifest: "/site.webmanifest",

  /* Verification tokens — add once Search Console + Bing are set up */
  // verification: {
  //   google: "your-google-token",
  //   other: { "msvalidate.01": "your-bing-token" },
  // },
};

/* ─── VIEWPORT ───────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1B4D", // Navy — browser chrome color on mobile
};

/* ─── JSON-LD SCHEMA ─────────────────────────────────────────────────────────
 * Organization + EducationalOrganization structured data.
 * Helps Google understand RIEC as a nonprofit education entity.
 * Eligible for rich results in Search.
 *
 * SECURITY NOTE: This object is serialized with JSON.stringify, which escapes
 * all special characters. Never interpolate raw user input into JSON-LD.
 * ─────────────────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "NGO"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "RIEC",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 400,
        height: 400,
      },
      description: SITE_DESCRIPTION,
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        streetAddress: "75 Commerce Dr.",
        addressLocality: "Warwick",
        addressRegion: "RI",
        postalCode: "02886",
        addressCountry: "US",
      },
      telephone: "+1-401-452-0171",
      email: "info@rieducationcenter.org",
      taxID: "99-3099438",
      nonprofitStatus: "Nonprofit501c3",
      areaServed: {
        "@type": "State",
        name: "Rhode Island",
      },
      sameAs: [
        "https://www.facebook.com/rieducationcenter",
        "https://www.linkedin.com/company/rieducationcenter",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/programs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/* ─── ROOT LAYOUT ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning // Required for next-themes if used later
    >
      <head>
        {/* ── JSON-LD Structured Data ────────────────────────────────────
         * JSON.stringify escapes all special chars — safe from injection.
         * ────────────────────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="font-sans bg-cream text-body antialiased">

        {/* ── Skip to Main Content ──────────────────────────────────────
         * WCAG 2.1 AA — allows keyboard/screen-reader users to bypass nav.
         * Visually hidden until focused.
         * ────────────────────────────────────────────────────────────── */}
        <a
          href="#main-content"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* ── Navigation ──────────────────────────────────────────────── */}
        <Nav />

        {/* ── Main Content ─────────────────────────────────────────────
         * id="main-content" is the skip-link target.
         * role="main" is redundant with <main> but kept for legacy AT.
         * ────────────────────────────────────────────────────────────── */}
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <Footer />

        {/* ── Google Analytics 4 ────────────────────────────────────────
         * Loaded via @next/third-parties — deferred, non-blocking.
         * Only injected when NEXT_PUBLIC_GA_ID is set in environment.
         * ────────────────────────────────────────────────────────────── */}
        {gaId && <GoogleAnalytics gaId={gaId} />}

      </body>
    </html>
  );
}
