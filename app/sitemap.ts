import type { MetadataRoute } from "next";
import { programs } from "@/lib/programs";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://example.org";

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: `${baseUrl}/` },
		{ url: `${baseUrl}/about` },
		{ url: `${baseUrl}/apply` },
		{ url: `${baseUrl}/donate` },
		{ url: `${baseUrl}/programs` },
	];

	const programRoutes: MetadataRoute.Sitemap = programs.map((program) => ({
		url: `${baseUrl}/programs/${program.slug}`,
	}));

	return [...staticRoutes, ...programRoutes];
}
