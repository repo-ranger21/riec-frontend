interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Program: {slug}</h1>
      <p className="mt-4 text-lg text-gray-600">
        Placeholder — program detail page coming soon.
      </p>
    </main>
  );
}
