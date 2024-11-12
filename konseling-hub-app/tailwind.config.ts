import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			keyframes: {
				"line-loader": {
					"0%": { width: "0", left: "0" },
					"50%": { width: "100%" },
					"100%": { width: "0", left: "unset", right: "0" },
				},
			},
			animation: {
				"line-loader": "line-loader 2s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
export default config;
