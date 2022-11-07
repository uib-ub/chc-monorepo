import * as jsonld from 'jsonld'
import { omit, sortBy } from 'lodash'
import { getObject } from '../../../../../lib/api/getObject'
import { constructManifest } from '../../../../../lib/getManifest/constructManifest'
import { defaultFrame } from '../../../../../lib/getManifest/defaultFrame'
import Cors from 'cors'

const FRAME = defaultFrame

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

      // Get the RDF for this tiem
      const response = await getObject(url, id)

      if (response.status >= 200 && response.status <= 299) {
        const results = await response.json();

        // Frame the result for nested json
        const awaitFramed = jsonld.frame(results, FRAME);
        let framed = await awaitFramed

        // Remove json-ld context 
        framed = omit(framed, ["@context"])

        if (Object.keys(framed).length === 0) {
          return res.status(404).json({ message: 'Not found' })
        }

        // When madeObject is a single page we convert to an array of one
        if (Array.isArray(framed.items) == false) {
          framed.items = [framed.items]
        }
        if (Array.isArray(framed.structures.items) == false) {
          framed.structures.items = [framed.structures.items]
        }

        // Sort nested arrays
        framed.items = sortBy(framed.items, o => o.label)
        framed.structures.items = sortBy(framed.structures.items, i => parseInt(i.split("_p")[1]))

        // Create the manifest
        const constructedManifest = await constructManifest(framed, url)
        const manifest = await constructedManifest


        res.status(200).json(manifest)
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
