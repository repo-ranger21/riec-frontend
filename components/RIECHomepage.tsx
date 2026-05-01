'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getProgramsByTrack } from '@/lib/programs';

const alliedPrograms = getProgramsByTrack('allied-health');
const emsPrograms = getProgramsByTrack('emergency-medicine');

const BADGE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  funded:    { bg: 'rgba(200,161,54,0.15)',  color: '#8B6A10', border: '1px solid rgba(200,161,54,0.35)' },
  triple:    { bg: 'rgba(12,27,77,0.1)',     color: '#0C1B4D', border: '1px solid rgba(12,27,77,0.25)' },
  ri:        { bg: 'rgba(27,122,140,0.15)',  color: '#0E5D6E', border: '1px solid rgba(27,122,140,0.35)' },
  aha:       { bg: 'rgba(192,57,43,0.12)',   color: '#922B21', border: '1px solid rgba(192,57,43,0.35)' },
  community: { bg: 'rgba(27,122,90,0.12)',   color: '#0E5D3A', border: '1px solid rgba(27,122,90,0.35)' },
};

const FAQS = [
  {
    q: 'Who is eligible for free training?',
    a: 'Low-income and underserved Rhode Island residents are eligible for state workforce development grants that cover 100% of tuition and fees. We help you confirm eligibility as part of the free pre-qualification process — it takes under 5 minutes and most applicants qualify.',
  },
  {
    q: 'What certifications will I earn?',
    a: 'Depending on the program, you will earn nationally recognized credentials including CNA (RI State License), NHA CPT (Phlebotomy), NHA CET (EKG), NREMT (EMT/Paramedic), or AHA BLS/ACLS/PALS. All credentials are accepted by Rhode Island employers.',
  },
  {
    q: 'How long do programs take?',
    a: 'Program length varies: EKG and Phlebotomy are 4–6 weeks; CNA is 8 weeks; PCT is 12 weeks; EMT-Basic is 16 weeks; AEMT-Cardiac is approximately 6 months; and the Paramedic program is 12–18 months.',
  },
  {
    q: 'Do you help with job placement?',
    a: 'Yes. RIEC actively connects graduates with hiring partners across Rhode Island healthcare. We provide resume support, interview prep, and direct referrals. Our goal is placement, not just certification.',
  },
  {
    q: 'Are programs accredited?',
    a: 'Yes. Our CNA program is approved by the Rhode Island Department of Health (RIDOH). EMS programs follow National EMS Education Standards. RIEC is an authorized American Heart Association Training Center.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. RIEC is a 501(c)(3) nonprofit organization (EIN: 99-3099438). All donations are fully tax-deductible to the extent permitted by law. You will receive an acknowledgment letter for your records.',
  },
];

