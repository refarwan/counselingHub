import type { NextConfig } from "next";

let allowedOrigins: string[] = [];
if (process.env.ALLOWED_ORIGINS)
	allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			allowedOrigins,
		},
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
