import Cors from 'cors'
import * as jsonld from 'jsonld'
import { omit, sortBy } from 'lodash'
import { constructManifest } from '../../../../../lib/response/iiif/constructManifest'
import { API_URL, getBaseUrl, SPARQL_PREFIXES } from '../../../../../lib/constants'

const manifestFrame = {
  "@context": {
    "id": "@id",
    "type": "@type",
    "value": "@value",
    "body": {
      "@id": "http://www.w3.org/ns/oa#body",
    },
    "Annotation": {
      "@id": "http://www.w3.org/ns/oa#Annotation",
      "@type": "@id"
    },
    "items": {
      "@id": "http://iiif.io/api/presentation/3#items",
      "@type": "@id"
    },
    "homepage": {
      "@id": "http://iiif.io/api/presentation/3#homepage",
      "@type": "@id"
    },
    "seeAlso": {
      "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
      "@type": "@id"
    },
    "Manifest": {
      "@id": "http://iiif.io/api/presentation/3#Manifest",
      "@type": "@id"
    },
    "Range": {
      "@id": "http://iiif.io/api/presentation/3#Range",
      "@type": "@id"
    },
    "Canvas": {
      "@id": "http://iiif.io/api/presentation/3#Canvas",
      "@type": "@id"
    },
    "structures": {
      "@id": "http://iiif.io/api/presentation/3#structures",
      "@type": "@id"
    },
    "thumbnail": {
      "@id": "http://iiif.io/api/presentation/3#thumbnail",
    },
    "description": {
      "@id": "http://purl.org/dc/elements/1.1/description",
      "@container": "@language"
    },
    "identifier": {
      "@id": "http://purl.org/dc/terms/identifier"
    },
    "label": {
      "@id": "rdfs:label",
      "@container": [
        "@language",
        "@set"
      ],
    },
    "value": {
      "@id": "rdf:value",
      "@container": [
        "@language",
        "@set"
      ],
    },
    "metadata": {
      "@type": "@id",
      "@id": "sc:metadataEntries",
      "@container": "@list"
    },
    "summary": {
      "@id": "as:summary",
      "@container": [
        "@language",
        "@set"
      ],
    },
    "sc": "http://iiif.io/api/presentation/3#",
    "oa": "http://www.w3.org/ns/oa#",
    "dct": "http://purl.org/dc/terms/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "ubbont": "http://data.ub.uib.no/ontology/",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "dc": "http://purl.org/dc/elements/1.1/",
    "as": "http://www.w3.org/ns/activitystreams#",
  }
}

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

