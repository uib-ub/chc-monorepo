import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import Link from 'next/link';
import { RedocStandalone } from 'redoc';
import { AppShell, HeaderShell } from 'ui';

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AppShell>
        <div className='w-full flex gap-5 px-3 pt-3 pb-2 border-b items-center fixed z-50 bg-white'>
          <HeaderShell>
            <Link href="/">
              University of Bergen Library API
            </Link>
          </HeaderShell>

          <div className='grow'>&nbsp;</div>
          <Link href={`/spec`}>
            OpenAPI Spec
          </Link>
        </div>

        <RedocStandalone
          spec={spec}
          options={{
            nativeScrollbars: true,
            theme: { colors: { primary: { main: '#4b4b4b' } } },
            pathInMiddlePanel: true,
            showExtensions: true,
            showObjectSchemaExamples: true,
            scrollYOffset: 45,
            /* disableSearch: true,
            hideHostname: true, */
          }}
        />
      </AppShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'University of Bergen Library - Cultural heritage collections API',
        version: '1.0',
        contact: {
          name: "API Support",
          url: "http://www.example.com/support",
          email: "support@example.com"
        },
      },
      externalDocs: {
        "description": "Find more info here",
        "url": "https://api-ub.vercel.app"
      },
      servers: [
        {
          url: "https://api-ub.vercel.app/v1",
          description: "Production server"
        }
      ],
      paths: {
        "/items/{manifest_id}": {
          "get": {
            "tags": [
              "items"
            ],
            "summary": "A single object by the given identifier. {id} is the identifier from our collections management system.",
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "manifest_id",
                "in": "path",
                "required": true,
                "description": "The ID of the item to retrieve",
                "schema": {
                  "type": "string",
                  /* "format": "uuid" */
                },
                "example": "ubb-ms-0003"
              }
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/HumanMadeObjectSuccess"
              },
              "404": {
                "$ref": "#/components/responses/NotFound"
              }
            },
          }
        },
        "/items/{manifest_id}/manifest": {
          "get": {
            "tags": [
              "items"
            ],
            "summary": "A single object IIIF manifest by the given identifier. {id} is the identifier from our collections management system.",
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "manifest_id",
                "in": "path",
                "required": true,
                "description": "The ID of the manifest to retrieve",
                "schema": {
                  "type": "string",
                  /* "format": "uuid" */
                },
                "example": "ubb-ms-0003"
              }
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/ManifestSuccess"
              },
              "404": {
                "$ref": "#/components/responses/NotFound"
              }
            },
          }
        }
      },
      "components": {
        "schemas": {
          "Full": {
            "type": "string",
            "enum": [
              "full"
            ]
          },
          "Arr": {
            "type": "array",
            "items": {
              "type": "integer"
            }
          },
          "Image3Context": {
            "type": "string",
            "enum": [
              "http://iiif.io/api/image/3/context.json"
            ]
          },
          "Prezi3Context": {
            "type": "array",
            "enum": [
              [
                "http://www.w3.org/ns/anno.jsonld",
                "http://iiif.io/api/presentation/3/context.json"
              ]
            ]
          },
          "ManifestV3": {
            "type": "object",
            "properties": {
              "@context": {
                "$ref": "#/components/schemas/Prezi3Context"
              },
              "id": {
                "type": "string",
                "description": "The full Manifest URI",
                "example": "https://api-ub.vercel.app/items/ubb-ms-0008"
              },
              "type": {
                "type": "string",
                "enum": [
                  "Manifest"
                ]
              }
            }
          },
          "CanvasV3": {
            "type": "object",
            "properties": {
              "@context": {
                "$ref": "#/components/schemas/Prezi3Context"
              },
              "id": {
                "type": "string"
              },
              "type": {
                "type": "string",
                "enum": [
                  "Canvas"
                ]
              }
            }
          },
          "CollectionV3": {
            "type": "object",
            "properties": {
              "@context": {
                "$ref": "#/components/schemas/Prezi3Context"
              },
              "id": {
                "type": "string",
                "description": "The Collection URI"
              },
              "type": {
                "type": "string",
                "enum": [
                  "Collection"
                ]
              }
            }
          },
          "ImageV3": {
            "type": "object",
            "properties": {
              "@context": {
                "$ref": "#/components/schemas/Image3Context"
              },
              "@id": {
                "type": "string",
                "description": "The Image URI"
              },
              "@type": {
                "type": "string",
                "enum": [
                  "sc:Image"
                ]
              }
            }
          },
          "HumanMadeObject": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/manuscript/ubb-ms-0003"
              },
              "type": {
                "type": "string",
                "example": "bibo:Manuscript"
              },
              "homepage": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": "http://marcus.uib.no/instance/manuscript/ubb-ms-0003"
                  }
                }
              },
              "image": {
                "type": "string",
                "example": "https://data.ub.uib.no/files/manlib/ubb/ubb-ms/ubb-ms-0003/jpg/ubb-ms-0003_p0001_md.jpg"
              },
              "madeAfter": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "http://www.w3.org/2001/XMLSchema#date"
                  },
                  "value": {
                    "type": "string",
                    "example": "1400-01-01"
                  }
                }
              },
              "madeBefore": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "http://www.w3.org/2001/XMLSchema#date"
                  },
                  "value": {
                    "type": "string",
                    "example": "1500-01-01"
                  }
                }
              },
              "description": {
                "type": "string",
                "example": "Kopi av Langes avskrift. Tilhørt W. F. K. Christie."
              },
              "identifier": {
                "type": "string",
                "example": "ubb-ms-0003"
              },
              "subject": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "http://data.ub.uib.no/topic/6e7b6583-6a5b-498b-893c-2d239333b96d"
                    },
                    "type": {
                      "type": "string",
                      "example": "http://www.w3.org/2004/02/skos/core#Concept"
                    },
                    "identifier": {
                      "type": "string",
                      "example": "6e7b6583-6a5b-498b-893c-2d239333b96d"
                    },
                    "prefLabel": {
                      "type": "string",
                      "example": "Jordebøker"
                    }
                  }
                }
              },
              "title": {
                "type": "string",
                "example": "Jardarskrá stadarins at Munklifi"
              }
            }
          }
        },
        "responses": {
          "ManifestSuccess": {
            "description": "Request for a Manifest was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/ManifestV3"
                }
              },
              "application/ld+json;profile=http://iiif.io/api/presentation/3/context.json": {
                "schema": {
                  "$ref": "#/components/schemas/ManifestV3"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ManifestV3"
                }
              }
            }
          },
          "HumanMadeObjectSuccess": {
            "description": "Request for a Manifest was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/HumanMadeObject"
                }
              },
            }
          },
          "NotFound": {
            "description": "Requested ID was not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
        },
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;