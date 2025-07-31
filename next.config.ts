import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'helloinnerwell.com',
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
    ],
  },
};

export default nextConfig;
