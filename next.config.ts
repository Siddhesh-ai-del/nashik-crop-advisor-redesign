import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    watchOptions: {
      ignored: [".playwright-mcp/**", "**/*.png"],
    },
  },
};

export default nextConfig;
