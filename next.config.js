/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcLoader: false,
  },
  distDir: 'dist',
}

module.exports = nextConfig