/**
 * app/programs/[slug]/page.tsx
 * Individual program detail page — Server Component.
 *
 * Uses generateStaticParams() to pre-render all program pages at build time.
 * At runtime, invalid slugs return a proper 404 via notFound().
 *
 * Security:
 *  - slug is validated against VALID_SLUGS whitelist before use
 *  - notFound() called for any slug not in the whitelist
 *  - No user input rendered unescaped
 *  - JSON-LD serialized with JSON.stringify — injection-safe
 *
 * SEO:
 *  - Per-program title, description, canonical, OG tags
 *  - JSON-LD Course schema with provider, location, offers, requirements
 *  - generateMetadata() called at build time for static pages
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProgramBySlug,
  getProgramsByTrack,
  VALID_SLUGS,
  TRACKS,
  type Program,
} from "@/lib/programs";

export const runtime = 'edge';

/* ─── STATIC PARAMS ──────────────────────────────────────────────────────────
 * Pre-renders every program page at build time.
 * Any slug NOT returned here will hit the dynamic fallback (404).
 * ─────────────────────────────────────────────────────────────────────────── */
export function generateStaticParams(): { slug: string }[] {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

/* ─── METADATA ───────────────────────────────────────────────────────────────
 * Per-program SEO. Falls back to generic if slug is invalid (notFound()
 * will fire before the page renders anyway).
 * ─────────────────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = getProgramBySlug(params.slug);
  if (!program) {
    return { title: "Program Not Found" };
  }

  const url = `https://rieducationcenter.org/programs/${program.slug}`;

  return {
    title: program.fullName,
    description: program.tagline + " — " +
      (program.grantFunded
        ? "100% grant-funded for eligible Rhode Island residents. "
        : "") +
      "Rhode Island Education Center for H.O.P.E. | 401-452-0171.",
    alternates: { canonical: url },
    openGraph: {
      title: `${program.fullName} | RIEC Rhode Island`,
      description: program.tagline,
      url,
      type: "website",
    },
  };
}

/* ─── JSON-LD — Course schema ────────────────────────────────────────────── */
function buildCourseSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.fullName,
    description: program.description,
    url: program.schemaUrl,
    provider: {
      "@type": ["EducationalOrganization", "NGO"],
      "@id": "https://rieducationcenter.org/#organization",
      name: "Rhode Island Education Center for H.O.P.E.",
      url: "https://rieducationcenter.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "75 Commerce Dr.",
        addressLocality: "Warwick",
        addressRegion: "RI",
        postalCode: "02886",
        addressCountry: "US",
      },
      telephone: "+1-401-452-0171",
    },
    courseMode: program.details.find((d) => d.label === "Format")?.value ?? "In-Person",
    timeRequired: program.details.find((d) => d.label === "Duration")?.value,
    educationalCredentialAwarded: program.outcomes[0]?.text,
    ...(program.prerequisites.length > 0 && {
      coursePrerequisites: program.prerequisites.join("; "),
    }),
    offers: program.grantFunded
      ? {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "100% grant-funded for eligible Rhode Island residents through RI workforce development programs.",
          eligibleRegion: {
            "@type": "State",
            name: "Rhode Island",
          },
        }
      : undefined,
  };
}

