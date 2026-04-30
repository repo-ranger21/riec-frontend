import Link from "next/link";

export default function DonateButton() {
	return (
		<Link
			href="/donate"
			style={{
				display: "inline-block",
				padding: "0.625rem 1rem",
				borderRadius: 8,
				background: "#007C91",
				color: "white",
				textDecoration: "none",
			}}
		>
			Donate
		</Link>
	);
}
