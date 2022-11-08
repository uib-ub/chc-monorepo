import * as jsonld from 'jsonld'
import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '../../../../lib/config'

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

const query = `
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX ubbont: <http://data.ub.uib.no/ontology/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX dc: <http://purl.org/dc/elements/1.1/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  PREFIX bibo: <http://purl.org/ontology/bibo/>
  PREFIX event: <http://purl.org/NET/c4dm/event.owl#>
  
  CONSTRUCT {
    ?apiuri a ?type ;
      ?p ?o ;
      ubbont:homepage ?homepage .
  } WHERE { 
    GRAPH ?g {
      VALUES ?type {<http://purl.org/NET/c4dm/event.owl#Event>}
      ?uri a ?type ;
        ?p ?o .
      FILTER(?p != event:product && ?p != ubbont:showWeb && ?p != ubbont:cataloguer && ?p != dc:relation && ?p != dct:relation && ?p != dct:hasPart)
      BIND(iri(REPLACE(str(?uri), "http://data.ub.uib.no","https://marcus.uib.no","i")) as ?homepage) .
      BIND(iri(REPLACE(str(?uri), "http://data.ub.uib.no/instance/event/","https://api-ub.vercel.app/v1/events/","i")) as ?apiuri) .
    } 
  }
`

const frame: any = {
  '@context': {
    id: '@id',
    type: '@type',
    value: '@value',
    none: '@none',
    Event: {
      '@id': 'http://purl.org/NET/c4dm/event.owl#Event'
    },
    spatial: {
      '@id': 'http://purl.org/dc/terms/spatial',
    },
    subject: {
      '@id': 'http://purl.org/dc/terms/subject',
    },
    title: {
      '@id': 'http://purl.org/dc/terms/title',
      '@container': '@language'
    },
    prefLabel: {
      '@id': 'http://www.w3.org/2004/02/skos/core#prefLabel',
      '@container': '@language'
    },
    inScheme: {
      '@id': 'http://www.w3.org/2004/02/skos/core#inScheme',
      '@type': '@id',
      '@container': '@set'
    },
    depicts: {
      '@id': 'http://xmlns.com/foaf/0.1/depicts',
    },
    name: {
      '@id': 'http://xmlns.com/foaf/0.1/name',
    },
    maker: {
      '@id': 'http://xmlns.com/foaf/0.1/maker',
    },
    homepage: {
      '@id': 'http://data.ub.uib.no/ontology/homepage',
      '@type': '@id',
      '@container': '@set'
    },
    image: {
      '@id': 'http://data.ub.uib.no/ontology/image',
    },
    beginOfTheBegin: {
      '@id': 'http://data.ub.uib.no/ontology/begin',
    },
    endOfTheEnd: {
      '@id': 'http://data.ub.uib.no/ontology/end',
    },
    label: {
      '@id': 'http://www.w3.org/2000/01/rdf-schema#label',
      '@container': '@language'
    },
    description: {
      '@id': 'http://purl.org/dc/terms/description',
    },
    created: {
      '@id': 'http://purl.org/dc/terms/created',
    },
    modified: {
      '@id': 'http://purl.org/dc/terms/modified',
    },
    page: {
      '@id': 'http://xmlns.com/foaf/0.1/page',
      '@type': '@id',
      '@container': '@set'
    },
    logo: {
      '@id': 'http://xmlns.com/foaf/0.1/logo',
    },
    identifier: {
      '@id': 'http://purl.org/dc/terms/identifier',
    },
    previousIdentifier: {
      '@id': 'http://data.ub.uib.no/ontology/previousIdentifier',
    },
    place: {
      '@id': 'http://purl.org/NET/c4dm/event.owl#place',
      '@type': '@id',
      '@container': '@set'
    },
    superEvent: {
      '@id': 'http://schema.org/superEvent',
      '@type': '@id',
      '@container': '@set'
    },
    subEvent: {
      '@id': 'http://schema.org/subEvent',
      '@type': '@id',
      '@container': '@set'
    },
    seeAlso: {
      '@id': 'http://www.w3.org/2000/01/rdf-schema#seeAlso',
      '@type': '@id',
    },
    dct: 'http://purl.org/dc/terms/',
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    ubbont: 'http://data.ub.uib.no/ontology/',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    dc: 'http://purl.org/dc/elements/1.1/',
    bibo: 'http://purl.org/ontology/bibo/',
    event: 'http://purl.org/NET/c4dm/event.owl#>',
    foaf: 'http://xmlns.com/foaf/0.1/',
    scehma: 'http://schema.org/'
  },
  '@type': 'Event',
  '@embed': '@never',
}

async function getObject(): Promise<any> {
  const results = await fetch(
    `${process.env.MARCUS_API}${encodeURIComponent(
      query,
    )}&output=json`,
  )
  return results
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
  } = req

  await runMiddleware(req, res, cors)

  switch (method) {
    case 'GET':

      const response = await getObject()

      // Deal with response
      if (response.status >= 200 && response.status <= 299) {
        const result = await response.json()
        //console.log(result)

        // Frame the result for nested json
        const awaitFramed = jsonld.frame(result, frame)
        const framed = await awaitFramed

        res.status(200).json(framed['@graph'])
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
