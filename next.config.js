/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <-- ignore ESLint during production builds
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '**' },
    ],
  },
};

module.exports = nextConfig;
