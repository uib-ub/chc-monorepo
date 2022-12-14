# Queries

## Prefixes

```sparql
PREFIX muna: <http://muna.xyz/model/0.1/>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX ecrm: <http://erlangen-crm.org/current/>
PREFIX ubbont: <http://data.ub.uib.no/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX bibo: <http://purl.org/ontology/bibo/>
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX geo-deling: <http://vocab.lenka.no/geo-deling#>
PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX dcmitype: <http://purl.org/dc/dcmitype/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#>
PREFIX geonames: <http://www.geonames.org/ontology#>
PREFIX exif: <http://www.w3.org/2003/12/exif/ns#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX bio: <http://purl.org/vocab/bio/0.1/>
PREFIX frbr: <http://vocab.org/frbr/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX ore: <http://www.openarchives.org/ore/terms/>
PREFIX nie: <http://www.semanticdesktop.org/ontologies/nie/#>
PREFIX locah: <http://data.archiveshub.ac.uk/def/>
PREFIX lexvo: <http://lexvo.org/ontology#>
PREFIX cc: <http://creativecommons.org/ns#>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX ecrm: <http://erlangen-crm.org/current/>
PREFIX ubbont: <http://data.ub.uib.no/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX bibo: <http://purl.org/ontology/bibo/>
PREFIX mo: <http://purl.org/ontology/mo/>
PREFIX geo-deling: <http://vocab.lenka.no/geo-deling#>
PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX dcmitype: <http://purl.org/dc/dcmitype/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#>
PREFIX geonames: <http://www.geonames.org/ontology#>
PREFIX exif: <http://www.w3.org/2003/12/exif/ns#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX org: <http://www.w3.org/ns/org#>
PREFIX bio: <http://purl.org/vocab/bio/0.1/>
PREFIX frbr: <http://vocab.org/frbr/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX ore: <http://www.openarchives.org/ore/terms/>
PREFIX nie: <http://www.semanticdesktop.org/ontologies/nie/#>
PREFIX locah: <http://data.archiveshub.ac.uk/def/>
PREFIX lexvo: <http://lexvo.org/ontology#>
PREFIX cc: <http://creativecommons.org/ns#>
PREFIX iiif_prezi: <http://iiif.io/api/presentation/3#>
```

## Queries
### Get all prop count on class

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#>
PREFIX ubbont: <http://data.ub.uib.no/ontology/>

SELECT ?predicate (COUNT(*)AS ?frequency)
WHERE {
  ?subject a event:Event ;
    ?predicate ?object .
}
GROUP BY ?predicate
ORDER BY DESC(?frequency)
```

### Get all classes, all used properties and a sample value

```sparql
SELECT DISTINCT ?type ?property (SAMPLE(?o) AS ?sample)
WHERE {
   ?s a ?type .
   ?s ?property ?o .
}
GROUP BY ?type ?property
ORDER BY ?type ?property
```

### Get same as above but as json objects

```sparql
CONSTRUCT {
?type ?property ?sample .
} 
WHERE {
SELECT DISTINCT ?type ?property (SAMPLE(?o) AS ?sample)
WHERE {
  #VALUES ?type {foaf:Person}
   ?s a ?type .
   ?s ?property ?o .
}
GROUP BY ?type ?property
ORDER BY ?type ?property
}
```

### Find all subjects with english language

```sparql
SELECT ?s WHERE {
	?s ?p ?localizedString .
  filter(lang(?localizedString) = 'en')
}
```

### Find all descriptions in no and en, plus internalNote for the J??rgen Grinde collection

```sparql
PREFIX ubbont: <http://data.ub.uib.no/ontology/>
PREFIX dct: <http://purl.org/dc/terms/>

SELECT ?uri ?id ?desc_no ?desc_en ?alt_text WHERE {
  values ?col {'ubb-jg-'}
	?s dct:identifier ?id ;
      dct:description ?desc .
  OPTIONAL{ ?s ubbont:internalNote ?alt } .
  filter(STRSTARTS (?id, ?col))
  bind(if(contains(?alt, "ALT"), ?alt, ?_ ) as ?alt_text)
  bind(if(langMatches(lang(?desc),"en"),?desc,?_) as ?desc_en)
  bind(if(langMatches(lang(?desc),""),?desc,?_) as ?desc_no)
  bind(uri(replace(str(?s), "data.ub", "marcus")) as ?uri)
}
```

### Count the content in all collections

```sparql
SELECT ?s (count(?part) as ?total) WHERE {
  values ?col {<http://purl.org/ontology/bibo/Collection>}
	?s a ?col ;
      dct:hasPart ?part .
  ?part dct:identifier ?partId .
}
group by ?s
order by desc(?total)
```

### Get the top level collections

```sparql
SELECT DISTINCT ?uri ?label ?description ?logo WHERE {
	GRAPH <urn:x-arq:UnionGraph>  {	
    ?uri a bibo:Collection .
    OPTIONAL { ?uri rdfs:label ?label . }
    OPTIONAL { ?uri dct:title ?label . }
    OPTIONAL { ?uri dct:description ?description . }
    OPTIONAL { ?uri foaf:logo ?logo . }
    FILTER NOT EXISTS { ?uri dct:isPartOf ?partOf . }
  }
}
ORDER BY ?label
```

### Create a search IIIF collection for ... collections

```
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
          { VALUES ?id { "ubb-kk-" }
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
              { VALUES ?id { "ubb-kk-" }
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
        OFFSET  0
        LIMIT   10
      }
  }
ORDER BY ?itemId
```

### Get the objects with the most props

```sparql
SELECT ?id (COUNT(?p) AS ?props)
WHERE {
  ?id rdf:type/(rdfs:subClassOf)* bibo:Document . ;
    ?p ?o .
}
GROUP BY ?id
ORDER BY DESC(?props)
```
