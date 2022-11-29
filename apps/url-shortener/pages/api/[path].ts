// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Links, LinksRecord, XataClient } from '../../utils/xata';

const xata = new XataClient()

const getRedirectURL = async (path: string): Promise<string> => {
  const response: any = await xata.db.links.filter("path", path).getFirst()

  // TODO: do this non-stupid
  if (!response) {
    return '404'
  }

  xata.db.links.update(response.id, {
    views: response.views + 1
  })
  return response.originalURL
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query

  if (req.method === 'GET') {
    try {
      const link = await getRedirectURL(path as string)
      if (link === '404') {
        return res.status(404).json({
          error: { message: `No redirect found` },
        })
      }
      // Only for testing
      //res.status(200).json(link)
      res.redirect(302, link)
    } catch (err) {
      res.status(500).json({
        error: { message: `An error ocurred, ${err}` },
      })
    }
  } else {
    res.status(405).json({
      error: { message: 'Method not allowed' },
    })
  }
}
