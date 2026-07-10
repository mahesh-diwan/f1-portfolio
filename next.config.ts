import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/f1-portfolio" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/f1-portfolio/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
