import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				riec: {
					navy: "#0B1F3A",
					teal: "#007C91",
					sand: "#F1E7D0",
				},
			},
		},
	},
	plugins: [],
};

export default config;
