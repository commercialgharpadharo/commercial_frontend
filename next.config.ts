import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", 'res.cloudinary.com', 'img.icons8.com', 'upload.wikimedia.org'],

  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;

