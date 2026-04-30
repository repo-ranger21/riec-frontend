import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support RIEC programs with a tax-deductible donation.',
};

export default function DonatePage() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <h1>Donate</h1>
      <p>Donation page placeholder.</p>
    </section>
  );
}
