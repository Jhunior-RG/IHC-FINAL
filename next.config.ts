import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["staticmap.openstreetmap.de"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'staticmap.openstreetmap.de',
        pathname: '/staticmap.php',
      },
    ],
  },
};

export default nextConfig;
