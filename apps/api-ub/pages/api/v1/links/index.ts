// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { LinksRecord, XataClient } from '../../../../utils/xata'
import QRCode from 'qrcode'
import { nanoid } from 'nanoid'

const xata = new XataClient()

const generateQR = async (text: string) => {
  try {
    return await QRCode.toString(text, { type: 'svg' })
  } catch (err) {
    console.error(err)
  }
}

const getLinks = async () => {
  return await xata.db.links.getAll();
}

const createLink = async (data: LinksRecord) => {
  return await xata.db.links.create(data);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const links = await getLinks()
        res.status(200).json(links)
        break
      }
      case 'POST': {
        // No response without token
        if (req.query.token !== process.env.API_SECRET) {
          return res.status(401).send('You are not authorized!')
        }

        const domain = 'ub-urls.vercel.app'
        // Get the path
        const path = nanoid(8)
        // Set date
        const date = new Date()
        // create QR as SVG
        const qr = await generateQR(`https://${domain}/${path}`)

        const newLink = {
          qr,
          domain,
          ...req.body,
          path,
          created: date,
          modified: date,
        }

        const links = await createLink(newLink)
        res.status(200).json(links)
        break
      }
      default:
        res.status(405).json({
          error: { message: 'Method not allowed' },
        })
    }
  } catch (err) {
    //console.error(err)
    return res.status(500).json({
      error: { message: `An error ocurred, ${err}` },
    })
  }
}
