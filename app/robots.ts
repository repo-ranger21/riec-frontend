/**
 * app/robots.ts
 * Next.js 14 Metadata Route — auto-generates /robots.txt at build time.
 * No manual robots.txt file needed.
 *
 * Robots URL: https://rieducationcenter.org/robots.txt
 *
 * Rules:
 *  - All legitimate crawlers: full access to public pages
 *  - Block known AI scrapers that ignore content licensing
 *  - Block internal Next.js routes that should never be indexed
 *  - Block API routes from crawling
 *  - Sitemap reference for Google Search Console autodiscovery
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://rieducationcenter.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [

      /* ── Primary Rule: Allow all legitimate crawlers ─────────────────── */
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // API routes — never index
          "/_next/",        // Next.js internals — never index
          "/admin/",        // Future admin panel — never index
          "/*.json$",       // JSON data files
          "/404",           // Error pages
          "/500",
        ],
      },

      /* ── Block GPTBot (OpenAI) ────────────────────────────────────────── */
      {
        userAgent: "GPTBot",
        disallow: "/",
      },

      /* ── Block ChatGPT-User (OpenAI browsing plugin) ─────────────────── */
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },

      /* ── Block Google-Extended (Bard / Gemini training) ──────────────── */
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },

      /* ── Block CCBot (Common Crawl — used for LLM training datasets) ─── */
      {
        userAgent: "CCBot",
        disallow: "/",
      },

      /* ── Block Amazonbot (used for Alexa / training data) ────────────── */
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },

      /* ── Block anthropic-ai (Anthropic Claude training crawler) ─────────
       * Note: This blocks the training crawler, not Claude's browsing tool.
       * Best practice for nonprofits to control content licensing.
       * ──────────────────────────────────────────────────────────────── */
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },

      /* ── Block Applebot-Extended (Apple AI training) ─────────────────── */
      {
        userAgent: "Applebot-Extended",
        disallow: "/",
      },

    ],

    /* ── Sitemap autodiscovery ─────────────────────────────────────────── */
    sitemap: `${BASE_URL}/sitemap.xml`,

    /* ── Crawl-delay hint (informational — not all crawlers respect it) ── */
    host: BASE_URL,
  };
}