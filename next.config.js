/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    imageSizes: [500, 400, 300, 248, 128, 96, 86, 76, 64],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};
