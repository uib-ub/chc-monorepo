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
          <Link href='https://github.com/uib-ub/chc-monorepo' target='_blank' rel='noreferrer'>
            <svg width="24" height="24" fill="currentColor" viewBox="3 3 18 18"><title>GitHub</title><path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path></svg>
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