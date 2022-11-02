import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => (
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: 'https://cdn.sanity.io',
    changeOrigin: true,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    pathRewrite: [{
      patternStr: '^/api/image/',
      replaceStr: '/'
    }],
  })
);

