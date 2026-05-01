import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'RIEC is committed to WCAG 2.1 AA accessibility. Learn about our conformance statement and how to request accommodations.',
  openGraph: {
    title: 'Accessibility Statement | RIEC — Free Healthcare Training Rhode Island',
    description:
      'RIEC is committed to WCAG 2.1 AA accessibility. Learn about our conformance statement and how to request accommodations.',
    url: 'https://rieducationcenter.org/accessibility',
  },
};

export default function AccessibilityPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div
        style={{
          background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 60%, #1A2E7A 100%)',
          padding: '72px 5% 64px',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
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
            Commitment to Access
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            Accessibility Statement
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
            }}
          >
            Rhode Island Education Center for H.O.P.E. (RIEC) is committed to ensuring
            digital accessibility for people with disabilities.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <section style={{ background: '#FAF7F2', padding: '72px 5% 96px' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          {/* Conformance Status */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#0C1B4D',
                marginBottom: 16,
              }}
            >
              Conformance Status
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginBottom: 12 }}>
              The{' '}
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1B7A8C' }}
              >
                Web Content Accessibility Guidelines (WCAG)
              </a>{' '}
              define requirements for designers and developers to improve accessibility for people
              with disabilities. RIEC aims to conform to{' '}
              <strong>WCAG 2.1 Level AA</strong>.
            </p>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85 }}>
              Our website, <strong>rieducationcenter.org</strong>, is <strong>partially conformant</strong> with
              WCAG 2.1 Level AA. Partial conformance means that some parts of the content do not
              fully conform to the standard. We are actively working to reach full conformance and
              remediate identified issues on an ongoing basis.
            </p>
          </div>

          {/* Technical Specifications */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#0C1B4D',
                marginBottom: 16,
              }}
            >
              Technical Specifications
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginBottom: 12 }}>
              Our website relies on the following technologies for conformance:
            </p>
            <ul
              style={{
                fontSize: 15,
                color: '#4A4A5A',
                lineHeight: 1.85,
                paddingLeft: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <li>HTML5</li>
              <li>CSS3</li>
              <li>WAI-ARIA 1.1</li>
              <li>JavaScript (React / Next.js)</li>
            </ul>
          </div>

          {/* Known Limitations */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#0C1B4D',
                marginBottom: 16,
              }}
            >
              Known Limitations
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginBottom: 12 }}>
              Despite our best efforts, some content may not yet meet WCAG 2.1 AA in full. Known
              limitations include:
            </p>
            <ul
              style={{
                fontSize: 15,
                color: '#4A4A5A',
                lineHeight: 1.85,
                paddingLeft: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <li>
                <strong>Third-party embedded content</strong> — The Donorbox donation widget is
                provided by a third-party vendor. We cannot guarantee full WCAG conformance for
                that embed. A direct-contact fallback (phone and email) is always available.
              </li>
              <li>
                <strong>Color contrast in decorative elements</strong> — Some decorative icons and
                accent colors are under review and are being updated to meet non-text contrast
                requirements (WCAG 1.4.11).
              </li>
            </ul>
          </div>

          {/* Feedback and Contact */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#0C1B4D',
                marginBottom: 16,
              }}
            >
              Feedback &amp; Accommodation Requests
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginBottom: 16 }}>
              We welcome feedback about the accessibility of our website. If you experience any
              barriers or have questions, please contact us. We will respond within two business days.
            </p>
            <ul
              style={{
                fontSize: 15,
                color: '#4A4A5A',
                lineHeight: 1.85,
                paddingLeft: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@rieducationcenter.org?subject=Accessibility%20Request"
                  style={{ color: '#1B7A8C' }}
                >
                  info@rieducationcenter.org
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+14014520171" style={{ color: '#1B7A8C' }}>
                  401-452-0171
                </a>
              </li>
              <li>
                <strong>Mail:</strong> 75 Commerce Dr., Warwick, RI 02886
              </li>
            </ul>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85, marginTop: 16 }}>
              If you need program materials, application forms, or other content in an alternative
              format — including large print, audio, or other accommodation — please contact us
              using the information above. RIEC does not discriminate on the basis of disability in
              access to its programs or activities.
            </p>
          </div>

          {/* Formal Complaints */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#0C1B4D',
                marginBottom: 16,
              }}
            >
              Formal Complaints
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A5A', lineHeight: 1.85 }}>
              If you are not satisfied with our response to an accessibility issue, you may contact
              the{' '}
              <a
                href="https://www.hhs.gov/ocr/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1B7A8C' }}
              >
                U.S. Department of Health &amp; Human Services Office for Civil Rights
              </a>{' '}
              or file a complaint under Section 504 of the Rehabilitation Act or the Americans with
              Disabilities Act.
            </p>
          </div>

          {/* Date */}
          <div
            style={{
              borderTop: '1px solid rgba(12,27,77,0.1)',
              paddingTop: 24,
              fontSize: 13,
              color: '#6B7094',
            }}
          >
            <p>This statement was last reviewed and updated: <strong>May 2026</strong>.</p>
            <p style={{ marginTop: 8 }}>
              <Link href="/contact" style={{ color: '#1B7A8C' }}>
                Contact Us
              </Link>{' '}
              ·{' '}
              <Link href="/privacy" style={{ color: '#1B7A8C' }}>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
