import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import Link from 'next/link';
import { RedocStandalone } from 'redoc';
import { AppShell, HeaderShell } from 'ui';

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AppShell>
        <div className='w-full flex gap-5 px-3 pt-3 pb-2 border-b items-center fixed z-50 bg-white backdrop-blur-xl'>
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
            /* "tags": [
              "items"
            ], */
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
            /* "tags": [
              "items"
            ], */
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
        },
        "/events": {
          "get": {
            /* "tags": [
              "events"
            ], */
            "summary": "A list of all events",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/EventsSuccess"
              },
              "404": {
                "$ref": "#/components/responses/NotFound"
              }
            },
          }
        },
        "/events/{event_id}": {
          "get": {
            /* "tags": [
              "events"
            ], */
            "summary": "A single event.",
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "event_id",
                "in": "path",
                "required": true,
                "description": "The ID of the event to retrieve",
                "schema": {
                  "type": "string",
                  /* "format": "uuid" */
                },
                "example": "132b08be5e363b9a3e9e5eec79bd0ad72c345af2"
              }
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/EventSuccess"
              },
              "404": {
                "$ref": "#/components/responses/NotFound"
              }
            },
          }
        },
        "/actors": {
          "get": {
            /* "tags": [
              "actors"
            ], */
            "summary": "A list of \"all\" actors (LIMIT 1000)",
            "produces": [
              "application/json"
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/ActorsSuccess"
              },
              "404": {
                "$ref": "#/components/responses/NotFound"
              }
            },
          }
        },
        "/actors/{actor_id}": {
          "get": {
            /* "tags": [
              "actors"
            ], */
            "summary": "A single actor.",
            "produces": [
              "application/json"
            ],
            "parameters": [
              {
                "name": "actor_id",
                "in": "path",
                "required": true,
                "description": "The ID of the actor to retrieve",
                "schema": {
                  "type": "string",
                  /* "format": "uuid" */
                },
                "example": "132b08be5e363b9a3e9e5eec79bd0ad72c345af2"
              }
            ],
            "responses": {
              "200": {
                "$ref": "#/components/responses/ActorSuccess"
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
                "type": "string",
                "example": "http://iiif.io/api/presentation/3/context.json"
              },
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/items/ubb-ms-0003/manifest"
              },
              "type": {
                "type": "string",
                "example": "Manifest"
              },
              "label": {
                "type": "object",
                "properties": {
                  "@none": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "Jardarskrá stadarins at Munklifi"
                    }
                  }
                }
              },
              "summary": {
                "type": "object",
                "properties": {
                  "@none": {
                    "type": "string",
                    "example": "Kopi av Langes avskrift. Tilhørt W. F. K. Christie."
                  }
                }
              },
              "thumbnail": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "example": "Image"
                    },
                    "format": {
                      "type": "string",
                      "example": "image/jpeg"
                    }
                  }
                }
              },
              "viewingDirection": {
                "type": "string",
                "example": "left-to-right"
              },
              "behavior": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "paged"
                }
              },
              "homepage": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "http://marcus.uib.no/instance/manuscript/ubb-ms-0003"
                    },
                    "type": {
                      "type": "string",
                      "example": "Text"
                    },
                    "label": {
                      "type": "object",
                      "properties": {
                        "no": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Hjemmeside til objektet"
                          }
                        },
                        "en": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Homepage for the object"
                          }
                        }
                      }
                    },
                    "format": {
                      "type": "string",
                      "example": "text/html"
                    }
                  }
                }
              },
              "seeAlso": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "http://sparql.ub.uib.no/sparql/query?query=describe<http://data.ub.uib.no/instance/manuscript/ubb-ms-0003>"
                    },
                    "type": {
                      "type": "string",
                      "example": "Dataset"
                    },
                    "label": {
                      "type": "object",
                      "properties": {
                        "en": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Object Description in RDF"
                          }
                        },
                        "no": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Objekt beskrivelse i RDF"
                          }
                        }
                      }
                    },
                    "format": {
                      "type": "string",
                      "example": "application/rdf+xml"
                    }
                  }
                }
              },
              "provider": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "https://www.uib.no/ub"
                    },
                    "type": {
                      "type": "string",
                      "example": "Agent"
                    },
                    "label": {
                      "type": "object",
                      "properties": {
                        "no": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Universitetsbiblioteket i Bergen"
                          }
                        },
                        "en": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "University of Bergen Library"
                          }
                        }
                      }
                    },
                    "homepage": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "https://www.uib.no/ub"
                          },
                          "type": {
                            "type": "string",
                            "example": "Text"
                          },
                          "label": {
                            "type": "object",
                            "properties": {
                              "no": {
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "example": "Universitetsbiblioteket i Bergen hjemmeside"
                                }
                              },
                              "en": {
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "example": "University of Bergen Library Homepage"
                                }
                              }
                            }
                          },
                          "format": {
                            "type": "string",
                            "example": "text/html"
                          }
                        }
                      }
                    },
                    "logo": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "https://marcus-manifest-api.vercel.app/uib-logo.png"
                          },
                          "type": {
                            "type": "string",
                            "example": "Image"
                          },
                          "format": {
                            "type": "string",
                            "example": "image/png"
                          },
                          "width": {
                            "type": "integer",
                            "format": "int32",
                            "example": "200"
                          },
                          "height": {
                            "type": "integer",
                            "format": "int32",
                            "example": "200"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "rights": {
                "type": "string",
                "example": "http://creativecommons.org/licenses/by/4.0/"
              },
              "requiredStatement": {
                "type": "object",
                "properties": {
                  "label": {
                    "type": "object",
                    "properties": {
                      "no": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "Kreditering"
                        }
                      },
                      "en": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "Attribution"
                        }
                      }
                    }
                  },
                  "value": {
                    "type": "object",
                    "properties": {
                      "no": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "Tilgjengeliggjort av Universitetsbiblioteket i Bergen"
                        }
                      },
                      "en": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "Provided by University of Bergen Library"
                        }
                      }
                    }
                  }
                }
              },
              "items": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "http://data.ub.uib.no/instance/page/ubb-ms-0003_p1"
                    },
                    "type": {
                      "type": "string",
                      "example": "Canvas"
                    },
                    "label": {
                      "type": "object",
                      "properties": {
                        "@none": {
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "format": "int32",
                            "example": "1"
                          }
                        }
                      }
                    },
                    "width": {
                      "type": "integer",
                      "format": "int32",
                      "example": "1024"
                    },
                    "height": {
                      "type": "integer",
                      "format": "int32",
                      "example": "1024"
                    },
                    "thumbnail": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "https://data.ub.uib.no/files/manlib/ubb/ubb-ms/ubb-ms-0003/jpg/ubb-ms-0003_p0001_xs.jpg"
                          },
                          "type": {
                            "type": "string",
                            "example": "Image"
                          },
                          "width": {
                            "type": "integer",
                            "format": "int32",
                            "example": "200"
                          },
                          "height": {
                            "type": "integer",
                            "format": "int32",
                            "example": "200"
                          }
                        }
                      }
                    },
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "http://data.ub.uib.no/instance/digitalresource/ubb-ms-0003_p1"
                          },
                          "type": {
                            "type": "string",
                            "example": "AnnotationPage"
                          },
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "example": "http://data.ub.uib.no/instance/page/ubb-ms-0003_p1/annotation/1"
                                },
                                "type": {
                                  "type": "string",
                                  "example": "Annotation"
                                },
                                "motivation": {
                                  "type": "string",
                                  "example": "painting"
                                },
                                "target": {
                                  "type": "string",
                                  "example": "http://data.ub.uib.no/instance/page/ubb-ms-0003_p1"
                                },
                                "body": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "example": "https://data.ub.uib.no/files/manlib/ubb/ubb-ms/ubb-ms-0003/jpg/ubb-ms-0003_p0001_md.jpg"
                                    },
                                    "type": {
                                      "type": "string",
                                      "example": "Image"
                                    },
                                    "format": {
                                      "type": "string",
                                      "example": "image/jpeg"
                                    },
                                    "width": {
                                      "type": "integer",
                                      "format": "int32",
                                      "example": "1024"
                                    },
                                    "height": {
                                      "type": "integer",
                                      "format": "int32",
                                      "example": "1024"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "structures": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "http://data.ub.uib.no/instance/manuscript/ubb-ms-0003/manifest/range/1"
                    },
                    "type": {
                      "type": "string",
                      "example": "Range"
                    },
                    "label": {
                      "type": "object",
                      "properties": {
                        "no": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Standard innholdsfortegnelse"
                          }
                        },
                        "en": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Default"
                          }
                        }
                      }
                    },
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "http://data.ub.uib.no/instance/page/ubb-ms-0003_p1"
                          },
                          "type": {
                            "type": "string",
                            "example": "Canvas"
                          }
                        }
                      }
                    }
                  }
                }
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
              "@context": {
                "type": "string",
                "example": "https://api-ub.vercel.app/ns/ubbont/context.json"
              },
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/items/ubb-ms-0003"
              },
              "type": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "Manuscript"
                }
              },
              "cataloguer": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/cataloguer/00bba5ee-2606-44a0-aadf-74ecc3e33409"
              },
              "hasRepresentation": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/aggregation/ubb-ms-0003"
              },
              "ubbont:hasThumbnail": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:anyuri"
                  },
                  "value": {
                    "type": "string",
                    "example": "https://data.ub.uib.no/files/manlib/ubb/ubb-ms/ubb-ms-0003/jpg/ubb-ms-0003_p0001_th.jpg"
                  }
                }
              },
              "madeAfter": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
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
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "example": "1500-01-01"
                  }
                }
              },
              "originPlace": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/spatialthing/76c5aade-0809-46c9-93fe-41cdbc3892b6"
                }
              },
              "ubbont:physicalDescription": {
                "type": "string",
                "example": "Fol. 20 blader. H."
              },
              "ubbont:showWeb": {
                "type": "boolean"
              },
              "available": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "2016-09-05"
                  }
                }
              },
              "description": {
                "type": "object",
                "properties": {
                  "none": {
                    "type": "string",
                    "example": "Kopi av Langes avskrift. Tilhørt W. F. K. Christie."
                  }
                }
              },
              "dct:identifier": {
                "type": "string",
                "example": "ubb-ms-0003"
              },
              "isPartOf": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/collection/manuskriptsamlingen"
              },
              "relation": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/spatialthing/76c5aade-0809-46c9-93fe-41cdbc3892b6"
                }
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
                      "example": "Concept"
                    },
                    "dct:identifier": {
                      "type": "string",
                      "example": "6e7b6583-6a5b-498b-893c-2d239333b96d"
                    },
                    "prefLabel": {
                      "type": "object",
                      "properties": {
                        "none": {
                          "type": "string",
                          "example": "Jordebøker"
                        }
                      }
                    }
                  }
                }
              },
              "title": {
                "type": "object",
                "properties": {
                  "none": {
                    "type": "string",
                    "example": "Jardarskrá stadarins at Munklifi"
                  }
                }
              },
              "bibo:pages": {
                "type": "integer",
                "format": "int32",
                "example": "43"
              },
              "timespan": {
                "type": "object",
                "properties": {
                  "edtf": {
                    "type": "string",
                    "example": "1400-01-01/1500-01-01"
                  },
                  "beginOfTheBegin": {
                    "type": "string",
                    "example": "1400-01-01T00:00:00.000Z"
                  },
                  "endOfTheBegin": {
                    "type": "string",
                    "example": "1400-01-02T00:00:00.000Z"
                  },
                  "beginOfTheEnd": {
                    "type": "string",
                    "example": "1500-01-01T00:00:00.000Z"
                  },
                  "endOfTheEnd": {
                    "type": "string",
                    "example": "1500-01-02T00:00:00.000Z"
                  }
                }
              }
            },
            "Events": {
              "@graph": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "@id": {
                      "type": "string",
                      "example": "http://data.ub.uib.no/instance/event/032d1396b83bd33053ef6f7adfd4e79fb4833336"
                    },
                    "@type": {
                      "type": "string",
                      "example": "event:Event"
                    },
                    "begin": {
                      "type": "string",
                      "format": "date",
                      "example": "1901-05-17"
                    },
                    "end": {
                      "type": "string",
                      "format": "date",
                      "example": "1901-05-17"
                    },
                    "previousIdentifier": {
                      "type": "string",
                      "example": "EM_Teller:2685"
                    },
                    "identifier": {
                      "type": "string",
                      "example": "032d1396b83bd33053ef6f7adfd4e79fb4833336"
                    },
                    "prefLabel": {
                      "type": "string",
                      "example": "1901 Avdukingen av Ole Bull-statuen 17. mai"
                    },
                    "homepage": {
                      "type": "string",
                      "example": "https://marcus.uib.no/instance/event/032d1396b83bd33053ef6f7adfd4e79fb4833336"
                    }
                  }
                }
              },
              "@context": {
                "type": "object",
                "properties": {
                  "end": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://data.ub.uib.no/ontology/end"
                      },
                      "@type": {
                        "type": "string",
                        "example": "http://www.w3.org/2001/XMLSchema#date"
                      }
                    }
                  },
                  "begin": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://data.ub.uib.no/ontology/begin"
                      },
                      "@type": {
                        "type": "string",
                        "example": "http://www.w3.org/2001/XMLSchema#date"
                      }
                    }
                  },
                  "previousIdentifier": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://data.ub.uib.no/ontology/previousIdentifier"
                      }
                    }
                  },
                  "prefLabel": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://www.w3.org/2004/02/skos/core#prefLabel"
                      }
                    }
                  },
                  "homepage": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://xmlns.com/foaf/0.1/homepage"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "identifier": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/dc/terms/identifier"
                      }
                    }
                  },
                  "place": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/NET/c4dm/event.owl#place"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "inScheme": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://www.w3.org/2004/02/skos/core#inScheme"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "page": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://xmlns.com/foaf/0.1/page"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "modified": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/dc/terms/modified"
                      },
                      "@type": {
                        "type": "string",
                        "example": "http://www.w3.org/2001/XMLSchema#dateTime"
                      }
                    }
                  },
                  "description": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/dc/terms/description"
                      }
                    }
                  },
                  "relation": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/dc/terms/relation"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "logo": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://xmlns.com/foaf/0.1/logo"
                      }
                    }
                  },
                  "superEvent": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://schema.org/superEvent"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "subEvent": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://schema.org/subEvent"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "hasPart": {
                    "type": "object",
                    "properties": {
                      "@id": {
                        "type": "string",
                        "example": "http://purl.org/dc/terms/hasPart"
                      },
                      "@type": {
                        "type": "string",
                        "example": "@id"
                      }
                    }
                  },
                  "wgs": {
                    "type": "string",
                    "example": "http://www.w3.org/2003/01/geo/wgs84_pos#"
                  },
                  "skos": {
                    "type": "string",
                    "example": "http://www.w3.org/2004/02/skos/core#"
                  },
                  "rdfs": {
                    "type": "string",
                    "example": "http://www.w3.org/2000/01/rdf-schema#"
                  },
                  "dct": {
                    "type": "string",
                    "example": "http://purl.org/dc/terms/"
                  },
                  "rdf": {
                    "type": "string",
                    "example": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  },
                  "ubbont": {
                    "type": "string",
                    "example": "http://data.ub.uib.no/ontology/"
                  },
                  "bibo": {
                    "type": "string",
                    "example": "http://purl.org/ontology/bibo/"
                  },
                  "event": {
                    "type": "string",
                    "example": "http://purl.org/NET/c4dm/event.owl#"
                  },
                  "foaf": {
                    "type": "string",
                    "example": "http://xmlns.com/foaf/0.1/"
                  },
                  "dc": {
                    "type": "string",
                    "example": "http://purl.org/dc/elements/1.1/"
                  }
                }
              }
            }
          },
          "Events": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/v1/events/352916f6-2db5-4995-bbf8-c5689716051a"
              },
              "type": {
                "type": "string",
                "example": "Event"
              },
              "beginOfTheBegin": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "1956-10-29"
                  }
                }
              },
              "endOdTheEnd": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "1956-11-06"
                  }
                }
              },
              "ubbont:homepage": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": "https://marcus.uib.no/instance/event/352916f6-2db5-4995-bbf8-c5689716051a"
                  }
                }
              },
              "dct:identifier": {
                "type": "string",
                "example": "352916f6-2db5-4995-bbf8-c5689716051a"
              },
              "prefLabel": {
                "type": "object",
                "properties": {
                  "none": {
                    "type": "string",
                    "example": "1956 Suezkrisen"
                  }
                }
              }
            }
          },
          "Event": {
            "type": "object",
            "properties": {
              "@context": {
                "type": "string",
                "example": "https://api-ub.vercel.app/ns/ubbont/context.json"
              },
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/v1/events/352916f6-2db5-4995-bbf8-c5689716051a"
              },
              "type": {
                "type": "string",
                "example": "Event"
              },
              "beginOfTheBegin": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "1956-10-29"
                  }
                }
              },
              "endOdTheEnd": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "1956-11-06"
                  }
                }
              },
              "ubbont:homepage": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": "https://marcus.uib.no/instance/event/352916f6-2db5-4995-bbf8-c5689716051a"
                  }
                }
              },
              "ubbont:showWeb": {
                "type": "boolean"
              },
              "product": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/photograph/ubb-jg-k-0003"
                }
              },
              "dct:identifier": {
                "type": "string",
                "example": "352916f6-2db5-4995-bbf8-c5689716051a"
              },
              "modified": {
                "type": "string",
                "example": "2021-11-23T14:42:15"
              },
              "inScheme": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/conceptscheme/billedsamlingens-emneord"
                }
              },
              "prefLabel": {
                "type": "object",
                "properties": {
                  "none": {
                    "type": "string",
                    "example": "1956 Suezkrisen"
                  }
                }
              },
              "foaf:logo": {
                "type": "string",
                "example": "http://data.ub.uib.no/files/bs/ubb/ubb-jg/ubb-jg-k/ubb-jg-k-0085/ubb-jg-k-0085-02detalj/jpg/ubb-jg-k-0085-02detalj_th.jpg"
              },
              "page": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/webresource/44b79a9b-e73b-4c9c-ab7c-03b66c2cc29d"
              },
              "timespan": {
                "type": "object",
                "properties": {
                  "edtf": {
                    "type": "string",
                    "example": "1956-10-29/"
                  },
                  "beginOfTheBegin": {
                    "type": "string",
                    "example": "1956-10-29T00:00:00.000Z"
                  },
                  "endOfTheBegin": {
                    "type": "string",
                    "example": "1956-10-30T00:00:00.000Z"
                  }
                }
              }
            }
          },
          "Actors": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/v1/actors/00325061-3fa1-46c8-960e-9675f413c39e"
              },
              "type": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "Person"
                }
              },
              "ubbont:homepage": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": "https://marcus.uib.no/instance/person/00325061-3fa1-46c8-960e-9675f413c39e"
                  }
                }
              },
              "dbo:profession": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "oseanograf"
                }
              },
              "foaf:familyName": {
                "type": "string",
                "example": "Fjeldstad"
              },
              "foaf:firstName": {
                "type": "string",
                "example": "Jonas Ekman"
              },
              "foaf:name": {
                "type": "string",
                "example": "Jonas Ekman Fjeldstad"
              }
            }
          },
          "Actor": {
            "type": "object",
            "properties": {
              "@context": {
                "type": "string",
                "example": "https://api-ub.vercel.app/ns/ubbont/context.json"
              },
              "id": {
                "type": "string",
                "example": "https://api-ub.vercel.app/v1/actors/07dd8798-d0c5-432b-8267-99913f654165"
              },
              "type": {
                "type": "string",
                "example": "Person"
              },
              "cataloguer": {
                "type": "string",
                "example": "http://data.ub.uib.no/instance/cataloguer/9e7cca14-8d21-4ceb-afd7-7e64408ae0dd"
              },
              "ubbont:homepage": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": "https://marcus.uib.no/instance/person/07dd8798-d0c5-432b-8267-99913f654165"
                  }
                }
              },
              "birthYear": {
                "type": "string",
                "example": "1788"
              },
              "deathYear": {
                "type": "string",
                "example": "1859"
              },
              "relationToString": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "ubb-ms-1124"
                }
              },
              "available": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "xsd:date"
                  },
                  "value": {
                    "type": "string",
                    "format": "date",
                    "example": "2017-02-11"
                  }
                }
              },
              "dct:identifier": {
                "type": "string",
                "example": "07dd8798-d0c5-432b-8267-99913f654165"
              },
              "relation": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/manuscript/ubb-ms-0289"
                }
              },
              "parent": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/person/84e278fc-c58e-4bd2-884e-b3b956c76933"
                }
              },
              "sibling": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/person/18e5207f-153e-4bfc-881b-30f6021690ca"
                }
              },
              "inScheme": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/conceptscheme/8c7a6025-d771-4d6c-9c41-72f5b36ecde5"
                }
              },
              "foaf:familyName": {
                "type": "string",
                "example": "Kølle"
              },
              "foaf:firstName": {
                "type": "string",
                "example": "Catharina Hermine"
              },
              "made": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "http://data.ub.uib.no/instance/manuscript/ubb-ms-0659-e-09-02"
                }
              },
              "foaf:name": {
                "type": "string",
                "example": "Catharine Hermine Kølle"
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
          "EventsSuccess": {
            "description": "Request for events was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/Events"
                }
              },
            }
          },
          "EventSuccess": {
            "description": "Request for events was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/Event"
                }
              },
            }
          },
          "ActorsSuccess": {
            "description": "Request for events was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/Actors"
                }
              },
            }
          },
          "ActorSuccess": {
            "description": "Request for events was successful",
            "content": {
              "application/ld+json": {
                "schema": {
                  "$ref": "#/components/schemas/Actor"
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