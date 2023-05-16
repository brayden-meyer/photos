#!/bin/bash

curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "class": "Photo",
        "vectorizer": "img2vec-neural",
        "vectorIndexType": "hnsw",
        "moduleConfig": {
            "img2vec-neural": {
                "imageFields": [
                    "image"
                ]
            }
        },
        "properties": [
            {
                "name": "image",
                "dataType": ["blob"]
            },
            {
                "name": "text",
                "dataType": ["string"]
            }
        ]
    }' \
    http://localhost:8080/v1/schema
