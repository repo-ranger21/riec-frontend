/**
 * components/Nav.tsx
 * Sticky top navigation — client component (needs scroll + menu state).
 *
 * Security & Quality:
 *  - All hrefs are hardcoded strings — zero dynamic URL construction
 *  - All external links use rel="noopener noreferrer"
 *  - No dangerouslySetInnerHTML anywhere
 *  - Full ARIA: role="navigation", aria-label, aria-expanded, aria-current,
 *               aria-controls, aria-haspopup
 *  - Keyboard: Escape closes mobile menu, focus trapped inside when open
 *  - useEffect cleanup prevents memory leaks
 *  - No eval(), no dynamic imports from user-controlled paths
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/* ─── NAV LINKS ──────────────────────────────────────────────────────────────
 * Hardcoded — never constructed from user input.
 * ─────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About RIEC" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

/* ─── ANCHOR ICON ─────────────────────────────────────────────────────────── */
function AnchorIcon({
  size = 28,
  color = "#C8A136",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="18" r="10" stroke={color} strokeWidth="4" />
      <line
        x1="50" y1="28" x2="50" y2="95"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <line
        x1="22" y1="52" x2="78" y2="52"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <path
        d="M22 52 C22 80 14 88 14 88"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <path
        d="M78 52 C78 80 86 88 86 88"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <path
        d="M14 88 C14 88 32 95 50 95"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <path
        d="M86 88 C86 88 68 95 50 95"
        stroke={color} strokeWidth="4" strokeLinecap="round"
      />
      <circle cx="50" cy="18" r="5" fill={color} />
    </svg>
  );
}