async function getObject(api, id) {
  if (!id) return error

  const query = `
    ${SPARQL_PREFIXES}
    CONSTRUCT { 
      ?manifestURL rdf:type sc:Manifest .
      ?manifestURL dct:identifier ?id .
      ?manifestURL rdfs:label ?title .
      ?manifestURL rdfs:seeAlso ?s .
      ?manifestURL sc:homepage ?homepage .
      ?manifestURL dc:description ?desc .
      ?manifestURL sc:thumbnail ?thumb .
      ?manifestURL sc:items ?part .
      ?manifestURL sc:items ?singleCanvas .
      ?manifestURL sc:structures ?rangeURL .
      ?rangeURL rdf:type sc:Range .
      ?rangeURL sc:items ?part .
      ?rangeURL sc:items ?singleCanvas .
      ?part rdf:type sc:Canvas .
      ?part rdfs:label ?seq .
      ?part sc:thumbnail ?canvasThumb .
      ?part sc:items ?resource .
      ?resource rdf:type oa:Annotation .
      ?resource ubbont:hasXLView ?partXL ;
        ubbont:hasMDView ?partMD ; 
        ubbont:hasSMView ?partSM .
      ?singleCanvas rdf:type sc:Canvas .
      ?singleCanvas rdfs:label 1 .
      ?singleCanvas sc:thumbnail ?singleCanvasThumb .
      ?singleCanvas sc:items ?singlePart .
      ?singlePart rdf:type oa:Annotation ;
        ubbont:hasXLView ?singleXL ;
        ubbont:hasMDView ?singleMD ; 
        ubbont:hasSMView ?singleSM .
    }
    WHERE { 
      GRAPH ?g { 
        VALUES ?id { "${id}" }
        ?s dct:identifier ?id ;
          ubbont:hasRepresentation ?repr ;
          dct:title ?title ;
          ubbont:hasThumbnail ?thumb .
        OPTIONAL { ?s  dct:description  ?desc }
        OPTIONAL { 
          ?repr dct:hasPart ?singlePart ;
            rdfs:label ?partLabel .
          ?singlePart  ubbont:hasXSView  ?singleCanvasThumb ;
            ubbont:hasMDView ?singleMD .
          OPTIONAL { ?singlePart ubbont:hasXLView ?singleXL . }
          OPTIONAL { ?singlePart ubbont:hasSMView ?singleSM . }
        }
        OPTIONAL { 
          ?repr dct:hasPart ?part ;
            rdfs:label ?partLabel .
          ?part ubbont:hasResource ?resource ;
            ubbont:sequenceNr ?seq .
          ?resource ubbont:hasXSView ?canvasThumb ;
            ubbont:hasMDView ?partMD . 
            OPTIONAL { ?resource ubbont:hasXLView ?partXL . }
            OPTIONAL { ?resource ubbont:hasSMView ?partSM . }
        }
        BIND(iri(concat("${getBaseUrl()}", "/items/", ?id, "/manifest")) AS ?manifestURL)
        BIND(iri(concat("http://data.ub.uib.no/instance/manuscript/", ?id, "/manifest/range/1")) AS ?rangeURL)
        BIND(iri(concat("http://data.ub.uib.no/instance/page/", ?id, "_p1")) AS ?singleCanvas)
        BIND(iri(replace(str(?s), "data.ub.uib.no", "marcus.uib.no", "i")) AS ?homepage)
      }
    }
    ORDER BY ?s ?repr ?part ?resource
  `

  const result = await fetch(
    `${api}${encodeURIComponent(
      query,
    )}&output=json`)

  return result
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
      const checkedServices = await fetch(`${API_URL}/resolver/${id}?v=1`).then(res => res.json())
      const url = await checkedServices.url

      // No URL means no service found, but this is horrible error handeling
      if (!url) return res.status(404).json(checkedServices)

      // Get the RDF for this tiem
      const response = await getObject(url, id)

      if (response.status >= 200 && response.status <= 299) {
        const results = await response.json();

        // Frame the result for nested json
        const awaitFramed = jsonld.frame(results, {
          '@context': manifestFrame,
          '@type': 'Manifest'
        });
        let framed = await awaitFramed

        // Remove json-ld context 
        framed = omit(framed, ["@context"])

        if (Object.keys(framed).length === 0) {
          return res.status(404).json({ message: 'Not found' })
        }

        // When madeObject is a single page we convert items and structures.items to an array of one
        if (Array.isArray(framed.items) == false) {
          framed.items = [framed.items]
        }
        if (Array.isArray(framed.structures.items) == false) {
          framed.structures.items = [framed.structures.items]
        }

        // Sort nested arrays before we send the objects to be manifestified
        framed.items = sortBy(framed.items, o => o.label['@none'][0])
        framed.structures.items = sortBy(framed.structures.items, i => parseInt(i.split("_p")[1]))
        // We assume all @none language tags are really norwegian
        framed = JSON.parse(JSON.stringify(framed).replaceAll('"@none":', '"no":'))

        // Create the manifest
        const constructedManifest = await constructManifest(framed, url)
        const manifest = await constructedManifest

        res.status(200).json(manifest)
      }
      if (response.status == 503) {
        res.status(503).json({ message: "Service is unavailable" })
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
