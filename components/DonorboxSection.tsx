'use client';

import { useEffect, useRef, useState } from 'react';

export default function DonorboxSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe || (iframe.offsetHeight > 0 && iframe.scrollHeight > 0)) return;
      setShowFallback(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div style={{ display: showFallback ? 'none' : 'block' }}>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://donorbox.org/widget.js"></script>
        <iframe
          ref={iframeRef}
          src="https://donorbox.org/embed/riec-hope"
          title="Donate to Rhode Island Education Center for H.O.P.E."
          name="donorbox"
          allow="payment"
          seamless
          height={900}
          width="100%"
          style={{
            maxWidth: 500, minWidth: 250,
            display: 'block', margin: '0 auto',
            border: 0, overflow: 'hidden',
          }}
        />
      </div>

      {showFallback && (
        <div
          style={{
            border: '2px solid rgba(12,27,77,0.12)',
            padding: '40px 32px',
            textAlign: 'center',
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 20,
              fontWeight: 800,
              color: '#0C1B4D',
              marginBottom: 10,
            }}
          >
            Donate Directly
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#6B7094',
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Our online donation form is temporarily unavailable. Please use one of the options below
            to make your gift — we appreciate your generosity.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=RIEC"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#C8A136',
                color: '#08122E',
                padding: '13px 36px',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                width: '100%',
                maxWidth: 320,
                boxSizing: 'border-box',
              }}
            >
              PayPal Giving Fund →
            </a>
            <a
              href="tel:+14014520171"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#0C1B4D',
                padding: '13px 36px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                border: '2px solid rgba(12,27,77,0.2)',
                width: '100%',
                maxWidth: 320,
                boxSizing: 'border-box',
              }}
            >
              Call to Give: 401-452-0171
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
