import type { Metadata } from "next";
import Link from "next/link";
import {
  PROGRAMS,
  TRACKS,
  getProgramsByTrack,
  type Program,
  type Track,
} from "@/lib/programs";

export const metadata: Metadata = {
  title: "Healthcare Training Programs",
  description:
    "Explore RIEC's full catalog of 100% grant-funded healthcare training programs " +
    "in Rhode Island: CNA, Patient Care Technician, Phlebotomy, EKG, EMT, " +
    "Advanced EMT-Cardiac, Paramedic, and AHA certifications.",
  alternates: {
    canonical: "https://rieducationcenter.org/programs",
  },
  openGraph: {
    title: "Healthcare Training Programs | RIEC — Free Healthcare Training Rhode Island",
    description:
      "CNA, EMT, Phlebotomy, EKG, PCT, and more — all 100% grant-funded for " +
      "eligible Rhode Islanders. State-approved, clinically immersive, employment-ready.",
    url: "https://rieducationcenter.org/programs",
  },
};

/* ─── JSON-LD ────────────────────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "RIEC Healthcare Training Programs",
  description: "Grant-funded healthcare training programs offered by the Rhode Island Education Center for H.O.P.E.",
  url: "https://rieducationcenter.org/programs",
  numberOfItems: PROGRAMS.length,
  itemListElement: PROGRAMS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://rieducationcenter.org/programs/${p.slug}`,
    name: p.fullName,
  })),
};

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
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
      padding: "3px 10px", textTransform: "uppercase",
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

/* ─── TRACK SECTION ──────────────────────────────────────────────────────── */
function TrackSection({ track }: { track: Track }) {
  const meta     = TRACKS[track];
  const programs = getProgramsByTrack(track);

  const headerColors: Record<Track, string> = {
    "allied-health":      "#0C1B4D",
    "emergency-medicine": "#1B7A8C",
    aha:                  "#8B0000",
  };
  const accent = headerColors[track];

  return (
    <section id={`track-${track}`} aria-labelledby={`track-heading-${track}`} style={{ marginBottom: 48 }}>
      {/* Track header */}
      <div style={{
        background: accent,
        padding: "28px 36px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 36 }} aria-hidden="true">{meta.icon}</span>
          <div>
            <h2
              id={`track-heading-${track}`}
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 26, fontWeight: 800, color: "#fff",
                margin: 0, lineHeight: 1.2,
              }}
            >
              {meta.title}
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "4px 0 0", letterSpacing: "0.04em" }}>
              {meta.subtitle}
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", maxWidth: 400, margin: 0, lineHeight: 1.6 }}>
          {meta.description}
        </p>
      </div>

      {/* Program rows */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }} role="list">
        {programs.map((program, i) => (
          <li
            key={program.slug}
            role="listitem"
            style={{ borderBottom: i < programs.length - 1 ? "1px solid rgba(12,27,77,0.06)" : "none" }}
          >
            <Link
              href={`/programs/${program.slug}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 20,
                padding: "24px 36px",
                textDecoration: "none",
                background: "#fff",
              }}
              aria-label={`${program.fullName} — ${program.tagline}`}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: 18, fontWeight: 700, color: "#0C1B4D",
                  }}>
                    {program.fullName}
                  </span>
                  {program.prerequisites.length > 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                      padding: "2px 8px", textTransform: "uppercase",
                      background: "rgba(12,27,77,0.06)", color: "#6B7094",
                      border: "1px solid rgba(12,27,77,0.12)",
                    }}>
                      Prerequisite required
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "#6B7094", margin: "0 0 10px", lineHeight: 1.5 }}>
                  {program.tagline}
                </p>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {program.details.slice(0, 3).map((d) => (
                    <span key={d.label} style={{ fontSize: 12, color: "#6B7094" }}>
                      <strong style={{ color: "#0C1B4D", fontWeight: 600 }}>{d.label}:</strong>{" "}
                      {d.value}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                  {program.badges.map((b) => (
                    <Badge key={b.label} label={b.label} variant={b.variant} />
                  ))}
                </div>
                <span style={{ fontSize: 18, color: accent, fontWeight: 700, lineHeight: 1 }} aria-hidden="true">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ─── PAGE COMPONENT ─────────────────────────────────────────────────────── */
export default function ProgramsPage() {
  const grantCount = PROGRAMS.filter((p) => p.grantFunded).length;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(160deg, #08122E 0%, #0C1B4D 60%, #162260 100%)",
        padding: "80px 5% 72px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 20% 50%, rgba(27,122,140,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(200,161,54,0.07) 0%, transparent 50%)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{
            display: "inline-block",
            background: "rgba(200,161,54,0.15)", border: "1px solid rgba(200,161,54,0.35)",
            color: "#DEB840", fontSize: 11, letterSpacing: "0.15em", fontWeight: 700,
            padding: "5px 16px", marginBottom: 20,
          }}>
            {grantCount} of {PROGRAMS.length} programs 100% grant-funded for eligible RI residents
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(34px, 5vw, 60px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1,
            margin: "0 auto 16px", maxWidth: 760,
          }}>
            Programs &amp; Certifications
          </h1>
          <p style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 300, maxWidth: 580, margin: "0 auto 36px",
            lineHeight: 1.75,
          }}>
            All programs are Rhode Island state-approved, include clinical rotations,
            and lead directly to licensure or national certification exams.
          </p>
          <Link href="/apply" style={{
            background: "#C8A136", color: "#08122E",
            padding: "15px 36px", fontSize: 15, fontWeight: 700,
            letterSpacing: "0.04em", textDecoration: "none",
            border: "2px solid #C8A136", display: "inline-block",
          }}>
            Apply for Free Training →
          </Link>
        </div>
      </div>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid rgba(12,27,77,0.08)",
        padding: "20px 5%",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "center",
          gap: "clamp(24px, 6vw, 80px)", flexWrap: "wrap",
        }}
          role="list"
          aria-label="Program statistics"
        >
          {[
            { num: `${PROGRAMS.length}`, label: "Total Programs" },
            { num: "100%",               label: "Grant-Funded Options" },
            { num: "3",                  label: "Active Tracks" },
            { num: "RI",                 label: "State Approved" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }} role="listitem">
              <div style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 28, fontWeight: 800, color: "#C8A136",
              }}>
                {s.num}
              </div>
              <div style={{ fontSize: 11, color: "#6B7094", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Track jump links ─────────────────────────────────────────────── */}
      <nav
        aria-label="Jump to program track"
        style={{
          background: "#FAF7F2",
          borderBottom: "1px solid rgba(12,27,77,0.08)",
          padding: "14px 5%",
        }}
      >
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", gap: 8, flexWrap: "wrap",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: "#6B7094", marginRight: 4, fontWeight: 600, letterSpacing: "0.06em" }}>
            JUMP TO:
          </span>
          {(Object.keys(TRACKS) as Track[]).map((track) => (
            <a
              key={track}
              href={`#track-${track}`}
              style={{
                fontSize: 13, fontWeight: 600, color: "#0C1B4D",
                textDecoration: "none", padding: "6px 14px",
                border: "1px solid rgba(12,27,77,0.15)",
                background: "#fff",
                letterSpacing: "0.02em",
              }}
            >
              {TRACKS[track].icon} {TRACKS[track].title}
            </a>
          ))}
          <a
            href="#eligibility"
            style={{
              fontSize: 13, fontWeight: 600, color: "#8B6A10",
              textDecoration: "none", padding: "6px 14px",
              border: "1px solid rgba(200,161,54,0.35)",
              background: "rgba(200,161,54,0.08)",
              letterSpacing: "0.02em",
            }}
          >
            💰 Grant Eligibility
          </a>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{ background: "#F0EBE1", padding: "60px 5% 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Eligibility callout */}
          <div style={{
            background: "linear-gradient(135deg, rgba(200,161,54,0.1) 0%, rgba(200,161,54,0.05) 100%)",
            border: "1px solid rgba(200,161,54,0.3)",
            padding: "20px 28px", marginBottom: 48,
            display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">💰</span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#0C1B4D", margin: "0 0 6px" }}>
                Most programs are 100% grant-funded for eligible Rhode Island residents.
              </p>
              <p style={{ fontSize: 13, color: "#6B7094", margin: "0 0 12px", lineHeight: 1.6 }}>
                Eligibility is determined through RI workforce development grant programs.
                Requirements typically include RI residency and income criteria.
                Pre-qualification is free and takes under 5 minutes.
              </p>
              <Link href="/apply" style={{
                fontSize: 13, fontWeight: 700, color: "#C8A136",
                textDecoration: "none", letterSpacing: "0.04em",
              }}>
                Check Your Eligibility →
              </Link>
            </div>
          </div>

          {/* All three active tracks */}
          {(Object.keys(TRACKS) as Track[]).map((track) => (
            <TrackSection key={track} track={track} />
          ))}

          {/* ── Behavioral Health — Coming Soon ──────────────────────────── */}
          <section
            aria-labelledby="track-heading-behavioral"
            style={{ marginBottom: 48 }}
          >
            <div style={{
              background: "rgba(107,112,148,0.08)",
              border: "2px dashed rgba(107,112,148,0.35)",
              padding: "32px 36px",
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 24, flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flex: 1, minWidth: 260 }}>
                <span style={{ fontSize: 40, flexShrink: 0 }} aria-hidden="true">🧠</span>
                <div>
                  <div style={{
                    display: "inline-block",
                    fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                    fontWeight: 700, color: "#6B7094",
                    background: "rgba(107,112,148,0.12)",
                    border: "1px solid rgba(107,112,148,0.3)",
                    padding: "3px 10px", marginBottom: 12,
                  }}>
                    Coming Soon — Year 2
                  </div>
                  <h2
                    id="track-heading-behavioral"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: 26, fontWeight: 800, color: "#4A4A5A",
                      margin: "0 0 6px", lineHeight: 1.2,
                    }}
                  >
                    Behavioral Health Track
                  </h2>
                  <p style={{ fontSize: 14, color: "#6B7094", margin: 0, fontStyle: "italic" }}>
                    Launching Year 2 — Join the waitlist.
                  </p>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260, maxWidth: 480 }}>
                <p style={{ fontSize: 14, color: "#6B7094", lineHeight: 1.8, margin: "0 0 20px" }}>
                  RIEC is developing a Behavioral Health track to address Rhode Island&apos;s
                  critical shortage of community mental health and substance use treatment workers.
                  Program credentials and curriculum details will be announced prior to launch.
                  Add yourself to the interest list now to be notified when enrollment opens.
                </p>
                <Link href="/apply" style={{
                  display: "inline-block",
                  background: "transparent", color: "#4A4A5A",
                  padding: "11px 28px", fontSize: 13, fontWeight: 700,
                  letterSpacing: "0.05em", textDecoration: "none",
                  border: "2px solid rgba(107,112,148,0.4)",
                }}>
                  Join the Waitlist →
                </Link>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div style={{
            background: "#0C1B4D", padding: "48px 40px",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800, color: "#fff", marginBottom: 14, lineHeight: 1.2,
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7,
              maxWidth: 480, margin: "0 auto 28px",
            }}>
              Submit your free pre-qualification form and we&apos;ll determine which
              grant-funded programs you&apos;re eligible for — usually within 1 business day.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/apply" style={{
                background: "#C8A136", color: "#08122E",
                padding: "14px 36px", fontSize: 14, fontWeight: 700,
                letterSpacing: "0.05em", textDecoration: "none",
                border: "2px solid #C8A136",
              }}>
                Apply Free Now →
              </Link>
              <a href="tel:+14014520171" style={{
                background: "transparent", color: "#fff",
                padding: "14px 36px", fontSize: 14, fontWeight: 600,
                letterSpacing: "0.05em", textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                Call 401-452-0171
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Grant Eligibility — anchor target for footer link ─────────────── */}
      <section
        id="eligibility"
        style={{ background: "#fff", borderTop: "4px solid #C8A136", padding: "80px 5%" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#1B7A8C", fontWeight: 700, marginBottom: 16,
          }}>
            Grant Eligibility
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 900, color: "#0C1B4D",
            marginBottom: 28, lineHeight: 1.1,
          }}>
            Who Qualifies for 100% Grant-Funded Training?
          </h2>
          <p style={{ fontSize: 16, color: "#4A4A5A", lineHeight: 1.85, marginBottom: 40, maxWidth: 720 }}>
            Most RIEC programs are fully funded through Rhode Island workforce development grants.
            Grant funding covers tuition, program materials, and fees — with no repayment required.
            Eligibility is income-based and confirmed during the free pre-qualification process.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24, marginBottom: 48,
          }}>
            {[
              {
                icon: "🏡",
                title: "Rhode Island Resident",
                desc: "You must reside in Rhode Island at the time of enrollment. Proof of address — such as a utility bill, lease agreement, or government-issued ID — is required during the application process.",
              },
              {
                icon: "💵",
                title: "Income-Based Eligibility",
                desc: "Grants prioritize applicants at or below 200% of the federal poverty level. Many working adults and households with moderate incomes qualify. Apply before assuming you don't — most applicants are eligible.",
              },
              {
                icon: "📋",
                title: "U.S. Work Authorization",
                desc: "You must be authorized to work in the United States and intend to seek employment in Rhode Island's healthcare sector after completing your program.",
              },
              {
                icon: "🎓",
                title: "Basic Education",
                desc: "A high school diploma or GED equivalent is required for most programs. RIEC staff can connect applicants who need GED support with local community resources before enrollment begins.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#FAF7F2",
                border: "1px solid rgba(12,27,77,0.08)",
                borderTop: "4px solid #C8A136",
                padding: "28px 24px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: 16, fontWeight: 800, color: "#0C1B4D",
                  marginBottom: 10, lineHeight: 1.25,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: "#6B7094", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: "rgba(27,122,140,0.06)",
            borderLeft: "4px solid #1B7A8C",
            padding: "20px 28px",
            marginBottom: 40,
          }}>
            <p style={{ fontSize: 15, color: "#0C1B4D", fontWeight: 600, margin: "0 0 8px", lineHeight: 1.4 }}>
              Not sure if you qualify? Apply anyway — there is no penalty for checking.
            </p>
            <p style={{ fontSize: 14, color: "#4A4A5A", margin: 0, lineHeight: 1.75 }}>
              Our pre-qualification form takes under 5 minutes, costs nothing, and carries
              no obligation. Most applicants are surprised to find they do qualify. If you
              don&apos;t, RIEC will help you explore alternative funding options.
            </p>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/apply" style={{
              display: "inline-block",
              background: "#C8A136", color: "#08122E",
              padding: "13px 36px", fontSize: 14, fontWeight: 800,
              letterSpacing: "0.06em", textDecoration: "none",
              border: "2px solid #C8A136",
            }}>
              Start Pre-Qualification — Free →
            </Link>
            <a href="tel:+14014520171" style={{
              display: "inline-block",
              background: "transparent", color: "#0C1B4D",
              padding: "13px 36px", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.06em", textDecoration: "none",
              border: "2px solid rgba(12,27,77,0.25)",
            }}>
              Call 401-452-0171
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
