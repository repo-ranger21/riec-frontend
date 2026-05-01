import type { Metadata } from 'next';
import Link from 'next/link';
import { PROGRAMS, TRACKS, getProgramsByTrack, type Track } from '@/lib/programs';

export const metadata: Metadata = {
  title: 'Healthcare Training Programs',
  description:
    "Explore RIEC's full catalog of 100% grant-funded healthcare training programs in Rhode Island. CNA, PCT, Phlebotomy, EKG, EMT-Basic, AEMT-Cardiac, Paramedic, and AHA certifications.",
  alternates: {
    canonical: 'https://rieducationcenter.org/programs',
  },
};

const TRACK_ORDER: Track[] = ['allied-health', 'emergency-medicine', 'aha'];

const TRACK_ACCENT: Record<Track, string> = {
  'allied-health': '#0C1B4D',
  'emergency-medicine': '#1B7A8C',
  aha: '#8B0000',
};

const BADGE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  funded:    { bg: 'rgba(200,161,54,0.15)',  color: '#8B6A10', border: '1px solid rgba(200,161,54,0.35)' },
  triple:    { bg: 'rgba(12,27,77,0.1)',     color: '#0C1B4D', border: '1px solid rgba(12,27,77,0.25)' },
  ri:        { bg: 'rgba(27,122,140,0.15)',  color: '#0E5D6E', border: '1px solid rgba(27,122,140,0.35)' },
  aha:       { bg: 'rgba(192,57,43,0.12)',   color: '#922B21', border: '1px solid rgba(192,57,43,0.35)' },
  community: { bg: 'rgba(27,122,90,0.12)',   color: '#0E5D3A', border: '1px solid rgba(27,122,90,0.35)' },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'RIEC Healthcare Training Programs',
  description: '100% grant-funded healthcare certifications in Rhode Island',
  numberOfItems: PROGRAMS.length,
  itemListElement: PROGRAMS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: p.schemaUrl,
    name: p.fullName,
  })),
};

