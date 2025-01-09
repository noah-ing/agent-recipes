/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    optimizeFonts: true,
  },
  // Vercel-specific optimizations
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig

