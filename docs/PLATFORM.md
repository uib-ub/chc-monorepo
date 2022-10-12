# Platform

Vercel is the preferred deployment platform for `chc-monorepo` because of the CDN and serverless/edge functions. Data comes from Sanity.io and local UiB-UB datastores.

The diagram below shows some issues in the current deployment. Everything in this monorepo is written to be run in the cloud, but will use datasources that is not distributed.

```mermaid
C4Deployment
    title Deployment Diagram for UB exhibitions (hybrid CDN and central datastore)

    Deployment_Node(user_us, "User computer US"){
        Container(browser_us, "Browser")
        Rel(browser_us, us_app1, "calls")
    }
    Deployment_Node(user_eu, "User computer EU"){
        Container(browser_eu, "Browser")
        Rel(browser_eu, eu_app1, "calls")
    }
    Deployment_Node(user_asia, "User computer Asia"){
        Container(browser_asia, "Browser")
        Rel(browser_asia, asia_app1, "calls")
    }

    Deployment_Node(uib, "UiB", "NREC or VMWare"){
        Container(sparql, "UB Sparql endpoint", "Fuseki")
        Container(es, "UB ES cluster", "ElasticSearch")
    }

    Deployment_Node(us, "US CDN region"){
        Deployment_Node(cdn_us, "vercel-cdn-us", "CDN"){
            Container(us_app1, "Web Application", "Next.js", "SSG with SSR paths.")
            Container(us_api1, "Web API edge function 1", "Next.js", "Serverless edge functions with no cold star")
            Container(us_api2, "Web API edge function 2", "Next.js", "Serverless edge functions with no cold star")
            Container(us_api3, "Web API edge function 3", "Next.js", "Serverless edge functions with no cold star")
            Rel(us_app1, us_db1_sanity, "calls")
            Rel(us_api1, sparql, "calls")
            Rel(us_api2, sparql, "calls")
            Rel(us_api3, es, "calls")
        }
        
        Deployment_Node(cdn_us_sanity, "sanity-cdn-us", "CDN"){
            Container(us_db1_sanity, "Database", "Postgres", "Running in Google Cloud Platform")
        }
    }
    
    Deployment_Node(eu, "EU CDN region"){
        Deployment_Node(cdn_eu, "vercel-cdn-eu", "CDN"){
            Container(eu_app1, "Web Application", "Next.js", "SSG with SSR paths.")
            Container(eu_api1, "Web API edge function 1", "Next.js", "Serverless edge functions with no cold star")
            Container(eu_api2, "Web API edge function 2", "Next.js", "Serverless edge functions with no cold star")
            Container(eu_api3, "Web API edge function 3", "Next.js", "Serverless edge functions with no cold star")
            Rel(eu_app1, eu_db1_sanity, "calls")
            Rel(eu_api1, sparql, "calls")
            Rel(eu_api2, sparql, "calls")
            Rel(eu_api3, es, "calls")
        }

        Deployment_Node(cdn_eu_sanity, "sanity-cdn-eu", "CDN"){
            Container(eu_db1_sanity, "Database", "Postgres", "Running in Google Cloud Platform")
        }
    }

    Deployment_Node(asia, "Asia CDN region"){
        Deployment_Node(cdn_asia, "vercel-cdn-asia", "CDN"){
            Container(asia_app1, "Web Application", "Next.js", "SSG with SSR paths.")
            Container(asia_api1, "Web API edge function 1", "Next.js", "Serverless edge functions with no cold star")
            Container(asia_api2, "Web API edge function 2", "Next.js", "Serverless edge functions with no cold star")
            Container(asia_api3, "Web API edge function 3", "Next.js", "Serverless edge functions with no cold star")
            Rel(asia_app1, asia_db1_sanity, "calls")
            Rel(asia_api1, sparql, "calls")
            Rel(asia_api2, sparql, "calls")
            Rel(asia_api3, es, "calls")
        }

        Deployment_Node(cdn_asia_sanity, "sanity-cdn-asia", "CDN"){
            Container(asia_db1_sanity, "Database", "Postgres", "Running in Google Cloud Platform")
        }
    }
```