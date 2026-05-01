import Link from 'next/link';
import { PROGRAMS } from '@/lib/programs';

export default function ProgramsPage() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <h1>Programs</h1>
      <ul>
        {PROGRAMS.map((program) => (
          <li key={program.slug}>
            <Link href={`/programs/${program.slug}`}>{program.fullName}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


