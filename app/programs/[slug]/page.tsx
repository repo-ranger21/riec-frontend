interface ProgramPageProps {
  params: { slug: string };
}

export default function ProgramPage({ params }: ProgramPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Program: {params.slug}</h1>
      <p className="mt-4 text-lg text-gray-600">
        Placeholder — program detail page coming soon.
      </p>
    </main>
  );
}
