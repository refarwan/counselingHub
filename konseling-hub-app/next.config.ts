import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			allowedOrigins: [process.env.APP_ORIGIN as string],
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
