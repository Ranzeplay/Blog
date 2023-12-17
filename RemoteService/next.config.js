/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/whoami',
			},
		]
	}
}

module.exports = nextConfig
