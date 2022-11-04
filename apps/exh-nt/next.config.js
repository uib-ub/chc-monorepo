//const withTM = require("next-transpile-modules")(["ui"]);

const { NEXT_PUBLIC_STUDIO_URL, NODE_ENV } = process.env

const STUDIO_REWRITE = [
  {
    source: '/studio/:path*',
    destination:
      NODE_ENV === 'development'
        ? 'http://localhost:3333/studio/:path*'
        : `${NEXT_PUBLIC_STUDIO_URL}/studio/index.html`,
  },
  {
    source: '/studio',
    destination:
      NODE_ENV === 'development'
        ? 'http://localhost:3333/studio'
        : `${NEXT_PUBLIC_STUDIO_URL}/studio`,
  }
]

const COMING_SOON_REDIRECT = [{
  source: '/',
  destination: '/coming-soon',
  permanent: false
}]

module.exports = {
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
        source: '/:path*',
        destination: `/:path*`,
      },
      ...STUDIO_REWRITE,
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
