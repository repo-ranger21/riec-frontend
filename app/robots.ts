export const dynamic = 'force-static';

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://example.org";

	return {
		rules: [{ userAgent: "*", allow: "/" }],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
