import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/yee",
        assetPrefix: "/yee/",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