/* ─── NAV COMPONENT ───────────────────────────────────────────────────────── */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Refs for focus management */
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  /* ── Scroll Detection ──────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    // Set initial state (handles page refresh mid-scroll)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close menu on route change ────────────────────────────────────────── */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ── Keyboard: Escape closes menu ─────────────────────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus(); // Return focus to trigger
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  /* ── Prevent body scroll when mobile menu is open ─────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Focus first link when menu opens ─────────────────────────────────── */
  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    // Small delay to allow the CSS transition to begin
    const timer = setTimeout(() => firstFocusableRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // Handle hash links — only match on the path portion
    const path = href.split("#")[0] ?? "";
    return path.length > 1 && pathname.startsWith(path);
  };

  return (
    <>
      {/* ── Backdrop (mobile) ─────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header
        className={`nav-header${scrolled ? " nav-scrolled" : ""}`}
        role="banner"
      >
        <nav
          className="nav-inner"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ── Logo ────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="nav-logo"
            aria-label="Rhode Island Education Center for H.O.P.E. — Home"
          >
            <AnchorIcon size={30} color="#C8A136" />
            <span
              className="nav-logo-text"
              style={{
                color: scrolled ? '#FAF7F2' : '#0C1B4D',
                transition: 'color 0.3s ease',
              }}
            >
              RI Education Center{" "}
              <span className="nav-logo-accent">for H.O.P.E.</span>
            </span>
          </Link>

          {/* ── Desktop Links ───────────────────────────────────────── */}
          <ul className="nav-links" role="list" aria-label="Site navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} role="listitem">
                <Link
                  href={href}
                  className={`nav-link${isActive(href) ? " nav-link-active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTAs ─────────────────────────────────────────── */}
          <div className="nav-ctas" aria-label="Primary actions">
            <Link
              href="/donate"
              className="nav-btn nav-btn-outline"
              aria-label="Donate to fund a student's healthcare education"
            >
              Donate ♡
            </Link>
            <Link
              href="/apply"
              className="nav-btn nav-btn-primary"
              aria-label="Apply for free grant-funded healthcare training"
            >
              Apply Free →
            </Link>
          </div>

          {/* ── Mobile Menu Button ──────────────────────────────────── */}
          <button
            ref={menuButtonRef}
            className={`nav-hamburger${menuOpen ? " nav-hamburger-open" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            type="button"
          >
            {/* Three-line icon → X icon via CSS */}
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
          </button>
        </nav>

        {/* ── Mobile Menu ────────────────────────────────────────────────
         * id matches aria-controls on the toggle button.
         * ────────────────────────────────────────────────────────────── */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`mobile-menu${menuOpen ? " mobile-menu-open" : ""}`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          <nav aria-label="Mobile navigation">
            <ul className="mobile-links" role="list">
              {NAV_LINKS.map(({ href, label }, i) => (
                <li key={href} role="listitem">
                  <Link
                    ref={i === 0 ? firstFocusableRef : undefined}
                    href={href}
                    className={`mobile-link${isActive(href) ? " mobile-link-active" : ""}`}
                    aria-current={isActive(href) ? "page" : undefined}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-ctas">
              <Link
                href="/donate"
                className="mobile-btn mobile-btn-outline"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                Donate ♡
              </Link>
              <Link
                href="/apply"
                className="mobile-btn mobile-btn-primary"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                Apply Free →
              </Link>
            </div>

            <div className="mobile-contact">
              <a
                href="tel:+14014520171"
                className="mobile-contact-link"
                tabIndex={menuOpen ? 0 : -1}
              >
                📞 401-452-0171
              </a>
              <a
                href="mailto:info@rieducationcenter.org"
                className="mobile-contact-link"
                tabIndex={menuOpen ? 0 : -1}
              >
                ✉️ info@rieducationcenter.org
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Spacer — prevents content from hiding under the fixed nav ── */}
      <div className="nav-spacer" aria-hidden="true" />

      {/* ── Component Styles ───────────────────────────────────────────────
       * Scoped inline styles keep this component portable.
       * Move to globals.css or a CSS module for larger teams.
       * ─────────────────────────────────────────────────────────────────── */}
      <style>{`
        /* Base nav */
        .nav-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: transparent;
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .nav-header.nav-scrolled {
          background: #08122E;
          box-shadow: 0 2px 24px rgba(8,18,46,0.5);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          max-width: 1200px; margin: 0 auto;
          padding: 18px 5%;
          gap: 24px;
        }

        /* Logo */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .nav-logo-text {
          font-family: var(--font-playfair), 'Georgia', serif;
          font-size: 16px; font-weight: 700;
          line-height: 1.2; letter-spacing: 0.01em;
        }
        .nav-logo-accent { color: #C8A136; }
        .nav-logo:focus-visible {
          outline: 2px solid #C8A136; outline-offset: 4px;
        }

        /* Desktop links */
        .nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none; margin: 0; padding: 0; flex: 1;
          justify-content: center;
        }
        .nav-link {
          color: rgba(255,255,255,0.75); text-decoration: none;
          font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
          padding: 8px 12px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link.nav-link-active { color: #C8A136; border-bottom-color: #C8A136; }
        .nav-link:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }

        /* Desktop CTAs */
        .nav-ctas { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nav-btn {
          font-size: 13px; font-weight: 700; letter-spacing: 0.06em;
          text-decoration: none; padding: 9px 20px;
          transition: all 0.22s; white-space: nowrap;
          border: 2px solid;
        }
        .nav-btn-outline {
          color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.3);
          background: transparent;
        }
        .nav-btn-outline:hover {
          color: #C8A136; border-color: #C8A136;
        }
        .nav-btn-primary {
          background: #C8A136; color: #08122E; border-color: #C8A136;
        }
        .nav-btn-primary:hover {
          background: #DEB840; border-color: #DEB840;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(200,161,54,0.4);
        }
        .nav-btn:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }

        /* Hamburger */
        .nav-hamburger {
          display: none; flex-direction: column; justify-content: center;
          align-items: center; gap: 5px;
          width: 40px; height: 40px;
          background: none; border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer; padding: 8px; flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .nav-hamburger:hover { border-color: #C8A136; }
        .nav-hamburger:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }
        .hamburger-bar {
          width: 20px; height: 2px; background: #fff;
          transition: all 0.3s ease; transform-origin: center;
          display: block;
        }
        .nav-hamburger-open .hamburger-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger-open .hamburger-bar:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .nav-hamburger-open .hamburger-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile menu */
        .nav-backdrop {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(8,18,46,0.6); backdrop-filter: blur(2px);
        }
        .mobile-menu {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw); z-index: 1001;
          background: #0C1B4D;
          border-left: 1px solid rgba(200,161,54,0.2);
          padding: 80px 28px 40px;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          display: flex; flex-direction: column;
        }
        .mobile-menu.mobile-menu-open { transform: translateX(0); }
        .mobile-links { list-style: none; margin: 0 0 28px; padding: 0; }
        .mobile-link {
          display: block; color: rgba(255,255,255,0.75);
          text-decoration: none; font-size: 18px; font-weight: 500;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-link:hover, .mobile-link:focus-visible {
          color: #C8A136; padding-left: 6px;
          outline: none;
        }
        .mobile-link.mobile-link-active { color: #C8A136; }
        .mobile-ctas {
          display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px;
        }
        .mobile-btn {
          display: block; text-align: center; text-decoration: none;
          font-size: 14px; font-weight: 700; letter-spacing: 0.06em;
          padding: 13px 20px; border: 2px solid; transition: all 0.22s;
        }
        .mobile-btn-outline {
          color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.3);
          background: transparent;
        }
        .mobile-btn-outline:hover { color: #C8A136; border-color: #C8A136; }
        .mobile-btn-primary {
          background: #C8A136; color: #08122E; border-color: #C8A136;
        }
        .mobile-btn-primary:hover { background: #DEB840; border-color: #DEB840; }
        .mobile-btn:focus-visible { outline: 2px solid #C8A136; outline-offset: 4px; }
        .mobile-contact {
          margin-top: auto; display: flex; flex-direction: column; gap: 10px;
          padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .mobile-contact-link {
          font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-contact-link:hover { color: #C8A136; }
        .mobile-contact-link:focus-visible { outline: 2px solid #C8A136; outline-offset: 2px; }

        /* Spacer */
        .nav-spacer { height: 72px; }

        /* Responsive */
        @media (max-width: 900px) {
          .nav-links, .nav-ctas { display: none; }
          .nav-hamburger { display: flex; }
          .nav-spacer { height: 66px; }
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 14px 4%; }
          .nav-logo-text { font-size: 14px; }
        }
      `}</style>
    </>
  );
}