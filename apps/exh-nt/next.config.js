// const withTM = require("next-transpile-modules")(["ui"]);

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

module.exports = {
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      ...STUDIO_REWRITE,
    ]
  },
  reactStrictMode: true,
};
