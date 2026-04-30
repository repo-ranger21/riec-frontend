import Link from "next/link";

type ProgramCardProps = {
	slug: string;
	title: string;
	summary?: string;
};

export default function ProgramCard({ slug, title, summary }: ProgramCardProps) {
	return (
		<article style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
			<h3>{title}</h3>
			{summary ? <p>{summary}</p> : null}
			<Link href={`/programs/${slug}`}>View program</Link>
		</article>
	);
}
