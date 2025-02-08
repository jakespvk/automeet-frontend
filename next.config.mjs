/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
				permanent: true,
			},
		];
	},
};

export default nextConfig;
