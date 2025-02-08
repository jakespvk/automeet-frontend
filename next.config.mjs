/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: '${process.env.API_BASE_URL}/:path*',
			},
		];
	},
};

export default nextConfig;
