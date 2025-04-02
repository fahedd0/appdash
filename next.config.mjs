/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect root to dashboard
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;