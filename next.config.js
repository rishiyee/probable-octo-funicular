/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
  // This makes sure your path aliases work in production
  experimental: {
    // This is needed for path aliases to work in production
    // when using `next build`
    externalDir: true,
  },
  // This is needed for static exports
  output: 'standalone',
  // This is needed for static exports
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
