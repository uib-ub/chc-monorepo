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