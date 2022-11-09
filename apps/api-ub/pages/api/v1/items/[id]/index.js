import * as jsonld from 'jsonld'
import { getTimespan } from '../../../../../lib/getTimespan'
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

async function getObject(id, url) {
  if (!id) {
    throw Error
  }

  const query = `
    ${SPARQL_PREFIXES}
    CONSTRUCT {
      ?uri ?p ?o ;
        a crm:E22_Human-Made_Object ;
        foaf:homepage ?homepage .
      ?subject ?subjectP ?subjectO .
      ?spatial ?spatialP ?spatialO .
      ?depicts foaf:name ?depictsLabel ;
        dct:identifier ?depictsIdentifier .
      ?maker foaf:name ?makerLabel ;
        dct:identifier ?makerIdentifier .
    } WHERE { 
      GRAPH ?g {
        VALUES ?id {'${id}'}
        ?uri dct:identifier ?id ;
          ?p ?o .
        BIND(iri(REPLACE(str(?uri), "data.ub.uib.no","marcus.uib.no","i")) as ?homepage) .
        OPTIONAL { 
      	  ?uri dct:license / rdfs:label ?licenseLabel .
    	  }
        # Get relations and filter unwanted props as this makes construct easier
        OPTIONAL { 
          ?uri dct:subject ?subject . 
          ?subject ?subjectP ?subjectO . 
          FILTER(?subjectP != ubbont:isSubjectOf && ?subjectP != dct:modified && ?subjectP != dct:available && ?subjectP != ubbont:showWeb  && ?subjectP != skos:related && ?subjectP != skos:inScheme && ?subjectP != skos:narrower && ?subjectP != skos:broader && ?subjectP != ubbont:previousIdentifier && ?subjectP != dc:relation)
        }
        OPTIONAL { 
          ?uri dct:spatial ?spatial . 
          ?spatial ?spatialP ?spatialO . 
          FILTER(?spatialP != skos:narrower && ?spatialP != skos:broader && ?spatialP != ubbont:previousIdentifier && ?spatialP != ubbont:locationFor && ?spatialP != dct:relation  && ?spatialP != dc:relation)
        }
        OPTIONAL { 
          ?uri foaf:depicts ?depicts . 
          ?depicts foaf:name ?depictsLabel .
          ?depicts dct:identifier ?depictsIdentifier .
        }
        OPTIONAL { 
          ?uri foaf:maker ?maker . 
          ?maker foaf:name ?makerLabel .
          ?maker dct:identifier ?makerIdentifier .
        }
      } 
    }
  `
  // eslint-disable-next-line no-undef
  const results = await fetch(
    `${url}${encodeURIComponent(
      query,
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
        console.log(result)

        const awaitFramed = jsonld.frame(result, {
          '@context': [`${getBaseUrl()}/ns/ubbont/context.json`],
          '@type': 'HumanMadeObject',
          '@embed': '@always',
        })
        let framed = await awaitFramed
        framed.timespan = getTimespan(undefined, framed?.madeAfter, framed?.madeBefore)
        //delete framed?.madeAfter
        //delete framed?.madeBefore

        // Change id as this did not work in the query
        framed.id = `${getBaseUrl()}/v1/items/${framed.identifier}`

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
