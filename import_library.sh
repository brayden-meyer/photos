#!/bin/bash

import_images() {
  for img in "$1"/*.{jpg,png}; do
      encoded=$(cat $img | base64)
      curl \
      -X POST \
      -H "Content-Type: application/json" \
      -d "{
        \"class\": \"Photo\",
        \"properties\": {
          \"image\": \"$encoded\",
          \"text\": \"$img\"
      }
    }" \
      http://localhost:8080/v1/objects
  done
}

import_images "library"