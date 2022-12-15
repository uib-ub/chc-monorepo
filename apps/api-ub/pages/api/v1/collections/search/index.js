import { sortBy } from 'lodash'
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

const labelSplitter = (label) => {
  const splitted = label.split('|')
  const data = splitted.map(l => {
    const langArr = l.split('@')
    return {
      [langArr[1] ? `@${langArr[1]}` : '@none']: [langArr[0].replaceAll("\"", "")]
    }
  })
  return data[0]
}

async function getData(url, id, page = 0) {
  if (!id) {
    throw Error
  }

  const offset = page <= 0 ? 0 : (page - 1) * 10

  const query = `
    ${SPARQL_PREFIXES}
    CONSTRUCT 
      { 
        ?uri iiif_prezi:summary ?count .
        ?item rdf:type ?itemType .
        ?item rdfs:label ?itemLabel .
        ?item dct:identifier ?itemId .
      }
    WHERE
      { 
        { SELECT ?uri (COUNT(?part) AS ?count)
            WHERE
              { VALUES ?id { "${id}" }
                ?uri  dct:identifier  ?id ;
                      dct:hasPart     ?part .
                ?part rdf:type/(rdfs:subClassOf)* bibo:Document .
              }
            GROUP BY ?uri
          }
        UNION
          { SELECT DISTINCT ?item ?itemId ?itemType ?itemLabel
            WHERE
              { SELECT DISTINCT  ?item ?itemId ?itemType 
                (GROUP_CONCAT( concat('"',?itemLabels,'"@',lang(?itemLabels)); separator="|" ) as ?itemLabel)
                WHERE
                  { VALUES ?id { "${id}" }
                    ?uri   dct:identifier  ?id .
                    ?item  dct:isPartOf    ?uri ;
                          rdf:type        ?itemType .
                    ?itemType (rdfs:subClassOf)* bibo:Document .
                    ?item  dct:identifier  ?itemId ;
                          dct:title       ?itemLabels .
                  }
                GROUP BY ?item ?itemType ?itemId ?itemLabel
                ORDER BY ?itemId
              }
            OFFSET  ${offset}
            LIMIT   10
          }
      }
    ORDER BY ?itemId
  `

  const results = await fetch(
    `${url}${encodeURIComponent(
      query,
    )}&output=json`,
  )
  return results
}

const getItems = (items) => {
  const data = items.map(item => {
    return {
      "id": item['@type'] == 'bibo:Collection' ?
        `${getBaseUrl()}/collections/search?id=${item.identifier}` :
        `${getBaseUrl()}/items/${item.identifier}/manifest`,
      "type": item['@type'] == 'bibo:Collection' ? "Collection" : "Manifest",
      "label": labelSplitter(item.label),
      "homepage": [
        {
          "id": item['@id'].replace("http://data.ub", "https://marcus"),
          "type": "Text",
          "label": labelSplitter(item.label)
        }
      ]
    }
  })
  return data

}
const getPages = (id, total) => {
  const count = Math.ceil(total / 10) - 1;
  const pages = Array.from(Array(count).keys());

  const data = pages.map((index) => {
    return {
      id: `${getBaseUrl()}/collections/search?id=${id}&page=${index + 1}`,
      type: "Collection",
      label: {
        no: [
          `Side ${index + 1} (${count} totalt)`
        ]
      }
    };
  });

  return data

}

export default async function handler(req, res) {
  const {
    query: { id, page },
    method,
  } = req

  await runMiddleware(req, res, cors)

  if (page && page < 0) {
    return res.status(400).json({ message: 'Page parameter must be a positive number.' })
  }

  switch (method) {
    case 'GET':

      // Find the service that contains data on this item
      const checkedServices = await fetch(`${API_URL}/resolver/${id}`).then(res => res.json())
      const url = await checkedServices.url
      // No URL means no service found, but this is horrible error handeling
      if (!url) res.status(404).json({ message: 'ID not found' })

      const response = await getData(url, id, page)

      // Deal with response
      if (response.status >= 200 && response.status <= 299) {
        const result = await response.json()
        //res.status(200).json(result)

        // Change id as this did not work in the query
        //framed.id = `${getBaseUrl()}/items/${framed.identifier}`
        // We assume all @none language tags are really norwegian

        const count = result['@graph'].filter(o => o['sc:summary'])[0]['sc:summary']
        const filteredItems = result['@graph'].filter(o => !o['sc:summary'])
        const sortedItems = sortBy(filteredItems, ["identifier"])
        const items = page ?
          getItems(sortedItems) :
          getPages(id, count)


        let collection = {
          "@context": "https://iiif.io/api/presentation/3/context.json",
          "id": `${getBaseUrl()}/collections/search?id=${id}${page ? `&page=${page}` : ''}`,
          "type": "Collection",
          "label": {
            "no": [
              `${page ? `Side ${page} (${Math.ceil(count / 10) - 1} totalt)` : 'All results'}`
            ]
          },
          "summary": {
            "no": [
              `${count} resultat`
            ]
          },
          "items": items,
          "partOf": [
            {
              "id": `${getBaseUrl()}/collections/search?id=${id}`,
              "type": "Collection"
            }
          ]
        }
        collection = JSON.parse(JSON.stringify(collection).replaceAll('"@none":', '"no":'))

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
