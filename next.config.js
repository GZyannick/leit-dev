const { empty } = require("@prisma/client/runtime/library");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// module.exports = {
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };
//     return config;
//   },
// };

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
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
