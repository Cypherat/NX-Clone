/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy'], // Add the hostname to the domains array
  },
};

module.exports = nextConfig;
