import type { Metadata } from 'next';
import Link from 'next/link';
import DonorboxSection from '@/components/DonorboxSection';

export const metadata: Metadata = {
  title: "Donate — Fund a Student's Healthcare Career",
  description:
    "Your tax-deductible gift funds 100% grant-matched healthcare training for underserved Rhode Islanders — covering tuition, transportation, and childcare. EIN 99-3099438.",
  alternates: { canonical: 'https://rieducationcenter.org/donate' },
  openGraph: {
    title: "Donate — Fund a Student's Healthcare Career | RIEC — Free Healthcare Training Rhode Island",
    description:
      "Every dollar you give launches a Rhode Island healthcare career. 501(c)(3) tax-deductible. Secure. Transparent. EIN 99-3099438.",
    url: 'https://rieducationcenter.org/donate',
    type: 'website',
  },
};

const donateActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'DonateAction',
  agent: {
    '@type': ['EducationalOrganization', 'NGO'],
    '@id': 'https://rieducationcenter.org/#organization',
    name: 'Rhode Island Education Center for H.O.P.E.',
    url: 'https://rieducationcenter.org',
    taxID: '99-3099438',
  },
  recipient: {
    '@type': ['EducationalOrganization', 'NGO'],
    name: 'Rhode Island Education Center for H.O.P.E.',
  },
  url: 'https://donorbox.org/riec-hope',
};

const IMPACT_TIERS = [
  { amount: '$25',    icon: '📚', ariaLabel: 'Books',         title: 'Textbooks & Supplies',   desc: 'Covers workbooks, printed materials, and clinical supplies for one student.' },
  { amount: '$75',    icon: '🚌', ariaLabel: 'Bus',           title: 'Month of Bus Passes',    desc: 'A full month of RIPTA transportation so a student never misses class.' },
  { amount: '$150',   icon: '👶', ariaLabel: 'Child',         title: 'Childcare for One Week', desc: 'One week of childcare support, removing a major barrier to attendance.' },
  { amount: '$500',   icon: '🎓', ariaLabel: 'Graduation cap',title: 'Half a CNA Program',     desc: 'Covers half the cost of a Certified Nursing Assistant training cohort.' },
  { amount: '$1,000', icon: '⚕️', ariaLabel: 'Medical',       title: 'Launch a Career',        desc: "Funds a complete certification program and launches a student's healthcare career. This is the most direct path to real impact.", featured: true },
  { amount: '$5,000', icon: '🏥', ariaLabel: 'Hospital',      title: 'Fund a Full Cohort',     desc: 'Sponsors an entire cohort of students — from enrollment to certification.' },
];

const DONATE_FAQS = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. RIEC is a recognized 501(c)(3) nonprofit (EIN: 99-3099438). All donations are tax-deductible to the extent permitted by law. You will receive an acknowledgment letter for your records.',
  },
  {
    q: 'How are donations used?',
    a: 'Donations directly fund student tuition, transportation passes, childcare assistance, case management services, and program materials. We publish an annual financial summary on our website.',
  },
  {
    q: 'Can I give in someone\'s honor or memory?',
    a: 'Yes. On the Donorbox form below, you can include a dedication note. Contact us at chris@rieducationcenter.org to arrange a formal acknowledgment letter for the honoree or family.',
  },
  {
    q: 'Can I set up a recurring donation?',
    a: 'Absolutely. Donorbox supports monthly recurring donations. Select a recurring option when completing your gift below.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. All transactions are processed through Donorbox, which uses bank-level SSL encryption and PCI-DSS compliance. RIEC never stores payment information.',
  },
];

