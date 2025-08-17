/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '46f32a42-e4ff-489b-8e03-b52e4d70fd18.selcdn.net',
      },
    ],
  },
};

export default nextConfig;
