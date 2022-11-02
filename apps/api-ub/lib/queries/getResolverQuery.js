export const getResolverQuery = (id) => {
  const query = `
    PREFIX  dct:  <http://purl.org/dc/terms/>
  
    ASK
      { GRAPH ?g
        { 
          VALUES ?id { "${id}" }
          ?s  dct:identifier ?id .
        }
      }
  `

  return query
} 