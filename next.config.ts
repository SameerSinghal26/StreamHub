import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    domains: [
      'utfs.io',
      'ufs.sh',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
