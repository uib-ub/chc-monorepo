import * as jsonld from 'jsonld'
import getFrame from '../../../../lib/getDocument/getFrame'
import { getTimespan } from '../../../../lib/getDocument/getTimespan'
import getQuery from './getQuery'
import Cors from 'cors'
import { API_URL } from '../../../../lib/config'
import { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function getObject(id: string | string[] | undefined, url: string): Promise<any> {
  if (!id) {
    throw Error
  }
  // eslint-disable-next-line no-undef
  const results = await fetch(
    `${url}${encodeURIComponent(
      getQuery(id as string),
    )}&output=json`,
  )
  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await runMiddleware(req, res, cors)

  switch (method) {
    case 'GET':

      // Find the service that contains data on this item
      const checkedServices = await fetch(`${API_URL}/v1/resolver/${id}`).then(res => res.json())
      const url = await checkedServices.url
      // No URL means no service found, but this is horrible error handeling
      if (!url) return res.status(404).json({ message: 'ID not found' })

      const response = await getObject(id, url)

      // Deal with response
      if (response.status >= 200 && response.status <= 299) {
        const result = await response.json()

        // Frame the result for nested json
        const awaitFramed = jsonld.frame(result, await getFrame(result, id as string))
        let framed = await awaitFramed
        framed.timespan = getTimespan(undefined, framed?.beginOfTheBegin, framed?.endOfTheEnd)
        //delete framed?.beginOfTheBegin
        //delete framed?.endOfTheEnd


        res.status(200).json(framed)
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
