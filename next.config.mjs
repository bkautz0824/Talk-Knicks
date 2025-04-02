/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
        protocol: 'https',
        hostname: 'media-cms.onrender.com',
        pathname: '/uploads/**',
      },
        // You can add production hostname when you deploy to production
        // {
        //   protocol: 'https',
        //   hostname: 'your-production-strapi-domain.com',
        //   pathname: '/uploads/**',
        // },
      ],
    },
  };
  
  export default nextConfig;