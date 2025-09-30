// Configure static export and support hosting under a subfolder.
// Set BASE_PATH (e.g. "/tour") at build time; we also expose it as NEXT_PUBLIC_BASE_PATH for client-side code.
const BASE_PATH = process.env.BASE_PATH || '';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domain if needed
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
};