#!/bin/bash

# Star Dog Walk API - Client Generator Script

echo "🐕 Generating API clients for Star Dog Walk..."

# Check if OpenAPI Generator CLI is installed
if ! command -v openapi-generator-cli &> /dev/null; then
    echo "📦 Installing OpenAPI Generator CLI..."
    npm install -g @openapitools/openapi-generator-cli
fi

# Create clients directory
mkdir -p clients

echo "🔧 Generating TypeScript client..."
openapi-generator-cli generate \
    -i openapi.yaml \
    -g typescript-fetch \
    -o clients/typescript \
    --additional-properties=npmName=star-dog-walk-api-client,supportsES6=true

echo "🔧 Generating Python client..."
openapi-generator-cli generate \
    -i openapi.yaml \
    -g python \
    -o clients/python \
    --additional-properties=packageName=star_dog_walk_api

echo "🔧 Generating JavaScript client..."
openapi-generator-cli generate \
    -i openapi.yaml \
    -g javascript \
    -o clients/javascript \
    --additional-properties=projectName=star-dog-walk-api-client

echo "✅ API clients generated successfully!"
echo ""
echo "Generated clients:"
echo "  TypeScript: ./clients/typescript/"
echo "  Python: ./clients/python/"
echo "  JavaScript: ./clients/javascript/"
echo ""
echo "To use the TypeScript client:"
echo "  cd clients/typescript && npm install && npm run build"
