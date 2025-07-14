/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true, // Включаем поддержку App Router
  },
};

export default nextConfig;

