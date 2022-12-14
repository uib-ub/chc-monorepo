const { NODE_ENV } = process.env

const COMING_SOON_REDIRECT = [{
  source: '/',
  destination: '/coming-soon',
  permanent: false
}]

module.exports = {
  /* experimental: {
    appDir: true,
    // FIX: replaces node-fetch which has a bug maxes the payload to 15k for some reason
    enableUndici: true,
  }, */
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'no'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  images: {
    domains: ['cdn.sanity.io']
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
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
        source: '/jeg-ma-se',
        destination: '/',
      }
    ]
  },
  async redirects() {
    if (NODE_ENV == 'production') {
      return [
        ...COMING_SOON_REDIRECT
      ]
    }
    return []
  },
  reactStrictMode: true,
};
