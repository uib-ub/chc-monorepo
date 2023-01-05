import * as jsonld from 'jsonld'
import { Client } from '@elastic/elasticsearch'
import { API_URL } from '../../../../../../lib/constants'
const { Transport } = require('@elastic/transport')

// then create a class, that extends Transport class to modify the path
class MTransport extends Transport {
  request(params, options, callback) {
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

export default async function handler(req, res) {
  const {
    query: { esIndex, id },
    method,
  } = req


  switch (method) {
    case 'POST':
      if (req.query.token !== process.env.ES_INDEX_SECRET) {
        return res.status(401).send('You are not authorized!')
      }
      try {
        const url = `${API_URL}/items/${id}?as=rdf`
        const response = await fetch(url)

        // Deal with response
        if (response.status >= 200 && response.status <= 299) {
          let result = await response.json()

          // Frame response with label_no props instead of standard JSON-LD language objects
          const awaitFramed = jsonld.frame(result, {
            '@context': [`${API_URL}/ns/es/context.json`],
            '@type': 'HumanMadeObject',
            '@embed': '@always',
          })
          let framed = await awaitFramed
          framed.id = `${API_URL}/items/${framed.identifier}`

          // We assume none lang tags is no
          framed = JSON.parse(JSON.stringify(framed).replaceAll('_none":', '_no":'))
          if (framed.spatialHierarchy?.length >= 2) {
            framed.hierarchicalPlaces = {}
            framed.hierarchicalPlaces.lvl0 = framed.spatialHierarchy[0]
            framed.hierarchicalPlaces.lvl1 = `${framed.spatialHierarchy[0]} > ${framed.spatialHierarchy[1]}`
            framed.hierarchicalPlaces.lvl2 = `${framed.spatialHierarchy[0]} > ${framed.spatialHierarchy[1]} > ${framed.spatialHierarchy[2]}`
          }

          // Test if UNIX time will work better in ES
          if (framed.created) {
            framed.created = Math.floor(new Date(framed.created['@value']) / 1000)
          }
          //console.log('framed: ', framed)

          const esResponse = await client.index({ index: esIndex, id: framed.identifier, document: framed })
          res.status(200).json(framed)
        } else {
          console.log(response.status, response.statusText);
        }

      } catch (err) {
        (err) => { res.status(200).json({ message: err }) }
      } finally {
        res.status(400).json({ message: 'Wat' })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
