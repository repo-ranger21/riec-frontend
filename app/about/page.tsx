import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About RIEC — Rhode Island Education Center for H.O.P.E.',
  description:
    "Learn about RIEC's mission to educate, certify, and place Rhode Island's next generation of healthcare professionals. 501(c)(3) nonprofit serving low-income and BIPOC learners.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 60%, #1A2E7A 100%)',
        padding: '80px 5% 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 70% 40%, rgba(200,161,54,0.07) 0%, transparent 55%)',
        }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C8A136', fontWeight: 700, marginBottom: 20,
          }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, marginBottom: 20,
          }}>
            About Rhode Island Education Center for{' '}
            <em style={{ color: '#C8A136', fontStyle: 'italic' }}>H.O.P.E.</em>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75, maxWidth: 560, margin: 0,
          }}>
            Empowering the next generation of healthcare heroes.
          </p>
        </div>
      </div>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section id="mission" style={{ background: '#FAF7F2', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <p style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#1B7A8C', fontWeight: 700, marginBottom: 16,
            }}>
              Mission
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 900, color: '#C8A136',
              fontStyle: 'italic', lineHeight: 1.15, marginBottom: 28,
            }}>
              To Educate, Certify, and Place.
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginBottom: 20 }}>
              The Rhode Island Education Center for H.O.P.E. is a 501(c)(3) nonprofit dedicated to building Rhode Island&apos;s healthcare workforce from within underserved communities. We provide 100% grant-funded training programs that remove every financial barrier — tuition, transportation, childcare — so that every qualified Rhode Islander has a genuine path to a healthcare career.
            </p>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85 }}>
              Our students are the backbone of Rhode Island&apos;s healthcare system — CNAs providing bedside care, EMTs responding to emergencies, phlebotomists supporting diagnostics. We educate them, certify them, and stand beside them until they are placed.
            </p>
          </div>

          <div>
            <p style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#1B7A8C', fontWeight: 700, marginBottom: 20,
            }}>
              H.O.P.E. Expanded
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { letter: 'H', word: 'Healthcare', desc: 'Industry-aligned training built for RI healthcare employers.' },
                { letter: 'O', word: 'Opportunities', desc: 'We remove every barrier — financial, logistical, and personal.' },
                { letter: 'P', word: 'Programs', desc: 'Eight certification pathways across three healthcare tracks.' },
                { letter: 'E', word: 'Experiences', desc: 'Clinical rotations and employer connections from day one.' },
              ].map(({ letter, word, desc }) => (
                <div key={letter} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid rgba(12,27,77,0.08)',
                  borderLeft: '4px solid #C8A136',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 32, fontWeight: 900, color: '#C8A136',
                    lineHeight: 1, flexShrink: 0, width: 32,
                  }}>
                    {letter}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0C1B4D', marginBottom: 4 }}>{word}</div>
                    <div style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────────── */}
      <section style={{ background: '#F0EBE1', padding: '72px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Our Programs
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            What We Do
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                icon: '🏥', title: 'Allied Health Education',
                accent: '#0C1B4D',
                desc: 'CNA, PCT, Phlebotomy, and EKG programs prepare students for direct patient care in hospitals, clinics, and long-term care facilities. All programs are grant-funded for eligible residents.',
              },
              {
                icon: '🚑', title: 'Emergency Medical Services',
                accent: '#1B7A8C',
                desc: 'EMT-Basic, AEMT-Cardiac, and Paramedic programs train Rhode Islanders for frontline emergency response. We offer evening and weekend schedules for working adults.',
              },
              {
                icon: '🤝', title: 'Job Placement & Career Support',
                accent: '#C8A136',
                desc: 'We partner with RI healthcare employers to connect graduates with jobs. Resume support, interview prep, and employer introductions are included at no cost to students.',
              },
            ].map(({ icon, title, accent, desc }) => (
              <div key={title} style={{
                background: '#fff',
                border: '1px solid rgba(12,27,77,0.08)',
                borderTop: `4px solid ${accent}`,
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 18, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 12, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Serve ─────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF7F2', padding: '72px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Our Students
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Who We Serve
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                title: 'Aspiring Students',
                desc: 'First-time healthcare learners with no prior clinical experience. Our entry-level programs are designed to be accessible to everyone, regardless of educational background.',
              },
              {
                title: 'Career Changers',
                desc: 'Working adults in non-healthcare fields who are ready for a career that offers stability, purpose, and growth. Evening and weekend programs fit around existing schedules.',
              },
              {
                title: 'Healthcare Partners',
                desc: 'Rhode Island hospitals, clinics, and EMS agencies that need qualified local talent. RIEC graduates are trained to RI employer standards and ready to work on day one.',
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{
                background: '#fff',
                border: '1px solid rgba(12,27,77,0.08)',
                padding: '28px 24px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 18, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 12, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B4D', padding: '72px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(200,161,54,0.7)', fontWeight: 700, marginBottom: 20,
          }}>
            Our Vision
          </p>
          <blockquote style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(18px, 2.8vw, 28px)',
            fontWeight: 700, color: '#fff',
            fontStyle: 'italic', lineHeight: 1.55,
            margin: 0, padding: 0, border: 'none',
          }}>
            &ldquo;A Rhode Island where every healthcare facility is staffed by compassionate,
            highly trained professionals who reflect the diversity of the communities they serve.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Board of Directors ───────────────────────────────────────────── */}
      <section id="board" style={{ background: '#FAF7F2', padding: '72px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Governance
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 40, lineHeight: 1.1,
          }}>
            Board of Directors
          </h2>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(12,27,77,0.08)',
            borderTop: '4px solid #C8A136',
            padding: '40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }} aria-hidden="true">🏛️</div>
            <p style={{ fontSize: 15, color: '#6B7094', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
              Board information coming soon. RIEC is a registered 501(c)(3) nonprofit organization (EIN: 99-3099438)
              operating in compliance with Rhode Island nonprofit governance requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ── Partners & Funders ───────────────────────────────────────────── */}
      <section id="partners" style={{ background: '#F0EBE1', padding: '72px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Community
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 40, lineHeight: 1.1,
          }}>
            Partners &amp; Funders
          </h2>

          {/* Confirmed partner */}
          <div style={{
            display: 'flex', gap: 20, alignItems: 'flex-start',
            background: '#fff',
            border: '1px solid rgba(12,27,77,0.08)',
            borderLeft: '4px solid #1B7A8C',
            padding: '24px 28px',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }} aria-hidden="true">🤝</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1B4D', marginBottom: 4 }}>
                Amos House — Community Partner
              </div>
              <div style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.7 }}>
                RIEC partners with Amos House and Tessa Gomes to extend our reach into underserved communities across Providence, providing referrals, wraparound support, and coordinated case management for our shared students.
              </div>
            </div>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(12,27,77,0.08)',
            borderTop: '4px solid rgba(12,27,77,0.15)',
            padding: '40px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.8, maxWidth: 440, margin: '0 auto 20px' }}>
              Partner logos and additional funders coming soon.
              Interested in partnering with RIEC?
            </p>
            <a href="mailto:chris@rieducationcenter.org?subject=Partnership%20Inquiry" style={{
              display: 'inline-block',
              background: '#0C1B4D', color: '#fff',
              padding: '11px 28px', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none',
              border: '2px solid #0C1B4D',
            }}>
              Contact Us About Partnership
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact block ────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF7F2', padding: '72px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <p style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#1B7A8C', fontWeight: 700, marginBottom: 16,
            }}>
              Get in Touch
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 28, fontWeight: 900, color: '#0C1B4D',
              marginBottom: 24, lineHeight: 1.2,
            }}>
              Contact RIEC
            </h2>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a
                href="https://maps.google.com/?q=75+Commerce+Dr+Warwick+RI+02886"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  fontSize: 14, color: '#0C1B4D', textDecoration: 'none', lineHeight: 1.5,
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>📍</span>
                <span>75 Commerce Dr., Warwick, RI 02886</span>
              </a>
              <a href="tel:+14014520171" style={{
                display: 'flex', gap: 12, alignItems: 'center',
                fontSize: 15, fontWeight: 600, color: '#0C1B4D', textDecoration: 'none',
              }}>
                <span aria-hidden="true" style={{ fontSize: 18 }}>📞</span>
                401-452-0171
              </a>
              <a href="mailto:chris@rieducationcenter.org" style={{
                display: 'flex', gap: 12, alignItems: 'center',
                fontSize: 14, color: '#1B7A8C', textDecoration: 'none',
              }}>
                <span aria-hidden="true" style={{ fontSize: 18 }}>✉️</span>
                chris@rieducationcenter.org
              </a>
              <a href="https://rieducationcenter.org" style={{
                display: 'flex', gap: 12, alignItems: 'center',
                fontSize: 14, color: '#1B7A8C', textDecoration: 'none',
              }}>
                <span aria-hidden="true" style={{ fontSize: 18 }}>🌐</span>
                rieducationcenter.org
              </a>
            </address>
          </div>

          <div>
            <div style={{
              background: '#fff',
              border: '1px solid rgba(12,27,77,0.08)',
              borderTop: '4px solid #C8A136',
              padding: '28px',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1B4D', marginBottom: 8 }}>
                Legal &amp; Compliance
              </div>
              <div style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.8 }}>
                <strong style={{ color: '#0C1B4D' }}>Organization:</strong> Rhode Island Education Center for H.O.P.E.<br />
                <strong style={{ color: '#0C1B4D' }}>Type:</strong> 501(c)(3) Tax-Exempt Nonprofit<br />
                <strong style={{ color: '#0C1B4D' }}>EIN:</strong> 99-3099438<br />
                <strong style={{ color: '#0C1B4D' }}>State:</strong> Rhode Island<br />
                <strong style={{ color: '#0C1B4D' }}>Status:</strong> Active &amp; in good standing
              </div>
              <div style={{
                marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(12,27,77,0.08)',
                fontSize: 12, color: '#999', lineHeight: 1.6,
              }}>
                Candid/GuideStar seal — coming soon once profile is verified.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 100%)',
        padding: '72px 5%',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 36 }}>
            Apply for free healthcare training or make a donation to fund a student&apos;s future.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/apply" style={{
              display: 'inline-block',
              background: '#C8A136', color: '#08122E',
              padding: '14px 40px', fontSize: 14, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136',
            }}>
              Apply Free →
            </Link>
            <Link href="/donate" style={{
              display: 'inline-block',
              background: 'transparent', color: 'rgba(255,255,255,0.8)',
              padding: '14px 40px', fontSize: 14, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
            }}>
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
