# Queries

## Get all prop count on class

```sparql
PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX event: <http://purl.org/NET/c4dm/event.owl#>
prefix ubbont: <http://data.ub.uib.no/ontology/>

SELECT ?predicate (COUNT(*)AS ?frequency)
WHERE {
  ?subject a event:Event ;
    ?predicate ?object .
}
GROUP BY ?predicate
ORDER BY DESC(?frequency)
```

## Get all classes, all used properties and a sample value

```sparql
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