import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About RIEC',
  description:
    "RIEC is a 501(c)(3) nonprofit founded in 2024 to expand access to healthcare workforce training for underserved Rhode Islanders. Learn our mission, board, and vision.",
  alternates: { canonical: 'https://rieducationcenter.org/about' },
  openGraph: {
    title: 'About RIEC | RIEC — Free Healthcare Training Rhode Island',
    description:
      "Founded in 2024, RIEC removes every barrier — financial, transportation, childcare — between underserved Rhode Islanders and healthcare careers.",
    url: 'https://rieducationcenter.org/about',
    type: 'website',
  },
};

/* ─── DATA ───────────────────────────────────────────────────────────────────── */

const PRINCIPLES = [
  {
    icon: '🏦',
    title: 'Grant-Driven Sustainability',
    desc: 'RIEC operates through a grant-first funding model, ensuring that program costs never fall on students. By securing public and private grants, we build a self-sustaining ecosystem that can grow without charging tuition.',
  },
  {
    icon: '📈',
    title: 'Workforce Development',
    desc: 'Every program is designed in direct alignment with Rhode Island healthcare employer needs. We track labor market data, maintain employer advisory relationships, and measure success by job placement—not just completion.',
  },
  {
    icon: '⚖️',
    title: 'Equity & Access',
    desc: 'We dismantle the financial, transportation, and childcare barriers that have historically kept underserved communities out of healthcare careers. If a barrier exists, we work to remove it—for every student.',
  },
  {
    icon: '✅',
    title: 'Compliance & Quality',
    desc: 'All RIEC programs meet or exceed Rhode Island Department of Health and federal regulatory requirements. We maintain rigorous quality assurance practices across every certification pathway we offer.',
  },
];

const STATS = [
  { value: '500+', label: 'Students Trained', tag: 'Target' },
  { value: '90%', label: 'Job Placement Rate', tag: 'Target' },
  { value: '30%', label: 'Workforce Diversity Increase', tag: 'Target' },
  { value: '100%', label: 'Regulatory Compliance', tag: 'Target' },
];

