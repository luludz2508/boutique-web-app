/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "product.hstatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.hstatic.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
