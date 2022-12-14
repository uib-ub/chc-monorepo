import * as jsonld from 'jsonld'
import Cors from 'cors'
import { API_URL, getBaseUrl, SPARQL_PREFIXES } from '../../../../../lib/constants'

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

async function getData(url, id, page = 0) {
  if (!id) {
    throw Error
  }

  const query = `
    ${SPARQL_PREFIXES}
    CONSTRUCT {
      ?uri a iiif_prezi:Collection ;
        rdfs:label ?label ;
        iiif_prezi:summary ?count ;
        as:items ?item .
      ?item a iiif_prezi:Manifest ;
        rdfs:label ?itemLabel ;
        dct:identifier ?itemId .
    }
    WHERE {
        {
            SELECT ?uri (COUNT(?part) as ?count)
            WHERE {
             VALUES ?id {'${id}'}
                ?uri dct:identifier ?id ;
               dct:hasPart ?part .
            }
          GROUP BY ?uri
        }
        UNION
        {
            SELECT *
            WHERE {
             VALUES ?id {'${id}'}
              ?uri dct:identifier ?id .
              OPTIONAL { 
                ?uri dct:hasPart ?item .
                ?item dct:identifier ?itemId ;
                     rdfs:label|dct:title ?itemLabel .
                 }
        OPTIONAL { ?uri rdfs:label ?label . }
        OPTIONAL { ?uri dct:title ?label . }
        OPTIONAL { ?uri dct:description ?description . }
        OPTIONAL { ?uri foaf:logo ?logo . }
            }
            ORDER BY ?uri
            OFFSET ${page}
            LIMIT 10
        }
    }
  `

  const results = await fetch(
    `${url}${encodeURIComponent(
      query,
    )}&output=json`,
  )
  return results
}

export default async function handler(req, res) {
  const {
    query: { id, page },
    method,
  } = req

  await runMiddleware(req, res, cors)

  switch (method) {
    case 'GET':

      // Find the service that contains data on this item
      const checkedServices = await fetch(`${API_URL}/resolver/${id}?v=1`).then(res => res.json())
      const url = await checkedServices.url
      // No URL means no service found, but this is horrible error handeling
      if (!url) res.status(404).json({ message: 'ID not found' })

      const response = await getData(url, id, page)

      // Deal with response
      if (response.status >= 200 && response.status <= 299) {
        const result = await response.json()
        //res.status(200).json(result)

        const awaitFramed = jsonld.frame(result, {
          '@context': [`https://iiif.io/api/presentation/3/context.json`],
          '@type': 'Collection',
          '@embed': '@always',
        })
        let framed = await awaitFramed

        // Change id as this did not work in the query
        //framed.id = `${getBaseUrl()}/items/${framed.identifier}`
        // We assume all @none language tags are really norwegian
        framed = JSON.parse(JSON.stringify(framed).replaceAll('"none":', '"no":'))

        const count = framed['iiif_prezi:summary']
        const items = framed['as:items']

        const collection = {
          "@context": "https://iiif.io/api/presentation/3/context.json",
          "id": `${getBaseUrl()}/collections/search?id=${id}${page ? `&page=${page}` : ''}`,
          "type": "Collection",
          "label": {
            "@none": [
              "All results"
            ]
          },
          "summary": {
            "@none": [
              `${count} results`
            ]
          },
          "items": items.map(item => {
            return {
              "id": `${getBaseUrl()}/items/${item['dcterms:identifier']}/manifest`,

              "type": "Manifest",
              "label": item.label,
              "homepage": [
                {
                  "id": item.id.replace("http://data.ub", "https://marcus"),
                  "type": "Text",
                  "label": item.label
                }
              ]
            }
          }),
          "partOf": [
            {
              "id": `${getBaseUrl()}/collections/search?id=${id}`,
              "type": "Collection"
            }
          ]
        }


        res.status(200).json(collection)
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