const BOARD = [
  { name: 'Albert F. Peterson III', title: 'Executive Director', initials: 'AP' },
  { name: 'Chris Peterson', title: 'Director of Corporations', initials: 'CP' },
  { name: 'Shelby Nelson', title: 'Director / Board Member', initials: 'SN' },
  { name: 'Steven Ardente, J.D.', title: 'Director / Board Member', initials: 'SA' },
];

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
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
            Who We Are
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, marginBottom: 20,
          }}>
            About <em style={{ color: '#C8A136', fontStyle: 'italic' }}>RIEC</em>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.75, maxWidth: 640, margin: 0,
          }}>
            To expand access to high-quality healthcare education and workforce training for underserved
            communities by leveraging grant-funded programs.
          </p>
        </div>
      </div>

      {/* ── 2. ORIGIN STORY ──────────────────────────────────────────────────── */}
      <section id="mission" style={{ background: '#FAF7F2', padding: '80px 5%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, marginBottom: 16,
          }}>
            Our Story
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0C1B4D',
            lineHeight: 1.15, marginBottom: 28,
          }}>
            Born from a Commitment to Remove Every Barrier
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ fontSize: 16, color: '#4A4A5A', lineHeight: 1.85, margin: 0 }}>
              Rhode Island Education Center for H.O.P.E. was founded in 2024 out of a conviction
              that financial hardship, lack of transportation, and childcare responsibilities should
              never be the reason a Rhode Islander can&apos;t pursue a healthcare career. We built RIEC
              to be the organization we wished had always existed — one that funds the path entirely,
              and stands beside students until they are placed.
            </p>
            <p style={{ fontSize: 16, color: '#4A4A5A', lineHeight: 1.85, margin: 0 }}>
              From the beginning, our model has been grant-driven and community-rooted. We partner
              with state agencies, hospitals, and social service organizations to reach the Rhode
              Islanders who need us most — and to ensure that every program we offer meets the
              standards employers actually require.
            </p>
            <p style={{ fontSize: 16, color: '#4A4A5A', lineHeight: 1.85, margin: 0 }}>
              We are a 501(c)(3) nonprofit (EIN: 99-3099438) operating in Rhode Island, guided by
              the belief that a stronger healthcare workforce and a more equitable community are the
              same goal — and that the path to both runs through education.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. VISION ────────────────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B4D', padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(200,161,54,0.8)', fontWeight: 700, marginBottom: 24,
          }}>
            Our Vision
          </p>
          <blockquote style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(17px, 2.6vw, 26px)',
            fontWeight: 700, color: '#fff',
            fontStyle: 'italic', lineHeight: 1.6,
            margin: 0, padding: 0, border: 'none',
          }}>
            &ldquo;A future where every Rhode Island resident — regardless of income or background —
            can pursue healthcare education without financial barriers, supported by a sustainable
            grant ecosystem and partnerships with state agencies, hospitals, and community
            organizations.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── 4. CORE PRINCIPLES ───────────────────────────────────────────────── */}
      <section style={{ background: '#F0EBE1', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            How We Operate
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Core Principles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {PRINCIPLES.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: '#fff',
                border: '1px solid rgba(12,27,77,0.08)',
                borderTop: '4px solid #0C1B4D',
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 17, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 12, lineHeight: 1.25,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7094', lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FIVE-YEAR IMPACT GOALS ────────────────────────────────────────── */}
      <section style={{ background: '#FAF7F2', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Five-Year Outlook
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Impact Goals
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
            border: '1px solid rgba(12,27,77,0.08)',
            overflow: 'hidden',
          }}>
            {STATS.map(({ value, label, tag }) => (
              <div key={label} style={{
                background: '#fff',
                padding: '40px 28px',
                textAlign: 'center',
                borderRight: '1px solid rgba(12,27,77,0.06)',
              }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#1B7A8C', fontWeight: 700,
                  background: 'rgba(27,122,140,0.07)',
                  border: '1px solid rgba(27,122,140,0.18)',
                  padding: '3px 10px',
                  marginBottom: 16,
                }}>
                  {tag}
                </div>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(34px, 4vw, 52px)',
                  fontWeight: 900, color: '#C8A136',
                  lineHeight: 1, marginBottom: 10,
                }}>
                  {value}
                </div>
                <div style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.5, fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LEADERSHIP & BOARD OF DIRECTORS ───────────────────────────────── */}
      <section id="board" style={{ background: '#F0EBE1', padding: '80px 5%' }}>
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
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Leadership &amp; Board of Directors
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }}>
            {BOARD.map(({ name, title, initials }) => (
              <div key={name} style={{
                background: '#fff',
                border: '1px solid rgba(12,27,77,0.08)',
                borderTop: '4px solid #C8A136',
                padding: '32px 28px',
                display: 'flex', alignItems: 'center', gap: 20,
              }}>
                {/* Initials avatar */}
                <div
                  aria-hidden="true"
                  style={{
                    width: 56, height: 56, flexShrink: 0,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #0C1B4D 0%, #162260 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 18, fontWeight: 900, color: '#C8A136',
                    letterSpacing: '0.04em',
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 17, fontWeight: 800, color: '#0C1B4D',
                    lineHeight: 1.25, marginBottom: 5,
                  }}>
                    {name}
                  </div>
                  <div style={{ fontSize: 13, color: '#1B7A8C', fontWeight: 600, letterSpacing: '0.02em' }}>
                    {title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PARTNERS & FUNDERS ────────────────────────────────────────────── */}
      <section id="partners" style={{ background: '#FAF7F2', padding: '80px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, marginBottom: 16,
          }}>
            Community
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 38px)',
            fontWeight: 900, color: '#0C1B4D',
            marginBottom: 28, lineHeight: 1.1,
          }}>
            Partners &amp; Funders
          </h2>
          <p style={{
            fontSize: 16, color: '#4A4A5A', lineHeight: 1.85,
            maxWidth: 620, margin: '0 auto 32px',
          }}>
            RIEC is actively building partnerships with Rhode Island healthcare employers, state
            agencies, and philanthropic funders. To explore a partnership or sponsorship opportunity,
            contact us at{' '}
            <a
              href="mailto:info@rieducationcenter.org?subject=Partnership%20Inquiry"
              style={{ color: '#1B7A8C', fontWeight: 600, textDecoration: 'none' }}
            >
              info@rieducationcenter.org
            </a>
            .
          </p>
          <a
            href="mailto:info@rieducationcenter.org?subject=Partnership%20Inquiry"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#0C1B4D',
              padding: '13px 32px',
              fontSize: 13, fontWeight: 700,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #0C1B4D',
              transition: 'all 0.2s',
            }}
          >
            Explore a Partnership →
          </a>
        </div>
      </section>

      {/* ── 8. CTA FOOTER STRIP ──────────────────────────────────────────────── */}
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
            Ready to Make a Difference?
          </h2>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75, marginBottom: 36,
          }}>
            Apply for free healthcare training or help fund the next generation of Rhode Island
            healthcare professionals.
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
              background: 'transparent', color: 'rgba(255,255,255,0.85)',
              padding: '14px 40px', fontSize: 14, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
            }}>
              Support Our Work →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