export default function ProgramsPage() {
  const grantCount = PROGRAMS.filter((p) => p.grantFunded).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 60%, #1A2E7A 100%)',
        padding: '72px 5% 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 30%, rgba(200,161,54,0.07) 0%, transparent 55%)',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(200,161,54,0.15)',
            border: '1px solid rgba(200,161,54,0.3)',
            padding: '6px 16px', marginBottom: 24,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C8A136', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {grantCount} of {PROGRAMS.length} Programs 100% Grant-Funded
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, marginBottom: 20, maxWidth: 640,
          }}>
            Programs &amp; Certifications
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75, maxWidth: 520, marginBottom: 36,
          }}>
            Eight healthcare career pathways. Three tracks. All fully grant-funded for eligible Rhode Island residents.
          </p>
          <Link href="/apply" style={{
            display: 'inline-block',
            background: '#C8A136', color: '#08122E',
            padding: '13px 36px', fontSize: 14, fontWeight: 800,
            letterSpacing: '0.06em', textDecoration: 'none',
            border: '2px solid #C8A136',
          }}>
            Apply Free →
          </Link>
        </div>
      </div>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(12,27,77,0.08)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '24px 5%',
          display: 'flex', gap: 0, flexWrap: 'wrap',
        }}>
          {[
            { value: String(PROGRAMS.length), label: 'Total Programs' },
            { value: `${grantCount}`, label: '100% Grant-Funded Options' },
            { value: '3', label: 'Educational Tracks' },
            { value: 'RI', label: 'State Approved' },
          ].map(({ value, label }, i) => (
            <div key={label} style={{
              flex: '1 1 140px', textAlign: 'center', padding: '8px 16px',
              borderRight: i < 3 ? '1px solid rgba(12,27,77,0.08)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 28, fontWeight: 900, color: '#0C1B4D', lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: '#6B7094', marginTop: 4, letterSpacing: '0.04em' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Jump nav ─────────────────────────────────────────────────────── */}
      <div style={{ background: '#FAF7F2', borderBottom: '1px solid rgba(12,27,77,0.08)', padding: '0 5%' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', gap: 0, overflowX: 'auto',
        }}>
          {TRACK_ORDER.map((track) => (
            <a
              key={track}
              href={`#track-${track}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '16px 24px',
                fontSize: 13, fontWeight: 600,
                color: TRACK_ACCENT[track],
                textDecoration: 'none',
                borderBottom: `2px solid ${TRACK_ACCENT[track]}`,
                whiteSpace: 'nowrap',
              }}
            >
              <span aria-hidden="true">{TRACKS[track].icon}</span>
              {TRACKS[track].title}
            </a>
          ))}
        </div>
      </div>

      <div style={{ background: '#FAF7F2', padding: '64px 5% 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* ── Eligibility callout ──────────────────────────────────────── */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(200,161,54,0.1) 0%, rgba(200,161,54,0.05) 100%)',
            border: '1px solid rgba(200,161,54,0.3)',
            padding: '24px 32px', marginBottom: 56,
            display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">💰</span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 18, fontWeight: 800, color: '#0C1B4D',
                marginBottom: 8, lineHeight: 1.2,
              }}>
                Most programs are 100% grant-funded for eligible Rhode Island residents
              </h2>
              <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.7, margin: 0 }}>
                Rhode Island workforce development grants cover tuition, fees, and materials for qualifying students.
                Income guidelines apply. Complete our free pre-qualification form to confirm your eligibility — it takes under 5 minutes.
              </p>
            </div>
            <Link href="/apply" style={{
              display: 'inline-block', flexShrink: 0, alignSelf: 'center',
              background: '#C8A136', color: '#08122E',
              padding: '11px 28px', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none',
              border: '2px solid #C8A136',
            }}>
              Check Eligibility →
            </Link>
          </div>

          {/* ── Track sections ────────────────────────────────────────────── */}
          {TRACK_ORDER.map((track) => {
            const t = TRACKS[track];
            const progs = getProgramsByTrack(track);
            const accent = TRACK_ACCENT[track];

            return (
              <section
                key={track}
                id={`track-${track}`}
                aria-labelledby={`track-heading-${track}`}
                style={{ marginBottom: 72 }}
              >
                {/* Track header */}
                <div style={{
                  background: accent,
                  padding: '24px 32px', marginBottom: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 28 }} aria-hidden="true">{t.icon}</span>
                    <div>
                      <h2
                        id={`track-heading-${track}`}
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: 22, fontWeight: 900, color: '#fff',
                          margin: 0, lineHeight: 1.2,
                        }}
                      >
                        {t.title}
                      </h2>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{t.subtitle}</p>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.7)',
                    maxWidth: 420, margin: 0, lineHeight: 1.6,
                  }}>
                    {t.description}
                  </p>
                </div>

                {/* Program rows */}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {progs.map((prog) => (
                    <li key={prog.slug}>
                      <Link
                        href={`/programs/${prog.slug}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          gap: 16, padding: '20px 28px',
                          background: '#fff',
                          border: '1px solid rgba(12,27,77,0.07)',
                          textDecoration: 'none',
                          flexWrap: 'wrap',
                        }}
                      >
                        {/* Left: name + details */}
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{
                            fontSize: 16, fontWeight: 700, color: '#0C1B4D',
                            marginBottom: 4, lineHeight: 1.2,
                          }}>
                            {prog.fullName}
                          </div>
                          <div style={{ fontSize: 13, color: '#6B7094', marginBottom: 10 }}>
                            {prog.tagline}
                          </div>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {prog.details.slice(0, 3).map((d) => (
                              <span key={d.label} style={{ fontSize: 12, color: '#6B7094' }}>
                                <strong style={{ color: '#0C1B4D', fontWeight: 600 }}>{d.label}:</strong> {d.value}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: badges + arrow */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {prog.badges.map((b) => (
                              <span key={b.label} style={{
                                ...BADGE_STYLES[b.variant],
                                fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                                padding: '3px 10px', textTransform: 'uppercase', whiteSpace: 'nowrap',
                              }}>
                                {b.label}
                              </span>
                            ))}
                          </div>
                          <span style={{ color: accent, fontSize: 18 }} aria-hidden="true">→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* ── Bottom CTA ───────────────────────────────────────────────── */}
          <div style={{
            background: '#0C1B4D', padding: '48px 40px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 28, fontWeight: 900, color: '#fff',
              marginBottom: 12, lineHeight: 1.2,
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 32, lineHeight: 1.7 }}>
              Pre-qualify for free in minutes. No cost, no obligation.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/apply" style={{
                display: 'inline-block',
                background: '#C8A136', color: '#08122E',
                padding: '13px 36px', fontSize: 14, fontWeight: 800,
                letterSpacing: '0.06em', textDecoration: 'none',
                border: '2px solid #C8A136',
              }}>
                Apply Free Now →
              </Link>
              <a href="tel:+14014520171" style={{
                display: 'inline-block',
                background: 'transparent', color: 'rgba(255,255,255,0.8)',
                padding: '13px 36px', fontSize: 14, fontWeight: 600,
                letterSpacing: '0.06em', textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                Call 401-452-0171
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
