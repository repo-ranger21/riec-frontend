/**
 * components/Footer.tsx
 * Site-wide footer — intentionally a SERVER component.
 * No client-side JS needed → faster TTI, better SEO, smaller bundle.
 *
 * Security & Quality:
 *  - All hrefs are hardcoded string literals — zero user-input interpolation
 *  - All external links use rel="noopener noreferrer" + target="_blank"
 *  - No dangerouslySetInnerHTML
 *  - No eval(), no dynamic script construction
 *  - Semantic HTML: <footer>, <nav>, <address>, <ul>/<li>
 *  - Full ARIA labels on icon-only links
 *  - EIN, 501(c)(3) status, and legal copy present for nonprofit compliance
 */

import Link from "next/link";

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

/* ─── DATA ───────────────────────────────────────────────────────────────────
 * All links hardcoded. External URLs use explicit https:// protocol.
 * Never construct hrefs from user-controlled strings.
 * ─────────────────────────────────────────────────────────────────────────── */
const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Programs",
    links: [
      { href: "/programs/cna", label: "Certified Nursing Assistant" },
      { href: "/programs/pct", label: "Patient Care Technician" },
      { href: "/programs/phlebotomy", label: "Phlebotomy Technician" },
      { href: "/programs/ekg", label: "EKG Technician" },
      { href: "/programs/emt-basic", label: "EMT-Basic" },
      { href: "/programs/aemt-cardiac", label: "Advanced EMT-Cardiac" },
      { href: "/programs/paramedic", label: "Paramedic Program" },
      { href: "/programs/aha", label: "AHA BLS / ACLS / PALS" },
    ],
  },
  {
    title: "Organization",
    links: [
      { href: "/about", label: "About H.O.P.E." },
      { href: "/about#mission", label: "Our Mission" },
      { href: "/about#board", label: "Board of Directors" },
      { href: "/about#partners", label: "Partners & Funders" },
      { href: "/donate", label: "Donate" },
      { href: "/apply", label: "Apply for Training" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/apply", label: "Pre-Qualification Form" },
      { href: "/#faq", label: "Frequently Asked Questions" },
      { href: "/programs#eligibility", label: "Grant Eligibility Info" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      {
        href: "https://apps.irs.gov/app/eos/detailsPage?ein=993099438&country=US&deductibility=all&dispatchMethod=displayAll&id=2017858884&city=&ein=993099438&state=RI&zipCode=&exemptTypeCode=al&submitName=Search&names=riec",
        label: "IRS Tax-Exempt Status",
        external: true,
      },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/rieducationcenter",
    label: "RIEC on Facebook",
    icon: "f",
    title: "Facebook",
  },
  {
    href: "https://www.instagram.com/rieducationcenter",
    label: "RIEC on Instagram",
    icon: "ig",
    title: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/rieducationcenter",
    label: "RIEC on LinkedIn",
    icon: "in",
    title: "LinkedIn",
  },
];

/* ─── ANCHOR ICON ─────────────────────────────────────────────────────────── */
function AnchorIcon() {
  return (
    <svg
      width="32"
      height="38"
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="18" r="10" stroke="#C8A136" strokeWidth="4" />
      <line x1="50" y1="28" x2="50" y2="95" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1="52" x2="78" y2="52" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 52 C22 80 14 88 14 88" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 52 C78 80 86 88 86 88" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 88 C14 88 32 95 50 95" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <path d="M86 88 C86 88 68 95 50 95" stroke="#C8A136" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="18" r="5" fill="#C8A136" />
    </svg>
  );
}

/* ─── FOOTER COMPONENT ────────────────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="site-footer"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="footer-inner">

        {/* ── TOP GRID ─────────────────────────────────────────────────── */}
        <div className="footer-grid">

          {/* ── Brand Column ──────────────────────────────────────────── */}
          <div className="footer-brand">
            <Link
              href="/"
              className="footer-logo"
              aria-label="Rhode Island Education Center for H.O.P.E. — Home"
            >
              <AnchorIcon />
              <div className="footer-logo-text">
                <span className="footer-logo-name">
                  Rhode Island Education Center
                </span>
                <span className="footer-logo-hope">for H.O.P.E.</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Building a Healthier Future,<br />
              One Student at a Time.
            </p>

            <p className="footer-mission-blurb">
              A 501(c)(3) nonprofit providing 100% grant-funded healthcare
              workforce training for low-income and BIPOC Rhode Islanders.
              We educate, certify, and place.
            </p>

            {/* Contact — uses <address> for semantic correctness */}
            <address className="footer-address" aria-label="RIEC contact information">
              <a
                href="https://maps.google.com/?q=75+Commerce+Dr+Warwick+RI+02886"
                className="footer-contact-row"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View RIEC location on Google Maps"
              >
                <span className="footer-contact-icon" aria-hidden="true">📍</span>
                <span>75 Commerce Dr., Warwick, RI 02886</span>
              </a>
              <a href="tel:+14014520171" className="footer-contact-row" aria-label="Call RIEC at 401-452-0171">
                <span className="footer-contact-icon" aria-hidden="true">📞</span>
                <span>401-452-0171</span>
              </a>
              <a href="mailto:chris@rieducationcenter.org" className="footer-contact-row" aria-label="Email RIEC">
                <span className="footer-contact-icon" aria-hidden="true">✉️</span>
                <span>chris@rieducationcenter.org</span>
              </a>
              <a href="https://rieducationcenter.org" className="footer-contact-row" aria-label="RIEC website">
                <span className="footer-contact-icon" aria-hidden="true">🌐</span>
                <span>rieducationcenter.org</span>
              </a>
            </address>

            {/* Social Links */}
            <div
              className="footer-social"
              aria-label="RIEC social media links"
            >
              {SOCIAL_LINKS.map(({ href, label, icon, title }) => (
                <a
                  key={href}
                  href={href}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={title}
                >
                  <span aria-hidden="true">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns ──────────────────────────────────────────── */}
          {FOOTER_SECTIONS.map((section) => (
            <nav
              key={section.title}
              className="footer-col"
              aria-label={`${section.title} links`}
            >
              <h3 className="footer-col-title">{section.title}</h3>
              <ul className="footer-col-links" role="list">
                {section.links.map(({ href, label, external }) => (
                  <li key={href} role="listitem">
                    {external ? (
                      <a
                        href={href}
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in new tab)`}
                      >
                        {label}
                        {/* External link indicator for screen readers */}
                        <span className="sr-only"> (external link)</span>
                        <span aria-hidden="true" className="external-icon">↗</span>
                      </a>
                    ) : (
                      <Link href={href} className="footer-link">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── TRUST BAR ────────────────────────────────────────────────── */}
        <div className="footer-trust" aria-label="Organization trust information">
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">⚓</span>
            <div>
              <div className="trust-title">501(c)(3) Nonprofit</div>
              <div className="trust-desc">All donations are tax-deductible</div>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">🏛️</span>
            <div>
              <div className="trust-title">Rhode Island State Approved</div>
              <div className="trust-desc">All programs approved by RIDOH</div>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">❤️</span>
            <div>
              <div className="trust-title">AHA Training Center</div>
              <div className="trust-desc">American Heart Association certified</div>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" aria-hidden="true">💰</span>
            <div>
              <div className="trust-title">100% Grant-Funded</div>
              <div className="trust-desc">$0 tuition for eligible students</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────────────── */}
        <div className="footer-bottom">
          <div className="footer-legal-left">
            <span className="footer-ein">
              EIN: 99-3099438 &nbsp;·&nbsp; 501(c)(3) Tax-Exempt Nonprofit
              &nbsp;·&nbsp; Providence, Rhode Island
            </span>
          </div>

          <div className="footer-legal-right">
            <Link href="/privacy" className="footer-legal-link">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="footer-legal-sep">·</span>
            <Link href="/terms" className="footer-legal-link">
              Terms of Use
            </Link>
            <span aria-hidden="true" className="footer-legal-sep">·</span>
            <Link href="/accessibility" className="footer-legal-link">
              Accessibility
            </Link>
          </div>

          <p className="footer-copyright">
            © {currentYear} Rhode Island Education Center for H.O.P.E.
            All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Component Styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Visually hidden but screen-reader accessible */
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        .site-footer {
          background: #08122E;
          border-top: 1px solid rgba(200,161,54,0.15);
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 72px 5% 0;
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 56px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* Brand */
        .footer-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; margin-bottom: 20px;
        }
        .footer-logo:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }
        .footer-logo-text {
          display: flex; flex-direction: column; gap: 1px;
        }
        .footer-logo-name {
          font-family: var(--font-playfair), 'Georgia', serif;
          font-size: 15px; font-weight: 700; color: #fff;
          line-height: 1.2;
        }
        .footer-logo-hope {
          font-family: var(--font-playfair), 'Georgia', serif;
          font-size: 13px; font-weight: 400; color: #C8A136;
          font-style: italic;
        }
        .footer-tagline {
          font-family: var(--font-playfair), 'Georgia', serif;
          font-size: 15px; color: rgba(255,255,255,0.6);
          font-style: italic; line-height: 1.5; margin-bottom: 14px;
        }
        .footer-mission-blurb {
          font-size: 13px; color: rgba(255,255,255,0.4);
          line-height: 1.7; margin-bottom: 24px;
        }

        /* Address */
        .footer-address {
          display: flex; flex-direction: column; gap: 8px;
          font-style: normal; margin-bottom: 24px;
        }
        .footer-contact-row {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.5);
          text-decoration: none; transition: color 0.2s;
          line-height: 1.4;
        }
        .footer-contact-row:hover { color: #C8A136; }
        .footer-contact-row:focus-visible {
          outline: 2px solid #C8A136; outline-offset: 3px;
        }
        .footer-contact-icon { flex-shrink: 0; font-size: 14px; margin-top: 1px; }

        /* Social */
        .footer-social { display: flex; gap: 8px; }
        .social-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          transition: all 0.2s; text-transform: uppercase;
        }
        .social-btn:hover {
          border-color: #C8A136; color: #C8A136;
          background: rgba(200,161,54,0.08);
        }
        .social-btn:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }

        /* Link columns */
        .footer-col { display: flex; flex-direction: column; }
        .footer-col-title {
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #C8A136; font-weight: 700;
          margin-bottom: 18px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(200,161,54,0.2);
        }
        .footer-col-links { list-style: none; margin: 0; padding: 0; }
        .footer-col-links li { margin-bottom: 0; }
        .footer-link {
          display: flex; align-items: center; gap: 4px;
          font-size: 13px; color: rgba(255,255,255,0.45);
          text-decoration: none; padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s, padding-left 0.2s;
        }
        .footer-link:hover { color: #fff; padding-left: 4px; }
        .footer-link:focus-visible { outline: 2px solid #C8A136; outline-offset: 3px; }
        .external-icon {
          font-size: 10px; opacity: 0.5; margin-left: 2px;
        }

        /* Trust bar */
        .footer-trust {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-bottom: 40px; padding: 28px 32px;
          background: rgba(200,161,54,0.05);
          border: 1px solid rgba(200,161,54,0.12);
        }
        .trust-item {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .trust-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .trust-title {
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
          margin-bottom: 3px;
        }
        .trust-desc { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* Bottom bar */
        .footer-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 24px 0 32px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .footer-ein {
          font-size: 11px; color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }
        .footer-legal-right {
          display: flex; align-items: center; gap: 8px; justify-content: center;
        }
        .footer-legal-link {
          font-size: 11px; color: rgba(255,255,255,0.3);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-legal-link:hover { color: rgba(255,255,255,0.7); }
        .footer-legal-link:focus-visible { outline: 2px solid #C8A136; outline-offset: 3px; }
        .footer-legal-sep { font-size: 11px; color: rgba(255,255,255,0.15); }
        .footer-copyright {
          font-size: 11px; color: rgba(255,255,255,0.2);
          text-align: right; margin: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-trust { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-trust { grid-template-columns: 1fr 1fr; padding: 20px; }
          .footer-bottom {
            grid-template-columns: 1fr;
            text-align: center; gap: 10px;
          }
          .footer-copyright { text-align: center; }
          .footer-legal-right { flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-trust { grid-template-columns: 1fr; }
          .footer-inner { padding: 48px 4% 0; }
        }
      `}</style>
    </footer>
  );
}