export default function DonatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateActionSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 60%, #1A2E7A 100%)',
        padding: '80px 5% 72px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(80px, 20vw, 240px)',
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 900,
          color: 'rgba(200,161,54,0.04)',
          userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '0.05em',
        }}>
          GIVE
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C8A136', fontWeight: 700, marginBottom: 20,
          }}>
            Support Our Students
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 62px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.08, marginBottom: 22,
          }}>
            Fund a Student&apos;s{' '}
            <em style={{ color: '#C8A136', fontStyle: 'italic' }}>Future.</em>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75, marginBottom: 40,
          }}>
            Your gift directly funds healthcare training for low-income and underserved Rhode Island residents —
            covering tuition, transportation, childcare, and career placement support.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#donate-now" aria-label="Donate to RIEC — skip to the donation form" style={{
              display: 'inline-block',
              background: '#C8A136', color: '#08122E',
              padding: '14px 40px', fontSize: 14, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136',
            }}>
              Donate Now →
            </a>
            <a href="#impact" style={{
              display: 'inline-block',
              background: 'transparent', color: 'rgba(255,255,255,0.8)',
              padding: '14px 40px', fontSize: 14, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
            }}>
              See Your Impact
            </a>
          </div>
        </div>
      </div>

      {/* ── Impact tiers ─────────────────────────────────────────────────── */}
      <section id="impact" style={{ background: '#FAF7F2', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1B7A8C', fontWeight: 700, textAlign: 'center', marginBottom: 16,
          }}>
            Every Dollar Has a Purpose
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 56, lineHeight: 1.1,
          }}>
            See Your Impact
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {IMPACT_TIERS.map(({ amount, icon, ariaLabel, title, desc, featured }) => (
              <div
                key={amount}
                style={{
                  background: featured ? '#0C1B4D' : '#fff',
                  border: featured ? '2px solid #C8A136' : '1px solid rgba(12,27,77,0.08)',
                  padding: '28px 24px',
                  position: 'relative',
                }}
              >
                {featured && (
                  <div style={{
                    position: 'absolute', top: -12, left: 24,
                    background: '#C8A136', color: '#08122E',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                    padding: '4px 12px', textTransform: 'uppercase',
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 32, marginBottom: 12 }}>
                  <span role="img" aria-label={ariaLabel}>{icon}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 32, fontWeight: 900,
                  color: featured ? '#C8A136' : '#0C1B4D',
                  lineHeight: 1, marginBottom: 8,
                }}>
                  {amount}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 16, fontWeight: 800,
                  color: featured ? '#fff' : '#0C1B4D',
                  marginBottom: 10, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13, color: featured ? 'rgba(255,255,255,0.55)' : '#6B7094', lineHeight: 1.7, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donorbox embed ────────────────────────────────────────────────── */}
      <section
        id="donate-now"
        style={{
          background: '#fff',
          borderTop: '4px solid #C8A136',
          padding: '72px 5%',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 12, lineHeight: 1.1,
          }}>
            Make a Donation
          </h2>
          <p style={{
            fontSize: 14, color: '#6B7094',
            textAlign: 'center', marginBottom: 40, lineHeight: 1.7,
          }}>
            All donations are secure, encrypted, and tax-deductible (EIN: 99-3099438).
          </p>

          <DonorboxSection />

          {/* Trust items below iframe */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 32,
          }}>
            {[
              { icon: '🔒', ariaLabel: 'Lock',     text: 'SSL encrypted transaction' },
              { icon: '🏛️', ariaLabel: 'Building', text: '501(c)(3) registered nonprofit' },
              { icon: '📋', ariaLabel: 'Clipboard', text: 'PCI-DSS compliant processing' },
              { icon: '✉️', ariaLabel: 'Envelope',  text: 'Acknowledgment letter provided' },
            ].map(({ icon, ariaLabel, text }) => (
              <div key={text} style={{
                display: 'flex', gap: 8, alignItems: 'center',
                fontSize: 12, color: '#6B7094',
              }}>
                <span role="img" aria-label={ariaLabel}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B4D', padding: '56px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              {
                icon: '⚓', title: '501(c)(3) Nonprofit',
                desc: 'Officially recognized tax-exempt organization.',
                link: 'https://apps.irs.gov/app/eos/detailsPage?ein=993099438&country=US',
                linkLabel: 'Verify on IRS.gov',
              },
              {
                icon: '📋', title: 'Tax-Deductible',
                desc: 'All donations fully deductible under US tax law.',
                link: null, linkLabel: null,
              },
              {
                icon: '📊', title: 'Transparent Finances',
                desc: 'As a newly established nonprofit (EIN: 99-3099438, founded 2024), RIEC\'s first Form 990 will be filed in 2025 and made publicly available upon completion. IRS tax-exempt status is verified at the link below. Candid profile coming soon.',
                link: null, linkLabel: null,
              },
              {
                icon: '🪪', title: 'EIN 99-3099438',
                desc: 'Federal employer identification number for tax records.',
                link: null, linkLabel: null,
              },
            ].map(({ icon, title, desc, link, linkLabel }) => (
              <div key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">{icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: link ? 6 : 0, lineHeight: 1.6 }}>{desc}</div>
                  {link && linkLabel && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 11, color: '#C8A136', textDecoration: 'underline' }}
                    >
                      {linkLabel} ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other ways to give ───────────────────────────────────────────── */}
      <section style={{ background: '#FAF7F2', padding: '72px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Other Ways to Give
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              {
                icon: '🏢',
                title: 'Employer Matching',
                desc: 'Many employers match charitable donations. Check with your HR department to double your impact.',
                cta: null, href: null,
              },
              {
                icon: '📦',
                title: 'In-Kind Donations',
                desc: 'We welcome donations of medical supplies, equipment, uniforms, and textbooks.',
                cta: 'Email to Arrange', href: 'mailto:chris@rieducationcenter.org?subject=In-Kind%20Donation',
              },
              {
                icon: '🤝',
                title: 'Corporate Partnership',
                desc: 'Partner with RIEC to sponsor a cohort, provide internship sites, or hire our graduates.',
                cta: 'Contact Us', href: 'mailto:chris@rieducationcenter.org?subject=Corporate%20Partnership',
              },
              {
                icon: '💙',
                title: 'PayPal Giving Fund',
                desc: 'Prefer PayPal? Search for RIEC on PayPal Giving Fund for fee-free charitable giving.',
                cta: 'PayPal Giving Fund ↗',
                href: 'https://www.paypal.com/us/fundraiser/charity/4318491',
                external: true,
              },
            ].map(({ icon, title, desc, cta, href, external }) => (
              <div key={title} style={{
                background: '#fff',
                border: '1px solid rgba(12,27,77,0.08)',
                padding: '28px 24px',
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }} aria-hidden="true">{icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 16, fontWeight: 800, color: '#0C1B4D',
                  marginBottom: 10, lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.7, marginBottom: cta ? 18 : 0 }}>
                  {desc}
                </p>
                {cta && href && (
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    style={{
                      fontSize: 13, fontWeight: 700, color: '#1B7A8C',
                      textDecoration: 'none', letterSpacing: '0.04em',
                    }}
                  >
                    {cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation FAQ ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F0EBE1', padding: '72px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 900, color: '#0C1B4D',
            textAlign: 'center', marginBottom: 48, lineHeight: 1.1,
          }}>
            Donation FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DONATE_FAQS.map(({ q, a }) => (
              <details
                key={q}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(12,27,77,0.08)',
                  padding: '0',
                }}
              >
                <summary style={{
                  padding: '18px 24px',
                  cursor: 'pointer', listStyle: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 16, fontWeight: 700, color: '#0C1B4D',
                  lineHeight: 1.3,
                }}>
                  {q}
                  <span aria-hidden="true" style={{ color: '#C8A136', flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#4A4A5A', lineHeight: 1.8 }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 100%)',
        padding: '80px 5%',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Every Dollar. Every Student. Every Career.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 36 }}>
            Your support makes it possible for Rhode Island residents to earn healthcare certifications at zero cost.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#donate-now" style={{
              display: 'inline-block',
              background: '#C8A136', color: '#08122E',
              padding: '14px 44px', fontSize: 14, fontWeight: 800,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid #C8A136',
            }}>
              Donate Now →
            </a>
            <Link href="/apply" style={{
              display: 'inline-block',
              background: 'transparent', color: 'rgba(255,255,255,0.8)',
              padding: '14px 44px', fontSize: 14, fontWeight: 600,
              letterSpacing: '0.06em', textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
            }}>
              Apply as a Student
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
