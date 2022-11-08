export default function getQuery(id: string): string {
  let query = `
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
      VALUES ?id {"${id}"}
      ?uri dct:identifier ?id ;
        ?p ?o .
      #FILTER(?p != event:product && ?p != ubbont:showWeb && ?p != ubbont:cataloguer && ?p != dc:relation && ?p != dct:relation && ?p != dct:hasPart)
      BIND(iri(REPLACE(str(?uri), "http://data.ub.uib.no","https://marcus.uib.no","i")) as ?homepage) .
      BIND(iri(REPLACE(str(?uri), "http://data.ub.uib.no/instance/event/","https://api-ub.vercel.app/v1/events/","i")) as ?apiuri) .
    } 
  }
  `
  return query
}
