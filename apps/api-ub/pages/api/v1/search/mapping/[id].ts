import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@elastic/elasticsearch'
const { Transport } = require('@elastic/transport')
import { marcusMapping } from './marcusMapping'

// then create a class, that extends Transport class to modify the path
class MTransport extends Transport {
  request(params: any, options: any, callback: any) {
    params.path = process.env.ES_PATH + params.path // <- append the path right here
    return super.request(params, options, callback)
  }
}

const client = new Client({
  node: process.env.ES_HOST,
  /* @ts-ignore */
  Transport: MTransport,
  auth: {
    apiKey: process.env.ES_APIKEY || ''
  }
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const mapping = await client.indices.getMapping({ index: id })
        res.status(200).json(mapping)
      } catch (err) {
        (err: Error) => { return err }
      }
      break
    case 'PUT':
      try {
        /* @ts-ignore */
        const response = await client.indices.putMapping({ index: id, body: marcusMapping }, function (err) {
          if (err) {
            console.log(err);
          }
        })
        res.status(200).json(response)
      } catch (err) {
        (err: any) => { return err }
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
