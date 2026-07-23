/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Cloudflare R2 public bucket URL — update this hostname once your
        // R2 bucket is created tomorrow (Settings > Public Access URL)
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
    ],
  },
};

module.exports = nextConfig;
