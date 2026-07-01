import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/caregiver-companion",
  images: { unoptimized: true },
};

export default nextConfig;
