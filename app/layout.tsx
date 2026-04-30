import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";


export const metadata: Metadata = {
	title: "RIEC",
	description: "RIEC website placeholder scaffold",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body style={{ margin: 0, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
				<div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1rem" }}>
					<Nav />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}

