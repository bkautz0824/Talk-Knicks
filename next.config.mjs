/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['media-cms.onrender.com'],
      // remotePatterns: [
      //   {
      //     protocol: 'http',
      //     hostname: 'localhost',
      //     port: '1337',
      //     pathname: '/uploads/**',
      //   },

        // You can add production hostname when you deploy to production
        // {
        //   protocol: 'https',
        //   hostname: 'your-production-strapi-domain.com',
        //   pathname: '/uploads/**',
        // },
      
    },
  };
  
  export default nextConfig;