export default function RIECHomepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ─── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(160deg, #08122E 0%, #0C1B4D 50%, #1A2E7A 100%)',
          padding: '96px 5% 80px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Floating stars */}
        {['16%,22%', '82%,14%', '65%,70%', '30%,80%', '90%,55%'].map((pos, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: pos.split(',')[0],
              top: pos.split(',')[1],
              color: '#C8A136',
              opacity: 0.18 + i * 0.04,
              fontSize: [18, 24, 14, 20, 16][i],
              pointerEvents: 'none',
              animation: `starFloat${i % 3} ${5 + i}s ease-in-out infinite`,
            }}
          >
            ✦
          </span>
        ))}

        {/* Ghost anchor watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-2%',
            bottom: '-8%',
            fontSize: '40vw',
            color: 'rgba(200,161,54,0.04)',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ⚓
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C8A136', fontWeight: 700, marginBottom: 24,
          }}>
            Rhode Island Education Center for H.O.P.E.
          </p>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.08,
            marginBottom: 28,
            maxWidth: 760,
          }}>
            Building a{' '}
            <em style={{ color: '#C8A136', fontStyle: 'italic' }}>Healthier</em>
            {' '}Future,<br />One Student at a Time.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75,
            maxWidth: 540,
            marginBottom: 44,
            fontWeight: 300,
          }}>
            100% grant-funded healthcare certifications for Rhode Island residents.
            No cost. No barriers. A real career.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}>
            <Link href="/apply" aria-label="Apply for free healthcare training at RIEC" style={{
              background: '#C8A136', color: '#08122E',
              padding: '15px 36px', fontSize: 15, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136', display: 'inline-block',
            }}>
              Apply Free →
            </Link>
            <Link href="/programs" aria-label="View all RIEC healthcare training programs" style={{
              background: 'transparent', color: '#fff',
              padding: '15px 36px', fontSize: 15, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.35)', display: 'inline-block',
            }}>
              View All Programs
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: '100%', label: 'Grant-Funded' },
              { value: '8+', label: 'Programs' },
              { value: '3', label: 'Tracks' },
              { value: 'RI', label: 'State Approved' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 38, fontWeight: 900, color: '#C8A136', lineHeight: 1,
                }}>
                  {value}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: -48, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }} aria-hidden="true">
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>SCROLL</span>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, rgba(200,161,54,0.6), transparent)',
            }} />
          </div>
        </div>

        <style>{`
          @keyframes starFloat0 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(10deg)} }
          @keyframes starFloat1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(-8deg)} }
          @keyframes starFloat2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(15deg)} }
        `}</style>
      </section>

      {/* ─── 2. H.O.P.E. ─────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF7F2', padding: '96px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Our Name. Our Promise.
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 56, lineHeight: 1.1,
          }}>
            What H.O.P.E. Means
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}>
            {[
              { letter: 'H', word: 'Healthcare', desc: 'We deliver industry-aligned healthcare training recognized by Rhode Island employers. Our curriculum is built to get you hired.' },
              { letter: 'O', word: 'Opportunities', desc: 'We remove every barrier — tuition, transportation, childcare — so opportunity is truly equal for every student.' },
              { letter: 'P', word: 'Programs', desc: 'Eight programs across Allied Health, Emergency Medicine, and AHA Training give students multiple career pathways.' },
              { letter: 'E', word: 'Experiences', desc: 'Clinical rotations, hands-on skills labs, and employer connections give our graduates real-world experience before day one.' },
            ].map(({ letter, word, desc }) => (
              <div
                key={letter}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(12,27,77,0.08)',
                  padding: '36px 28px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div aria-hidden="true" style={{
                  position: 'absolute', top: -8, right: 12,
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 120, fontWeight: 900,
                  color: 'rgba(12,27,77,0.04)', lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {letter}
                </div>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 48, fontWeight: 900, color: '#C8A136',
                  lineHeight: 1, marginBottom: 12,
                }}>
                  {letter}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 20, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 10, lineHeight: 1.2,
                }}>
                  {word}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.7, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. MISSION STRIPE ────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B4D', padding: '80px 5%' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
        }}>
          <div>
            <p style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(200,161,54,0.7)', fontWeight: 700, marginBottom: 20,
            }}>
              Our Mission
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900, color: '#C8A136',
              fontStyle: 'italic', lineHeight: 1.15, margin: 0,
            }}>
              To Educate, Certify,<br />and Place.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { icon: '🚌', title: 'Transportation', desc: 'Bus passes and ride support so getting to class is never a barrier.' },
              { icon: '👶', title: 'Childcare', desc: 'Childcare assistance ensures parents can attend every session.' },
              { icon: '🎓', title: 'Scholarship', desc: '100% tuition covered through RI workforce development grants.' },
              { icon: '🤝', title: 'Case Management', desc: 'Personal support staff guide each student from enrollment to placement.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }} aria-hidden="true">{icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .mission-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── 4. PROGRAMS ─────────────────────────────────────────────────── */}
      <section id="programs" style={{ background: '#F0EBE1', padding: '96px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            100% Grant-Funded
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 56, lineHeight: 1.1,
          }}>
            Programs &amp; Certifications
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Allied Health column */}
            <div>
              <div style={{
                background: '#0C1B4D', padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2,
              }}>
                <span aria-hidden="true" style={{ fontSize: 20 }}>🏥</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>Allied Health Track</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>CNA · PCT · Phlebotomy · EKG</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {alliedPrograms.map((prog) => (
                  <Link
                    key={prog.slug}
                    href={`/programs/${prog.slug}`}
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(12,27,77,0.08)',
                      padding: '16px 20px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1B4D', marginBottom: 3 }}>
                        {prog.shortName}
                        <span style={{ fontSize: 12, fontWeight: 400, color: '#6B7094', marginLeft: 6 }}>
                          {prog.details[0]?.value}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {prog.badges.map((b) => (
                          <span key={b.label} style={{
                            ...BADGE_COLORS[b.variant],
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                            padding: '2px 8px', textTransform: 'uppercase',
                          }}>
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color: '#0C1B4D', fontSize: 16, flexShrink: 0 }} aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Emergency Medicine column */}
            <div>
              <div style={{
                background: '#1B7A8C', padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2,
              }}>
                <span aria-hidden="true" style={{ fontSize: 20 }}>🚑</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>Emergency Medicine Track</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>EMT · AEMT-Cardiac · Paramedic</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {emsPrograms.map((prog) => (
                  <Link
                    key={prog.slug}
                    href={`/programs/${prog.slug}`}
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(27,122,140,0.1)',
                      padding: '16px 20px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1B4D', marginBottom: 3 }}>
                        {prog.shortName}
                        <span style={{ fontSize: 12, fontWeight: 400, color: '#6B7094', marginLeft: 6 }}>
                          {prog.details[0]?.value}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {prog.badges.map((b) => (
                          <span key={b.label} style={{
                            ...BADGE_COLORS[b.variant],
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                            padding: '2px 8px', textTransform: 'uppercase',
                          }}>
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span style={{ color: '#1B7A8C', fontSize: 16, flexShrink: 0 }} aria-hidden="true">→</span>
                  </Link>
                ))}
                {/* AHA banner */}
                <Link
                  href="/programs/aha"
                  style={{
                    background: 'rgba(139,0,0,0.06)',
                    border: '1px solid rgba(139,0,0,0.2)',
                    padding: '16px 20px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#8B0000', marginBottom: 3 }}>
                      ❤️ AHA Training Center
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7094' }}>
                      BLS · ACLS · PALS · Heartsaver — Open to community
                    </div>
                  </div>
                  <span style={{ color: '#8B0000', fontSize: 16, flexShrink: 0 }} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/programs" style={{
              display: 'inline-block',
              background: '#0C1B4D', color: '#fff',
              padding: '14px 40px', fontSize: 14, fontWeight: 700,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #0C1B4D',
            }}>
              View Full Program Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how" style={{ background: '#FAF7F2', padding: '96px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Simple Process
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 64, lineHeight: 1.1,
          }}>
            How It Works
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, position: 'relative' }}>
            {[
              {
                step: '01', title: 'Pre-Qualify',
                desc: 'Complete our free online pre-qualification form. We review your eligibility for grant funding in 1–2 business days.',
                icon: '📋',
              },
              {
                step: '02', title: 'Enroll & Train',
                desc: 'Once approved, you enroll in your chosen program. Classes are in-person or hybrid, with evening and weekend options.',
                icon: '📚',
              },
              {
                step: '03', title: 'Get Certified & Placed',
                desc: 'Complete your program, earn your certification, and connect with our employer network for direct job placement support.',
                icon: '🎓',
              },
            ].map(({ step, title, desc, icon }, i) => (
              <div
                key={step}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(12,27,77,0.08)',
                  padding: '36px 28px',
                  position: 'relative',
                  borderTop: '4px solid #C8A136',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 56, fontWeight: 900, color: 'rgba(12,27,77,0.06)',
                  lineHeight: 1, marginBottom: 8,
                }} aria-hidden="true">
                  {step}
                </div>
                <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 20, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 12, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.75, margin: 0 }}>{desc}</p>
                {i < 2 && (
                  <div aria-hidden="true" style={{
                    position: 'absolute', top: '50%', right: -24,
                    transform: 'translateY(-50%)',
                    fontSize: 20, color: '#C8A136', zIndex: 2,
                  }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/apply" style={{
              display: 'inline-block', background: '#C8A136', color: '#08122E',
              padding: '14px 40px', fontSize: 14, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136',
            }}>
              Start Pre-Qualification →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. WHO WE SERVE ─────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B4D', padding: '96px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(200,161,54,0.7)', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Who We Serve
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#fff',
            textAlign: 'center', marginBottom: 56, lineHeight: 1.1,
          }}>
            Training Built for Everyone
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                title: 'Students',
                accent: '#C8A136',
                icon: '🎓',
                desc: 'New to healthcare? Our entry-level programs like CNA, EMT-Basic, and AHA are designed for people with no prior medical experience.',
                cta: 'Apply Free',
                href: '/apply',
              },
              {
                title: 'Career Changers',
                accent: '#1B7A8C',
                icon: '🔄',
                desc: 'Already working? Our evening, weekend, and hybrid schedules let you train for a new healthcare career without leaving your current job.',
                cta: 'Explore Programs',
                href: '/programs',
              },
              {
                title: 'Healthcare Partners',
                accent: '#C0392B',
                icon: '🏥',
                desc: 'Looking to hire qualified local talent? Partner with RIEC to connect your facility with our graduates and support the RI healthcare workforce.',
                cta: 'Email Us',
                href: 'mailto:chris@rieducationcenter.org',
              },
            ].map(({ title, accent, icon, desc, cta, href }) => (
              <div
                key={title}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: `4px solid ${accent}`,
                  padding: '36px 28px',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 22, fontWeight: 800, color: '#fff',
                  marginBottom: 14, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 24 }}>
                  {desc}
                </p>
                <a
                  href={href}
                  style={{
                    display: 'inline-block',
                    background: 'transparent', color: accent,
                    padding: '10px 22px', fontSize: 13, fontWeight: 700,
                    letterSpacing: '0.06em', textDecoration: 'none',
                    border: `2px solid ${accent}`,
                  }}
                >
                  {cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. APPLY CTA ────────────────────────────────────────────────── */}
      <section
        id="apply"
        style={{
          background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 60%, #162260 100%)',
          padding: '96px 5%',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(80px, 18vw, 220px)',
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 900,
          color: 'rgba(200,161,54,0.04)',
          letterSpacing: '0.1em',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          H.O.P.E.
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C8A136', fontWeight: 700, marginBottom: 20,
          }}>
            Start Today
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, marginBottom: 24,
          }}>
            Your Healthcare Career<br />Starts Free.
          </h2>
          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
          }}>
            Pre-qualify today and we will guide you through every step — from enrollment to your first day on the job.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/apply" aria-label="Apply for free healthcare training at RIEC" style={{
              background: '#C8A136', color: '#08122E',
              padding: '16px 44px', fontSize: 15, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136', display: 'inline-block',
            }}>
              Apply Free Now →
            </Link>
            <Link href="/donate" aria-label="Donate to support RIEC students" style={{
              background: 'transparent', color: 'rgba(255,255,255,0.8)',
              padding: '16px 44px', fontSize: 15, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)', display: 'inline-block',
            }}>
              Support a Student
            </Link>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <a href="tel:+14014520171" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              📞 401-452-0171
            </a>
            {' · '}
            <a href="mailto:chris@rieducationcenter.org" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              chris@rieducationcenter.org
            </a>
          </p>
        </div>
      </section>

      {/* ─── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: '#F0EBE1', padding: '96px 5%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Common Questions
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 56, lineHeight: 1.1,
          }}>
            Frequently Asked Questions
          </h2>

          <dl>
            {FAQS.slice(0, 4).map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid rgba(12,27,77,0.1)',
                  marginBottom: 0,
                }}
              >
                <dt>
                  <button
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: 'none', border: 'none',
                      padding: '22px 0',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: 17, fontWeight: 700, color: '#0C1B4D',
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.q}
                    <span aria-hidden="true" style={{
                      flexShrink: 0, fontSize: 18, color: '#8B6A10',
                      transition: 'transform 0.25s',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  hidden={openFaq !== i}
                  style={{
                    paddingBottom: openFaq === i ? 22 : 0,
                    fontSize: 15, color: '#4A4A5A', lineHeight: 1.8, margin: 0,
                  }}
                >
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>

          <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
            <Link
              href="/faq"
              style={{
                display: 'inline-block',
                background: '#0C1B4D',
                color: '#fff',
                padding: '11px 28px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              See All FAQs →
            </Link>
            <span style={{ fontSize: 14, color: '#6B7094' }}>
              or call{' '}
              <a href="tel:+14014520171" style={{ color: '#0C1B4D', fontWeight: 600 }}>
                401-452-0171
              </a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
