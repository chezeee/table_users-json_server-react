/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true
	// eslint: { ignoreDuringBuilds: true }, // eslint:disable
};

module.exports = nextConfig;

module.exports = {
	// Для правильного импорта SWR
	experimental: {esmExternals: true}
};
