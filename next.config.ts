import type { NextConfig } from "next";

module.exports = {
  images: {
    domains: [
      'utfs.io',
      'ufs.sh',
      // Add a wildcard for all subdomains of ufs.sh
      // Next.js does not support wildcards, so you must list each subdomain you use,
      // or use a pattern-matching loader (see below).
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   domains: [
  //     "utfs.io",
  //   ],
  // },
};

export default nextConfig;
