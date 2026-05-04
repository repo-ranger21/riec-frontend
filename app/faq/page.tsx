import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about RIEC grant-funded healthcare training — eligibility, certifications, program length, funding sources, accreditation, and how to apply.',
  alternates: { canonical: 'https://rieducationcenter.org/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | RIEC — Free Healthcare Training Rhode Island',
    description:
      'Who qualifies? What certifications? How long? Get answers about RIEC free healthcare training programs in Rhode Island.',
    url: 'https://rieducationcenter.org/faq',
    type: 'website',
  },
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
    a: 'Program length varies: EKG and Phlebotomy are 4–6 weeks; CNA is 8 weeks; PCT is 12 weeks; EMT is 16 weeks; AEMT-Cardiac is approximately 6 months; and the Paramedic program is 12–18 months.',
  },
  {
    q: 'Do you help with job placement?',
    a: 'Yes. RIEC actively connects graduates with hiring partners across Rhode Island healthcare. We provide resume support, interview prep, and direct referrals. Our goal is placement, not just certification.',
  },
  {
    q: 'Are programs accredited?',
    a: 'Yes. Our CNA program is approved by the Rhode Island Department of Health (RIDOH). EMS programs follow National EMS Education Standards. RIEC is an authorized American Heart Association Training Center. RIEC continuously monitors compliance with all applicable state and national standards to ensure program quality.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. RIEC is a 501(c)(3) nonprofit organization (EIN: 99-3099438). All donations are fully tax-deductible to the extent permitted by law. You will receive an acknowledgment letter for your records.',
  },
  {
    q: 'Does RIEC offer Behavioral Health training?',
    a: 'Behavioral Health is our Year 2 track, launching in 2026. If you are interested, complete our application now and indicate your interest in the program selection — we will reach out when enrollment opens.',
  },
  {
    q: 'Who funds RIEC programs?',
    a: "RIEC programs are funded through a combination of federal, state, and private grants administered through Rhode Island's workforce development system. Students pay $0 in tuition or fees. RIEC files annual IRS Form 990 disclosures; contact us at info@rieducationcenter.org to request a copy.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div
        style={{
          background: 'linear-gradient(150deg, #08122E 0%, #0C1B4D 55%, #1A2E7A 100%)',
          padding: '72px 5% 64px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C8A136',
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Need Answers?
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(30px, 5vw, 56px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Frequently Asked Questions
        </h1>
        <p
          style={{
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          Everything you need to know about RIEC programs, funding, eligibility, and how to get started.
        </p>
      </div>

      {/* ── FAQ List ── */}
      <section style={{ background: '#FAF7F2', padding: '80px 5% 96px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <dl>
            {FAQS.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderBottom: '1px solid rgba(12,27,77,0.1)',
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '22px 0',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#0C1B4D',
                    lineHeight: 1.3,
                    userSelect: 'none',
                  }}
                >
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="faq-icon"
                    style={{
                      flexShrink: 0,
                      fontSize: 18,
                      color: '#C8A136',
                      transition: 'transform 0.25s',
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    paddingBottom: 22,
                    fontSize: 15,
                    color: '#4A4A5A',
                    lineHeight: 1.8,
                  }}
                >
                  {faq.a}
                </div>
              </details>
            ))}
          </dl>

          {/* CTA strip */}
          <div
            style={{
              marginTop: 64,
              background: '#0C1B4D',
              padding: '36px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Still have questions?
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                Call{' '}
                <a href="tel:+14014520171" style={{ color: '#C8A136', fontWeight: 600 }}>
                  401-452-0171
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:info@rieducationcenter.org"
                  style={{ color: '#C8A136', fontWeight: 600 }}
                >
                  info@rieducationcenter.org
                </a>
              </p>
            </div>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                background: '#C8A136',
                color: '#08122E',
                padding: '13px 32px',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Apply Free →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        details[open] .faq-icon { transform: rotate(45deg); }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </>
  );
}
