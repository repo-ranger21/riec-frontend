export default function DonorboxSection() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: 24,
        fontWeight: 800,
        color: '#0C1B4D',
        textAlign: 'center',
        marginBottom: 12,
      }}>
        Make a Donation
      </h2>
      <p style={{
        fontSize: 15,
        color: '#4A4A5A',
        lineHeight: 1.75,
        textAlign: 'center',
        maxWidth: 460,
        margin: '0 auto 32px',
      }}>
        To make a donation by phone, check, or to discuss corporate giving, contact us directly. All gifts are tax-deductible under EIN 99-3099438.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        <a
          href="tel:+14014520171"
          style={{
            display: 'inline-block',
            background: '#C8A136',
            color: '#08122E',
            padding: '14px 40px',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.06em',
            textDecoration: 'none',
            border: '2px solid #C8A136',
            width: '100%',
            maxWidth: 360,
            boxSizing: 'border-box',
          }}
        >
          Call to Give: 401-452-0171
        </a>
        <a
          href="mailto:info@rieducationcenter.org?subject=Donation%20Inquiry"
          style={{
            display: 'inline-block',
            background: 'transparent',
            color: '#0C1B4D',
            padding: '13px 40px',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            border: '2px solid rgba(12,27,77,0.25)',
            width: '100%',
            maxWidth: 360,
            boxSizing: 'border-box',
          }}
        >
          Email Us to Give →
        </a>
      </div>
    </div>
  );
}
