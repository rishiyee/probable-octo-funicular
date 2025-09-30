/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    return config;
  },
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
