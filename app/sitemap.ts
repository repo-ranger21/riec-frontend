/**
 * app/sitemap.ts
 * Next.js 14 Metadata Route — auto-generates /sitemap.xml at build time.
 * No manual sitemap.xml file needed. Submit the URL to Google Search Console.
 *
 * Sitemap URL: https://rieducationcenter.org/sitemap.xml
 *
 * Covers:
 *  - All static pages (homepage, about, donate, contact, etc.)
 *  - All program detail pages (dynamically from programs.ts)
 *  - Correct lastModified, changeFrequency, and priority for each route
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from "next";
import { PROGRAMS } from "@/lib/programs";
export const dynamic = 'force-static';
const BASE_URL = "https://rieducationcenter.org";

/**
 * Build date is used as lastModified for static pages.
 * Individual program pages can be updated separately if a CMS is added.
 */
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static Pages ──────────────────────────────────────────────────────
   * priority scale:
   *   1.0 = homepage
   *   0.9 = primary conversion pages (apply, programs index)
   *   0.8 = high-value supporting pages (about, donate)
   *   0.6 = secondary pages (FAQ, contact)
   *   0.4 = legal / utility pages
   * ─────────────────────────────────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/apply`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/donate`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/accessibility`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ── Program Detail Pages ──────────────────────────────────────────────
   * Generated from the PROGRAMS array in lib/programs.ts.
   * If a program is added there, it automatically appears in the sitemap.
   * Priority 0.85 — below homepage and apply, above about, because these
   * are the primary SEO keyword targets (e.g. "free CNA training RI").
   * ─────────────────────────────────────────────────────────────────── */
  const programRoutes: MetadataRoute.Sitemap = PROGRAMS.map((program) => ({
    url: `${BASE_URL}/programs/${program.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...programRoutes];
}