/* ─── BADGE ──────────────────────────────────────────────────────────────── */
function Badge({
  label,
  variant,
}: {
  label: string;
  variant: Program["badges"][number]["variant"];
}) {
  const styles: Record<typeof variant, React.CSSProperties> = {
    funded:    { background: "rgba(200,161,54,0.15)", color: "#8B6A10", border: "1px solid rgba(200,161,54,0.3)" },
    triple:    { background: "rgba(12,27,77,0.1)",    color: "#0C1B4D", border: "1px solid rgba(12,27,77,0.2)" },
    ri:        { background: "rgba(27,122,140,0.15)", color: "#0E5D6E", border: "1px solid rgba(27,122,140,0.3)" },
    aha:       { background: "rgba(192,57,43,0.12)",  color: "#922B21", border: "1px solid rgba(192,57,43,0.3)" },
    community: { background: "rgba(27,122,90,0.12)",  color: "#0E5D3A", border: "1px solid rgba(27,122,90,0.3)" },
  };
  return (
    <span style={{
      ...styles[variant],
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      padding: "4px 12px", textTransform: "uppercase", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

/* ─── PAGE COMPONENT ─────────────────────────────────────────────────────── */
export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  /* ── Security: validate slug against whitelist before any use ──────────── */
  if (!VALID_SLUGS.includes(params.slug)) {
    notFound();
  }

  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const track       = TRACKS[program.track];
  const relatedProgs = getProgramsByTrack(program.track)
    .filter((p) => p.slug !== program.slug)
    .slice(0, 3);

  const trackAccent: Record<Program["track"], string> = {
    "allied-health":      "#0C1B4D",
    "emergency-medicine": "#1B7A8C",
    aha:                  "#8B0000",
  };

  const accent = trackAccent[program.track];

  return (
    <>
      {/* JSON-LD Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseSchema(program)) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          background: "#fff", borderBottom: "1px solid rgba(12,27,77,0.08)",
          padding: "12px 5%",
        }}
      >
        <ol
          style={{ display: "flex", gap: 8, alignItems: "center", listStyle: "none", margin: 0, padding: 0, maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {[
            { href: "/",         label: "Home",     pos: 1 },
            { href: "/programs", label: "Programs", pos: 2 },
            { href: null,        label: program.shortName, pos: 3 },
          ].map(({ href, label, pos }, i) => (
            <li
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              {i > 0 && <span aria-hidden="true" style={{ color: "#6B7094", fontSize: 12 }}>›</span>}
              {href ? (
                <Link
                  href={href}
                  itemProp="item"
                  style={{ fontSize: 13, color: "#6B7094", textDecoration: "none" }}
                >
                  <span itemProp="name">{label}</span>
                </Link>
              ) : (
                <span itemProp="name" style={{ fontSize: 13, color: "#0C1B4D", fontWeight: 600 }}>
                  {label}
                </span>
              )}
              <meta itemProp="position" content={String(pos)} />
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(145deg, #08122E 0%, ${accent} 100%)`,
        padding: "64px 5% 56px",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 50%, rgba(200,161,54,0.06) 0%, transparent 60%)",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Track label */}
          <Link
            href="/programs"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none",
              marginBottom: 20, letterSpacing: "0.06em",
            }}
          >
            ← {track.icon} {track.title}
          </Link>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              {/* Badges */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {program.badges.map((b) => (
                  <Badge key={b.label} label={b.label} variant={b.variant} />
                ))}
              </div>

              <h1 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                fontWeight: 900, color: "#fff",
                lineHeight: 1.1, margin: "0 0 16px",
              }}>
                {program.fullName}
              </h1>

              <p style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 300, lineHeight: 1.75,
                maxWidth: 560, margin: 0,
              }}>
                {program.tagline}
              </p>
            </div>

            {/* Apply CTA box */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "28px 32px", flexShrink: 0,
              minWidth: 260,
            }}>
              {program.grantFunded && (
                <div style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 32, fontWeight: 900, color: "#C8A136",
                  marginBottom: 4, lineHeight: 1,
                }}>
                  $0 Tuition
                </div>
              )}
              <p style={{
                fontSize: 13, color: "rgba(255,255,255,0.55)",
                marginBottom: 20, lineHeight: 1.5,
              }}>
                {program.grantFunded
                  ? "100% covered for eligible Rhode Island residents"
                  : "Contact us for current pricing and availability"}
              </p>
              <Link href="/apply" style={{
                display: "block", background: "#C8A136", color: "#08122E",
                padding: "13px 24px", fontSize: 14, fontWeight: 700,
                letterSpacing: "0.05em", textDecoration: "none",
                textAlign: "center", marginBottom: 10,
                border: "2px solid #C8A136",
              }}>
                Apply Free Now →
              </Link>
              <a href="tel:+14014520171" style={{
                display: "block", background: "transparent", color: "rgba(255,255,255,0.6)",
                padding: "11px 24px", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.04em", textDecoration: "none",
                textAlign: "center", border: "1px solid rgba(255,255,255,0.2)",
              }}>
                Call 401-452-0171
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ background: "#FAF7F2", padding: "60px 5% 80px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 300px",
          gap: 40, alignItems: "start",
        }}>

          {/* Main column */}
          <div>

            {/* Description */}
            <section aria-labelledby="about-heading" style={{ marginBottom: 48 }}>
              <h2 id="about-heading" style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 26, fontWeight: 800, color: "#0C1B4D",
                marginBottom: 16, lineHeight: 1.2,
              }}>
                About This Program
              </h2>
              <p style={{ fontSize: 16, color: "#2C2C3A", lineHeight: 1.85, margin: 0 }}>
                {program.description}
              </p>
            </section>

            {/* Prerequisites callout */}
            {program.prerequisites.length > 0 && (
              <div style={{
                background: "rgba(27,122,140,0.07)",
                borderLeft: "4px solid #1B7A8C",
                padding: "16px 20px", marginBottom: 40,
              }}
                role="note"
                aria-label="Program prerequisites"
              >
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0C1B4D", margin: "0 0 6px" }}>
                  ⚠ Prerequisite Required
                </p>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {program.prerequisites.map((p) => (
                    <li key={p} style={{ fontSize: 14, color: "#1B7A8C", lineHeight: 1.6 }}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            <section aria-labelledby="skills-heading" style={{ marginBottom: 48 }}>
              <h2 id="skills-heading" style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 26, fontWeight: 800, color: "#0C1B4D",
                marginBottom: 20, lineHeight: 1.2,
              }}>
                What You'll Learn
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {program.skills.map((skill, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    padding: "14px 18px",
                    background: "#fff",
                    border: "1px solid rgba(12,27,77,0.07)",
                    borderLeft: `3px solid ${accent}`,
                    fontSize: 14, color: "#2C2C3A", lineHeight: 1.6,
                  }}>
                    <span style={{ color: accent, fontWeight: 700, flexShrink: 0, marginTop: 1 }} aria-hidden="true">✓</span>
                    {skill.text}
                  </li>
                ))}
              </ul>
            </section>

            {/* Outcomes */}
            <section aria-labelledby="outcomes-heading" style={{ marginBottom: 48 }}>
              <h2 id="outcomes-heading" style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 26, fontWeight: 800, color: "#0C1B4D",
                marginBottom: 20, lineHeight: 1.2,
              }}>
                Program Outcomes
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {program.outcomes.map((outcome, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    padding: "16px 20px",
                    background: i % 2 === 0
                      ? `linear-gradient(135deg, ${accent}10 0%, ${accent}05 100%)`
                      : "#fff",
                    border: `1px solid ${accent}25`,
                    fontSize: 15, color: "#2C2C3A", lineHeight: 1.6, fontWeight: 500,
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }} aria-hidden="true">🎯</span>
                    {outcome.text}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related programs */}
            {relatedProgs.length > 0 && (
              <section aria-labelledby="related-heading">
                <h2 id="related-heading" style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 22, fontWeight: 800, color: "#0C1B4D",
                  marginBottom: 16, lineHeight: 1.2,
                }}>
                  Other {track.title} Programs
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {relatedProgs.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/programs/${p.slug}`}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "16px 20px", background: "#fff",
                        border: "1px solid rgba(12,27,77,0.08)", textDecoration: "none",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#0C1B4D", marginBottom: 3 }}>
                          {p.fullName}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7094" }}>{p.tagline}</div>
                      </div>
                      <span style={{ color: accent, fontSize: 18 }} aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside aria-label="Program details">

            {/* Program details table */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(12,27,77,0.08)",
              borderTop: `4px solid ${accent}`,
              marginBottom: 20, overflow: "hidden",
            }}>
              <div style={{ padding: "20px 24px 4px", borderBottom: "1px solid rgba(12,27,77,0.06)" }}>
                <h3 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 16, fontWeight: 800, color: "#0C1B4D", margin: 0,
                }}>
                  Program Details
                </h3>
              </div>
              <dl style={{ margin: 0 }}>
                {program.details.map((d, i) => (
                  <div
                    key={d.label}
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", gap: 12,
                      padding: "12px 24px",
                      background: i % 2 === 0 ? "rgba(12,27,77,0.02)" : "#fff",
                    }}
                  >
                    <dt style={{ fontSize: 12, fontWeight: 700, color: "#6B7094", letterSpacing: "0.04em", flexShrink: 0 }}>
                      {d.label}
                    </dt>
                    <dd style={{ fontSize: 13, color: "#0C1B4D", fontWeight: 500, textAlign: "right", margin: 0 }}>
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Grant callout */}
            {program.grantFunded && (
              <div style={{
                background: "linear-gradient(135deg, rgba(200,161,54,0.1) 0%, rgba(200,161,54,0.05) 100%)",
                border: "1px solid rgba(200,161,54,0.3)",
                padding: "20px 24px", marginBottom: 20,
              }}>
                <div style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 28, fontWeight: 900, color: "#C8A136",
                  marginBottom: 6, lineHeight: 1,
                }}>
                  $0 Tuition
                </div>
                <p style={{ fontSize: 13, color: "#6B7094", margin: "0 0 14px", lineHeight: 1.6 }}>
                  100% covered for eligible Rhode Island residents through RI workforce development grants.
                </p>
                <Link href="/apply" style={{
                  display: "block", background: "#C8A136", color: "#08122E",
                  padding: "11px 16px", fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.05em", textDecoration: "none", textAlign: "center",
                  border: "2px solid #C8A136",
                }}>
                  Check Eligibility →
                </Link>
              </div>
            )}

            {/* Contact card */}
            <div style={{
              background: "#0C1B4D",
              padding: "20px 24px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#C8A136", marginBottom: 12, letterSpacing: "0.04em" }}>
                HAVE QUESTIONS?
              </p>
              <a href="tel:+14014520171" style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "#fff", textDecoration: "none", fontSize: 15,
                fontWeight: 600, marginBottom: 10,
              }}>
                <span aria-hidden="true">📞</span> 401-452-0171
              </a>
              <a href="mailto:chris@rieducationcenter.org" style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                fontSize: 12, marginBottom: 10, wordBreak: "break-all",
              }}>
                <span aria-hidden="true">✉️</span> chris@rieducationcenter.org
              </a>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.5 }}>
                75 Commerce Dr., Warwick, RI 02886
              </p>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}