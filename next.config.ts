import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'], // add your external host here
  },
};

export default nextConfig;
