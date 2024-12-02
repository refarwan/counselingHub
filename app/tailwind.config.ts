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
				"popup-show": {
					"0%": { "margin-top": "120px" },
					"100%": { "margin-top": "150px" },
				},
			},
			animation: {
				"line-loader": "line-loader 2s ease-in-out infinite",
				"popup-show": "popup-show 50ms ease-in-out forwards",
			},
		},
	},
	plugins: [],
};
export default config;
