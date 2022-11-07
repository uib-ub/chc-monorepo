import * as jsonld from 'jsonld'
import { omit } from 'lodash'
import getDocument from '../../../../../lib/getDocument'
import getFrame from '../../../../../lib/getDocument/getFrame'
import getQuery from '../../../../../lib/getDocument/getQuery'
import Cors from 'cors'

// Must be better way
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3009' : `https://${process.env.VERCEL_URL}`

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function getObject(id, url) {
  if (!id) {
    throw Error
  }
  // eslint-disable-next-line no-undef
  const results = await fetch(
    `${url}${encodeURIComponent(
      getQuery(id),
    )}&output=json`,
  )
  return results
}

export default async function handler(req, res) {
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
        const awaitFramed = jsonld.frame(result, await getFrame(result, id))
        const framed = await awaitFramed

        // Make sure we have arrays
        if (framed.subject && Array.isArray(framed.subject) === false) {
          framed.subject = [framed.subject]
        }
        if (framed.spatial && Array.isArray(framed.spatial) === false) {
          framed.spatial = [framed.spatial]
        }
        if (framed.depicts && Array.isArray(framed.depicts) === false) {
          framed.depicts = [framed.depicts]
        }
        if (framed.maker && Array.isArray(framed.maker) === false) {
          framed.maker = [framed.maker]
        }

        // Remove json-ld context
        const framedJSON = omit(framed, ['@context'])
        const data = getDocument(framedJSON)


        res.status(200).json(framedJSON)
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
