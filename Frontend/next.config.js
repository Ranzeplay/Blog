/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/whoami',
				permanent: false,
			},
		]
	},

	async rewrites() {
		return [
			{
				source: '/article/:articleId/assets/:assetName',
				destination: '/api/article/:articleId/asset/:assetName',
			}
		]
	},
}

module.exports = nextConfig
