import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript type-checking during builds
  },

};

export default nextConfig;
