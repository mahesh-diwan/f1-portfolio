import type { NextConfig } from "next";

const REPO_NAME = "f1-portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${REPO_NAME}` : "",
  assetPrefix: isProd ? `/${REPO_NAME}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: "/home/mahesh-diwan/SPECTRE/Projects/F1",
  },
};

export default nextConfig;
