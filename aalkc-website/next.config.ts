import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed to Vercel — no static export needed
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
