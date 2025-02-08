/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
