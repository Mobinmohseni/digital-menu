import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const parsed = new URL(apiUrl);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: parsed.protocol.replace(":", ""), hostname: parsed.hostname, port: parsed.port, pathname: "/**" },
    ],
  },
};

export default nextConfig;
