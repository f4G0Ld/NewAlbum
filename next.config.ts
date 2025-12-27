import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["vasya.lunarweb.ru"],
	},
	/* config options here */
};

module.exports = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
							"style-src 'self' 'unsafe-inline'",
							"media-src 'self' blob: data: https://vasya.lunarweb.ru",
							"connect-src 'self' https://vasya.lunarweb.ru",
							"img-src 'self' data: https:",
						].join("; "),
					},
				],
			},
		];
	},
};

export default nextConfig;
