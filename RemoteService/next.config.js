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
				source: '/article/:id/:assetName',
				destination: '/api/article/asset?articleId=:id&assetName=:assetName',
			}
		]
	},

	serverRuntimeConfig: {
		backendExchangeServerAddress: 'http://localhost:5167',
		accessToken: 'ExampleAccessToken'
	}
}

module.exports = nextConfig
