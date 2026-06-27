import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"], // automatically serves avif or webp , if none, original..
    deviceSizes: [640, 768, 1024, 1280, 1536], //Generate optimized image versions for these widths.
  },
  typedRoutes: true,
};

export default nextConfig;
