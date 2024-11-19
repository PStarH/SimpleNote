/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcLoader: false,
  },
}

module.exports = nextConfig