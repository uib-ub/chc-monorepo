import { find } from 'lodash'

export default async function getFrame(data: any, id: string): Promise<any> {
  // Get object type before framing
  const frameBase = (data: any) => {
    let res = {}
    if (data['@graph']) {
      res = find(data['@graph'], function (o) {
        return o['identifier'] === id
      })
    } else {
      return data
    }
    return res
  }

  const frameType = frameBase(data)
  const type = frameType['@type']

  let frame: any = {
    '@context': {
      id: '@id',
      type: '@type',
      value: '@value',
      none: '@none',
      Event: {
        '@id': 'http://purl.org/NET/c4dm/event.owl#Event'
      },
      product: {
        '@id': 'http://purl.org/NET/c4dm/event.owl#product',
        '@type': '@id',
        '@container': '@set'
      },
      spatial: {
        '@id': 'http://purl.org/dc/terms/spatial',
        '@container': '@set'
      },
      subject: {
        '@id': 'http://purl.org/dc/terms/subject',
        '@container': '@set'
      },
      title: {
        '@id': 'http://purl.org/dc/terms/title',
        "@container": "@language"
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
      altLabel: {
        '@id': 'http://www.w3.org/2004/02/skos/core#altLabel',
        "@container": "@language"
      },
      depicts: {
        '@id': 'http://xmlns.com/foaf/0.1/depicts',
        '@container': '@set'
      },
      name: {
        '@id': 'http://xmlns.com/foaf/0.1/name',
      },
      maker: {
        '@id': 'http://xmlns.com/foaf/0.1/maker',
        '@container': '@set'
      },
      homepage: {
        '@id': 'http://data.ub.uib.no/ontology/homepage',
        '@type': '@id',
        '@container': '@set'
      },
      image: {
        '@id': 'http://data.ub.uib.no/ontology/image',
      },
      showWeb: {
        '@id': 'http://data.ub.uib.no/ontology/showWeb',
      },
      previousIdentifier: {
        '@id': 'http://data.ub.uib.no/ontology/previousIdentifier',
      },
      beginOfTheBegin: {
        '@id': 'http://data.ub.uib.no/ontology/begin',
      },
      endOfTheEnd: {
        '@id': 'http://data.ub.uib.no/ontology/end',
      },
      label: {
        '@id': 'http://www.w3.org/2000/01/rdf-schema#label',
        "@container": "@language"
      },
      description: {
        '@id': 'http://purl.org/dc/terms/description',
        "@container": "@language"
      },
      created: {
        '@id': 'http://purl.org/dc/terms/created',
      },
      identifier: {
        '@id': 'http://purl.org/dc/terms/identifier',
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
      seeAlso: {
        '@id': 'http://www.w3.org/2000/01/rdf-schema#seeAlso',
        '@type': '@id',
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
      sc: 'http://iiif.io/api/presentation/3#',
      oa: 'http://www.w3.org/ns/oa#',
      dct: 'http://purl.org/dc/terms/',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      ubbont: 'http://data.ub.uib.no/ontology/',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      dc: 'http://purl.org/dc/elements/1.1/',
      bibo: 'http://purl.org/ontology/bibo/',
      event: 'http://purl.org/NET/c4dm/event.owl#',
    },
    '@type': type,
    '@embed': '@always',
  }
  return frame
}

