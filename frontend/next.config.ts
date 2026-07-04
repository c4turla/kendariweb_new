import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for smaller Docker images
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "*.kendariweb.com",
        pathname: "/assets/**",
      },
      {
        protocol: "http",
        hostname: "directus",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
