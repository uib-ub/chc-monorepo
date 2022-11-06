import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { RedocStandalone } from 'redoc';

/* const SwaggerUI = dynamic<{
  spec: any;
}>(
  import('swagger-ui-react'),
  { ssr: false });
 */

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
})

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div style={{ margin: '-8px' }}>
      <RedocStandalone
        spec={spec}
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: '#4b4b4b' } } },
          pathInMiddlePanel: true,
          showExtensions: true,
          disableSearch: true,
          hideHostname: true,
        }}
      />
    </div>
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
              "manifest"
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
                "description": "The ID of the Manifest to Retrieve",
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