export default function DonorboxSection() {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontSize: 15,
        color: '#4A4A5A',
        lineHeight: 1.75,
        marginBottom: 32,
        maxWidth: 460,
        margin: '0 auto 32px',
      }}>
        Complete your donation securely via PayPal Giving Fund, or call us directly —
        we will process your gift manually.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        <a
          href="https://www.paypal.com/us/fundraiser/charity/4318491"
          target="_blank"
          rel="noopener noreferrer"
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
          PayPal Giving Fund →
        </a>
        <a
          href="tel:+14014520171"
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
          Call to Give: 401-452-0171
        </a>
      </div>
    </div>
  );
}
