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
	}
}

module.exports = nextConfig
