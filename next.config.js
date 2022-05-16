/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
