/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
  },

  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here if needed
  },
};

export default nextConfig;
