export const marcusMapping = {
  "properties": {
    "@timestamp": {
      "type": "date"
    },
    "available": {
      "properties": {
        "@value": {
          "type": "date"
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "created": {
      "properties": {
        "@value": {
          "type": "date"
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "description": {
      "properties": {
        "no": {
          "type": "keyword"
        }
      }
    },
    "field": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "field2": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "field3": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "field4": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "hasRepresentation": {
      "type": "keyword"
    },
    "hasThumbnail": {
      "type": "keyword"
    },
    "homepage": {
      "type": "keyword"
    },
    "id": {
      "type": "keyword"
    },
    "identifier": {
      "type": "keyword"
    },
    "image": {
      "type": "keyword"
    },
    "label": {
      "properties": {
        "no": {
          "type": "keyword"
        }
      }
    },
    "label_no": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "maker": {
      "type": "nested",
      "properties": {
        "id": {
          "type": "keyword"
        },
        "identifier": {
          "type": "keyword"
        },
        "label_no": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "label_en": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "message": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "modified": {
      "type": "date"
    },
    "owner": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "identifier": {
          "type": "keyword"
        },
        "label": {
          "properties": {
            "no": {
              "type": "keyword"
            }
          }
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "pages": {
      "type": "long"
    },
    "placeOfPublication": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "identifier": {
          "type": "keyword"
        },
        "label": {
          "properties": {
            "no": {
              "type": "keyword"
            }
          }
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "prefLabel": {
      "properties": {
        "no": {
          "type": "keyword"
        }
      }
    },
    "relation": {
      "type": "nested",
      "properties": {
        "id": {
          "type": "keyword"
        },
        "identifier": {
          "type": "keyword"
        },
        "label": {
          "properties": {
            "no": {
              "type": "keyword"
            }
          }
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "showWeb": {
      "type": "boolean"
    },
    "subject": {
      "type": "nested",
      "properties": {
        "id": {
          "type": "keyword"
        },
        "identifier": {
          "type": "keyword"
        },
        "label_no": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "label_en": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "subjectOfManifest": {
      "type": "keyword"
    },
    "timespan": {
      "properties": {
        "beginOfTheBegin": {
          "type": "date"
        },
        "edtf": {
          "type": "date"
        },
        "endOfTheEnd": {
          "type": "date"
        }
      }
    },
    "title": {
      "properties": {
        "no": {
          "type": "keyword"
        }
      }
    },
    "type": {
      "type": "keyword"
    }
  }
}