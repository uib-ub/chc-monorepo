/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // FIX: replaces node-fetch which has a bug maxes the payload to 15k for some reason
    enableUndici: true,
    transpilePackages: ['ui']
  },
  async headers() {
    return [
      {
        // mathching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Content-Type", value: "application/ld+json" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'v',
            value: '1',
          },
        ],
        destination: '/api/v1/:path*',
      },
      {
        source: '/:path*',
        destination: '/api/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig
