import type { NextConfig } from "next";

let allowedOrigins: string[] = [];
if (process.env.ALLOWED_ORIGINS)
	allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
type RemotePatterns = [
	string,
	undefined | "http" | "https",
	string,
	undefined | string
];

let remotePatterns: RemotePatterns = ["", undefined, "", ""];
if (process.env.API_ORIGIN) {
	const match = process.env.API_ORIGIN.match(
		/^(https?):\/\/([^:/?#]+)(?::(\d+))?/
	);
	if (match) remotePatterns = match as RemotePatterns;
}

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			allowedOrigins,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: remotePatterns[1],
				hostname: remotePatterns[2],
				port: remotePatterns[3],
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/data/:path*",
				destination: `${process.env.API_ORIGIN}/:path*`,
			},
		];
	},
};

export default nextConfig;
